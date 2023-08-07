import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import "./style.css";

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
  background: #15171c;
  width: 250px;
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
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                        <div className="sidebar_profile flex">
                            <span className="nav_image">
                                <img src={require('../../images/logo-omrane.png')} alt="logo_img" />
                            </span>
                            <div className="data_text">
                                <span className="name">Mohamed-Reda</span><br />
                                <span className="email">reda@gmail.com</span>
                            </div>
                            <AiIcons.AiOutlineLogout/>
                        </div>
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;