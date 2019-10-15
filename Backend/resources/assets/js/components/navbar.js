import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import 'less/components/navbar';

const { Header } = Layout;

const Navbar = ({ currentUser, onLogoutClick }) => (
  <Header className='navbar'>
    <div/>

    { currentUser &&
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <a onClick={onLogoutClick}>Log out</a>
          </Menu.Item>
        </Menu>
      }
    >
      <a className='dropdown-link'>{currentUser.first_name}</a>
    </Dropdown>
    }
  </Header>
);

export default Navbar;

