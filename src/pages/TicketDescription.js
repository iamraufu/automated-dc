import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import clipboard from '../images/clipboard.svg'
import menu from '../images/menu.svg'
import outlet from '../images/outlet.svg'
import person from '../images/person.svg'
import sku from '../images/sku.svg'
import sto from '../images/sto.svg'

const TicketDescription = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ticket, setTicket] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://shwapnodc.onrender.com/ticket/${id}`);
            const data = await response.json();
            if (data.status === true) {
                setTicket(data.ticket);
            }
            else {
                navigate('/tickets')
            }
        };
        fetchData();
    }, [id, navigate])

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 mx-auto d-block bg-white">
                    {
                        ticket.subject ?
                            <div className="ticket-description-heading p-3">
                                <div className="row justify-content-between align-items-center font-inter px-3">
                                    <div className="col-md-10 text-white p-0">{ticket.subject}</div>
                                    <div className="col-md-2 text-white p-0">{new Date(ticket.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            </div>
                            :
                            <div className="">
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                            </div>
                    }

                    {
                        ticket.subject ?
                            <div className="row p-0 m-0">
                                <div className="col-md-10 bg-white pt-3 ticket-description-container px-0">
                                    <div className="row py-3 m-0">
                                        <div className="col-md-4 px-0">
                                            <h2 className='ticket-description-content'>{ticket.category}</h2>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className='mb-2 me-2' width="18" src={menu} alt="" />
                                                <h2 className='ticket-description-title'>Category</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-4 px-0">
                                            <h2 className='ticket-description-content'>{ticket.sub_category.map(item => <span key={item} className='me-2'>{item}</span>)} </h2>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className='mb-2 me-2' width="18" src={clipboard} alt="" />
                                                <h2 className='ticket-description-title'>Sub-Category</h2>
                                            </div>
                                        </div>
                                        {
                                            ticket.outlet && <div className="col-md-4 px-0">
                                                <h2 className='ticket-description-content'>{ticket.outlet}</h2>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img className='mb-2 me-2' width="20" src={outlet} alt="" />
                                                    <h2 className='ticket-description-title'>Outlet</h2>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className="row py-3 m-0">
                                        <div className="col-md-4 px-0">
                                            <h2 className='ticket-description-content'>{ticket.person}</h2>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className='mb-2 me-2' width="17" src={person} alt="" />
                                                <h2 className='ticket-description-title'>Assigned Person</h2>
                                            </div>
                                        </div>
                                        {
                                            ticket.sto && <div className="col-md-4 px-0">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="sto-number">{parseInt(ticket.sto.toString().slice(0, 3))}</div>
                                                    <div className="sto-number">{parseInt(ticket.sto.toString().slice(3, 6))}</div>
                                                    <div className="sto-number">{parseInt(ticket.sto.toString().slice(6))}</div>
                                                </div>
                                                {/* <h2 className='ticket-description-content'>{ticket.sto}</h2> */}
                                                <div className="d-flex justify-content-center align-items-center mt-1">
                                                    <img className='mb-2 me-2' width="14" src={sto} alt="" />
                                                    <h2 className='ticket-description-title'>STO</h2>
                                                </div>
                                            </div>
                                        }
                                        {
                                            ticket.sku && <div className="col-md-4 px-0">
                                                <h2 className='ticket-description-content'>{ticket.sku}</h2>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img className='mb-2 me-2' width="18" src={sku} alt="" />
                                                    <h2 className='ticket-description-title'>SKU</h2>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className="row py-3 m-0">
                                        {
                                            ticket.issues && <div className="col-md-6 px-0 mx-auto d-block">
                                                <h2 className='ticket-description-content'>{ticket.issues}</h2>
                                                <h2 className='ticket-description-title text-center'>Issues</h2>
                                            </div>
                                        }
                                        <div className="col-md-4 px-0">
                                            <h2 className='ticket-description-content'>{ticket.created_by}</h2>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className='mb-2 me-2' width="17" src={person} alt="" />
                                                <h2 className='ticket-description-title'>Created By</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-2 px-0">
                                            {
                                                ticket.priority === 'Urgent' && <p className='urgent d-flex justify-content-center align-items-center mx-auto d-block mb-1'>Urgent</p>
                                            }
                                            {
                                                ticket.priority === 'By Today' && <p className='by-today d-flex justify-content-center align-items-center mx-auto d-block mb-1'>Today</p>
                                            }
                                            {
                                                ticket.priority === 'Deadline' && <p className='deadline d-flex justify-content-center align-items-center mx-auto d-block mb-1'>Deadline</p>
                                            }
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className='mb-2 me-2' width="18" src={clipboard} alt="" />
                                                <h2 className='ticket-description-title'>Ticket Urgency</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 mt-3 px-0">
                                    <button style={{borderRadius:'10px'}} className='btn btn-sm btn-danger px-4 py-2 mx-auto d-block'>Close Ticket</button>
                                </div>
                            </div>
                            :
                            <p className="placeholder-glow"><span className="placeholder col-12"></span></p>
                    }
                </div>
            </div>
        </section>
    );
};

export default TicketDescription;