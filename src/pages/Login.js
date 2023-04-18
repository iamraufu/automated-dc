import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    useLocation,
    useNavigate
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../images/logo.svg'

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    const { user, setUser } = useAuth();

    user?.email && navigate(from, { replace: true })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processLogin(data);
    const [loginError, setLoginError] = useState('');

    const processLogin = (details) => {

        document.getElementById('action').style.display = 'none'
        document.getElementById('processing').style.display = 'block'

        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(details)
                });
                const result = await response.json();
                if (result.status === true) {
                    setUser(result.user)
                    setLoginError('')
                    localStorage.setItem('uId', result.user._id)
                }
                else {
                    setLoginError(result.message)
                    document.getElementById('action').style.display = 'block'
                    document.getElementById('processing').style.display = 'none'
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    return (
        <div className='bg-brand d-flex justify-content-center align-items-center'>

            <div style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className="bg-white py-5">
                <img className='img-fluid mx-auto d-block my-2' src={logo} alt="logo of Shwapno" />
                <h1 className='fs-4 text-center fw-bold font-ibm'>DC Automation</h1>

                <div className="mt-5 px-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-3">
                            <input placeholder='Enter Email' className='custom-input font-ibm' type='text' {...register("email", { required: true })} />
                            <br />
                            {errors.email && <span className='text-danger fw-bold font-ibm p-1'>*Email required</span>}
                        </div>

                        <div className="form-group mb-3">
                            <input placeholder='Enter Password' className='custom-input font-ibm' type='password' {...register("password", { required: true })} />
                            <br />
                            {errors.password && <span className='text-danger fw-bold p-1 font-ibm'>*Password required</span>}
                        </div>

                        <p className='text-danger fw-bold font-ibm'>{loginError}</p>

                        <input id='action' type="submit" className='btn-action w-100 text-center font-ibm py-2' value='Sign in' />
                    </form>

                    <button style={{ display: 'none' }} id='processing' className='btn-action w-100 font-ibm py-2' disabled><div style={{ height: '15px', width: '15px' }} className="spinner-border me-1"></div>Processing . . .</button>
                </div>

            </div>
        </div>
    );
};

export default Login;