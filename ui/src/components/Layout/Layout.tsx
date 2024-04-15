import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Header } from '../Header/Header';
import './Layout.css';

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="container">
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>
        { children }
      </AntLayout.Content>
    </div>
  )
}
