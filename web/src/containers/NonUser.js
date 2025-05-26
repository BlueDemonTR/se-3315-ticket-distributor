import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Homepage from '../screens/home'
import { Header } from '../components'
import Login from '../screens/login'
import BuyTicket from '../screens/buyTicket'
import AdminDashboard from '../screens/adminDashboard'
import ViewTicket from '../screens/viewTicket'

const NonUser = ({ }) => {
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    return (
        <div>
            <Header />

            <Routes>
                <Route
                    path='/'
                    element={<Homepage />}
                />

                <Route
                    path='/login'
                    element={<Login />}
                />

                <Route
                    path='/buy-ticket'
                    element={<BuyTicket />}
                />

                <Route 
                    path='/ticket/:id'
                    element={<ViewTicket />}
                />
            </Routes>
        </div>
    )
}

export default NonUser