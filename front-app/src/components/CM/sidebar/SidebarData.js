import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {AiOutlineDashboard,AiOutlineProfile,AiOutlineFileDone,AiOutlineSetting,AiOutlinePlusCircle} from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboardEBCM',
    icon: <AiOutlineDashboard />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'lister EB',
    path: '/listEBCM',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'lister AO',
    path: '/listAOCM',
    icon: <AiOutlineFileDone />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'paramètre',
    path: '/settingsEBCM',
    icon: <AiOutlineSetting />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  }
  //   ,{
  //     title: 'Messages',
  //     path: '/messages',
  //     icon: <FaIcons.FaEnvelopeOpenText />,

  //     iconClosed: <RiIcons.RiArrowDownSFill />,
  //     iconOpened: <RiIcons.RiArrowUpSFill />,

  //     subNav: [
  //       {
  //         title: 'Message 1',
  //         path: '/messages/message1',
  //         icon: <IoIcons.IoIosPaper />
  //       },
  //       {
  //         title: 'Message 2',
  //         path: '/messages/message2',
  //         icon: <IoIcons.IoIosPaper />
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Support',
  //     path: '/support',
  //     icon: <IoIcons.IoMdHelpCircle />
  //   }
];