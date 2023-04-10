import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const VehicleManagement = () => {

    const [person, setPerson] = useState("")
    const [selectedDate, setSelectedDate] = useState("");

    const { user, tickets, setTickets } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const details = {
            created_by: user.name,
            category: 'Vehicle Management',
            sub_category: data.sub_category,
            person: person,
            priority: data.priority,
            opening_time: new Date().toLocaleTimeString(),
            opening_date: new Date().toISOString().split('T')[0],
            date: selectedDate,
            issues: data.issues,
            subject: data.subject,
            status: "Pending"
        }

        fetch('http://localhost:5000/ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    setTickets([...tickets, details])
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: `${result.message}`,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                            window.location.replace('/tickets')
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
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row mt-3">

                <div className="col-md-6">

                    <h2 className='ticket-modal-body-title ps-1 mt-1'>Subject</h2>
                    <input type="text" min="0" className='custom-input w-100 font-ibm' {...register('subject', { required: true })} />
                    <br />
                    {errors.subject && <span className='text-danger font-ibm'>*This is required</span>}

                    <div className="mt-4">
                        <h2 className='ticket-modal-body-title'>Sub Category</h2>
                        <input {...register('sub_category', { required: true })} type="checkbox" id="vehicle_management" value="Vehicle maintenance" />
                        <label htmlFor="vehicle_management" className='ms-2 me-5 font-ibm'>Vehicle maintenance</label>
                        <input {...register('sub_category', { required: true })} type="checkbox" id="vehicle_case" value="Vehicle Case" />
                        <label htmlFor="vehicle_case" className='ms-2 me-5 font-ibm'>Vehicle Case</label>
                        <input {...register('sub_category', { required: true })} type="checkbox" id="others" value="Others" />
                        <label htmlFor="others" className='ms-2 font-ibm'>Others</label>
                        {errors.sub_category && <p className='font-ibm text-danger'>*This is required</p>}
                    </div>

                    <div className="my-3">
                        <label htmlFor="" className=''>*Issues</label>
                        <textarea className='select w-100 font-ibm' name="" id="" cols="35" rows="3" {...register('issues', { required: true })}></textarea>
                    </div>
                </div>

                <div className="col-md-6">

                    <h2 className='ticket-modal-body-title ps-1'>Person Assign</h2>
                    <select className='select mt-1 font-ibm w-100' onChange={(e) => setPerson(e.target.value)} required>
                        <option className='font-ibm' value="" selected disabled>Select</option>
                        <option className='font-ibm' value="Mujahidul">Mujahidul</option>
                        <option className='font-ibm' value="Al-Amin">Al-Amin</option>
                        <option className='font-ibm' value="Saikat">Saikat</option>
                        <option className='font-ibm' value="Torikul">Torikul</option>
                        <option className='font-ibm' value="Sipon">Sipon</option>
                        <option className='font-ibm' value="Bashir">Bashir</option>
                    </select>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Due Date</h2>
                        <input id='vehicle-management-due-date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} type="date" name="" min={new Date().toISOString().split('T')[0]} required className='font-ibm select w-100' />
                        <br />
                        {errors.date && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Priority</h2>
                        <div className="d-flex align-items-center">
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-urgent" name="priority" value="Urgent" />
                            <label className='urgent me-2 d-flex justify-content-center' htmlFor="picker-management-status-urgent">Urgent</label>
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-today" name="priority" value="By Today" />
                            <label
                                className='by-today mx-2 d-flex justify-content-center' htmlFor="picker-management-status-today">By Today</label>
                            {/* onClick={() => document.getElementById('vehicle-management-due-date').value = new Date().toISOString().split('T')[0]} */}
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-deadline" name="priority" value="Deadline" />
                            <label className='deadline me-2 d-flex justify-content-center' htmlFor="picker-management-status-deadline">By Deadline</label>
                        </div>
                        {errors.priority && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                    {/* <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Time</h2>
                        <div id='start-slot-btn'>
                            <div style={{ cursor: 'pointer' }} onClick={() => handleSlot()} className='ticket-slot-btn d-flex justify-content-center align-items-center'>Start Slot</div>
                        </div>
                        <p style={{ display: 'none' }} id='slot-started' className='font-ibm text-success ms-1'>Slot started at <b>{new Date().toLocaleTimeString()}</b></p>
                    </div> */}

                </div>

            </div>

            <input type="submit" className="font-ibm btn btn-sm btn-danger mt-3 px-3" value="Assign Ticket" />

        </form>
    );
};

export default VehicleManagement;