import React, { useState } from 'react';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import TicketDetails from '../components/Ticket/TicketDetails';
import TicketTitle from '../components/Ticket/TicketTitle';
import useAuth from '../hooks/useAuth';
import TicketSearch from '../components/Ticket/TicketSearch';
import CreateTicketBtn from '../components/CreateTicketBtn'

const Tickets = () => {

    const tabNames = ['All', 'Pending', 'Solved']
    const { tickets } = useAuth()
    const [filteredTickets, setFilteredTickets] = useState(tickets)

    const handleTicket = (value) => {
        value === 'All' ? setFilteredTickets(tickets) : setFilteredTickets(tickets.filter(item => item.status === value))
    }

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block ticket-container">
                    <div className="float-end">
                        <CreateTicketBtn />
                    </div>
                    <ul className='d-flex p-0'>
                        {
                            tabNames.map((item, index) =>
                                <li style={{
                                    cursor: 'pointer',
                                    listStyle: 'none', background: '#E2EEFD', width: '100px', color: '#1D3557',
                                    fontFamily: 'IBM Plex Sans',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: '20px',
                                    lineHeight: '26px'
                                }} onClick={(e) => handleTicket(e.target.innerText)} key={index} className='p-3 mx-1 text-center'>{item}</li>
                            )
                        }
                    </ul>
                    <TicketSearch />
                    {
                        filteredTickets.length > 0 && <TicketTitle />
                    }
                    {
                        tickets.length > 0 ?
                            filteredTickets.length > 0 ?
                                filteredTickets.map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)
                                :
                                <p className='text-center mt-5 font-ibm'>No Pending Tickets Available</p>
                            :
                            <div className="">
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                            </div>
                    }
                </div>
            </div>
            <Modal />
        </section>
    );
};

export default Tickets;