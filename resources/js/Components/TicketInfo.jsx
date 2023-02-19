
function TicketInfo(props) {
    return (
        <div className="ticket-info">
                        <div>
                            <h4 className="font-bold mb-4">Ticket Info:</h4>
                            <div className="flex mb-6">
                                <div className="mr-6 text-sm"><b>ticket title: </b> {props.ticket.title}</div>
                                <div className="text-sm">project name: {props.project.name}</div>
                            </div>

                            <div className="mb-6">
                                <div className="mr-6 text-sm"><b>ticket description: </b> {props.ticket.description}</div>
                            </div>

                            <div className="mb-6">
                                <div className="text-sm"><b>Submitter: </b>{props.ticket.submitter ? props.ticket.submitter.first_name + " " + props.ticket.submitter.last_name : "N/A"}</div>
                            </div>

                            <div className="mb-6">
                                <div className="text-sm"><b>Developer: </b>{props.ticket.developer ? props.ticket.developer.first_name + " " + props.ticket.developer.last_name : "N/A"}</div>
                            </div>

                            <div className="flex mb-6">
                                <div className="mr-6 text-sm"><b>Priority:</b> {props.ticket.priorities[0].priority}</div>
                                <div className="text-sm"><b>Status: </b>{props.ticket.statuses[0].status}</div>
                            </div>
                        </div>
                    </div>
    )
}

export default TicketInfo;