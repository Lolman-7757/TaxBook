import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
// Styles
import './Main.css'
// Components
import { Tabs, Avatar } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa'
import { BiExit } from 'react-icons/bi'
// Pages
import Logo from '../../Assets/imgs/Logo'
import Home from '../Home/Home';
import History from '../History/History'
import Login from '../Login/Login';
import AddClient from '../Home/AddClient';
import SingleClient from '../Home/SingleClient';
// API
import https from '../../Assets/https';

// Antd Tabs

const { TabPane } = Tabs;

function Main() {
    const [ token, setToken ] = useState(window.localStorage.getItem('token'))
    //Tabs
    let path = (window.location.pathname).split('/')
    const [tabDefaultKey, setTabDefaultKey] = useState()
    const [sideBar, setSideBar] = useState([
        { to: '/', title: 'Home', keys: 1 },
        { to: '/history', title: 'History', keys: 2 },
    ]);
    const onChange = (key) => {
        setTabDefaultKey(key)
    };

    useEffect(() => {
    }, [])

    const deleteToken = () => {
        setToken(window.localStorage.removeItem('token'))
        https
        .post('/logout')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    if (token) {
        return (
            <section className='main'>
                <BrowserRouter>
                    <header>
                        <Link to='/'><Logo /></Link>
                        <Tabs activeKey={sideBar?.find(x => x.to === `/${path[1]}`)?.keys?.toString()} onChange={onChange} className="nav-list">
                            {
                                sideBar?.map((item, index) => {
                                    return (
                                        <TabPane
                                            tab={<Link to={item?.to} className='nav-item'>{item?.title}</Link>}
                                            key={item?.keys} />
                                    )
                                })
                            }
                        </Tabs>
                        <div className='main_profile'>
                                <FaRegUserCircle />
                            <div className='profile_dropdown' onClick={() => { deleteToken() }}>
                                    <BiExit />
                                    <p>Log Out</p>
                            </div>
                            {/* <h2 className='main_profile_name'>User</h2> */}
                        </div>
                    </header>
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/addclient' element={<AddClient />} />
                            <Route path='/client/:id' element={<SingleClient />} />
                            <Route path='/history' element={<History />} />
                        </Routes>
                    </main>
                </BrowserRouter>
            </section>
        )
    } else { return (<Login />) }

}

export default Main
