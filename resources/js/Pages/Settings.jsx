import Modal from "@/Components/Modal";
import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Link } from "@inertiajs/inertia-react";
import { Table, Cell, HeaderCell, Column } from "rsuite-table";
import 'rsuite-table/dist/css/rsuite-table.css';
function Settings() {
    const myData = [
        {
            firstName: "Ali",
            lastName: "Sbai",
            email: "ali.sbai.96@gmail.com",
            roles: ["Admin"]
        },
        {
            firstName: "Zakaria",
            lastName: "Sbai",
            email: "zackaria.sbai.93@gmail.com",
            roles: ["Submitter", "Developer"]
        }
    ]

    return (
        <Authenticated>
            <SidebarPage title="Settings">
            {/* <Table height={400} data={myData}>
                <Column width={150} sortable>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>
                <Column width={150} sortable>
                    <HeaderCell>Last Name</HeaderCell>
                    <Cell dataKey="lastName" />
                </Column>
                <Column width={300} sortable>
                    <HeaderCell >Email Address</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={150} sortable>
                    <HeaderCell>Roles</HeaderCell>
                    <Cell dataKey="roles" />
                </Column>
                <Column >
                    <HeaderCell>Actions</HeaderCell>
                    <Cell >
                        <Link className="text-sm text-violet-600">Edit</Link>
                    </Cell>
                </Column>
            </Table> */}
            </SidebarPage>
        </Authenticated>
    )
}

export default Settings;