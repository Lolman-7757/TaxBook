import React, { useState, useEffect } from 'react'
// Components
import { Input, Button } from "@nextui-org/react"
import Swal from 'sweetalert2'
// API
import https from '../../Assets/https'

function UserEditForm({ clientID, userInfo }) {
    const [data, setData] = useState({})

    useEffect(() => {
        setData(userInfo);
    }, [userInfo])

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

    // Edit
    function Edit() {
        https
            .post(`/clients/${clientID}`, data)
            .then(res => Success())
            .catch(err => Warn(err.response.status))
    }

    // Back
    function BackFun() {
        https
            .put(`/clients/${clientID}`, data)
            .then(res => Success())
            .catch(err => Warn(err.response.status))
        setData(userInfo)
    }
    return (
        <div className='single_client-item'>
            <h3>Personal information of Client</h3>
            <form className='form'>
                <Input
                    rounded
                    bordered
                    color="primary"
                    label='Client Name'
                    width='90%'
                    className='main_table-search'
                    value={userInfo?.name}
                    onChange={(e) => {
                        let newData = { ...data }
                        newData.name = e.target.value
                        setData(newData)
                    }}
                />
                <Input
                    rounded
                    bordered
                    color="primary"
                    label='Client Phone Number'
                    width='90%'
                    className='main_table-search'
                    value={userInfo?.phone}
                    onChange={(e) => {
                        let newData = { ...data }
                        newData.phone = e.target.value
                        setData(newData)
                    }}
                />
                <Input
                    rounded
                    bordered
                    color="primary"
                    label='Client Address'
                    width='90%'
                    className='main_table-search'
                    value={userInfo?.address}
                    onChange={(e) => {
                        let newData = { ...data }
                        newData.address = e.target.value
                        setData(newData)
                    }}
                />
                <div className='buttons_block'>
                    <Button onPress={() => BackFun()} color="primary" auto shadow size='xl'>
                        Save
                    </Button>
                    <Button onClick={() => Edit()} color="warning" auto shadow size='xl'>
                        Undo Edit
                    </Button>
                </div>
            </form>
            <Input
                rounded
                bordered
                color={userInfo?.wallet_summa < 0 ? "error" : "primary"}
                status={userInfo?.wallet_summa < 0 ? "error" : "primary"}
                label='Debt'
                width='90%'
                className='main_debt'
                readOnly
                initialValue={userInfo?.wallet_summa}
            />
        </div>
    )
}

export default UserEditForm