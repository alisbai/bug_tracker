import Modal from "@/Components/Modal";
import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout"
function Settings() {
    return (
        <Authenticated>
            <SidebarPage title="Settings">
            </SidebarPage>
        </Authenticated>
    )
}

export default Settings;