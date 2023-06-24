import Authenticated from "@/Layouts/AuthenticatedLayout";
import SidebarPage from "@/Components/SidbarPage";
const {Cell, HeaderCell, Column} = Table;
import { Table } from "rsuite";
import { Link } from "@inertiajs/inertia-react";
import 'rsuite/styles/index.less'


function AdminMyTickets(props) {
    console.log(props.ticket);
    return (
    <Authenticated auth={props.auth}>
        <SidebarPage title="My Tickets">
            <Table
            data={props.ticket}
            height={600}
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
                                        data={{projectId: rowData.project_id,
                                                ticketId: rowData.id
                                            }}
                                        >view details</Link>}
                    </Cell>
                </Column>
            </Table>
        </SidebarPage>
    </Authenticated>
    )
}

export default AdminMyTickets;