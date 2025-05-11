import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../store'
import NonUser from './NonUser'

const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <NonUser />
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default Root