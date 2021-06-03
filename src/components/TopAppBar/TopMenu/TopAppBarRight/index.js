
import React, { useContext } from 'react';
import { AppContext } from 'contexts';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar, { ConfigProvider } from 'react-avatar';
import makeBlockie from 'ethereum-blockies-base64';
import Typography from '@material-ui/core/Typography';

import { isEmpty } from 'utils/utility';
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
  },
  hoverEffect: {
    width: '100%',
    backgroundColor: theme.custom.palette.hover,
  },
}));

const TopAppBarRight = ({ isMobileMenu }) => {
  const isAvatarSelected = ''
  const { setNotificationData, htmlState } = useContext(AppContext);

  const classes = useStyles({})
  console.log('kevin htmlState?.account?.address', htmlState)

  return (
    <>
      <div className={classes.root}>
        <div className={clsx(classes.avatarList, isAvatarSelected ? classes.borderColor : null)}>
          <ConfigProvider
            colors={['#FF2929', '#FF7A29', '#FAD02E', '#91FA49', '#36D8B7', '#3B8AFF', '#991EF9', '#FF5DCD']}>
            {!isEmpty(htmlState?.account) ?
              <>
                <RadiusButton variant='outlined'>
                  <>

                    <Avatar size={"28"} className={classes.avatar} round={true}
                      src={makeBlockie(htmlState?.account?.address)} name={"Althash"} />
                    <Typography>
                      {htmlState?.account?.address?.slice(0, 4) + '...' + htmlState?.account?.address?.slice(htmlState?.account?.address?.length - 4, htmlState?.account?.address?.length)}
                    </Typography>
                    <Typography color='textSecondary' style={{ marginLeft: 4 }} variant='body1'> {htmlState?.account?.balance} html </Typography>
                  </>
                </RadiusButton>
              </>
              :
              <RadiusButton className={classes.hoverEffect} variant='contained'>
                <Typography
                  variant='body1'
                >
                  Connect Account
                </Typography>
              </RadiusButton>}
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default TopAppBarRight;
