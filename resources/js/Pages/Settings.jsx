import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Drawer, Table, Button } from "rsuite";
import { useForm } from "@inertiajs/inertia-react";
import 'rsuite/styles/index.less'
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";


function Settings(props) {
    const userData = {};
    userData.firstName = props.auth.user.first_name;
    userData.lastName = props.auth.user.last_name;
    userData.email = props.auth.user.email;

    userData.roles = props.auth.roles.map(role => role.title).join(", ");
    
    const {Column, Cell, HeaderCell} = Table;

    const [open, setOpen] = useState(false);


    const { data, setData, patch, processing, errors } = useForm({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
      })

      function submit(e) {
        e.preventDefault();
        patch(route("profile.update"));
      }

    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title="Settings">
                <Table 
                height={400}
                data={[userData]}
                >
                    <Column width={160} align="center" flexGrow={2}>
                        <HeaderCell>First Name</HeaderCell>
                        <Cell dataKey="firstName" />
                    </Column>
                    <Column width={160} align="center" flexGrow={2}>
                        <HeaderCell>Last Name</HeaderCell>
                        <Cell dataKey="lastName" />
                    </Column>
                    <Column width={160} align="center" flexGrow={4}>
                        <HeaderCell>Email Address</HeaderCell>
                        <Cell dataKey="email" />
                    </Column>
                    <Column width={160} align="center" flexGrow={3}>
                        <HeaderCell>Roles</HeaderCell>
                        <Cell dataKey="roles" />
                    </Column>
                    <Column width={160} align="center" flexGrow={1}>
                        <HeaderCell>Action</HeaderCell>
                        <Cell>
                            <Button appearance="link" size="xs" onClick={() => setOpen(true)}>Edit</Button>
                        </Cell>
                    </Column>
                </Table>
                <Drawer backdrop={"true"} open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header>
                    <Drawer.Title>Edit My Info</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel forInput="first-name" value="First Name" />

                            <TextInput
                                id="first-name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={(e) => setData("first_name", e.target.value)}
                                required={true}
                            />

                            <InputError message={errors.first_name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="last-name" value="Last Name" />

                            <TextInput
                                id="last-name"
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                handleChange={(e) => setData("last_name", e.target.value)}
                                required={true}
                            />

                            <InputError message={errors.last_name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="email" value="Email Address" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                handleChange={(e) => setData("email", e.target.value)}
                                required={true}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-start mt-4">
                            <PrimaryButton processing={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                    </Drawer.Body>
                </Drawer>
            </SidebarPage>
        </Authenticated>
    )
}

export default Settings;