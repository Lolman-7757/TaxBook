import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// Icons 
import { TbArrowBack } from 'react-icons/tb'
// Components
import { Input, Button } from "@nextui-org/react"
import Swal from 'sweetalert2'
// API
import https from '../../Assets/https'

function SingleClient() {
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

    const [data, setData] = useState([])
    let { id } = useParams()
    // GET DATA
    useEffect(() => {
        https
            .get(`/clients/${id}`)
            .then(res => setData(res.data.data[0]))
            .catch(err => Warn(err.response.status))
    }, [])


    return (
        <>
            <div className='back_block'>
                <Link to='/'>
                    <p className='back'>Back</p>
                    <TbArrowBack />
                </Link>
            </div>
            <section className='single_client'>
                <div className='single_client-header'>
                    <h2>{data.name}</h2>
                    <h3>Personal information of Client</h3>
                </div>
                <div className='form'>
                    <Input
                        rounded
                        bordered
                        color="primary"
                        label='Client Name '
                        width='90%'
                        className='main_table-search'
                        readOnly
                        initialValue={data?.name}
                    />
                    <Input
                        rounded
                        bordered
                        color="primary"
                        label='Client Phone Number'
                        width='90%'
                        className='main_table-search'
                        readOnly
                        initialValue={data?.phone}
                    />
                    <Input
                        rounded
                        bordered
                        color="primary"
                        label='Client Name '
                        width='90%'
                        className='main_table-search'
                        readOnly
                        initialValue={data?.address}
                    />
                    <Input
                        rounded
                        bordered
                        color="primary"
                        label='Amount'
                        width='90%'
                        className='main_able-search'
                        readOnly
                        initialValue={data.wallet_summa}
                    />
                </div>
            </section>
        </>
    )
}

export default SingleClient