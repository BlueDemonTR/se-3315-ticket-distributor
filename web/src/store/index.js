import { combineReducers, createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import storage from 'redux-persist/lib/storage'
import user from './reducers/user'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: hardSet,
  timeout: null
}

const rootReducer = combineReducers({
  user
})

const pReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = createStore(
  pReducer,
  applyMiddleware(thunk)
)
export const persistor = persistStore(store)
