import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboardEBDM',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'lister EB',
    path: '/listEBDM',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'lister AO',
    path: '/listAODM',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'paramètre',
    path: '/settingsEBDM',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
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