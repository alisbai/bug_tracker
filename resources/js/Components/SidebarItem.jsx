import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
function SidebarItem({title, icon, routeFunc, route, data= {}, method = "get"}) {
    return (
        <Link 
        method={method}
        data={data}
        href={route} 
        className={`mb-2 hover:bg-violet-600 hover:text-slate-50 flex items-center font-semibold rounded-md p-2 ${routeFunc(routeFunc().current()) === route ? "text-slate-50 bg-violet-600": "text-slate-500"} text-sm`}
        >
            <FontAwesomeIcon className='mr-2' icon={icon} /> {title}
        </Link>
    )
}

export default SidebarItem;