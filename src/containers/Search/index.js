
import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import 'aos/dist/aos.css';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';
import { isEmpty } from 'utils/utility';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: `calc(100vh - ${theme.custom.layout.topAppBarHeight}px)`,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        justifyContent: 'center',
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

const Search = ({ }) => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const searchHandler = async () => {

    }

    const inputChangeHandler = useCallback(event => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState, [name]: value
        }));
    }, []);

    return (
        <div className={classes.root}>
            <Grid container justify='center'>
                <Grid container item xs={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.imageContainer}>
                                <MemoizedOutlinedTextField
                                    placeholder='URL'
                                    name='search'
                                    value={state.search || ''}
                                    onChange={inputChangeHandler}
                                />
                                <img width={64} height={64} style={{ marginLeft: 40 }} alt='althash' src='/assets/images/althash.png' />
                            </div>
                            <Typography variant='body1' color='secondary'> Please Type in Registered Name : Example : John Dae</Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <ContainedButton onClick={searchHandler} style={{ backgroundColor: '#16ACE2' }}>
                                Search
                            </ContainedButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Search;
