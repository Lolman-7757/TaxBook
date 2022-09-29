import React from 'react'
import { Link, useParams } from 'react-router-dom'

// Components
import { Input, Button, Textarea } from "@nextui-org/react"
import Swal from 'sweetalert2';
import { TbArrowBack } from 'react-icons/tb'

// UseForm
import { useForm } from "react-hook-form";
import https from '../../Assets/https';

function AddClient() {
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alerts
    function Success() {
        Swal.fire({
            title: `Client was successfully added!`,
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

    const onSubmit = (data) => {
        https
            .post('/clients', {...data, status: "debt"})
            .then((res) => Success())
            .catch(err => Warn(err.response.status))
            console.log(window.localStorage.getItem('token'))
    }

    return (
        <>
            <div className='back_block'>
                <Link to='/'>
                    <p className='back'>Back</p>
                    <TbArrowBack />
                </Link>
            </div>
            <section className='client'>
                <div className='client_header'>
                    <h2>Add new Client!</h2>
                    <h3>Fill out this form with client information to add. </h3>
                </div>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        rounded
                        bordered
                        placeholder="Andrew Tate"
                        color="primary"
                        label='Client Name '
                        width='90%'
                        className='main_table-search'
                        {...register("name", { required: true })}
                    />
                    <Input
                        rounded
                        bordered
                        placeholder="99 457 77 57"
                        color="primary"
                        label='Client Phone Number'
                        width='90%'
                        className='main_table-search'
                        {...register("phone", { required: true })}
                    />
                    <Input
                        rounded
                        bordered
                        placeholder="7 Shady Court Woodhaven, NY 11421"
                        color="primary"
                        label='Address'
                        width='90%'
                        className='main_table-search'
                        {...register("address", { required: true })}
                    />
                    <Input
                        rounded
                        bordered
                        placeholder="1000000"
                        color="primary"
                        label='Debt Ammount'
                        width='90%'
                        className='main_table-search'
                        {...register("price", { required: true })}
                    />
                    <Input
                        rounded
                        bordered
                        placeholder="1 pepsi"
                        color="primary"
                        label='Products in Dept'
                        width='90%'
                        className='main_table-search'
                        {...register("info", { required: true })}
                    />
                    <Textarea
                        rounded
                        bordered
                        label="Comment to a dept"
                        placeholder="Dept was taken by the oldest person in family"
                        color="primary"
                        width='80%'
                        {...register("comment", { required: true })}
                    />
                    <div className='buttons_block'>
                        <Button type='submit' color="primary" auto shadow size='xl'>
                            Submit
                        </Button>
                        <Button type='reset' color="warning" auto shadow size='xl'>
                            Reset
                        </Button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default AddClient