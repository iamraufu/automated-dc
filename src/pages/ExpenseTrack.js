import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";

const ExpenseTrack = () => {
      const { register, handleSubmit } = useForm();
      const [date, setDate] = useState(new Date())
      const [categoryTypeName, setCategoryTypeName] = useState("Variable Cost")
      const [categoryType, setCategoryType] = useState([])
      const [categoryName, setCategoryName] = useState("Picker")
      const [filteredExpenseCategory, setFilteredExpenseCategory] = useState({})

      const expenseCategoriesData =
            [
                  {
                        type: 'Variable Cost',
                        categories: [
                              {
                                    name: "Picker",
                                    expenses: ["Picker Cost", "Picker Over time Cost", "Picker Convenience Cost"]
                              },
                              {
                                    name: "Sorter",
                                    expenses: ["Sorter Cost", "Sorter Over time Cost", "Sorter Convenience Cost"]
                              },
                              {
                                    name: "Delivery",
                                    expenses: ["Entertainment Cost"]
                              },
                              {
                                    name: "Vehicle",
                                    expenses: ["Vendor Car Cost", "Own Car Cost", "Fuel Cost", "Maintenance Cost", "Vehicle Cost", "Driver Mobile Expense", "Driver Salary Expense"]
                              }
                        ]
                  },
                  {
                        type: 'Fixed Cost',
                        categories: [
                              {
                                    expenses: [
                                          "DC square rent",
                                          "Electricity",
                                          "Depreciation"
                                    ]
                              }
                        ]
                  }

            ]

      useEffect(() => {
            setCategoryType(expenseCategoriesData.find(item => item.type === categoryTypeName))
            // eslint-disable-next-line
      }, [categoryTypeName, categoryName])

      useEffect(() => {
            categoryType.categories &&
                  categoryTypeName === 'Variable Cost' ?
                  setFilteredExpenseCategory(categoryType.categories.find(item => item.name === categoryName)) :
                  setFilteredExpenseCategory(categoryType?.categories?.[0])
      }, [categoryName, categoryTypeName, categoryType, categoryType.categories])

      const onSubmit = data => handleExpense(data);

      const handleExpense = (data) => {
            document.getElementById('expense_form').reset()
            const result = [];

            for (const key in data) {
                  if (data.hasOwnProperty(key) && data[key] !== "") {
                        result.push(
                              {
                                    name: key.replace(/_/g, " ").replace(/(?:^|\s)\S/g, function (match) {
                                          return match.toUpperCase();
                                    }),
                                    amount: Number(data[key])
                              });
                  }
            }
            const expenseData = {
                  date,
                  type: categoryTypeName,
                  name: categoryName,
                  data: result
            }
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

                              <div className="row">
                                    <div className="col-md-3">
                                          <span className='font-ibm ms-1'>Type:</span>
                                          <select onChange={(e) => setCategoryTypeName(e.target.value)} name="" id="" className='select bg-white shadow-sm font-ibm'>
                                                {
                                                      expenseCategoriesData.map((category, index) => <option key={index} value={category.type}>{category.type}</option>)
                                                }
                                          </select>
                                    </div>

                                    {
                                          categoryTypeName === 'Variable Cost' &&
                                          <div className="col-md-3">
                                                <span className='font-ibm ms-1'>Name:</span>
                                                <select onChange={(e) => {
                                                      setCategoryName(e.target.value)
                                                      document.getElementById('expense_form').reset()
                                                }} name="" id="" className='select bg-white shadow-sm font-ibm'>
                                                      {
                                                            categoryType?.type &&
                                                            // errors here
                                                            categoryType?.categories.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)
                                                      }
                                                </select>
                                          </div>
                                    }
                              </div>

                              <form id='expense_form' onSubmit={handleSubmit(onSubmit)} className='mt-3'>
                                    <div className="font-ibm mb-3"><DatePicker className='select bg-white' selected={date} onChange={(date) => setDate(date)} /></div>
                                    {
                                          filteredExpenseCategory?.expenses &&
                                          filteredExpenseCategory.expenses.map((item, index) =>
                                                <div key={index} className="form-group mb-3">
                                                      <input placeholder={`${item}`} className='custom-input font-ibm bg-white' type='number' {...register(`${item.toLowerCase().replace(/\s/g, '_')}`,
                                                      )} />
                                                </div>
                                          )
                                    }
                                    <button className='btn btn-primary px-4 font-ibm'>Submit</button>
                              </form>

                              {/* <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="font-ibm mb-3"><DatePicker className='select bg-white' selected={date} onChange={(date) => setDate(date)} /></div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Picker Cost' className='custom-input font-ibm bg-white' type='number' {...register("picker_cost",

                                          )} />
                                          <br />
                                          {errors.picker_cost && <span className='text-danger fw-bold font-ibm p-1'>*Picker Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Entertainment cost' className='custom-input font-ibm bg-white' type='number' {...register("entertainment_cost",
                                          )} />
                                          <br />
                                          {errors.entertainment_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Entertainment Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Over Time Cost' className='custom-input font-ibm bg-white' type='number' {...register("overtime_cost",
                                          )} />
                                          <br />
                                          {errors.overtime_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Over Time Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Convenience Cost' className='custom-input font-ibm bg-white' type='number' {...register("convenience_cost",
                                          )} />
                                          <br />
                                          {errors.convenience_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Convenience Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Vendor Car Cost' className='custom-input font-ibm bg-white' type='number' {...register("vendor_car_cost",
                                          )} />
                                          <br />
                                          {errors.vendor_car_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Vendor Car Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Own Car Cost' className='custom-input font-ibm bg-white' type='number' {...register("own_car_cost",
                                          )} />
                                          <br />
                                          {errors.own_car_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Own Car Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Fuel Cost' className='custom-input font-ibm bg-white' type='number' {...register("fuel_cost",
                                          )} />
                                          <br />
                                          {errors.fuel_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Fuel cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Maintenance Cost' className='custom-input font-ibm bg-white' type='number' {...register("maintenance_cost",
                                          )} />
                                          <br />
                                          {errors.maintenance_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Maintenance Cost required</span>}
                                    </div>

                                    <div className="form-group mb-3">
                                          <input placeholder='Vehicle Cost' className='custom-input font-ibm bg-white' type='number' {...register("vehicle_cost",
                                          )} />
                                          <br />
                                          {errors.vehicle_cost && <span className='text-danger fw-bold p-1 font-ibm'>*Vehicle Cost required</span>}
                                    </div>

                                    <button>Submit</button>
                              </form> */}
                        </div>
                  </div>
            </section>
      );
};

export default ExpenseTrack;