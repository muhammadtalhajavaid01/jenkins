import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import initiailReducer from './initial-reducer'

export const rootReducer = combineReducers({
	initiailReducer,
	form: formReducer
})