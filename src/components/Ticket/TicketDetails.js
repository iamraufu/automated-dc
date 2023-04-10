import React from 'react';
import { Link } from 'react-router-dom';

const TicketDetails = ({ ticket }) => {

    const { _id, subject, opening_time, category, priority, person, status } = ticket

    return (
        <Link to={`/ticket-details/${_id}`} className='text-decoration-none'>
            <section className='home-hero-details-container mt-3 p-3 d-none d-lg-block'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-2 details-content">{subject}</div>
                    <div className="col-md-2 details-content">{opening_time}</div>
                    <div className="col-md-2 details-content">{category}</div>
                    <div className="col-md-2 details-content mt-3">{priority === 'Urgent' && <p className='urgent d-flex justify-content-center align-items-center'>Urgent</p>}{priority === 'By Today' && <p className='by-today d-flex justify-content-center align-items-center'>Today</p>}{priority === 'Deadline' && <p className='deadline d-flex justify-content-center align-items-center'>Deadline</p>}</div>
                    <div className="col-md-2 details-content">{person}</div>
                    <div className="col-md-2 details-content">{status}</div>
                </div>
            </section>
        </Link>
    );
};

export default TicketDetails;