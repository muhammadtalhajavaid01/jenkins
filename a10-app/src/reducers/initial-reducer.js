const LOAD = 'INITIALIZE_DATA';

const initiailReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {
				data: action.data
			}
		default:
			return state
	}
}

export const load = data => ({ type: LOAD, data })
export default initiailReducer