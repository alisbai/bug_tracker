import Authenticated from "@/Layouts/AuthenticatedLayout";
import SidebarPage from "@/Components/SidbarPage";
import { Button, ButtonToolbar, Modal, Table } from "rsuite";
import { Link } from "@inertiajs/inertia-react";
import 'rsuite/styles/index.less';
import { useEffect, useState } from "react";

function ProjectStaff(props) {
    
    const { Column, HeaderCell, Cell } = Table;

    // project managers and the other staff that can be added to the project
    const projectManagers = props.project.users.filter(user => {
        return user.roles.some(role => role.title === "Project Manager");
    })
    const otherStaff = props.project.users.filter(user => {
        return user.roles.every(role => role.title !== "Project Manager");
    })
    
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalUsers, setModalUsers] = useState([]);
    const handleClose = () => setOpen(false);

    function handleOpenForProjectManagers() {
        setOpen(true);
        setModalTitle("Add Project Managers");
        setModalUsers(props.projectManagersToAddToProject);
    }
    
    function handleOpenForRegularStaff() {
        setOpen(true);
        setModalTitle("Add Regular Staff");
        setModalUsers(props.regularStaffToAddToProject);
    }

    useEffect(() => {
        setModalUsers(props.projectManagersToAddToProject);
    }, [props.projectManagersToAddToProject.length])

    useEffect(() => {
        setModalUsers(props.regularStaffToAddToProject);
    }, [props.regularStaffToAddToProject.length])

    /////////////////////////////////////
    
    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title={"Manage Staff For: " + props.project.name}>
                <div className="flex justify-between xs">
                    <h4 className="mb-4">Project Managers</h4>
                    <ButtonToolbar>
                        <Button color="violet" appearance="primary" onClick={handleOpenForProjectManagers}>Add Project Managers</Button>
                    </ButtonToolbar>
                </div>
                <Table 
                height={200}
                data={projectManagers}
                >
                <Column width={250}>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="first_name"/>
                </Column>
                <Column width={250}>
                    <HeaderCell>Last Name</HeaderCell>
                    <Cell dataKey="last_name"/>
                </Column>
                <Column width={300}>
                    <HeaderCell>Email Address</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={200}>
                    <HeaderCell >Action</HeaderCell>
                    <Cell>{rowData =>(
                        <Link 
                        data={{projectId: props.project.id, userId: rowData.id}} 
                        href={route("project.remove.user")} 
                        method="post"
                        >Remove From Project</Link>
                    )}</Cell>
                </Column>
                </Table>
                <div className="flex justify-between mt-4">
                    <h4 className="mb-4">The Rest Of The Staff</h4>
                    <ButtonToolbar>
                        <Button color="violet" appearance="primary" onClick={handleOpenForRegularStaff}>Add Project Managers</Button>
                    </ButtonToolbar>
                </div>
                <Table 
                height={200}
                data={otherStaff}
                >
                <Column width={250}>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="first_name"/>
                </Column>
                <Column width={250}>
                    <HeaderCell>Last Name</HeaderCell>
                    <Cell dataKey="last_name"/>
                </Column>
                <Column width={300}>
                    <HeaderCell>Email Address</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={200}>
                    <HeaderCell >Action</HeaderCell>
                    <Cell>{rowData =>(
                        <Link 
                        data={{projectId: props.project.id, userId: rowData.id}} 
                        href={route("project.remove.user")} 
                        method="post"
                        >Remove From Project</Link>
                    )}</Cell>
                </Column>
                </Table>
                <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table
                        data={modalUsers}
                        >
                        <Column width={150}>
                            <HeaderCell>First Name</HeaderCell>
                            <Cell dataKey="first_name"/>
                        </Column>
                        <Column width={150}>
                            <HeaderCell>Last Name</HeaderCell>
                            <Cell dataKey="last_name" />
                        </Column>
                        <Column width={200}>
                            <HeaderCell>Email</HeaderCell>
                            <Cell dataKey="email"/>
                        </Column>
                        <Column width={50}>
                            <HeaderCell>Action</HeaderCell>
                            <Cell>
                                {rowData => <Link 
                                method="post" 
                                data={{userId: rowData.id, projectId: props.project.id}} 
                                href={route("project.add.user")} 
                                >Add</Link>}
                            </Cell>
                        </Column>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </SidebarPage>
        </Authenticated>
    )
}

export default ProjectStaff;