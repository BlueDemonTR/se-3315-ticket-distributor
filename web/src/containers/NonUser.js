import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Homepage from '../screens/home'
import { Header } from '../components'
import Login from '../screens/login'

const NonUser = ({ }) => {
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
                    element={<Homepage />}
                />
                
                <Route
                    path='/login'
                    element={<Login />}
                />
            </Routes>
        </div>
    )
}

export default NonUser