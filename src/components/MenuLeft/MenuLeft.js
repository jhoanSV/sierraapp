import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'

import './MenuLeft.scss';

export default function MenuLeft(props) {
    const { user } = props;

    return (
     <Menu className='menu-left' vertical>
        <div className='top'>
            <Menu.Item name='home'>
                <Icon name='home' /> Inicio
            </Menu.Item>
            <Menu.Item name=''>
                <Icon name='music' /> Inicio
            </Menu.Item>
        </div>
        <div className='footer'>
            <Menu.Item>
                <Icon name='plus square outline' /> Nuevo
            </Menu.Item>
            <Menu.Item>
                <Icon name='plus square outline' /> Nuevo2
            </Menu.Item>
        </div>
     </Menu>
  )
}


