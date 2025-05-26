import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Homepage from '../screens/home'
import { Header } from '../components'
import Login from '../screens/login'
import BuyTicket from '../screens/buyTicket'
import AdminDashboard from '../screens/adminDashboard'
import ViewTicket from '../screens/viewTicket'

const Admin = ({ }) => {
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    return (
        <div>
            <Header />

            <Routes>
                <Route
                    path='/'
                    element={<AdminDashboard />}
                />

                <Route 
                    path='/ticket/:id'
                    element={<ViewTicket hasCancel />}
                />
            </Routes>
        </div>
    )
}

export default Admin