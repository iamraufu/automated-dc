import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import outletsData from '../../data/outlets.json'
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const PickerManagement = () => {

    const [outlet, setOutlet] = useState("")
    const [person, setPerson] = useState("")
    const [selectedDate, setSelectedDate] = useState("");

    const { user } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const details = {
            created_by: user.name,
            opening_date: new Date().toISOString().split('T')[0],
            date: selectedDate,
            outlet: outlet,
            person: person,
            priority: data.priority,
            sku: data.sku,
            sto: data.sto,
            sub_category: data.sub_category,
            subject: data.subject,
            category: 'Picker Management',
            opening_time: new Date().toLocaleTimeString(),
            status: "Pending",
            comments: []
        }
        fetch('http://localhost:8000/ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === true) {
                    toast.success(`${result.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    window.location.reload()
                }
                else {
                    toast.warn(`${result.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
    }

    const handleSlot = () => {
        document.getElementById('start-slot-btn').style.display = 'none'
        document.getElementById('slot-started').style.display = 'block'
    }

    return (
        <form id='picker-management-form' onSubmit={handleSubmit(onSubmit)}>

            <div className="row">

                <div className="col-md-6 mt-3">

                    <div className="">
                        <h2 className='ticket-modal-body-title ps-1'>Subject</h2>
                        <input type="text" min="0" className='custom-input w-100 font-ibm' {...register('subject', { required: true })} />
                        <br />
                        {errors.subject && <span className='text-danger font-ibm'>*This is required</span>}

                        <div className="mt-4">
                            <h2 className='ticket-modal-body-title'>Sub Category</h2>
                            <input {...register('sub_category', { required: true })} type="checkbox" id="picker_assign_ticket" value="Picker Assign Ticket" />
                            <label htmlFor="picker_assign_ticket" className='ms-2 me-5 font-ibm'>Picker Assign Ticket</label>
                            <input {...register('sub_category', { required: true })} type="checkbox" id="others" value="Others" />
                            <label htmlFor="others" className='ms-2 font-ibm'>Others</label>
                            {errors.sub_category && <p className='font-ibm text-danger'>*This is required</p>}
                        </div>

                        <h2 className='ticket-modal-body-title ps-1 mt-3'>Outlet Assign</h2>
                        <select className='select mt-1 font-ibm w-100' onChange={(e) => setOutlet(e.target.value)} required>
                            <option className='font-ibm' value="" selected disabled>Select</option>
                            {
                                outletsData.map(outlet => <option key={outlet.code} className='font-ibm' value={outlet.name}>{outlet.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>STOs</h2>
                        <input type="number" min="0" className='custom-input w-100 font-ibm' {...register('sto', { required: true })} />
                        <br />
                        {errors.sto && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Priority</h2>
                        <div className="d-flex align-items-center">
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-urgent" name="priority" value="Urgent" />
                            <label className='urgent me-2 d-flex justify-content-center' htmlFor="picker-management-status-urgent">Urgent</label>
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-today" name="priority" value="By Today" />
                            <label
                                // onClick={() => document.getElementById('picker-management-due-date').value = new Date().toISOString().split('T')[0]} 
                                className='by-today mx-2 d-flex justify-content-center' htmlFor="picker-management-status-today">By Today</label>
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-deadline" name="priority" value="Deadline" />
                            <label className='deadline me-2 d-flex justify-content-center' htmlFor="picker-management-status-deadline">By Deadline</label>
                        </div>
                        {errors.priority && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>
                </div>

                <div className="col-md-6 mt-2">
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
                        <h2 className='ticket-modal-body-title ps-1'>SKUs</h2>
                        <input type="number" min="0" className='custom-input w-100 font-ibm' {...register('sku', { required: true })} />
                        <br />
                        {errors.sku && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Time</h2>
                        <div id='start-slot-btn'>
                            <div style={{ cursor: 'pointer' }} onClick={() => handleSlot()} className='ticket-slot-btn d-flex justify-content-center align-items-center'>Start Slot</div>
                        </div>
                        <p style={{ display: 'none' }} id='slot-started' className='font-ibm text-success ms-1 my-3'>Slot started at <b>{new Date().toLocaleTimeString()}</b></p>
                    </div>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Due Date</h2>
                        <input className='select w-100 font-ibm'
                            // id='picker-management-due-date' 
                            value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} type="date" name="" min={new Date().toISOString().split('T')[0]} required />
                        <br />
                        {errors.date && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                </div>

            </div>

            <input type="submit" className="font-ibm btn btn-sm btn-danger mt-3 px-3" value="Assign Ticket" />

        </form>
    );
};

export default PickerManagement;