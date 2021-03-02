/**************************************************************************************************
BASE WEBSOCKET PAGE
**************************************************************************************************/
import React, { setGlobal } from 'reactn';
import MenuLayout from '../layouts/menu-layout'
import * as CM from '../elements/common/_index'
import * as FM from '../elements/form/_index'
import './_page-styles.scss'


class BaseWebsocket extends React.Component {

    websocket = null;

    state = {
        'setTable': [],
        'setPlot': {},

        'connection': '',
        'progress': 0,
        'status': '',
    };

    componentDidMount() {
        CM.Websocket.initializeWs(this, 'base-module');
    }

    componentWillUnmount() {
        this.websocket.close();
    }

    initialCalls = () => {
        const message = { 
            'functionType': 'base-data', 
        };
        this.websocket.send(JSON.stringify(message));
    }

    responseRouter = (wsMessage) => {
        let newState = {};
        console.log(wsMessage);

        switch(wsMessage.functionType) {

            case 'base-data-results':
                newState = {
                    'setTable': wsMessage['setTable'],
                    'setPlot': JSON.parse(wsMessage['setPlot']),
                };
                this.setState(newState);
                break;

            case 'process-update':
                newState = {
                    'progress': wsMessage['progress'],
                    'status': wsMessage['status'],
                };
                this.setState(newState);
                break;

            default:
                console.log('message functionType unknown');
        }
    }

    handleButton = () => {
        const message = { 
            'functionType': 'run-process', 
        }
        this.websocket.send(JSON.stringify(message));
    }


    render() {
        return (
            <MenuLayout>
                <div className='pure-g spacing-outer'>

                    <div className='pure-u-1'>
                        <div className='spacing-inner page-title'>
                            Websocket Template
                        </div>
                    </div>

                    <div className='pure-u-1-4'>
                        <div className='spacing-inner' style={{ 'width': '240px' }}>
                            <CM.ButtonWrapper label={ 'Start Process' }  updateClick={ this.handleButton } />
                            <FM.FormTable>
                                <FM.LabelWrapper label={ 'Websocket' }  value={ this.state.connection } />
                            </FM.FormTable>
                            <div >
                                <CM.ProgressBar percentage={ this.state.progress } />
                            </div>
                            <FM.FormTable>
                                <FM.LabelWrapper label={ 'Status' }  value={ this.state.status } />
                            </FM.FormTable>
                        </div>
                    </div>

                    <div className='pure-u-3-4'>
                        <div className='spacing-inner'>
                            <CM.PlotWrapper         
                                plotConfig={ this.state.setPlot }
                                sizeStyles={{'width': '600px', 'height': '400px'}} 
                                isLoading={ false }
                                isStatic={ false }
                            />
                        </div>
                        <div className='spacing-inner'>
                            <CM.TableWrapper         
                                tableRows={ this.state.setTable }
                                //sizeStyles={{'width': '300px', 'height': '400px'}} 
                                isLoading={ false }
                                title={ null }
                            />
                        </div>
                    </div>

                </div>
            </MenuLayout>
        );
    }
}

export default BaseWebsocket;
