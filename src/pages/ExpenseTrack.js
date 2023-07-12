import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";

const ExpenseTrack = () => {
      const { register, handleSubmit, formState: { errors } } = useForm();
      const [date, setDate] = useState(new Date())
      const onSubmit = data => handleExpense(data);

      const handleExpense = (data) => {
            const expenseData = data
            console.log(expenseData)
      }

      return (
            <section className='bg-brand container-fluid p-0'>
                  <div className="d-flex">
                        <div style={{ width: '116px' }} className="col-md-2 bg-white">
                              <Sidebar />
                        </div>

                        <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                              <h2 className="h5 font-ibm">Expense Tracker</h2>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="font-ibm mb-3"><DatePicker className='select bg-white' selected={date} onChange={(date) => setDate(date)} /></div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Picker Cost' className='custom-input font-ibm bg-white' type='number' {...register("picker_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.picker_cost && <span className='text-danger fw-bold font-ibm p-1'>*Picker Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Entertainment cost' className='custom-input font-ibm bg-white' type='number' {...register("entertainment_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.entertainment_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Entertainment Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Over Time Cost' className='custom-input font-ibm bg-white' type='number' {...register("overtime_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.overtime_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Over Time Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Convenience Cost' className='custom-input font-ibm bg-white' type='number' {...register("convenience_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.convenience_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Convenience Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Vendor Car Cost' className='custom-input font-ibm bg-white' type='number' {...register("vendor_car_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.vendor_car_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Vendor Car Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Own Car Cost' className='custom-input font-ibm bg-white' type='number' {...register("own_car_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.own_car_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Own Car Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Fuel Cost' className='custom-input font-ibm bg-white' type='number' {...register("fuel_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.fuel_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Fuel cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Maintenance Cost' className='custom-input font-ibm bg-white' type='number' {...register("maintenance_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.maintenance_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Maintenance Cost required</span>}
                                    </div>

                                    {/* ------------- */}

                                    <div className="form-group mb-3">
                                          <input placeholder='Vehicle Cost' className='custom-input font-ibm bg-white' type='number' {...register("vehicle_cost",
                                                // { required: true }
                                          )} />
                                          <br />
                                          {errors.vehicle_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Vehicle Cost required</span>}
                                    </div>

                                    {/* <p className='text-danger fw-bold font-ibm'>{loginError}</p> */}
                                    <button>Submit</button>

                                    {/* <input id='action' type="submit" className='btn-action w-100 text-center font-ibm py-2' value='Sign in' /> */}
                              </form>
                        </div>
                  </div>
            </section>
      );
};

export default ExpenseTrack;