import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Gestion Expression Besoin',
    path: '',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'create EB',
        path: '/createEB',
        icon: <AiIcons.AiFillHome />
      },
      {
        title: 'list EB',
        path: '/listEB',
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Dashboard',
    path: '/dashboardEB',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Settings',
    path: '/settingsEB',
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