import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import folder from '../../images/folder.svg'
import { Link } from 'react-router-dom';
import FolderSkeleton from '../Skeleton/FolderSkeleton';
import DatePicker from "react-datepicker";

const UploadedSTO = () => {

    const { user, stoDates, setStoDates, setSto } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetch(`https://shwapnodc.onrender.com/sto-email-date-range/${user.email}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    setStoDates([...new Set(data.sto.map(item => item.date))])
                    setSto(data.sto)
                    setErrorMessage("")
                }
                else {
                    setErrorMessage(data.message)
                }
            })
    }, [user.email, startDate, endDate, setStoDates, setSto])

    return (
        <div className='mt-3'>
            <div className="d-flex">
                <div className="font-ibm">From: <DatePicker className='select bg-white' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                <div className="font-ibm">To: <DatePicker className='select bg-white' selected={endDate} onChange={(date) => setEndDate(date)} /></div>
            </div>
            <p className='font-ibm text-danger my-3'>{errorMessage}</p>
            <div className="row align-items-center mt-3">
                {
                    stoDates.length > 0 ?
                        stoDates.map(date =>
                            <div key={date} className="col-sm-1">
                                <Link to={`/picker-date/${date}`} className='text-decoration-none'>
                                    <img width={45} className='img-fluid mx-auto d-block' src={folder} alt={date} />
                                    <p style={{ fontSize: '13px' }} className='font-ibm p-0 text-center mt-2 text-black'>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </Link>
                            </div>
                        )
                        :
                        <>
                            {
                                !errorMessage.length > 0 && <>
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                    <FolderSkeleton />
                                </>
                            }

                        </>

                }
            </div>
        </div>
    );
};

export default UploadedSTO;