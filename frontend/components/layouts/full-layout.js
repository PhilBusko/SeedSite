/**************************************************************************************************
MENU LAYOUT
**************************************************************************************************/
import * as React from 'react';
import NavMenu from './nav-menu'
import ContentBlock from './content-block';
import './styles.scss'

class FullLayout extends React.Component {

    //navigationBkgd = require('../assets/images/navigation.png')
    //contentBkgd = require('../assets/images/content.png')

    render() {

        return (
            <div className='full-layout'>
                <ContentBlock>
                    { this.props.children }
                </ContentBlock>
            </div>
        );
    }
}

export default FullLayout;

