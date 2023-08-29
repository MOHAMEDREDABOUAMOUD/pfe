import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import "./style.css";
import logo from './logo-omrane.png'

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
`;

const SidebarNav = styled.nav`
background: #3a3c3f;
  width: 260px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  height:100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='openMenu'>
                    <Nav>
                        <NavIcon className="open" to='#'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavIcon>
                    </Nav>
                </div>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon className="close" to='#'>
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        <center><img src={logo} className='espace'></img></center>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                        
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;