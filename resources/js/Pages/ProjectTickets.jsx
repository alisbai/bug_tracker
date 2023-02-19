import SidebarPage from "@/Components/SidbarPage";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/inertia-react";
import { Table } from "rsuite";

function ProjectTickets(props) {
    const {Cell, HeaderCell, Column} = Table;

    return (
        <Authenticated auth={props.auth}>
            <SidebarPage title={"Tickets for: " + props.project.name}>
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
            </SidebarPage>
        </Authenticated>
    )
}

export default ProjectTickets;