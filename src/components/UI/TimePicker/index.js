import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import TimeIcon from 'components/Icons/TimeIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    borderRadius: theme.spacing(3 / 8),
    
    '& input': {
      paddingTop: 15.5,
      paddingBottom: 15.5,
      marginRight: -8,
      cursor: 'pointer',
      '&::placeholder': {
        color: theme.palette.secondary.contrastText,
        fontSize: 14
      }
    },
    '& fieldSet': {
      borderColor: `${theme.palette.text.secondary} !important`,
    },
    '&:hover': {
      '& fieldSet': {
        borderColor: `${theme.custom.palette.grey} !important`
      }
    },
    '& > div': {
      paddingRight: `${theme.spacing(1)}px !important`,
    }
  },
  timeWithPrefix: {
    '& input': {
      paddingLeft: theme.spacing(7)
    }
  },
  prefixLabel: {
    position: 'absolute',
    marginTop: theme.spacing(14 / 8),
    marginLeft: theme.spacing(2),
    zIndex: 0
  },
  iconButton: {
    cursor: 'pointer',
    marginTop: theme.spacing(2),
    marginLeft: -theme.spacing(36 / 8),
  },
}));

const initTime = new Date('2014-08-18T21:11:54');

const CustomTimePicker = ({ className, prefix, name, onChange, ...rest }) => {
  const [selectedDate, setSelectedDate] = React.useState(initTime);
  const classes = useStyles();

  const handleDateChange = date => {
    onChange && onChange(date, name);
    !onChange && setSelectedDate(date);
  };

  const showPrefix = (prefix && selectedDate !== initTime);

  return (
    <>
      {showPrefix && 
        <Typography className={classes.prefixLabel} variant='body2' color='textSecondary'>{prefix}</Typography>
      }
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          className={clsx(classes.root, className, showPrefix && classes.timeWithPrefix)}
          variant="inline"
          inputVariant='outlined'
          margin="normal"
          format='HH:mm'
          value={selectedDate === initTime ? null: selectedDate}
          onChange={handleDateChange}
          ampm={false}
          PopoverProps={{
            anchorOrigin:{ horizontal: 'right', vertical: 'bottom' },
            transformOrigin:{ horizontal: 'right', vertical: 'top' },
          }}
          {...rest}
        />
      </MuiPickersUtilsProvider>
      <TimeIcon className={classes.iconButton} />
    </>
  );
}

export default CustomTimePicker;