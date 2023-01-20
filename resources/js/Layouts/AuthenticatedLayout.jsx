import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import { faGauge, faGears, faIdBadge, faProjectDiagram, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import SidebarItem from '../Components/SidebarItem';

import imageSrc from "../../images/bug_tracker_logo.png";


export default function Authenticated({ auth, children }) {
    return (
        <div className="flex h-screen min-h-screen bg-gray-100">
            <div className='flex flex-col side-bar w-80 bg-sidebar-navy pt-9'>
                <div className='pr-4 pl-4'>
                    <div className='logo-container flex items-center pb-9'>
                        <img className='mr-2 w-10' src={imageSrc} alt='bug tracker logo' />
                        <h2 className='text-xl font-bold text-slate-50'>Bug Tracker</h2>
                    </div>
                    <nav>
                        <ul>
                            
                            <li><SidebarItem title="Dashboard" icon={faGauge} routeFunc={route} route={route("dashboard")} /></li>
                            <li><SidebarItem title="Manage Role Assignment" icon={faIdBadge} routeFunc={route} route={route("dashboard")}/></li>
                            <li><SidebarItem title="Manage Projects Users" icon={faUsers} routeFunc={route} route={route("origin")}/></li>
                            <li><SidebarItem title="My Projects" icon={faProjectDiagram} routeFunc={route}  route={route("origin")}/></li>
                            <li><SidebarItem title="My Tickets" icon={faTicket} routeFunc={route}  route={route("origin")}/></li>
                            <div className='mt-6 mb-6 m-auto w-3/4 border border-solid border-slate-800 '></div>
                            <li><SidebarItem title="Settings" icon={faGears}  routeFunc={route} route={route("settings")}/></li>
                        </ul>
                    </nav>
                </div>
                <div className='p-2 flex justify-between items-center mt-auto h-20 bg-sidebar-opaque-white'>
                    <div className='flex flex-col'>
                        <span className='text-slate-50 text-sm user-name'>Ali Sbai</span>
                        <span className="email text-slate-500 text-sm">ali.sbai.96@gmail.com</span>
                    </div>
                </div>
            </div>
            <main className='flex bg-slate-200 w-full p-3'>{children}</main>
        </div>
    );
}
