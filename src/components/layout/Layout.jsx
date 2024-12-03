import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9; 
`;

const Content = styled.main`
  flex: 1; 
  padding: 20px;
`;