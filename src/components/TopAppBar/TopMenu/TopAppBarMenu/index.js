
import { AppContext } from 'contexts';
import { useContext, memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import TopAppBarMenuItem from './TopAppBarMenuItem';

const useStyles = makeStyles(theme => ({
  menuItem: {
    flexDirection: 'row',
    width: 'fit-content',
    minHeight: '100%',
    padding: 0
  }
}));

const TopAppBarMenu = ({ menuItems, isMobileMenu }) => {
  const classes = useStyles();
  const history = useHistory();
  const { topAppMenu } = useContext(AppContext);

  const menuItemClickHandler = (event, index) => {
    history.push(menuItems[index].url)
  };

  return (
    <>
      <ListItem className={classes.menuItem}>
        {menuItems.map((menuItem, index) => (
          <TopAppBarMenuItem
            key={menuItem.id}
            isMobileMenu={isMobileMenu}
            selected={topAppMenu === index}
            menuNumber={index}
            menuItem={menuItem}
            onClick={event => menuItemClickHandler(event, index)} />
        ))}
      </ListItem>
    </>
  );
};

export default memo(TopAppBarMenu);
