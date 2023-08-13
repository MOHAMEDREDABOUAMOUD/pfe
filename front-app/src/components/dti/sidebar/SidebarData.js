import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Gestion Expression des besoins',
    path: '',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'create EB',
        path: '/createEBDti',
        icon: <AiIcons.AiFillHome />
      },
      {
        title: 'list expression des besoins',
        path: '/listEBDti',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
      }
    ]
  },
  {
    title: 'Dashboard',
    path: '/dashboardEBDti',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'settings',
    path: '/settingsEBDti',
    icon: <IoIcons.IoMdPeople />
  }
];