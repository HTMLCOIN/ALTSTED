
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar, { ConfigProvider } from 'react-avatar';
import makeBlockie from 'ethereum-blockies-base64';

import RadiusButton from 'components/RadiusButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  avatarContainer: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 1.5, 0, 1.5)
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px'
  },
  avatar: {
    cursor: 'pointer',
    marginRight: theme.spacing(1)
  },
  backgroundColor: {
    backgroundColor: `${theme.palette.text.hoverText} !important`,
  },
  borderColor: {
    borderTop: `0.5px solid  ${theme.palette.text.hoverText} !important`
  }
}));

const TopAppBarRight = ({ isMobileMenu }) => {
  const isAvatarSelected = ''

  const classes = useStyles({})

  return (
    <>
      <div className={classes.root}>
        <div className={clsx(classes.avatarList, isAvatarSelected ? classes.borderColor : null)}>
          <ConfigProvider
            colors={['#FF2929', '#FF7A29', '#FAD02E', '#91FA49', '#36D8B7', '#3B8AFF', '#991EF9', '#FF5DCD']}>
            <>
              <RadiusButton variant='outlined'>
                <Avatar size={"28"} className={classes.avatar} round={true}
                  src={makeBlockie('example coin address')} name={"Althash"} />
              </RadiusButton>
            </>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default TopAppBarRight;
