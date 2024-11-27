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
      </div>
      <Content>
        <Link to="/corrida">
          <SidebarItem Icon={FaHome} Text="Corridas" />
        </Link>
        <Link to="/historico">
          <SidebarItem Icon={FaRegFileAlt} Text="Histórico" />
        </Link>
      </Content>
    </Container>
  );
};

export default Sidebar;
