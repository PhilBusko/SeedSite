/**************************************************************************************************
PLOT WRAPPER ELEMENT
**************************************************************************************************/
import * as React from 'react';
import PropTypes from 'prop-types';
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
                {(() => {
                    if (Object.keys(this.props.plotConfig).length > 0) { return (
                        <PlotlyComponent 
                            data={ this.props.plotConfig.data }
                            layout={ this.props.plotConfig.layout }
                            config={{ 'staticPlot': this.props.isStatic }}
                        />  
                    )} 
                    else if (this.props.isLoading == true) { return (
                        <div className='empty-plot even-panel'>
                            <img src={ this.loadingIcon } className='loading-icon' alt='loading'/>
                        </div>
                    )} 
                    else { return (
                        <div className='empty-plot even-panel'>
                            No Data
                        </div>
                    )}
                })()}
            </div>
        );
    }
}

export default PlotWrapper;
