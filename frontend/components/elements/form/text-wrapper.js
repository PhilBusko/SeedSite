/**************************************************************************************************
TEXT WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './form.scss'


class TextWrapper extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,  
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        size: PropTypes.string,
        updateText: PropTypes.func.isRequired,
    }
    static defaultProps = {
        disabled: false,
        size: 'medium',
    };

    updateValue = (synthEvt) => {
        let newValue = synthEvt.target.value;
        this.props.updateText(newValue);
    }

    render() {
        let ctrlId = this.props.label.toLowerCase().replace(' ', '') + '_nptx';
        let sizeClass = 'textbox-medium';
        if (this.props.size == 'small') 
            sizeClass = 'textbox-small';

        return (
            <>
                <td className='first-col'>
                    <label htmlFor={ ctrlId }>{ this.props.label }: </label>
                </td>
                <td className='second-col'>
                    <input 
                        type={ 'text' } 
                        id={ ctrlId }
                        value={ this.props.value } 
                        onChange={ this.updateValue } 
                        className={ sizeClass } 
                        maxLength={ 20 }
                        disabled={ this.props.disabled }
                    ></input>
                </td>
            </>
        );
    }
}

export default TextWrapper;
