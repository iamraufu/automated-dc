import React from 'react';
import useAuth from '../../hooks/useAuth';
import folder from '../../images/folder.svg'
import { Link } from 'react-router-dom';

const UploadedSTO = () => {

    const { sto } = useAuth()

    return (
        <div className='mt-3'>
            <div className="row align-items-center">
                {
                    sto.length > 0 &&
                    sto.map(data =>
                        <div key={data._id} className="col-sm-1">
                            <Link to={`/picker-details/${data._id}`} className='text-decoration-none'>
                                <img width={45} className='img-fluid mx-auto d-block' src={folder} alt={data.date} />
                                <p style={{ fontSize: '13px' }} className='font-ibm p-0 text-center mt-2 text-black'>{new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default UploadedSTO;