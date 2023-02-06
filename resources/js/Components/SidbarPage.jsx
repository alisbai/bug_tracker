import { Head } from "@inertiajs/inertia-react";


function SidebarPage({children, title}) {

    return (
    <>
        <Head title={title} />
        <div className="bg-slate-100 shadow-xl rounded pt-3 pb-3 pr-6 pl-6 w-full overflow-auto">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {children}
        </div>
    </>
    )
}

export default SidebarPage;