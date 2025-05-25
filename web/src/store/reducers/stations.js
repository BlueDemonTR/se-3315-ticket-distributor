const stations = (state = [], action) => {
    const { payload, type } = action

    switch (type) {
      case 'SET_STATIONS':
        return payload

			case 'ADD_STATION':
				return [
					payload,
					...state.filter(x => x._id !== payload._id)
				]

			case 'REMOVE_STATION':
				return state.filter(x => x._id !== payload._id)
				
      case 'LOGOUT':
        return []
  
      default:
        return state
    }
  }
  
  export default stations
  