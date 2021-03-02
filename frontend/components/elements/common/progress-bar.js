/**************************************************************************************************
BUTTON WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './common.scss'


const ProgressBar = (props) => {
    return (
        <div className='progress-bar'>
            <div className='filler' style={{ width: `${props.percentage}%` }} />
        </div>
    )
}

export default ProgressBar;
