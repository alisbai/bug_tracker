import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import SidebarPage from "@/Components/SidbarPage";
import { Link } from "@inertiajs/inertia-react";
import { router } from '@inertiajs/react'
import { useEffect, useState } from "react";
import { Button, Drawer, Table } from "rsuite";
import 'rsuite/styles/index.less'
import TextFieldInput from "@/Components/TextFieldInput";
import PrimaryButton from "@/Components/PrimaryButton";

function AdminProjects(props) {
    console.log(props.errors);
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
    
      function handleSubmit(e) {
          e.preventDefault();
          router.patch(route("project.update"), projectData);
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
                            <Link className="text-xs">View Tickets</Link>
                        </div>
                    )}</Cell>
                </Column>
                </Table>


            <Drawer
            open={open}
            onClose= {handleClose}
            >
                <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>
                    <Drawer.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Drawer.Actions>
                </Drawer.Header>
                
                <Drawer.Body>


                    <div onSubmit={handleSubmit}>
                        
                        <InputLabel forInput="name" value="Project Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={projectData.name}
                            className="mt-1 block w-full mb-2"
                            isFocused={true}
                            handleChange={handleChange}
                        />
                        <InputError message={props.errors.name} className="mb-5" />

                        <InputLabel forInput="description" value="Project Description" />
                        <TextFieldInput
                            id="description"
                            name="description"
                            className="mt-1 block w-full mb-2"
                            rows={6}
                            handleChange={handleChange}
                            value={projectData.description}
                        />
                        <InputError message={props.errors.description} className="mb-5" />

                        <Link 
                        className="bg-violet-700 text-slate-50 p-4 rounded py-2" 
                        data={projectData} method="patch" 
                        href={route("project.update")} 
                        type="button"
                        >Save</Link>
                    </div>
                </Drawer.Body>
            </Drawer>
            </SidebarPage>
        </Authenticated>
    )
}

export default AdminProjects;