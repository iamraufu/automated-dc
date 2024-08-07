import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const ExpenseTrack = () => {

      const { register, handleSubmit } = useForm();
      const [date, setDate] = useState(new Date())
      const [categoryTypeName, setCategoryTypeName] = useState("Variable Cost")
      const [categoryType, setCategoryType] = useState([])
      const [categoryName, setCategoryName] = useState("Picker")
      const [filteredExpenseCategory, setFilteredExpenseCategory] = useState({})
      const [selectedPicker, setSelectedPicker] = useState("")
      const [selectedSorter, setSelectedSorter] = useState("")
      const { user, expenses, setExpenses, startDate, endDate, setStartDate, setEndDate } = useAuth()

      const expenseCategoriesData =
            [
                  {
                        type: 'Variable Cost',
                        categories: [
                              {
                                    name: "Picker",
                                    expenses: ["Picker Cost", "Picker Over time Cost", "Picker Entertainment Cost"]
                              },
                              {
                                    name: "Sorter",
                                    expenses: ["Sorter Cost", "Sorter Over time Cost", "Sorter Entertainment Cost"]
                              },
                              {
                                    name: "Delivery",
                                    expenses: ["Entertainment Cost", "Labor Cost", "Convenience Cost"]
                              },
                              {
                                    name: "Vehicle",
                                    expenses: ["Vehicle Details", "Outlet Code", "Vendor Car Cost", "Own Car Cost", "Fuel Cost", "Maintenance Cost", "Vehicle Cost", "Driver Mobile Expense", "Driver Salary Expense"]
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
            let result = [];
            let expenseData = {};

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

            if (categoryTypeName === "Fixed Cost") {
                  expenseData = {
                        email: user.email,
                        date: date.toISOString().split('T')[0],
                        type: categoryTypeName,
                        name: "",
                        data: result
                  }
            }
            else {
                  expenseData = {
                        email: user.email,
                        date: date.toISOString().split('T')[0],
                        type: categoryTypeName,
                        name: categoryName,
                        picker: selectedPicker,
                        sorter: selectedSorter,
                        data: result
                  }
            }

            const fetchData = async () => {
                  const response = await toast.promise(
                        fetch(`http://localhost:8000/expense`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(expenseData)
                        }),
                        {
                              pending: 'Please wait. Expense Submitting...',
                              success: 'Expense Added Successfully',
                              error: 'There is an error adding new expense. Please try again later!'
                        }
                  );
                  const result = await response.json();

                  if (result.status === true) {
                        document.getElementById('expense_form').reset()
                        window.location.reload()
                        const fetchData = async () => {
                              try {
                                    const response = await fetch(`http://localhost:8000/expenses/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`);
                                    const data = await response.json();
                                    setExpenses(data.expenses);
                              } catch (error) {
                                    fetchData();
                              }
                        };
                        fetchData();
                  }
            }
            result.length > 0 && fetchData()
      }

      return (
            <section className='bg-brand container-fluid p-0'>
                  <div className="d-flex">
                        <div style={{ width: '116px' }} className="col-md-2 bg-white">
                              <Sidebar />
                        </div>

                        <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                              <h2 className="h5 font-ibm">Expense Tracker</h2>
                              <p style={{ fontSize: '14px' }} className='text-danger'><i>Please input one type of cost per submit</i></p>

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

                                    {
                                          categoryName === 'Picker' &&
                                          <div className="mt-3">
                                                <span className='font-ibm'>Picker Name: </span>
                                                <select onChange={(e) => {
                                                      setSelectedPicker(e.target.value)
                                                      document.getElementById('expense_form').reset()
                                                }} name="" id="" className='select bg-white shadow-sm font-ibm' defaultValue="">
                                                      <option value="" disabled>Select Picker</option>
                                                      {
                                                            user.pickers.map((picker, index) => <option key={index} value={picker.name}>{picker.name}</option>)
                                                      }
                                                </select>
                                          </div>
                                    }

                                    {
                                          categoryName === 'Sorter' &&
                                          <div className="mt-3">
                                                <span className='font-ibm'>Sorter Name: </span>
                                                <select onChange={(e) => {
                                                      setSelectedSorter(e.target.value)
                                                      document.getElementById('expense_form').reset()
                                                }} name="" id="" className='select bg-white shadow-sm font-ibm' defaultValue="">
                                                      <option value="" disabled>Select Sorter</option>
                                                      {
                                                            user.sorters.map((sorter, index) => <option key={index} value={sorter.name}>{sorter.name}</option>)
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
                                                      <input placeholder={`${item}`} className='custom-input font-ibm bg-white' type='text' {...register(`${item.toLowerCase().replace(/\s/g, '_')}`,
                                                      )} />
                                                </div>
                                          )
                                    }
                                    <button className='btn btn-primary px-4 font-ibm'>Submit</button>
                              </form>


                              <div style={{ backgroundColor: '#F8F8F0' }} className="mt-4 py-3 px-2 rounded shadow-sm">

                                    <div className="d-flex align-items-center">
                                          <div className="font-ibm">
                                                <p className='ms-1 mb-0'>From:</p><DatePicker className='select bg-white' selected={startDate} onChange={(date) => {
                                                      setStartDate(date)
                                                }} />
                                          </div>
                                          <div className="font-ibm ms-3">
                                                <p className='ms-1 mb-0'>To:</p><DatePicker className='select bg-white' selected={endDate} onChange={(date) => {
                                                      setEndDate(date)
                                                }} />
                                          </div>
                                    </div>


                                    {/* Expense Table */}
                                    <h2 className='font-ibm h6 fw-bold mt-3'>Expenses</h2>
                                    {
                                          expenses.length > 0 ?
                                                <div className="table-responsive">
                                                      <table style={{ fontSize: "13px" }} className="table table-bordered">
                                                            <thead>
                                                                  <tr>
                                                                        <th style={{ fontWeight: '400' }} scope="col" className='font-ibm'>Date</th>
                                                                        <th style={{ fontWeight: '400' }} scope="col" className='font-ibm'>Type</th>
                                                                        <th style={{ fontWeight: '400' }} scope="col" className='text-center font-ibm'>Name</th>
                                                                        <th style={{ fontWeight: '400' }} scope="col" className='text-center font-ibm'>Cost</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {
                                                                        expenses.map((item, index) =>
                                                                              index % 2 === 0 ?
                                                                                    <tr key={index} className='bg-white'>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>{new Date(item.date).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}</th>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>{item.type}</th>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>
                                                                                                {/* {item.name} <br /> */}
                                                                                                {item.data.map((subItem, i) => <span key={i}>{subItem.name} <br /></span>)}
                                                                                                <span className="fw-bold">Total Cost</span>
                                                                                          </th>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>
                                                                                                {item.data.map((subItem, i) => <span key={i}>{Number(subItem.amount).toLocaleString()} <br /></span>)}
                                                                                                <span className="fw-bold">{item.data.reduce((a, c) => a + c.amount, 0).toLocaleString()}</span>
                                                                                          </th>
                                                                                    </tr>
                                                                                    :
                                                                                    <tr key={index} className=''>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>{new Date(item.date).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}</th>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>{item.type}</th>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>
                                                                                                {/* {item.name} <br /> */}
                                                                                                {item.data.map((subItem, i) => <span key={i}>{subItem.name} <br /></span>)}
                                                                                                <span className="fw-bold">Total Cost</span>
                                                                                          </th>
                                                                                          <th style={{ fontWeight: '400' }} className='font-ibm'>
                                                                                                {item.data.map((subItem, i) => <span key={i}>{subItem.amount.toLocaleString()} <br /></span>)}
                                                                                                <span className="fw-bold">{Number(item.data.reduce((a, c) => a + Number(c.amount), 0)).toLocaleString()}</span>
                                                                                          </th>
                                                                                    </tr>
                                                                        )
                                                                  }
                                                            </tbody>
                                                      </table>
                                                </div>
                                                :
                                                <p className='text-danger my-2 font-ibm'>Either No Data Found or is loading. Please refresh <button onClick={() => window.location.reload()} className='btn btn-secondary font-ibm'>Refresh</button></p>
                                    }
                              </div>

                        </div>
                  </div>
                  <ToastContainer autoClose={1200} />
            </section>
      );
};

export default ExpenseTrack;