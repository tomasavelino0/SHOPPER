import React from 'react'
import { Container, Content } from './styles'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaRegFileAlt,
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'
import logoIcon from '../../assets/images/carrinhoLogo.png'
import { getUser } from '../../utils/token'


const Sidebar = ({ active }) => {

  const user = getUser();
  const permissao = user.permissao;
  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <div className='divLogo' style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/dashboard" >
          <img style={{ width: '220px', height: '100px' }} src={logoIcon} alt="" />
        </Link>
      </div>
      <Content>
        <Link to="/dashboard">
          <SidebarItem Icon={FaHome} Text="Corridas" />
        </Link>
        <Link to="/dashboard">
          <SidebarItem Icon={FaRegFileAlt} Text="Historico" />
        </Link>
      </Content>
    </Container>
  )
}

export default Sidebar