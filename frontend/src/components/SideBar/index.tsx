import React from 'react';
import { Container, Content } from './styles';
import { Link } from 'react-router-dom';
import { FaHome, FaRegFileAlt } from 'react-icons/fa';

import SidebarItem from '../SidebarItem';
import logoIcon from '../../assets/images/carrinhoLogo.png';
import { getUser } from '../../utils/token';


const Sidebar = () => {
  const user: { id: number; name: string } | null = getUser();

  return (
    <Container>
      <div className="divLogo" style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/dashboard">
          <img style={{ width: '220px', height: '100px' }} src={logoIcon} alt="Logo" />
        </Link>
      </div>
      <Content>
        <Link to="/dashboard">
          <SidebarItem Icon={FaHome} Text="Corridas" />
        </Link>
        <Link to="/dashboard">
          <SidebarItem Icon={FaRegFileAlt} Text="Histórico" />
        </Link>
      </Content>
    </Container>
  );
};

export default Sidebar;
