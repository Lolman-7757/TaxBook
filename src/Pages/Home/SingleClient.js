import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// Icons 
import { TbArrowBack } from 'react-icons/tb'

// Components
import { Table, Row, Col, Tooltip, Input } from "@nextui-org/react";
import { IconButton } from "../../Assets/imgs/IconButton";
import { DeleteIcon } from "../../Assets/imgs/DeleteIcon";
import Swal from 'sweetalert2'

// API
import https from '../../Assets/https'
import UserEditForm from '../../Components/Forms/UserEditForm'
import DeptEditForm from '../../Components/Forms/DeptEditForm'

function SingleClient() {
    const [data, setData] = useState({})
    let { id } = useParams()

    // Alerts
    function Success() {
        Swal.fire({
            title: `History successfully deleted!`,
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

    // GET DATA
    useEffect(() => {
        https
            .get(`/clients/${id}`)
            .then(res => {
                setData(res.data.data[0])
            })
            .catch(err => Warn(err.response.status))
    }, [])

    // DELETE HISTORY
    const deleteData = (info) => {
        https
            .delete(`/histories/${info.id}`)
            .then(res => {
                setData(data?.histories?.filter(item => item.id !== info.id))
                Success(info.name)
            })
            .catch(err => Warn(err))
    }


    return (
        <>
            <div className='back_block'>
                <Link to='/'>
                    <p className='back'>Back</p>
                    <TbArrowBack />
                </Link>
            </div>
            <section className='single_client'>
                <h1>{data.name}</h1>
                <div className='single_client-container'>
                    <UserEditForm clientID={data.wallet_id} userInfo={data} />
                    <DeptEditForm clientID={data.wallet_id} userDept={data.price} />
                </div>
            </section>
            <div className='main_table_history'>
                <h2>HISTORIES</h2>
                <div className='main_table'>
                    <Table
                        // bordered
                        shadow={false}
                        aria-label="Example static collection table"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}
                        selectionMode="single"
                    >
                        <Table.Header>
                            <Table.Column>ID</Table.Column>
                            <Table.Column>PRODUCT NAME</Table.Column>
                            <Table.Column>AMOUNT</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>COMMENT</Table.Column>
                            <Table.Column>PAY DATE</Table.Column>
                            <Table.Column>ACTION</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                data?.histories?.map((dataItem, dataItemIndx) => {
                                    return (
                                        <Table.Row key={dataItemIndx}>
                                            <Table.Cell>{dataItem.id}</Table.Cell>
                                            <Table.Cell>{dataItem.info}</Table.Cell>
                                            <Table.Cell>{dataItem.price}</Table.Cell>
                                            <Table.Cell>
                                                <span className={ dataItem.status === "pay_debt" ? "green" : "redcard" }>
                                                    {dataItem.status === "pay_debt" ? "PAY DEBT" : "TAKE DEBT"}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>{dataItem.comment == null ? "no comment" : dataItem.comment}</Table.Cell>
                                            <Table.Cell>{dataItem?.created_at?.split(" ")[0]}</Table.Cell>
                                            <Table.Cell>
                                                <Row justify="center" align="center">
                                                    <Col css={{ d: "flex" }}>
                                                        <Tooltip
                                                            content="Delete user"
                                                            color="error"
                                                            onClick={() => deleteData(dataItem)}
                                                        >
                                                            <IconButton>
                                                                <DeleteIcon size={20} fill="#FF0080" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Col>
                                                </Row>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default SingleClient