import React, { useState } from 'react';
import { Container } from './styles';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../SideBar';
import { IoMdLogOut } from 'react-icons/io';
import SidebarItem from '../SidebarItem';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const navigate = useNavigate();

  const showSidebar = (): void => setSidebar(!sidebar);

  const handleLogout = (): void => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Container>
      <FaBars onClick={showSidebar} />
      {sidebar && <Sidebar />}
      <div onClick={handleLogout} style={{ marginLeft: 'auto', marginRight: 25 }}>
        <SidebarItem Icon={IoMdLogOut} Text="Sair" />
      </div>
    </Container>
  );
};

export default Header;
