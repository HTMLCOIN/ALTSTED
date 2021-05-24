
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

import DialogWrapper, { dialogStyles } from 'hoc/DialogWrapper';
import { MemoizedOutlinedTextField } from 'components/UI/OutlinedTextField';
import RadiusButton from 'components/RadiusButton';

const useStyles = makeStyles(theme => ({
    rangeContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
        marginRight: -theme.spacing(2 / 8)
    },
    titleLine: {
        marginBottom: theme.spacing(2.5)
    },
    fileDropZone: {
        height: 96,
        minHeight: 'unset'
    },
    dialogContent: {
        [theme.breakpoints.down('xs')]: {
            maxHeight: '340px',
        },
        maxHeight: '460px',
        overflowX: 'unset',
        overflowY: 'scroll',
        '&::-webkit-scrollbar-track': {
            borderRadius: 2,
            backgroundColor: theme.palette.background.default
        },
        '&::-webkit-scrollbar': {
            width: 5,
            backgroundColor: theme.palette.background.default
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40
    }
}));

const RegisterDialog = ({ open, onClose, headerTitle }) => {
    const classes = useStyles();
    const dialogClasses = dialogStyles();

    const [state, setState] = useState({});

    const onFormSubmit = async (ev) => {
        ev.preventDefault()
        onClose();
    }

    return (
        <DialogWrapper open={open} onClose={onClose} smallWidth >
            <form onSubmit={onFormSubmit} >
                <div className={dialogClasses.root}>
                    <Typography variant='h6' className={classes.titleLine}> {headerTitle}</Typography>
                    <DialogContent dividers className={classes.dialogContent}>
                        <div className={classes.content}>
                            <MemoizedOutlinedTextField
                                placeholder='URL'
                            />
                            <div className={classes.imageContainer}>
                                <img width={40} height={40} alt='althash' src='/assets/images/althash.png' />
                                <Typography variant='subtitle2'>Altmask</Typography>
                            </div>
                        </div>
                        <Typography style={{ margin: 20 }} variant='h6' align='center'>
                            REGISTER YOUR OFFSPRING
                        </Typography>
                    </DialogContent>
                    <div className={classes.dialogActions}>
                        <RadiusButton variant='outlined'>
                            <Typography variant='body1'>
                                Connect Altmask
                            </Typography>
                        </RadiusButton>
                    </div>
                </div>
            </form>
        </DialogWrapper>
    );
}

export default RegisterDialog;
