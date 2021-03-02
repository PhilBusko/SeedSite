/**************************************************************************************************
SELECT WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './form.scss'


class SelectWrapper extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        value: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        updateSelection: PropTypes.func.isRequired,
    }
    static defaultProps = {
        disabled: false,
    };

    updateValue = (synthEvt) => {
        let newValue = synthEvt.target.value;
        this.props.updateSelection(newValue);
    }

    render() {
        let ctrlId = this.props.label.toLowerCase().replace(' ', '') + '_slct'
        return (
            <>
                <td className='first-col'>
                    <label htmlFor={ ctrlId }>{ this.props.label }: </label>
                </td>
                <td className='second-col'>
                    <select 
                        id={ ctrlId } 
                        value={ this.props.value }
                        onChange={ this.updateValue }
                        disabled={ this.props.disabled }>
                        {this.props.options.map((opt, idx) => (
                            <option key={ idx } value={ opt['key'] }>{ opt['value'] }</option>
                        ))}
                    </select>
                </td>
            </>
        );
    }
}

export default SelectWrapper;
