import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import "./style.css";
import {AiOutlineDashboard,AiOutlineProfile,AiOutlineFileDone,AiOutlineUser,AiOutlineSetting} from 'react-icons/ai';
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
                
                <div className='main222' onMouseEnter={showSidebar}>
                <div className='openMenu'>
                    <Nav>
                        <NavIcon className="open" to='#'>
                            <img src={logo} className='tswiraa' onClick={showSidebar} />
                        </NavIcon>
                    </Nav>
                </div>
                            <div className='ooo'>
                            <center>
                            <div className='hadii'>
                                <AiOutlineDashboard className='hadokk' />
                            </div>
                            </center>
                            <center>
                            <div className='hadii'>
                                <AiOutlineUser className='hadokk' />
                            </div>
                            </center>
                            
                            <center>
                            <div className='hadiss'>
                                <AiOutlineSetting className='hadokk' />
                            </div>
                            </center>
                            </div>
                            </div>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap onMouseLeave={showSidebar}>
                        <NavIcon className="close" to='#'>
                        <img src={logo} className='tswiraa' onClick={showSidebar} />
                            
                        </NavIcon>
                        
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