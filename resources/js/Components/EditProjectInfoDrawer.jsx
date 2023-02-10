
import { Drawer, Button } from 'rsuite';
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import TextFieldInput from './TextFieldInput';
import { Link } from '@inertiajs/inertia-react';

function EditProjectInfoDrawer(props) {

    return (
        <Drawer
        open={props.open}
        onClose= {props.handleClose}
        >
            <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                </Drawer.Actions>
            </Drawer.Header>
            
            <Drawer.Body>


                <div>
                    
                    <InputLabel forInput="name" value="Project Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={props.projectData.name}
                        className="mt-1 block w-full mb-2"
                        isFocused={true}
                        handleChange={props.handleChange}
                    />
                    <InputError message={props.errors.name} className="mb-5" />

                    <InputLabel forInput="description" value="Project Description" />
                    <TextFieldInput
                        id="description"
                        name="description"
                        className="mt-1 block w-full mb-2"
                        rows={6}
                        handleChange={props.handleChange}
                        value={props.projectData.description}
                    />
                    <InputError message={props.errors.description} className="mb-5" />

                    <Link 
                    as='button'
                    className="bg-violet-700 text-slate-50 p-4 rounded py-2" 
                    data={props.projectData} method="patch" 
                    href={route("project.update")} 
                    type="button"
                    >Save</Link>
                </div>
            </Drawer.Body>
        </Drawer>
    )
}

export default EditProjectInfoDrawer;