
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import 'aos/dist/aos.css';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';

const useStyles = makeStyles(theme => ({
    root: {},
    card: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: 12,
        borderColor: 'red',
        boxShadow: `0 1px 6px 0 ${theme.palette.text.notification}`,
        '&:hover': {
            transform: 'translateY(-5px)',
            transition: `ease-out 0.4s `,
            opacity: '100%'
        },
        transition: 'ease-out 0.4s',
    },
    cardContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: theme.spacing(2, 2, 4, 2),
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2)
    }
}));

const RegisterBoard = ({ setIsDialog }) => {
    const classes = useStyles();
    const onClickHandler = () => {
        setIsDialog(true);
    }

    return (
        <Grid container justify='center'>
            <Grid container item xs={3}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.imageContainer}>
                            <MemoizedOutlinedTextField
                                placeholder='URL'
                            />
                            <img width={64} height={64} style={{ marginLeft: 40 }} alt='althash' src='/assets/images/althash.png' />
                        </div>
                        <Typography variant='h6'> Register or Search for you Off</Typography>
                        <Typography variant='h6'>Spring on the Althash Blockchain</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <ContainedButton style={{ backgroundColor: '#16ACE2' }}>
                            Search
                        </ContainedButton>
                        <ContainedButton onClick={onClickHandler} style={{ backgroundColor: '#4caf50' }}>
                            Register
                        </ContainedButton>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default RegisterBoard;
