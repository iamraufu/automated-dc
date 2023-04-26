import React, { useState } from 'react';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import TicketDetails from '../components/Ticket/TicketDetails';
import TicketTitle from '../components/Ticket/TicketTitle';
import useAuth from '../hooks/useAuth';
import TicketSearch from '../components/Ticket/TicketSearch';

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
                    <TicketTitle />
                    {
                        tickets.length > 0 ?
                            filteredTickets.map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)
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