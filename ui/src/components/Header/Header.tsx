import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from '../Button/Button';
import './Header.css';
import { Paths } from '../../paths';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/authorize');
  }

  return (
    <Layout.Header className="header">
       <Space>
        <TeamOutlined className="team-icon" />
        <Link to={ Paths.home }>
          <Button type="link">
            <Typography.Title level={ 1 }>
              Социальная сеть
            </Typography.Title>
          </Button>
        </Link>
       </Space>
       {
        user ? (
          <Button
            type="link"
            icon={ <LogoutOutlined /> }
            onClick={ onLogoutClick }
          >
            Выйти
          </Button>
        ) : (
          <Space>
            <Link to={ Paths.register }>
              <Button type="link" icon={ <UserOutlined /> }>Зарегистрироваться</Button>
            </Link>
            <Link to={ Paths.authorize }>
            <Button type="link" icon={ <LoginOutlined /> }>Войти</Button>
            </Link>
          </Space>
        )
       }
    </Layout.Header>
  )
}
