import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
function SidebarItem({title, icon, routeFunc, route}) {
    console.log(route)
    return (
        // <a href={route} className={`mb-2 flex items-center font-semibold rounded-md p-2 ${routeFunc(routeFunc().current()) == route ? "text-slate-50 bg-violet-600": "text-slate-500"} text-sm`}><FontAwesomeIcon className='mr-2' icon={icon} /> {title}</a>
        <Link href={route} className={`mb-2 flex items-center font-semibold rounded-md p-2 ${routeFunc(routeFunc().current()) === route ? "text-slate-50 bg-violet-600": "text-slate-500"} text-sm`}><FontAwesomeIcon className='mr-2' icon={icon} /> {title}</Link>
    )
}

export default SidebarItem;