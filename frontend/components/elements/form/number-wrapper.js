/**************************************************************************************************
TEXT WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './form.scss'


class NumberWrapper extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,  
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        updateText: PropTypes.func.isRequired,
    }
    static defaultProps = {
        disabled: false,
    };

    updateValue = (synthEvt) => {
        let newValue = synthEvt.target.value;
        this.props.updateText(newValue);
    }

    render() {
        let ctrlId = this.props.label.toLowerCase().replace(' ', '') + '_nptx';

        return (
            <>
                <td className='first-col'>
                    <label htmlFor={ ctrlId }>{ this.props.label }: </label>
                </td>
                <td className='second-col'>
                    <input 
                        type={ 'number' } 
                        min={ 0 }
                        id={ ctrlId }
                        value={ this.props.value } 
                        onChange={ this.updateValue } 
                        className={ 'textbox-number' } 
                        disabled={ this.props.disabled }
                    ></input>
                </td>
            </>
        );
    }
}

export default NumberWrapper;
