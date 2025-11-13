import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Header } from './Header';

const { Content } = AntLayout;

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <AntLayout className="min-h-screen">
    <Header />
    <Content className="p-4 bg-gray-100">{children}</Content>
  </AntLayout>
);

export default Layout;