import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NonUser from './NonUser'
import Admin from './Admin'

const Auth = ({ }) => {
	const user = useSelector(state => state.user)

	// IF THERE IS A USER, SEND ADMIN, IF NOT, SEND NONUSER
	return user
		? <Admin />
		: <NonUser />
}

export default Auth