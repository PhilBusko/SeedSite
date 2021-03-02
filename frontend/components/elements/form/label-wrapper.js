/**************************************************************************************************
TEXT WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './form.scss';


class LabelWrapper extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,  
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
    };
    static defaultProps = {
        disabled: false,
    };

    render() {
        let ctrlId = this.props.label.toLowerCase().replace(' ', '') + '_labl'
        return (
            <>
                <td className='first-col'>
                    <label htmlFor={ ctrlId }>{ this.props.label }: </label>
                </td>
                <td className='second-col'>
                    <span id={ctrlId}>{ this.props.value }</span>
               </td>
            </>
        );
    }
}

export default LabelWrapper;
