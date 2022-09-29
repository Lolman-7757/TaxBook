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
  const [errText, setErrText] = useState("NO CLIENTS REGISTERED!")
  const [paginations, setPaginations] = useState([])
  const [searchValue, setSearchValue] = useState('')

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
  const getData = (pageNum, inputValue, isSearchRequest) => {
    if (isSearchRequest) {
      https
        .get(`/clients?search=${inputValue}&limit=5&page=1`)
        .then(res => {
          setData(res.data.data);
          setErrText("NO CLIENTS REGISTERED!");
          setPaginations(res.data.meta.links)
          setSearchValue(inputValue)
        })
        .catch(err => Warn(err.response.status))
    } else {
      https
        .get(`/clients?search=${searchValue}&limit=5&page=${pageNum}`)
        .then(res => {
          setData(res.data.data);
          setErrText("NO CLIENTS REGISTERED!");
          setPaginations(res.data.meta.links)
        })
        .catch(err => Warn(err.response.status))
    }
  }
  useEffect(() => {
    getData('', '', true)
  }, [])

  // DELETE DATA
  const deleteData = (id) => {
    https
      .delete(`/clients/${id}`)
      .then(res => {
        setData(data.filter(dat => dat.id !== id))
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

  const returnData = () => {
    if (data.length === 0) {
      return (<h2 className='no-clients'>{errText}</h2>)
    } else {
      return (
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
      )
    }
  }
  return (
    <section className='main_section'>
      <div className='main_header'>
        <Input
          rounded
          bordered
          placeholder="Client Name..."
          color="primary"
          label='Search'
          width='20%'
          contentRight={<FiSearch />}
          onChange={(e) => getData('', e.target.value, true)}
        />
        <h2 className='main_title'>Home</h2>
        <Link to='/addclient' className='main_button-add'><CgUserAdd /></Link>
      </div>
      <div className='main_table-wrapper'>
        <div className='main_table'>
          {returnData()}
        </div>
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
                  onClick={() =>{
                    if(pagination?.url !== null){
                      getData(
                        Number(pagination?.url.split('')[pagination?.url.length - 1]),
                        searchValue,
                        false
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
    </section >
  )
}

export default Home