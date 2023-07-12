import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import excelIcon from '../../images/excel.png'
import { Link } from 'react-router-dom';
import FolderSkeleton from '../Skeleton/FolderSkeleton';
import DatePicker from "react-datepicker";
import categoryCodeData from '../../data/catcode.json'
// import outletData from '../../data/outlets.json'
import closeIcon from '../../images/close.svg'
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

const UploadedSTO = () => {

    const { user, setSto, viewSto, setViewSto, setAssignedSto, productCategory, setProductCategory, startDate, setStartDate, endDate, setEndDate } = useAuth()
    const [errorMessage, setErrorMessage] = useState("")
    // const [outletCode, setOutletCode] = useState([])
    const [flag, setFlag] = useState(1)
    const [flag2, setFlag2] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            setFlag(1)
            setFlag2(1)
            console.log("Loading...")
            const response = await toast.promise(
                fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}`),
                {
                    pending: 'Fetching the latest data...',
                    success: 'Latest data updated',
                    error: 'There is an error fetching. Please try again!'
                }
            );
            const result = await response.json();
            if (result.status === true) {
                setFlag(0)
                setErrorMessage("")
                setSto(result.sto)
                const stoData = result.sto.reduce((result, obj) => {
                    const sto = obj.sto;

                    const existingItem = result.find(item => {
                        return ('category' in obj && item.sto === sto)
                    });

                    if (existingItem) {
                        existingItem.sku += 1;
                    }
                    else if ('category' in obj) {
                        const item = {
                            code: obj.code,
                            name: obj.name,
                            sto: sto,
                            sku: 1,
                            dc: obj.dc,
                            status: 'Pending'
                        };
                        result.push(item);
                    }
                    return result;
                }, []);
                setViewSto(_.orderBy(stoData, ['code'], ['asc']))
                setAssignedSto(_.orderBy(stoData, ['code'], ['asc']))
            }
            else {
                setFlag2(0)
                setErrorMessage(result.message)
            }

            // try {
            //     const response = await fetch(`https://shwapnodc.onrender.com/sto-email-date-range-category/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}/${productCategory}`);
            //     const result = await response.json();
            //     if (result.status === true) {
            //         setFlag(0)
            //         setErrorMessage("")
            //         setSto(result.sto)
            //         const stoData = result.sto.reduce((result, obj) => {
            //             const sto = obj.sto;

            //             const existingItem = result.find(item => {
            //                 return ('category' in obj && item.sto === sto)
            //             });

            //             if (existingItem) {
            //                 existingItem.sku += 1;
            //             }
            //             else if ('category' in obj) {
            //                 const item = {
            //                     code: obj.code,
            //                     name: obj.name,
            //                     sto: sto,
            //                     sku: 1,
            //                     dc: obj.dc,
            //                     status: 'Pending'
            //                 };
            //                 result.push(item);
            //             }
            //             return result;
            //         }, []);
            //         setViewSto(_.orderBy(stoData, ['code'], ['asc']))
            //     }
            //     else {
            //         setFlag2(0)
            //         setErrorMessage(result.message)
            //     }
            // }
            // catch (error) {
            //     // fetchData();
            // }
        };
        productCategory.length && fetchData();
    }, [user.email, startDate, endDate, setViewSto, setSto, productCategory, setAssignedSto
        // , outletCode
    ])

    // useEffect(() => {
    //     const filterData = async () => {
    //         const filteredCategoryData = categoryCodeData.filter(obj => productCategory.includes(obj.category));

    //         const filteredStoData = sto.filter(data => {
    //             const categoryCode = data.article.toString().slice(0, 2);
    //             const matchingCategory = filteredCategoryData.find(obj => obj.code === categoryCode);
    //             return matchingCategory !== undefined;
    //         })
    //         // setFilteredData(filteredStoData)

    //         // finding unique 
    //         const uniqueOutletArray = [...new Set(filteredStoData.map(item => item.code))];
    //         const resultArray = uniqueOutletArray.map(code => {
    //             return {
    //                 code: code,
    //                 name: filteredStoData.filter(data => data.code === code)[0].name,
    //                 sto: filteredStoData.filter(data => data.code === code)[0].sto,
    //                 sku: filteredStoData.filter(item => item.code === code).length,
    //                 data: filteredStoData.filter(data => data.code === code)
    //             }
    //         })

    //         // filtering sku 
    //         // const stoData = resultArray.reduce((result, obj) => {
    //         //     const sto = obj.STO;

    //         //     const existingItem = result.find(item => {
    //         //         return ('article' in obj && item.sto === sto)
    //         //     });

    //         //     if (existingItem) {
    //         //         existingItem.sku += 1;
    //         //     }
    //         //     else {
    //         //         const item = {
    //         //             code: obj.code,
    //         //             name: obj.name,
    //         //             sto: sto,
    //         //             sku: 1,
    //         //             dc: obj.dc,
    //         //             status: 'Pending'
    //         //         };
    //         //         result.push(item);
    //         //     }
    //         //     return result;
    //         // }, []);

    //         // setFilteredData(stoData)
    //         setFilteredData(resultArray)
    //     }
    //     sto.length > 0 && filterData()
    // }, [productCategory, sto])

    // const groupByOutlet = () => {
    //     const uniqueOutletArray = [...new Set(filteredData.map(item => item.code))];
    //     const resultArray = uniqueOutletArray.map(code => {
    //         return {
    //             data: filteredData.filter(data => data.code === code),
    //             code: code,
    //             sto: filteredData.filter(data => data.code === code)[0].sto,
    //             name: filteredData.filter(data => data.code === code)[0].name,
    //             sku: filteredData.filter(item => item.code === code).reduce((accumulator, currentValue) => accumulator + currentValue.sku, 0)
    //         }
    //     })
    //     setFilteredData(resultArray)
    // }

    const handleCategoryAdd = value => {
        productCategory.indexOf(value) === -1 ? setProductCategory([...productCategory, value]) : setProductCategory(productCategory)
    }

    const handleCategoryRemove = elm => {
        setProductCategory(productCategory.filter((item) => item !== elm))
    }

    // const handleOutletAdd = value => {
    //     productCategory.indexOf(value) === -1 ? setOutletCode([...outletCode, value]) : setOutletCode(outletCode)
    // }

    // const handleOutletRemove = elm => {
    //     setProductCategory(outletCode.filter((item) => item !== elm))
    // }

    return (
        <div className=''>
            <div className="d-flex align-items-center">
                <div className="font-ibm"><p className='ms-1 mb-0'>From:</p> <DatePicker className='select bg-white' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                <div className="font-ibm ms-3"><p className='ms-1 mb-0'>To:</p> <DatePicker className='select bg-white' selected={endDate} onChange={(date) => setEndDate(date)} /></div>
                <div className="font-ibm ms-3">
                    <p className='mb-0 ms-1'>Product Category</p>
                    <select className='select bg-white' onChange={(e) => {
                        setProductCategory(e.target.value)
                        handleCategoryAdd(e.target.value)
                    }
                    }>
                        <option className='font-ibm my-1' value="" selected disabled>Select</option>
                        {
                            categoryCodeData.map((product, index) =>
                                <option key={index + 1} className='font-ibm my-1' value={product.code}>{product.category}</option>
                            )
                        }
                    </select>
                </div>

                {/* <div className="font-ibm ms-3">
                    <p className='mb-0 ms-1'>Outlet Name</p>
                    <select className='select bg-white' onChange={(e) => {
                        setOutletCode(e.target.value)
                        handleOutletAdd(e.target.value)
                    }
                    }>
                        <option className='font-ibm my-1' value="" selected disabled>Select</option>
                        {
                            outletData.map((outlet, index) =>
                                <option key={index + 1} className='font-ibm my-1' value={outlet.code}>{outlet.code}</option>
                            )
                        }
                    </select>
                </div> */}
            </div>

            <div className="my-2 font-ibm">
                <span>Master Category: </span>
                {
                    productCategory.map((item, index) =>
                        <button key={index} onClick={() => handleCategoryRemove(item)} type="button" className="btn btn-sm btn-dark me-2 align-items-center my-1"><span>{item}</span><img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>
                    )
                }
            </div>

            {/* <div className="my-2 font-ibm">
                <span>Outlet Code: </span>
                {
                    outletCode.map((item, index) =>
                        <button key={index} onClick={() => handleOutletRemove(item)} type="button" className="btn btn-sm btn-dark me-2 align-items-center my-1"><span>{item}</span><img className='img-fluid mb-1 ms-1' width={15} src={closeIcon} alt="" /></button>
                    )
                }
            </div> */}

            {
                errorMessage ?
                    <p className='font-ibm text-danger my-3 ps-1'>{flag2 === 0 && errorMessage}</p> :
                    <>
                        {
                            flag === 0 && <p className='font-ibm'>Showing {viewSto.reduce((acc, curr) => acc + curr.sku, 0).toLocaleString()} SKU</p>
                        }
                    </>
            }

            <div className="my-3">
                {
                    viewSto.length > 0 ?
                        <Link to={`/picker-details`} className='text-decoration-none'>
                            <img width={45} className='img-fluid' src={excelIcon} alt="Excel Icon" />
                        </Link>
                        :
                        <>
                            {
                                ((!errorMessage && flag === 1) || (errorMessage && flag2 === 1)) &&
                                <>
                                    <p className='font-ibm'>Select any category and code to load data</p>
                                    <FolderSkeleton />
                                </>
                            }
                        </>
                }
            </div>
            <ToastContainer />
        </div>
    );
};

export default UploadedSTO;