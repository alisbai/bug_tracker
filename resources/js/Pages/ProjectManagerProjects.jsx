import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { Table } from "rsuite";
import 'rsuite/styles/index.less'

import EditProjectInfoDrawer from "@/Components/EditProjectInfoDrawer";

function ProjectManagerProjects(props) {
    const {Cell, Column, HeaderCell} = Table;

    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title="My Projects">

                <Table 
                data={props.projects}
                height={400}
                wordWrap="break-word"
                rowHeight={75}
                >
                <Column width={200} 
                align="center"
                >
                    <HeaderCell>Project Name</HeaderCell>
                    <Cell  dataKey="name"/>
                </Column>

                <Column width={550} 
                align="center"
                >
                    <HeaderCell>Project Description</HeaderCell>
                    <Cell align="left"  dataKey="description"/>
                </Column>

                <Column width={200} 
                align="center"
                >
                    <HeaderCell>Actions</HeaderCell>
                    <Cell>{ rowData =>(
                        <div className="flex flex-col justify-center">
                            <Link className="text-xs">View Tickets</Link>
                        </div>
                    )}</Cell>
                </Column>
                </Table>

            </SidebarPage>
    </Authenticated>
    )
}

export default ProjectManagerProjects;