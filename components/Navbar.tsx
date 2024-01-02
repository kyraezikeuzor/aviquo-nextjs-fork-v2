'use client'

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';

import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaDoorOpen,
  FaDoorClosed,
  FaCog
} from 'react-icons/fa';

import { HiOutlineCog, HiOutlineUser } from "react-icons/hi";

import React, { useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

// import './NavbarStyles.scss';

interface SidebarProps {
  collapsed: boolean;
  toggled: boolean;
  handleToggleSidebar: () => void;
  handleCollapsedChange: () => void;
};


const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  const router = useRouter();

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: '9px',
                  // textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
                Aviquo
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaGem />}>
            Discover <Link href="/discover" />
          </MenuItem>
          <MenuItem icon={<FaTachometerAlt/>}>
            Forums <Link href="/forum" />
          </MenuItem>
          <MenuItem icon={<HiOutlineUser />}>
            Profile <Link href="/profile" />
          </MenuItem>
          <MenuItem icon={<HiOutlineCog />} className='w-full'>
            Settings <Link href="/settings" />
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <button
            className="sidebar-btn"
            style={{ cursor: 'pointer' }}
            onClick={async () => {
              const response = await fetch("/api/logout", {
                method: "POST",
                body: null,
                redirect: "manual",
              });
              router.refresh();
            }}
          >
            <FaDoorOpen />
            <span>Log Out</span>
          </button>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };

  return(
    <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
    />
  )
}

export default Navbar;
