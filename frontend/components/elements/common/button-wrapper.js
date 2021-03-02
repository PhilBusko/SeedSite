/**************************************************************************************************
BUTTON WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './common.scss'


class ButtonWrapper extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,  
        updateClick: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };
    static defaultProps = {
        disabled: false,
    };

    handleClick = (synthEvt) => {
        this.props.updateClick();
    }

    render() {
        let ctrlId = this.props.label.toLowerCase().replace(' ', '') + '_btn'
        return (
            <div className='button-wrapper'>
                <div className={ this.props.disabled ? 'disable-overlay' : ''}></div>
                <button 
                    className='button-format' id={ ctrlId }
                    onClick={ this.handleClick } >
                    { this.props.label }
                </button>
            </div>
        );
    }
    // render() {
    //     let ctrlId = this.props.label.toLowerCase().replace(' ', '') + '_btn'
    //     return (
    //         <>
    //             <td colSpan='2' className='button-col'>
    //                 <button id={ ctrlId } onClick={ this.handleClick } className='button-format'>{ this.props.label }</button>
    //             </td>
    //         </>
    //     );
    // }
}

export default ButtonWrapper;
