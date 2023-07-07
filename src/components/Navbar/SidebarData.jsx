import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as TbIcons from 'react-icons/tb';

export const SidebarData = [
  {
    title: 'Início',
    path: '/home',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Informações',
    path: '/bi',
    icon: <AiIcons.AiFillPieChart />
  },
  {
    title: 'Pedidos',
    path: '/pedidos',
    icon: <BiIcons.BiPurchaseTag />
  },
];