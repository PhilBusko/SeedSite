/**************************************************************************************************
PLOT WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
import { When } from 'react-if';
import './common.scss';

import createPlotlyComponent from 'react-plotlyjs';
//plotly bundles https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles ??
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);


class PlotWrapper extends React.Component {

    static propTypes = {
        plotConfig: PropTypes.object.isRequired,
        sizeStyles: PropTypes.object, 
        isLoading: PropTypes.bool,
        isStatic: PropTypes.bool,  
    }
    static defaultProps = {
        sizeStyles: {'width': '500px', 'height': '300px'},
        isLoading: false,
        isStatic: false,
    }

    loadingIcon = require('../../assets/loading_cat.gif')

    render() {
        return (
            <div className='plot-wrapper' style={ this.props.sizeStyles }>
                <When condition={ Object.keys(this.props.plotConfig).length > 0 }>
                    { () => 
                        <PlotlyComponent 
                            data={ this.props.plotConfig.data }
                            layout={ this.props.plotConfig.layout }
                            config={{ 'staticPlot': this.props.isStatic }}
                        />  
                    }
                </When>
                <When condition={ this.props.isLoading == true }>
                    <div className='empty-plot even-panel'>
                        <img src={ this.loadingIcon } className='loading-icon' alt='loading'/>
                    </div>
                </When>
                <When condition={ Object.keys(this.props.plotConfig).length == 0 && this.props.isLoading == false}>
                    <div className='empty-plot even-panel'>
                        No Data
                    </div>
                </When>
            </div>
        );
    }
}

export default PlotWrapper;

