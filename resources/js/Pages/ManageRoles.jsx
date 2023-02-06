import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Table, Button, Drawer, Tag } from "rsuite";
import 'rsuite/styles/index.less'
import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";



function ManageRoles(props){
    const [open, setOpen] = useState(false);
    const [drawerUser, setDrawerUser] = useState({});
    const [userRolesToSubmit, setUserRolesToSubmit] = useState({userId: null, rolesId:[]});

    const {Column, Cell, HeaderCell} = Table;

    const handleDrawerOpening = (rowdata) => {
        setOpen(true);
        setDrawerUser(rowdata);
        setUserRolesToSubmit({userId: rowdata.id, rolesId: rowdata.roles.map(role => role.id)});
    }

    const addRoleIdToRolesToBeSubmitted = (id) => {
        const roles = [...userRolesToSubmit.rolesId];
        roles.push(id);
        setUserRolesToSubmit({...userRolesToSubmit, rolesId: roles});
    }

    const removeRoleIdFromRolesToBeSubmitted = (id) => {
        let newRoles = [...userRolesToSubmit.rolesId];
        newRoles = newRoles.filter(roleId => roleId !== id);
        setUserRolesToSubmit({...userRolesToSubmit, rolesId: newRoles});
    }


    return <Authenticated auth={props.auth}>
                <SidebarPage title="Manage Role Assignment">



                    <Table
                    height={400}
                    data={props.users}
                    >
                        <Column width={160} align="center" flexGrow={2}>
                            <HeaderCell>First Name</HeaderCell>
                            <Cell dataKey="first_name" />
                        </Column>
                        <Column width={160} align="center" flexGrow={2}>
                            <HeaderCell>Last Name</HeaderCell>
                            <Cell dataKey="last_name" />
                        </Column>
                        <Column width={160} align="center" flexGrow={3}>
                            <HeaderCell>Email Address</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>
                        <Column width={160} align="center" flexGrow={5}>
                            <HeaderCell>Roles</HeaderCell>
                            <Cell>{rowData => (rowData.roles.length ? rowData.roles.map(role => role.title).join(', ') : "-")}</Cell>
                        </Column>
                        <Column width={160} align="center" flexGrow={2}>
                            <HeaderCell>Action</HeaderCell>
                            <Cell>
                                {rowData=> (<Button appearance="link" size="xs" onClick={() => handleDrawerOpening(rowData)}>Manage Roles</Button>)}
                            </Cell>
                        </Column>
                    </Table>




                    <Drawer backdrop={"true"} open={open} onClose={() => setOpen(false)}>
                        <Drawer.Header>
                        <Drawer.Title>Manage roles for {drawerUser.first_name}</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <div className="mb-4">
                                Full Name: {drawerUser.first_name + " " + drawerUser.last_name}
                            </div>
                            <div className="mb-4">
                                Email Address: {drawerUser.email}
                            </div>
                            <div className="mb-8">
                                Roles: {
                                    userRolesToSubmit.rolesId.map(id => {
                                        return <Tag 
                                        closable ={true} 
                                        color="violet" 
                                        children ={props.all_roles.find(role => role.id === id).title} 
                                        onClose={() => removeRoleIdFromRolesToBeSubmitted(id)}
                                        />
                                    })
                                }
                            </div>
                            <div className="mb-8">
                                Add Roles: {
                                    props.all_roles.filter(role => {
                                        return !userRolesToSubmit.rolesId.includes(role.id)
                                    }).map(role => <Tag 
                                    className="cursor-pointer" 
                                    children={role.title}
                                    onClick={() => addRoleIdToRolesToBeSubmitted(role.id)}
                                    />)
                                }
                            </div>
                            <div>
                                <Link 
                                className="bg-violet-700 text-slate-50 p-4 rounded py-2" 
                                as="button" method="post" 
                                href={route("roles.update")} 
                                data={{userRoles: userRolesToSubmit}} 
                                onClick={() => setOpen(false)}
                                >Save</Link>
                            </div>
                        </Drawer.Body>
                    </Drawer>
                </SidebarPage>
           </Authenticated>
}


export default ManageRoles;