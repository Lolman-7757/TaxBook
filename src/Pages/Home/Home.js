import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Icons
import { CgUserAdd } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'
// Styles
import './Home.css'
// Components
import { Table, Row, Col, Tooltip, Input } from "@nextui-org/react";
import { IconButton } from "../../Assets/imgs/IconButton";
import { EyeIcon } from "../../Assets/imgs/EyeIcon";
import { EditIcon } from "../../Assets/imgs/EditIcon";
import { DeleteIcon } from "../../Assets/imgs/DeleteIcon";
import Swal from 'sweetalert2';
// API
import https from '../../Assets/https';

function Home() {
  const [data, setData] = useState([])

  // Alerts
  function Success(name) {
    Swal.fire({
      title: `Client ${name} has been successfully deleted!`,
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
      .get('/clients?search&limit=11&page=1')
      .then(res => setData(res.data.data))
      .catch(err => console.log(err))
  }, [])

  // DELETE USER
  const deleteData = (info) => {
    https
      .delete(`/clients/${info.id}`)
      .then(res => {
        setData(data.filter(item => item.id !== info.id))
        Success(info.name)
      })
      .catch(err => Warn(err))
  }

  return (
    <section className='main_section'>
      <div className='main_header'>
        <h2 className='main_title'>Home</h2>
        <Link to='/addclient' className='main_button-add'><CgUserAdd /></Link>
      </div>
      <div className='main_table-wrapper'>
        {/* <Input
          rounded
          bordered
          placeholder="Client Name..."
          color="primary"
          label=' '
          width='500px'
          className='main_table-search'
          contentRight={<FiSearch />}
        /> */}
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
              <Table.Column>ADDRESS</Table.Column>
              <Table.Column>AMMOUNT</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {
                data?.map((dataItem, dataItemIndx) => {
                  return (
                    <Table.Row key={dataItemIndx}>
                      <Table.Cell>{dataItem.id}</Table.Cell>
                      <Table.Cell>{dataItem.name}</Table.Cell>
                      <Table.Cell>{dataItem.phone}</Table.Cell>
                      <Table.Cell>{dataItem.address}</Table.Cell>
                      <Table.Cell>{dataItem.summa}</Table.Cell>
                      <Table.Cell><span className='green'>Accepted</span></Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip content="Details">
                              <Link to={`/client/${dataItem.id}`}>
                                <IconButton>
                                  <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                              </Link>
                            </Tooltip>
                          </Col>
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
    </section>
  )
}

export default Home