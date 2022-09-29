import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Components
import { Table, Row, Col, Tooltip, Radio } from "@nextui-org/react";
import { IconButton } from "../../Assets/imgs/IconButton";
import { EyeIcon } from "../../Assets/imgs/EyeIcon";
import { EditIcon } from "../../Assets/imgs/EditIcon";
import { DeleteIcon } from "../../Assets/imgs/DeleteIcon";
import Swal from 'sweetalert2';

// Styles
import './History.css'

// API
import https from '../../Assets/https';

function History() {
  const [data, setData] = useState([])
  const [paginations, setPaginations] = useState([])
  const [pay, setPay] = useState("")

  // Alerts
  function Success() {
    Swal.fire({
      title: `History has been successfully deleted!`,
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
  const getData = (pageNum, payType) => {
    https
      .get(`/histories?page=${pageNum}&status=${payType}`)
      .then(res => {
        setData(res.data.data);
        setPaginations(res.data.meta.links)
        setPay(payType)
      })
      .catch(err => Warn(err.response.status))
  }

  useEffect(() => {
    getData(1,"")
  }, [])

  // DELETE DATA
  const deleteData = (id) => {
    https
      .delete(`/histories/${id}`)
      .then(res => {
        setData(data.filter(dat => dat.id !== id))
        Success()
      })
      .catch(err => Warn(err.response.status))
  }

  // Arrow putting Function
  function arrowFunc(label) {
    if (label.split('')[0] === 'N') {
      return 'Next >'
    } else if (label.split('')[0] === '&') {
      return '< Previous'
    } else {
      return label
    }
  }

  return (
    <section className='main_section history'>
      <h2 className='main_title'>History</h2>
      <Radio.Group label="Sort" defaultValue="" className='history_radio' onChange={(e) => getData(1,e)}>
        <Radio value="">All</Radio>
        <Radio value="pay_dept">DEPT PAID</Radio>
        <Radio value="dept">DEPT TAKEN</Radio>
      </Radio.Group>
      <div className='main_table-wrapper'>
        <div className='main_table'>
          <Table
            bordered
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
              <Table.Column>NAME</Table.Column>
              <Table.Column>PHONE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>INFO</Table.Column>
              <Table.Column>AMMOUNT</Table.Column>
              <Table.Column>DEPT DATE</Table.Column>
              <Table.Column>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {
                data?.map((dataItem, dataItemIndx) => {
                  return (
                    <Table.Row key={dataItemIndx}>
                      <Table.Cell>{dataItem.id}</Table.Cell>
                      <Table.Cell>{dataItem.client_name}</Table.Cell>
                      <Table.Cell>{dataItem.client_phone}</Table.Cell>
                      <Table.Cell>
                        <span className={dataItem.status === "pay_debt" ? "green" : "redcard"}>
                          {dataItem.status === "pay_debt" ? "PAY DEBT" : "TAKE DEBT"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{dataItem.info}</Table.Cell>
                      <Table.Cell>{dataItem.price}</Table.Cell>
                      <Table.Cell>{dataItem?.created_at?.split(" ")[0]}</Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Details">
                              <Link to={`/client/${dataItem.client_id}`}>
                                <IconButton>
                                  <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                              </Link>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Delete history"
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
        <div className='pagination_block_wrapper'>
          <div className='pagination_block'>
            {
              paginations?.map((pagination, paginationID) => {

                return (
                  <button
                    className={pagination.active ? 'pagination_button pagination_active' : 'pagination_button'}
                    id={pagination?.url === null ? 'pagination_false' : ''}
                    key={paginationID}
                    onClick={() => {
                      if (pagination?.url !== null) {
                        getData(
                          Number(pagination?.url.split('')[pagination?.url.length - 1]),
                          pay
                        )
                      }
                    }
                    }
                  >
                    {arrowFunc(pagination?.label)}
                  </button>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default History