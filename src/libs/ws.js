import io from 'socket.io-client';

import { DOMAIN } from '../constants/constants';

const wsInstaces = {};

export const useWs = (network) => {
  if (wsInstaces[network]) {
    return wsInstaces[network];
  }
  const ws = io(`wss://${DOMAIN[network]}/`, { transports: ['websocket'] });

  const subscriptions = {};
  const listeners = {};

  Object.assign(ws, {
    $subscribe(room, event, callback) {
      const eventMapping = subscriptions[room];
      if (eventMapping) {
        const mapping = eventMapping[event];
        if (mapping) {
          mapping.set(callback, (mapping.get(callback) || 0) + 1);
        } else {
          eventMapping[event] = new Map([[callback, 1]]);
        }
      } else {
        subscriptions[room] = { [event]: new Map([[callback, 1]]) };
        ws.emit('subscribe', room);
      }
      const listener = listeners[event];
      if (listener) {
        const count = listener.get(callback);
        if (count) {
          listener.set(callback, count + 1);
        } else {
          listener.set(callback, 1);
          ws.on(event, callback);
        }
      } else {
        listeners[event] = new Map([[callback, 1]]);
        ws.on(event, callback);
      }
      return this;
    },
    $unsubscribe(room, event, callback) {
      const eventMapping = subscriptions[room];
      if (eventMapping) {
        const mapping = eventMapping[event];
        if (mapping) {
          const count = mapping.get(callback);
          if (!count) {
            return;
          } else if (count === 1) {
            mapping.delete(callback);
            if (mapping.size === 0) {
              delete eventMapping[event];
            }
          } else {
            mapping.set(callback, count - 1);
          }
        }
        if (Object.keys(eventMapping).length === 0) {
          delete subscriptions[room];
          ws.emit('unsubscribe', room);
        }
      }
      const listener = listeners[event];
      if (listener) {
        const count = listener.get(callback);
        if (count === 1) {
          listener.delete(callback);
          ws.off(event, callback);
        } else {
          listener.set(callback, count - 1);
        }
      }
      return this;
    },
  });

  ws.on('reconnect', () => {
    for (const room of Object.keys(subscriptions)) {
      ws.emit('subscribe', room);
    }
  });

  wsInstaces[network] = ws;

  return ws;
};
