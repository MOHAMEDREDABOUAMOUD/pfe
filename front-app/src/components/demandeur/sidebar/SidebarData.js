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
        path: '/createEB',
        icon: <AiIcons.AiFillHome />
          },
          {
            title: 'list expression des besoins',
        path: '/listEB',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
          }
        ]
    },
    // {
    //     title: 'create user',
    //     path: '/createUser',
    //     icon: <AiIcons.AiFillHome />,
    //     iconClosed: <RiIcons.RiArrowDownSFill />,
    //     iconOpened: <RiIcons.RiArrowUpSFill />,

    //     // subNav: [
    //     //   {
    //     //     title: 'Users',
    //     //     path: '/overview/users',
    //     //     icon: <IoIcons.IoIosPaper />
    //     //   },
    //     //   {
    //     //     title: 'Revenue',
    //     //     path: '/overview/revenue',
    //     //     icon: <IoIcons.IoIosPaper />
    //     //   }
    //     // ]
    // },
    // {
    //     title: 'list users',
    //     path: '/listUsers',
    //     icon: <IoIcons.IoIosPaper />,
    //     iconClosed: <RiIcons.RiArrowDownSFill />,
    //     iconOpened: <RiIcons.RiArrowUpSFill />,

    //     // subNav: [
    //     //   {
    //     //     title: 'Reports',
    //     //     path: '/reports/reports1',
    //     //     icon: <IoIcons.IoIosPaper />,
    //     //     cName: 'sub-nav'
    //     //   },
    //     //   {
    //     //     title: 'Reports 2',
    //     //     path: '/reports/reports2',
    //     //     icon: <IoIcons.IoIosPaper />,
    //     //     cName: 'sub-nav'
    //     //   },
    //     //   {
    //     //     title: 'Reports 3',
    //     //     path: '/reports/reports3',
    //     //     icon: <IoIcons.IoIosPaper />
    //     //   }
    //     // ]
    // },
    {
        title: 'Dashboard',
        path: '/dashboardEB',
        icon: <FaIcons.FaCartPlus />
    },
    {
        title: 'settings',
        path: '/settingsEB',
        icon: <IoIcons.IoMdPeople />
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