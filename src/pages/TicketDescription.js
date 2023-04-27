import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import clipboard from '../images/clipboard.svg'
import menu from '../images/menu.svg'
import outlet from '../images/outlet.svg'
import person from '../images/person.svg'
import sku from '../images/sku.svg'
import sto from '../images/sto.svg'
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';

const TicketDescription = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const [ticket, setTicket] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/ticket/${id}`);
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

    const closeTicket = () => {
        const details = {
            status: 'Solved'
        }
        fetch(`http://localhost:5000/ticket/${ticket._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: `${result.message}`,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 1000)
                        },
                        willClose: () => {
                            window.location.replace('/tickets')
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.replace('/tickets')
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${result.message}`
                    })
                }
            }
            )
            .catch(err => console.log(err))
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const details = {
            name: user.name,
            time: Date.now(),
            comment: data.comment.trim(),
        }

        fetch(`http://localhost:5000/ticket-comment/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: `${result.message}`,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 1000)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                            window.location.reload()
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location.reload()
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${result.message}`
                    })
                }
            })
            .catch(err => console.log(err))
    }

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
                                    {
                                        ticket.status !== 'Solved' && <button onClick={() => closeTicket()} style={{ borderRadius: '10px' }} className='btn btn-sm btn-danger px-4 py-2 mx-auto d-block font-ibm'>Close Ticket</button>
                                    }
                                </div>

                                <div className="mt-5">
                                    {
                                        ticket.comments.map(comment =>
                                            <div key={comment._id} className="">
                                                <div className="d-flex align-items-center">
                                                    {
                                                        comment.name === "Tamal" ?
                                                            <div style={{ width: '40px', height: '40px', backgroundColor: '#0C4C9C', borderRadius: '50%', color: 'white', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '18px' }} className="d-flex justify-content-center align-items-center">{comment.name.slice(0, 1)}</div>
                                                            :
                                                            <div style={{ width: '40px', height: '40px', backgroundColor: '#E63946', borderRadius: '50%', color: 'white', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '18px' }} className="d-flex justify-content-center align-items-center">{comment.name.slice(0, 1)}</div>
                                                    }
                                                    <div className="">
                                                        <span style={{ color: '#E63946', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '18px' }} className='ps-2'>
                                                            {
                                                                comment.name === "Tamal" ? <span style={{ color: '#0C4C9C' }}>{comment.name}</span> :
                                                                    <span style={{ color: '#E63946' }}>{comment.name}</span>
                                                            }
                                                        </span>
                                                        <span style={{ color: '#6B7580', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '500', fontSize: '15px', lineHeight: '18px' }} className='ps-2'>{moment(comment.time).fromNow()}</span>
                                                    </div>
                                                </div>

                                                <p className='font-inter mt-2'>{comment.comment}</p>
                                            </div>
                                        )
                                    }


                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <textarea className='select w-100 font-ibm' name="" id="" cols="35" rows="2" {...register('comment', { required: true })} />
                                        <p>{errors.comment && <span className='text-danger font-ibm'>This is required</span>}</p>
                                        <input type="submit" value="Comment Submit" className='comment-submit mt-2' />
                                    </form>
                                </div>

                            </div>
                            :
                            <p className="placeholder-glow"><span className="placeholder col-12"></span></p>
                    }
                </div>
            </div>
        </section >
    );
};

export default TicketDescription;