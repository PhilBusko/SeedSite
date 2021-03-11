/**************************************************************************************************
TABLE WRAPPER
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './common.scss';


class TableWrapper extends React.Component {

    static propTypes = {
        tableRows: PropTypes.array.isRequired,
        sizeStyles: PropTypes.object, 
        isLoading: PropTypes.bool,
        title: PropTypes.string,
    }
    static defaultProps = {
        sizeStyles: {'width': '300px', 'height': '400px'},
        isLoading: false,
    }

    loadingIcon = require('../../assets/loading_cat.gif')

    getTitleWords = (original) => {
        let format = original.replace('_', ' ');
        format = format.replace(/\b\w/g, l => l.toUpperCase());
        return format;
    }

    isFloat = (input) => {
        input = input.toString();
        let formatted = input.replace(',', '');
        let test = Number(formatted);
        return !Number.isNaN(test);
    }

    getColumnWidth = (dataRows, propName) => {
        let maxLength = propName.length;
        dataRows.forEach( row => {
            if (row[propName].length > maxLength)
                maxLength = row[propName].length;
            });
        
        maxLength += 3;            // some wiggle room
        let factor = 10;           // ballpark given average font sizes
        let width = maxLength * factor
        if (width > 180)
            width = 180;

        return width;     
    }

    getColumnsDef = () => {
        let tableRows = this.props.tableRows;
        let dataProps = tableRows.length > 0 ? Object.getOwnPropertyNames(tableRows[0]) : [];
        let columnsDef = []
        if (dataProps.length === 0)
            return []

        dataProps.forEach( prop => {
            let numberClass = this.isFloat(tableRows[0][prop]) ? ' center-text' : '';
            let newCol = {
                Header: this.getTitleWords(prop),
                headerClassName: 'table-header' + numberClass,
                accessor: prop,
                className: 'table-text' + numberClass,
                width: this.getColumnWidth(tableRows, prop),   
            };
            columnsDef.push(newCol);
        });

        return columnsDef;
    }

    render() {
        let pageSize = this.props.tableRows.length <=  15 ? this.props.tableRows.length : 15;
        let pagination = this.props.tableRows.length <=  15 ? false : true;

        return (
            <div className='table-wrapper' style={ this.props.tableRows.length == 0 ? this.props.sizeStyles : {} }>

                {(() => {
                    if (!!this.props.title) { return (
                        <div className='strong-font'>
                            { this.props.title }
                        </div>
                    )} 
                })()}

                {(() => {
                    if (this.props.tableRows.length > 0) { return (
                        <div className='table-container small-font'>
                            <ReactTable
                                data={ this.props.tableRows }
                                columns={ this.getColumnsDef() }
                                pageSize={ pageSize }
                                //minRows={ 1 }
                                showPagination={ pagination }
                                sortable={ false }
                                resizable={ false }
                                showPageSizeOptions= { false }
                            />
                        </div>
                    )} 
                    else if (this.props.isLoading == true) { return (
                        <div className='empty-table even-panel'>
                            <img src={ this.loadingIcon } className='loading-icon' alt='loading'/>
                        </div>
                    )} 
                    else { return (
                        <div className='empty-table even-panel'>
                            No Data
                        </div>
                    )}
                })()}

            </div>
        );
    }
}

export default TableWrapper;
