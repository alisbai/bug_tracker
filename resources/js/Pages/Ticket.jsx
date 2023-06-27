import SidebarPage from "@/Components/SidbarPage";
import TicketInfo from "@/Components/TicketInfo";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/inertia-react";
import { Table, ButtonToolbar, Button, Modal, Toggle } from "rsuite";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/PrimaryButton";


import 'rsuite/styles/index.less'
import { useState } from "react";

function Ticket(props) {

    const { data, setData, post, processing, errors } = useForm({
        id: props.ticket.id,
        status: props.ticket.statuses[0].id
      })

    const [comment, setComment] = useState("");

    const {Column, HeaderCell, Cell} = Table;

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);

    function submit(e) {
        e.preventDefault();
        post(route("ticket.update"));
        handleCloseModal();
      }

    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title={"Ticket: " + props.ticket.title}>
                <ButtonToolbar className="pb-8">
                    <Button color="violet" appearance="primary" onClick={handleOpenModal}>Update Ticket</Button>
                </ButtonToolbar>            
                <div className="flex">
                    <TicketInfo 
                    project={props.project}
                    ticket={props.ticket}
                    />
                    <div 
                    className="ticket-comments w-1/2 ml-3"
                    >
                    <h4 className="font-bold mb-4">Comments:</h4>
                        <div className="flex justify-between pb-4">
                            <TextInput 
                            value={comment}
                            handleChange={(e) => setComment(e.target.value)}  />

                            <Link 
                            className="bg-violet-700 text-slate-50 p-4 rounded py-2" 
                            as="button" method="post" 
                            data={{comment: comment, ticketId: props.ticket.id}}
                            href={route("comment.add")}
                            onClick={() => setComment("")}
                            >add comment</Link>
                        </div>

                        <Table
                        data={props.ticket.comments}
                        height={180}
                        >
                            <Column width={300}>
                                <HeaderCell>Users</HeaderCell>
                                <Cell>{rowData => rowData.user ? rowData.user.first_name + " " + rowData.user.last_name : "N/A"}</Cell>
                            </Column>
                            <Column width={600}>
                                <HeaderCell>Comments</HeaderCell>
                                <Cell>{rowData => rowData.comment}</Cell>
                            </Column>
                        </Table>
                    </div>
                </div>

                <Modal open={openModal} onClose={handleCloseModal}>
                    <Modal.Body>
                    <InputLabel value="Status" />
                        <form onSubmit={submit}>
                            <Toggle onChange={e => e ? setData("status", 1) : setData("status", 2)} size="lg" checkedChildren="Open" unCheckedChildren="Close" />
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

export default Ticket;