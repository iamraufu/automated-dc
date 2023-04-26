import React from 'react';
import noticeIcon from '../../images/notice.svg'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const HomeNotice = () => {

    const navigate = useNavigate()
    const { notice, setNotice } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => createNotice(data);

    const createNotice = data => {

        fetch('http://localhost:5000/notice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
            .then(response => {
                if (response.status === true) {
                    setNotice([...notice, data])
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: `${response.message}`,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                            navigate('/notice')
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            navigate('/notice')
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${response.message}`
                    })
                }
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ borderRadius: '9px', border: '1px solid #E5E5E5' }} className="bg-white px-5 pt-3 mt-4">
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <img className='me-2 img-fluid' src={noticeIcon} alt="create notice" />
                        <span className="font-inter">Create Notice</span>
                    </div>
                    <button style={{ borderRadius: '10px' }} className="btn btn-sm btn-danger px-3 font-ibm">Post Notice</button>
                </div>

                <div className="mt-3">
                    <input type="text" placeholder='Notice Headline' className='select w-100 font-inter' name="" {...register("title", { required: true })} />
                    <p>{errors.title && <span className='text-danger font-inter'>*This is required</span>}</p>

                    <textarea rows='2' type="text" placeholder='Our outlet delivery will  be finished by  11 am in morning. This rules applied for Dhaka zone only' className='select w-100 font-inter' name="" {...register("description", { required: true })} />
                    <p>{errors.description && <span className='text-danger font-inter'>*This is required</span>}</p>
                </div>
            </div>
        </form>
    );
};

export default HomeNotice;