import React, { useState } from 'react'
// Components
import { Input, Button, Textarea } from "@nextui-org/react"
import Swal from 'sweetalert2';
// UseForm
import { useForm } from "react-hook-form";
import https from '../../Assets/https';

function DeptEditForm({ clientID, userDept }) {
  // UseForm Config
  const { register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();

  const [pay, setPay] = useState("pay_debt")

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
  function WarnPrice() {
    Swal.fire({
        title: `Paid Debt is Higher than it was`,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

  // Submit DATA
  const onSubmit = (data) => {
    if(data.price > userDept){
      WarnPrice()
    }else{
      https
      .post('/histories', { ...data, status: pay, client_id: clientID })
      .then((res) => Success())
      .catch(err => Warn(err.response.status))
    }
    console.log(clientID)
  }

  return (
    <div className='single_client-item'>
      <h3>Information about dept and product</h3>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='payment_type'>
          <div
            onClick={() => setPay("pay_debt")}
            className={pay === "pay_debt" ? 'payment_button blue' : 'payment_button'}
          >
            <div className='payment_button-wrapper'>
              <div className='payment_button-content blue'>
                Pay Dept
              </div>
            </div>
          </div>
          <div
            onClick={() => setPay("debt")}
            className={pay === "debt" ? 'payment_button red' : 'payment_button'}
          >
            <div className='payment_button-wrapper'>
              <div className='payment_button-content red'>
                Take Dept
              </div>
            </div>
          </div>
        </div>
        <Input
          rounded
          bordered
          label={`Amount of ${pay === "pay_debt" ? 'Payment' : 'Debt'}`}
          placeholder="10000"
          type='number'
          color="primary"
          width='100%'
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
            Add
          </Button>
        </div>
        {/* initialValue={data?.created_at?.split(" ")[0]} */}
      </form>
    </div>
  )
}

export default DeptEditForm