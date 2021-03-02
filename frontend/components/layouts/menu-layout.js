/**************************************************************************************************
MENU LAYOUT
**************************************************************************************************/
import * as React from 'react';
import NavMenu from './nav-menu'
import ContentBlock from './content-block';
import './styles.scss'

class MenuLayout extends React.Component {

    //navigationBkgd = require('../assets/images/navigation.png')
    //contentBkgd = require('../assets/images/content.png')

    render() {

        return (
            <div className='pure-g menu-layout'>

                <div className='pure-u-4-24 pure-u-xl-3-24  nav-column'>
                    <div className='fixed-panel'>
                        <NavMenu></NavMenu>
                    </div>
                </div>

                <div className='pure-u-20-24 pure-u-xl-21-24  content-column'>
                    <ContentBlock>
                        { this.props.children }
                    </ContentBlock>
                </div>

            </div>
        );
    }
}

export default MenuLayout;

