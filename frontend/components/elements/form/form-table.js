/**************************************************************************************************
FORM TABLE
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import './form.scss'


class FormTable extends React.Component {

    static propTypes = {
        extraClasses: PropTypes.string,
        minWidth: PropTypes.string,
    };
    static defaultProps = {
        extraClasses: "",
        minWidth: "0",
    };

    render() {

        let childrenElems = this.props.children;
        if (!childrenElems) 
            return ''
        else if (Array.isArray(childrenElems) == false)
            childrenElems = [childrenElems]

        return (
            <>
                <table className={ `form-table ${this.props.extraClasses}` } style={{ 'minWidth': this.props.minWidth }}><tbody>
                {
                    childrenElems.map((child, idx) => {
                        return (
                            <tr key={ idx } >
                                { child }
                            </tr> 
                        );
                    })
                }
                </tbody></table>
            </>
        );
    }
}

export default FormTable;
