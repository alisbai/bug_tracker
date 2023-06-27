import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import {Table, Button, ButtonToolbar, Modal, SelectPicker} from "rsuite";
import { useForm } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

function ProjectTickets(props) {
    const developers = props.developers.map(developer => {
        return {
            label: developer.first_name + " " + developer.last_name,
            value: developer.id
        }
    });

    const priorities = [{
            label: "Low",
            value: 1
        },
        {
            label: "Medium",
            value: 2
        },
        {
            label: "High",
            value: 3
        }
    ]

    const types = [{
            label: "Bug Fix",
            value: 1
        },
        {
            label: "Refactoring",
            value: 2
        },
        {
            label: "New Feature",
            value: 3
        }
    ]


    const {Cell, HeaderCell, Column} = Table;
    

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        project: props.project.id,
        developer: null,
        priority: null,
        type: null,
      })

      function submit(e) {
        e.preventDefault();
        post(route("ticket.add"));
        handleCloseModal();
      }

    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title={"Tickets for: " + props.project.name}>
                <ButtonToolbar className="pb-8">
                    <Button color="violet" appearance="primary" onClick={handleOpenModal}>Add Ticket</Button>
                </ButtonToolbar>
                <Table
                data={props.tickets}
                height={400}
                >
                    <Column
                    width={300}
                    >
                        <HeaderCell>Ticket Title</HeaderCell>
                        <Cell 
                        dataKey="title"
                        />
                    </Column>
                    <Column
                    width={400}
                    >
                        <HeaderCell>Description</HeaderCell>
                        <Cell 
                        dataKey="description"
                        />
                    </Column>
                    <Column
                    width={200}
                    >
                        <HeaderCell>Actions</HeaderCell>
                        <Cell>{rowData => <Link 
                                            href={route("ticket.get")}
                                            data={{projectId: props.project.id,
                                                    ticketId: rowData.id
                                                }}
                                            >view details</Link>}
                        </Cell>
                    </Column>
                </Table>

                <Modal open={openModal} onClose={handleCloseModal}>
                    <Modal.Body>
                        <form onSubmit={submit}>
                            <InputLabel forInput="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={(e) => setData("title", e.target.value)}
                                required={true}
                            />
                            <InputError message={errors.title} className="mt-2" />

                            <InputLabel forInput="description" value="Description" />
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

                            <InputLabel className="mb-1" value="Priority" />
                            
                            <SelectPicker onChange={e => setData("priority", e)} className="w-full" data={priorities} />

                            <InputLabel className="mb-1" value="Type" />
                            
                            <SelectPicker onChange={e => setData("type", e)} className="w-full" data={types} />

                            <InputLabel className="mb-1" value="Developer" />
                            
                            <SelectPicker onChange={e => setData("developer", e)} required className="w-full" data={developers} />

                            <div className="flex items-center justify-start mt-4">
                                <PrimaryButton processing={processing}>
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

export default ProjectTickets;