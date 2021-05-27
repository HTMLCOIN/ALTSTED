
import React, { useState, useEffect, useMemo } from 'react'
import { Hweb3 } from 'hweb3';
import { isEmpty } from 'utils/utility';

const useEagerConnect = async () => {
    if (!isEmpty(window.altmask)) {
        const hweb3 = await new Hweb3(window.altmask.rpcProvider);
        console.log('kevin hweb3===>', 'success!', hweb3.getAccount())
    }
}

const useInactiveListener = () => {

}

export {
    useEagerConnect,
    useInactiveListener
};
