import React from 'react';
import noticeIcon from '../../images/notice.svg'
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const HomeNotice = () => {

    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => createNotice(data);

    const createNotice = data => {

        const details = {
            title: data.title,
            description: data.description,
            status: 0
        }

        fetch('https://shwapnodc.onrender.com/notice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(data => data.json())
            .then(response => {
                if (response.status === true) {
                    document.getElementById('notice_form').reset()
                    toast.success(`${response.message}`, {
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
                else {
                    toast.warn(`${response.message}`, {
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

    return (
        <form id='notice_form' onSubmit={handleSubmit(onSubmit)} style={{ borderRadius: '9px', border: '1px solid #E5E5E5' }} className="bg-white px-5 pt-3 mt-4">
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <img className='me-2 img-fluid' src={noticeIcon} alt="create notice" />
                        <span className="font-inter">Create Notice</span>
                    </div>
                    {
                        user.role === 1 ? <button style={{ borderRadius: '10px' }} className="btn btn-sm btn-danger px-3 font-ibm">Post Notice</button> :
                            <button style={{ borderRadius: '10px' }} className="btn btn-sm btn-danger px-3 font-ibm disabled">Post Notice</button>
                    }
                </div>

                {
                    user.role === 1 ?
                        <div className="mt-3">
                            <input type="text" placeholder='Notice Headline' className='select w-100 font-inter' name="" {...register("title", { required: true })} />
                            <p>{errors.title && <span className='text-danger font-inter'>*This is required</span>}</p>

                            <textarea rows='2' type="text" placeholder='Our outlet delivery will be finished by 11 am in morning. This rules applied for Dhaka zone only' className='select w-100 font-inter' name="" {...register("description", { required: true })} />
                            <p>{errors.description && <span className='text-danger font-inter'>*This is required</span>}</p>
                        </div> :
                        <div className="mt-3">
                            <input type="text" placeholder='Notice Headline' className='select w-100 font-inter' name="" {...register("title", { required: true })} disabled />
                            <p>{errors.title && <span className='text-danger font-inter'>*This is required</span>}</p>

                            <textarea rows='2' type="text" placeholder='Our outlet delivery will be finished by 11 am in morning. This rules applied for Dhaka zone only' className='select w-100 font-inter' name="" {...register("description", { required: true })} disabled />
                            <p>{errors.description && <span className='text-danger font-inter'>*This is required</span>}</p>
                        </div>
                }
            </div>
        </form>
    );
};

export default HomeNotice;