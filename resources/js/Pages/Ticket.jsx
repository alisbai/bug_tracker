import SidebarPage from "@/Components/SidbarPage";
import TicketInfo from "@/Components/TicketInfo";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Panel, Table } from "rsuite";

import 'rsuite/styles/index.less'

function Ticket(props) {
    const {Column, HeaderCell, Cell} = Table;
    console.log(props);
    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title={"Ticket: " + props.ticket.title}>
                <div className="flex">
                    <TicketInfo 
                    project={props.project}
                    ticket={props.ticket}
                    />
                    <div 
                    className="ticket-comments w-1/2 ml-3"
                    >
                        <Table
                        data={props.ticket.comments}
                        height={250}
                        >
                            <Column width={300}>
                                <HeaderCell>User</HeaderCell>
                                <Cell>{rowData => rowData.user.first_name + " " + rowData.user.last_name}</Cell>
                            </Column>
                            <Column width={600}>
                                <HeaderCell>Comment</HeaderCell>
                                <Cell>{rowData => rowData.comment}</Cell>
                            </Column>
                        </Table>
                    </div>
                </div>
            </SidebarPage>
        </Authenticated>
    )
}

export default Ticket;