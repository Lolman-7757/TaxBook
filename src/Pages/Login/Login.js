import React, { useState } from 'react'
// Styles
import './Login.css'
// Components
import { Input } from '@nextui-org/react';
import Swal from 'sweetalert2';
// UseForm
import { useForm } from "react-hook-form";
// API
import https from '../../Assets/https'
import axios from 'axios'
import Main from '../Main/Main';

function Login() {
    const [isRotated, setIsRotated] = useState(true)
    // UseForm
    const [token, setToken] = useState()

    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alerts
    function Success() {
        Swal.fire({
            title: `Success ${isRotated ? "login" : "registration"}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn(num) {
        Swal.fire({
            title: `Error ${num}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }


    async function onSubmit(data) {
        if (isRotated) {
            delete data.name
        }
        axios.get('http://iztileuoff.beget.tech/sanctum/csrf-cookie', { withCredentials: true })
            .then(response => {
                https.post(`${isRotated ? '/login' : '/register'}`, data)
                    .then(res => {
                        Success()
                        // console.log(token)
                        // setToken(res.data.token)
                        window.localStorage.setItem('token', res.data.data.token)
                        setToken(window.localStorage.getItem('token'))
                    })
                    .catch(err => Warn(err.response.status))
            }).catch(err =>  Warn(err.response.status) )
    }
    if (!window.localStorage.getItem('token')) {
        return (
            <section className='login'>
                <div className='login_wrapper'>
                    <div className='login_card'>
                        {
                            isRotated ? (
                                <div className='login_front'>
                                    <form className='login_form' onSubmit={handleSubmit(onSubmit)}>
                                        <h2>Login</h2>
                                        <Input
                                            color='primary'
                                            label='Enter your email'
                                            clearable
                                            bordered
                                            type='email'
                                            placeholder='user@gmail.com'
                                            className='login_input'
                                            {...register("email", { required: true })}
                                        />
                                        <Input.Password
                                            color='primary'
                                            label="Enter your password"
                                            bordered
                                            className='login_input'
                                            placeholder='user12345'
                                            {...register("password", { required: true })}
                                        />
                                        <button className='login_btn' type='submit'>SIGN IN</button>
                                        <p className='login_flip' onClick={() => setIsRotated(!isRotated)}>Don't have an account? Sign up then!</p>
                                    </form>
                                </div>
                            ) : (
                                <div className='login_back'>
                                    <form className='login_form' onSubmit={handleSubmit(onSubmit)}>
                                        <h2>Registration</h2>
                                        <Input
                                            color='primary'
                                            label='Enter your Name'
                                            clearable
                                            bordered
                                            placeholder='UserName'
                                            className='login_input'
                                            {...register("name", { required: true })}
                                        />
                                        <Input
                                            color='primary'
                                            label='Enter your email'
                                            clearable
                                            bordered
                                            type='email'
                                            placeholder='user@gmail.com'
                                            className='login_input'
                                            {...register("email", { required: true })}
                                        />
                                        <Input.Password
                                            color='primary'
                                            label="Enter your password"
                                            bordered
                                            className='login_input'
                                            placeholder='user12345'
                                            {...register("password", { required: true })}
                                        />
                                        <button className='login_btn' type='submit'>REGISTER</button>
                                        <p className='login_flip' onClick={() => setIsRotated(!isRotated)}>Already have an account? Login then!</p>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        )
    }else{
        return(<Main/>)
    }
}

export default Login