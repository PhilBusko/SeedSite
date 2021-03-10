/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import React, { setGlobal } from 'reactn';
import axios from 'axios';
import MenuLayout from '../layouts/menu-layout'
import * as CM from '../elements/common/_index'
import * as FM from '../elements/form/_index'
import './_page-styles.scss'


class BaseAxios extends React.Component {

    state = {
        'labelVal': 'my value',
        'selectKey': 0,
        'inputVal': '',
        'numberVal': '',
        'tabular': [],
    };

    selectOptions = [
        {'key': 0, 'value': 'Value A'}, 
        {'key': 1, 'value': 'Value B'},
        {'key': 2, 'value': 'Value C'},
    ];


    componentDidMount() {
        axios({
            url: 'api/base-module/tabular/',
        }).then( success => {
            console.log(success.data);
            this.setState({ 'tabular': success.data.legoSets });
        }).catch( error => {
            console.log(error);
        });
    }

    handleSelect = (payload) => {
        let newState = {
            'selectKey': parseInt(payload),
            'selectVal': this.selectOptions.filter(p => p.key == payload)[0].value,
        };
        this.setState(newState);
    }

    handleText = (payload) => {
        let newState = { 'inputVal': payload };
        this.setState(newState);
    }

    handleNumber = (payload) => {
        let newState = { 'numberVal': payload };
        this.setState(newState);
    }

    render() {
        return (
            <MenuLayout>
                <div className='pure-g spacing-outer'>

                    <div className='pure-u-1'>
                        <div className='spacing-inner page-title'>
                            Axios Template Page
                        </div>
                    </div>

                    <div className='pure-u-1-4'>
                        <div className='spacing-inner '>

                            <FM.FormTable>

                                <FM.LabelWrapper 
                                    label={ 'Label Text' } 
                                    value={ this.state.labelVal }
                                    disabled={ false }
                                />

                                <FM.SelectWrapper 
                                    label={ 'Dropdown' } 
                                    options={ this.selectOptions } 
                                    value={ this.state.selectKey } 
                                    disabled={ false }
                                    updateSelection={ this.handleSelect }
                                />

                                <FM.TextWrapper 
                                    label={ 'Input Text' }  
                                    value={ this.state.inputVal } 
                                    disabled={ false }
                                    size={ 'medium' }
                                    updateText={ this.handleText } 
                                />

                                <FM.NumberWrapper 
                                    label={ 'Numeric'} 
                                    value={ this.state.numberVal || '' }
                                    disabled={ false }
                                    updateText={ this.handleNumber }
                                />

                            </FM.FormTable>

                            <br></br>

                            {
                                this.state.tabular.map((item, idx) =>
                                    <div key={idx}>
                                        { item.set_no } { item.name } 
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </div>
            </MenuLayout>
        );
    }
}

export default BaseAxios;
