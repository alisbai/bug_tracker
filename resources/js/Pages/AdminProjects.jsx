import Authenticated from "@/Layouts/AuthenticatedLayout";
import SidebarPage from "@/Components/SidbarPage";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { Table } from "rsuite";
import 'rsuite/styles/index.less'

import EditProjectInfoDrawer from "@/Components/EditProjectInfoDrawer";

function AdminProjects(props) {

    const {Cell, Column, HeaderCell} = Table;

    const [open, setOpen] = useState(false);

    const [drawerData, setDrawerData] = useState({});

    const [projectData, setProjectData] = useState({
        id: drawerData.id,
        name: drawerData.name,
        description: drawerData.description,
      });

    useEffect(() =>{
        setProjectData({id: drawerData.id, 
                   name: drawerData.name, 
                   description: drawerData.description
                });
    },[drawerData])
    
      function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setProjectData(values => ({
            ...values,
            [key]: value,
        }))
      }

    const handleOpen = (rowData) => {
        setDrawerData(rowData);
        setOpen(true);
    }

    const handleClose = () => {
        setDrawerData({});
        setOpen(false);
    }
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
                            <a 
                            className="mb-2 text-xs" 
                            href="#" 
                            onClick={() => handleOpen(rowData)}
                            >Edit Project Info</a>
                            <Link href={route("project.tickets")} data={{projectId: rowData.id}} className="text-xs">View Tickets</Link>
                        </div>
                    )}</Cell>
                </Column>
                </Table>

            <EditProjectInfoDrawer 
            open={open} 
            handleClose={handleClose}
            handleChange={handleChange}
            projectData={projectData}
            errors={props.errors}
            />
            </SidebarPage>
        </Authenticated>
    )
}

export default AdminProjects;