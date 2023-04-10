import React from 'react';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import TicketDetails from '../components/Ticket/TicketDetails';
import TicketTitle from '../components/Ticket/TicketTitle';
import useAuth from '../hooks/useAuth';

const Tickets = () => {

    const { tickets } = useAuth()

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block ticket-container">
                    <TicketTitle />
                    {
                        tickets.length > 0 ?
                            tickets.map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)
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