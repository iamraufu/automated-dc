import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import excelIcon from '../images/excel.png'
import FolderSkeleton from '../components/Skeleton/FolderSkeleton'

const PickerDate = () => {

    const { user } = useAuth()
    const { date } = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://shwapnodc.onrender.com/sto-email-date/${user.email}/${date}`)
            .then(res => res.json())
            .then(data => {
                data.status && setData(data.sto)
            })
    }, [date, user.email])

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">
                    <div className="row align-items-center">
                        {
                            data.length > 0 ?
                                data.map(data =>
                                    <div key={data._id} className="col-sm-1">
                                        <Link to={`/picker-details/${data._id}`} className='text-decoration-none'>
                                            <img width={45} className='img-fluid mx-auto d-block' src={excelIcon} alt={data.date} />
                                            <p style={{ fontSize: '13px' }} className='font-ibm p-0 text-center mt-2 text-black'>{new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </Link>
                                    </div>
                                )
                                :
                                <FolderSkeleton />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PickerDate;