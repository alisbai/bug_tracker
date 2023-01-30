import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import { faGauge, faGears, faIdBadge, faProjectDiagram, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import SidebarItem from '../Components/SidebarItem';

import imageSrc from "../../images/bug_tracker_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Authenticated({ auth, children }) {
    const roles = auth.user.roles.map(role => role.title);
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
                            {roles.includes("Admin") && <li><SidebarItem title="Manage Role Assignment" icon={faIdBadge} routeFunc={route} route={route("roles.get")} /></li>}
                            {(roles.includes("Admin") || roles.includes("Project Manager"))&& <li><SidebarItem title="Manage Projects Staff" icon={faUsers} routeFunc={route} route={route("origin")}/></li>}
                            {(roles.includes("Admin") || roles.includes("Project Manager")) &&<li><SidebarItem title="My Projects" icon={faProjectDiagram} routeFunc={route}  route={route("origin")}/></li>}
                            <li><SidebarItem title="My Tickets" icon={faTicket} routeFunc={route}  route={route("origin")}/></li>
                            <div className='mt-6 mb-6 m-auto w-3/4 border border-solid border-slate-800 '></div>
                            <li><SidebarItem title="Settings" icon={faGears}  routeFunc={route} route={route("settings")}/></li>
                        </ul>
                    </nav>
                </div>
                <div className='p-6 flex justify-between items-center mt-auto h-20 bg-sidebar-opaque-white'>
                    <div className='flex flex-col'>
                        <span className='text-slate-50 text-sm user-name'>{`${auth.user.first_name} ${auth.user.last_name}`}</span>
                        <span className="email text-slate-500 text-sm">{`${auth.user.email}`}</span>
                    </div>
                    <Link method='post' href={route("logout")}><FontAwesomeIcon className='text-slate-500 cursor-pointer hover:text-slate-50' icon={faRightFromBracket}/></Link>
                </div>
            </div>
            <main className='flex bg-slate-200 w-full p-3'>{children}</main>
        </div>
    );
}
