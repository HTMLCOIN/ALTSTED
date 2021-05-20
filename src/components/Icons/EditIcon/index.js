import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: 14,
    height: 14
  }
}));

const EditIcon = ({className, viewBox, color, ...rest}) => {
  const classes = useStyles();
  return (
    <SvgIcon viewBox={viewBox || "0 0 14 14"} {...rest} className={clsx(classes.root, className)}>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="User-Management_users" transform="translate(-1357.000000, -388.000000)" stroke={color || "#555E7F"} strokeWidth="1.5">
          <g id="Group-6-Copy-3" transform="translate(300.000000, 365.000000)">
            <g id="Group-7" transform="translate(1023.000000, 18.000000)">
              <g id="edit-2" transform="translate(35.000000, 6.000000)">
                <path d="M9,0.6 C9.42871871,0.171281281 10.0535898,0.00384755858 10.6392305,0.160769495 C11.2248711,0.317691432 11.6823086,0.775128853 11.8392305,1.36076951 C11.9961524,1.94641016 11.8287187,2.57128129 11.4,3 L3.3,11.1 L0,12 L0.9,8.7 L9,0.6 Z" id="Path"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export default EditIcon;

