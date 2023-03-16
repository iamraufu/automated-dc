import React from 'react';
import ticket from '../images/ticket.svg'
import circle from '../images/circle.svg'
import active from '../images/active.svg'
import { Link } from 'react-router-dom';

const HomeTicket = () => {
    return (
        <section className='bg-white p-3 mt-4'>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className='ticket-title'>Assigned <img className='ms-2' src={ticket} alt="" /></h2>
                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-sm btn-danger'>Create a Ticket</button>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h2 className='create-new-task'>Create new task</h2>
                <Link style={{ color: '#3751FF' }} className='text-decoration-none'><h3 className="view-details">See All</h3></Link>
            </div>

            <div style={{ borderBottom: '1px solid #DFE0EB' }} className="pt-2"></div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={circle} alt="circle" />
                    <h2 className='finish-ticket-update pt-2 ps-2'>Finish ticket update</h2>
                </div>
                <div className="urgent d-flex justify-content-center align-items-center">Urgent</div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={circle} alt="circle" />
                    <h2 className='finish-ticket-update pt-2 ps-2'>Create new ticket example</h2>
                </div>
                <div className="new d-flex justify-content-center align-items-center">New</div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={active} alt="active" />
                    <h2 className='finish-ticket-update pt-2 ps-2'>Update ticket report</h2>
                </div>
                <div className="default d-flex justify-content-center align-items-center">Default</div>
            </div>
        </section>
    );
};

export default HomeTicket;