import React, { useState } from 'react';
import 'date-fns';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import CalendarIcon from 'components/Icons/CalendarIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 0,
    borderRadius: theme.spacing(3 / 8),
    '& input': {
      cursor: 'pointer',
      paddingTop: 15.5,
      paddingBottom: 15.5,
      marginRight: -58,
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
      paddingRight: `${theme.spacing(3)}px !important`,
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
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    marginTop: theme.spacing(2),
    marginLeft: -theme.spacing(38 / 8),
  },
  error: {
    '& fieldSet': {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    '&:hover': {
      '& fieldSet': {
        borderColor: `${theme.palette.secondary.main} !important`
      }
    },
  },
}));

const initDate = new Date('2014-08-18T21:11:54');

const CustomDatePicker = ({ className, value, onChange, prefix, error, name, ...rest }) => {
  const [selectedDate, setSelectedDate] = useState(initDate);
  const classes = useStyles();

  const handleDateChange = date => {
    onChange && onChange(date, name);
    !onChange && setSelectedDate(date);
  };

  const showPrefix = (prefix);

  return (
    <>
      {showPrefix &&
        <Typography className={classes.prefixLabel} variant='body2' color='textSecondary'>{prefix}</Typography>
      }
      <MuiPickersUtilsProvider styling={{ zIndex: 4000 }} utils={DateFnsUtils}>
        <DatePicker
          className={clsx(classes.root, className, showPrefix && classes.timeWithPrefix, error && classes.error)}
          disableToolbar
          variant="inline"
          inputVariant='outlined'
          format="MM/dd/yyyy"
          margin="normal"
          value={value || (selectedDate === initDate ? null : selectedDate)}
          onChange={handleDateChange}
          PopoverProps={{
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            transformOrigin: { horizontal: 'right', vertical: 'top' },
          }}
          {...rest}
        />
      </MuiPickersUtilsProvider>
      <CalendarIcon className={classes.iconButton} />
    </>
  );
}

export default CustomDatePicker;
