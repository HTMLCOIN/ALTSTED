
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'aos/dist/aos.css';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import DeleteButton from 'components/UI/Buttons/DeleteButton';
import RadiusButton from 'components/RadiusButton';
import EditButton from 'components/UI/Buttons/EditButton';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - ${theme.custom.layout.topAppBarHeight}px)`,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Home = () => {
  const classes = useStyles();

  AOS.init({
    once: true,
    delay: 50,
    duration: 500,
    easing: 'ease-in-out',
  });

  return (
    <div className={classes.root}>
      <Typography variant='h4' style={{ marginBottom: 24 }} >Upcoming offSpring Dapp!</Typography>
      <Typography variant='h5' style={{ marginBottom: 24 }}>Custom granular components:</Typography>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid container item xs={12} alignItems='center' justify='center'>
          <ContainedButton>Search</ContainedButton>
          <ContainedButton>Register</ContainedButton>
          <RadiusButton >Radius Button </RadiusButton>
        </Grid>
        <Grid container item xs={12} alignItems='center' justify='center'>
          <DeleteButton />
          <EditButton />
        </Grid>
      </Grid>
      <Typography variant='h5' style={{ marginBottom: 24 }}>Custom input & select & auto complete components:</Typography>
      <Grid container spacing={2}>
        <Grid container item xs={12} sm={6} lg={3}>
          <MemoizedOutlinedTextField placeholder='custom inputbox' />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MemoizedOutlinedTextField placeholder='validation inputbox' />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MemoizedOutlinedTextField placeholder='auto Complete inputbox' />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MemoizedOutlinedTextField placeholder='text select inputbox' />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
