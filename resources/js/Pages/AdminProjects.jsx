import Authenticated from "@/Layouts/AuthenticatedLayout";
import SidebarPage from "@/Components/SidbarPage";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import {Table, Button, ButtonToolbar, Modal} from "rsuite";
import { useForm } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";


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

    //////////////////////////////
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);


    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
      })

      function submit(e) {
        e.preventDefault();
        post(route("project.add"));
      }


    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title="My Projects">
                <ButtonToolbar className="pb-8">
                    <Button color="violet" appearance="primary" onClick={handleOpenModal}>Add Project</Button>
                </ButtonToolbar>
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


            <Modal open={openModal} onClose={handleCloseModal}>
            <Modal.Body>
                <form onSubmit={submit}>
                    <InputLabel forInput="name" value="name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={(e) => setData("name", e.target.value)}
                        required={true}
                    />
                    <InputError message={errors.name} className="mt-2" />

                    <InputLabel forInput="description" value="description" />
                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={(e) => setData("description", e.target.value)}
                        required={true}
                    />
                    <InputError message={errors.description} className="mt-2" />

                    <div className="flex items-center justify-start mt-4">
                        <PrimaryButton onClick={handleCloseModal} processing={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal.Body>
            </Modal>
            </SidebarPage>
        </Authenticated>
    )
}

export default AdminProjects;