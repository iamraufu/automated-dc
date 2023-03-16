import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import rectangle from '../images/rectangle.svg'
import rectangle_checked from '../images/rectangle_checked.svg'

const PersonAssign = () => {

    const [priority, setPriority] = useState("")
    const { register, handleSubmit, 
        // formState: { errors }
    } = useForm();
    const onSubmit = data => console.log(data, priority);

    const handleCategoryClick = () => {
        document.getElementById('ticket-category-checkboxes').style.display === 'none' ?
            document.getElementById('ticket-category-checkboxes').style.display = 'block' :
            document.getElementById('ticket-category-checkboxes').style.display = 'none'
    }

    return (
        <div className="">
            <h2 className='fs-6 text-end me-4 font-inter'>14th March 2023</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ borderRadius: '10px' }} className="bg-white m-3 p-3">
                    <div className="d-flex">

                        <div className="col-md-6">
                            <h2 className='ticket-modal-body-title'>Person Assign</h2>
                            <select {...register("person")} name="person-assign" id="person-assign" className='mt-3 font-ibm'>
                                <option className='font-ibm my-1' disabled selected>Select</option>
                                <option className='font-ibm my-1' value="Mujahidul">Mujahidul</option>
                                <option className='font-ibm my-1' value="Al-Amin">Al-Amin</option>
                                <option className='font-ibm my-1' value="Saikat">Saikat</option>
                                <option className='font-ibm my-1' value="Torikul">Torikul</option>
                                <option className='font-ibm my-1' value="Sipon">Sipon</option>
                                <option className='font-ibm my-1' value="Bashir">Bashir</option>
                            </select>

                            <div className="mt-4">
                                <h2 className='ticket-modal-body-title'>STOs</h2>
                                <input min='0' type="number" className='number-input' name="" id="sto_number" />
                                <br />
                                <span onClick={() => {
                                    navigator.clipboard.writeText(document.getElementById('sto_number').value)
                                }
                                } className='copy-to-clipboard ps-1'>Copy to clipboard</span>
                            </div>

                            <div className="mt-3">
                                <h2 className='ticket-modal-body-title'>Priority</h2>
                                <div className="d-flex align-items-center">
                                    <div
                                        onClick={(e) => setPriority(e.target.innerHTML)}
                                        className="urgent"><p className='m-0 mx-auto d-block'>Urgent</p></div>
                                    <div
                                        onClick={(e) => {
                                            setPriority(e.target.innerHTML)
                                            document.getElementById('ticket_due_date').value = new Date().toISOString().split('T')[0]
                                        }}
                                        className="by-today ms-3"><p className='m-0 mx-auto d-block'>By Today</p></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h2 className='ticket-modal-body-title'>Ticket Category*</h2>
                            <div id="ticket-category-container">
                                <div id="ticket-category" onClick={() => handleCategoryClick()} className='mt-4 mb-2 font-ibm'>Select</div>
                                <div id="ticket-category-checkboxes" style={{ display: 'none', boxShadow: '0 5px 15px #c4c4c44d', width: '400px', borderRadius: '8px', cursor: 'pointer' }} className='bg-white position-fixed p-3'>
                                    <div className="d-flex">
                                        <img src={rectangle} className='me-2 mb-2' alt="check" />
                                        <h3 className='ticket-modal-body-checker'>Picker Management</h3>
                                    </div>
                                    <div className="d-flex">
                                        <img src={rectangle} className='me-2 mb-2' alt="check" />
                                        <h3 className='ticket-modal-body-checker'>Labor Management</h3>
                                    </div>
                                    <div className="d-flex">
                                        <img src={rectangle} className='me-2 mb-2' alt="check" />
                                        <h3 className='ticket-modal-body-checker'>Vehicle Management</h3>
                                    </div>
                                    <div className="d-flex">
                                        <img src={rectangle} className='me-2 mb-2' alt="check" />
                                        <h3 className='ticket-modal-body-checker'>Vendor Vehicle issues and fee</h3>
                                    </div>
                                    <div className="d-flex">
                                        <img src={rectangle_checked} className='me-2 mb-2' alt="check" />
                                        <h3 className='ticket-modal-body-checker'>Sorter Management</h3>
                                    </div>
                                    <button onClick={() => handleCategoryClick()} className="btn btn-sm btn-danger px-3 ms-auto d-block mt-3">Done</button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2 className='ticket-modal-body-title'>SKUs</h2>
                                <input min='0' type="number" className='number-input' name="" id="" />
                            </div>
                            <div className="mt-4">
                                <h2 className='ticket-modal-body-title'>Time</h2>
                                <input type="time" className='time-input' name="" id="" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h2 className="ticket-modal-body-title">Due Date</h2>
                        <input className='font-ibm' id="ticket_due_date" type="date" min={new Date().toISOString().split('T')[0]} name='ticket_due_date' />
                    </div>

                    <input type="submit" className="font-ibm btn btn-sm btn-danger mt-3 px-3" value="Assign Person" />

                </div>
            </form>
        </div>
    );
};

export default PersonAssign;