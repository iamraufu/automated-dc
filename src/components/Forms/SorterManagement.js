import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SorterManagement = () => {

    const [person, setPerson] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const details = {
            ticketCategory: 'Picker Management',
            person: person,
            sto: data.sto,
            sku: data.sku,
            priority: data.priority,
            time: new Date().toLocaleTimeString(),
            // date: selectedDate
        }
        console.log(details)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="row mt-3">

                <div className="col-md-6">
                    <h2 className='ticket-modal-body-title ps-1'>Person Assign</h2>
                    <select className='select mt-1 font-ibm' onChange={(e) => setPerson(e.target.value)} required>
                        <option className='font-ibm' value="" selected disabled>Select</option>
                        <option className='font-ibm' value="Mujahidul">Mujahidul</option>
                        <option className='font-ibm' value="Al-Amin">Al-Amin</option>
                        <option className='font-ibm' value="Saikat">Saikat</option>
                        <option className='font-ibm' value="Torikul">Torikul</option>
                        <option className='font-ibm' value="Sipon">Sipon</option>
                        <option className='font-ibm' value="Bashir">Bashir</option>
                    </select>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Priority</h2>
                        <div className="d-flex align-items-center">
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-urgent" name="priority" value="Urgent" />
                            <label className='urgent me-2 d-flex justify-content-center' htmlFor="picker-management-status-urgent">Urgent</label>
                            <input {...register('priority', { required: true })} style={{ display: 'none' }} type="radio" id="picker-management-status-today" name="priority" value="By Today" />
                            <label 
                            // onClick={() => document.getElementById('sorter-management-due-date').value = new Date().toISOString().split('T')[0]} 
                            className='by-today mx-2 d-flex justify-content-center' htmlFor="picker-management-status-today">By Today</label>
                        </div>
                        {errors.priority && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                    <div className="mt-3">
                        <h2 className='ticket-modal-body-title ps-1'>Due Date</h2>
                        {/* <input id='sorter-management-due-date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} type="date" name="" min={new Date().toISOString().split('T')[0]} required /> */}
                        <br />
                        {errors.date && <span className='text-danger font-ibm'>*This is required</span>}
                    </div>

                    <div className="mt-4">
                        <h2 className='ticket-modal-body-title'>Sub Category</h2>
                        <input {...register('sub_category')} type="checkbox" id="sorter-assign" value="Sorter Assign" />
                        <label htmlFor="sorter-assign" className='ms-2 me-5'>Sorter Assign</label>
                        <input {...register('sub_category')} type="checkbox" id="others" value="Others" />
                        <label htmlFor="others" className='ms-2'>Others</label>
                    </div>
                </div>

                <div className="col-md-6">

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

export default SorterManagement;