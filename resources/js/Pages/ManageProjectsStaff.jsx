import Authenticated from "@/Layouts/AuthenticatedLayout";
import SidebarPage from "@/Components/SidbarPage";
import { Table } from "rsuite";
import 'rsuite/styles/index.less';
import { Link } from "@inertiajs/inertia-react";

function ManageProjectsStaff(props) {
    const { Column, HeaderCell, Cell } = Table;
    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title="Manage Project Staff">
                <Table
                height={400}
                data={props.allProjects}
                >
                    <Column width={200} align="center" fixed>
                        <HeaderCell>Project Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={400} align="center" fixed>
                        <HeaderCell>Project Description</HeaderCell>
                        <Cell dataKey="description" />
                    </Column>
                    <Column width={400} align="center" fixed>
                        <HeaderCell>Action</HeaderCell>
                        <Cell>{rowData =>(
                            <Link method="get" href={route("project.users")} data={{projectId: rowData.id}} >View Staff</Link>
                        )}</Cell>
                    </Column>
                </Table>
            </SidebarPage>
        </Authenticated>
    )
}

export default ManageProjectsStaff;