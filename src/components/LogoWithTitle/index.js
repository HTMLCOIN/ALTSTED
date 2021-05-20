
import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import CircleButton from 'components/UI/Buttons/CircleButton';

import Logo from 'components/Logo';
import { PAGES } from 'utils/links/pages';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: 4,
    },
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    },
  },
  height: {
    height: '100%'
  },
}));

const LogoWithTitle = ({ setOpen, history, logoWidth, logoHeight, titleVariant, className }) => {
  const classes = useStyles();
  const onClickHander = () => {
    history.push(PAGES.HOME.url);
  }

  return (
    <div className={clsx(classes.root, className)}>
      <CircleButton style={{ display: 'flex', backgroundColor: '#292C40' }} onClick={onClickHander} icon={<Logo className={classes.logo} width={logoWidth} height={logoHeight} />} />
      <Typography color='textPrimary' variant={titleVariant}>
        Althash
      </Typography>
    </div>
  );
};

export default withRouter(LogoWithTitle);
