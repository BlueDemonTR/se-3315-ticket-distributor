import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Homepage from '../screens/home'
import { Header } from '../components'
import Login from '../screens/login'
import BuyTicket from '../screens/buyTicket'
import AdminDashboard from '../screens/adminDashboard'

const Admin = ({ }) => {
    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    async function initialize() {
    }

    async function fetchInitial() {
    }

    return (
        <div>
            <Header />

            <Routes>
                <Route
                    path='/'
                    element={<AdminDashboard />}
                />
            </Routes>
        </div>
    )
}

export default Admin