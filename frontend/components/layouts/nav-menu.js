/**************************************************************************************************
NAV MENU
**************************************************************************************************/
import React from 'react';
import { NavLink } from 'react-router-dom'
import { RoutesConfig } from '../app-main/routes'
import './styles.scss'

class NavMenu extends React.Component {

    render() {

        let menuRoutes = RoutesConfig.filter( cfg => cfg.order > 0 );

        return (
            <div className='navigation-wrapper'>
                <div className='nav-panel'>
                    <div className='link-panel'>
                        {
                            menuRoutes.map( (menu, idx) => 
                                <div className='link-container' key={ menu.order }>
                                    <NavLink exact to={ menu.path }>{ menu.title }</NavLink>
                                </div> )
                        }
                    </div>
                    <div className='logo-container link-panel'>
                        <div className='link-container' style={{ 'display': 'none' }}>
                            <NavLink exact to={ '/base-page' }>Template</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavMenu;
