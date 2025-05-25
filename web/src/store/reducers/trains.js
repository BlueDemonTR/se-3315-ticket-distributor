const trains = (state = [], action) => {
    const { payload, type } = action

    switch (type) {
      case 'SET_TRAINS':
        return payload

			case 'ADD_TRAIN':
				return [
					payload,
					...state.filter(x => x._id !== payload._id)
				]

			case 'UPDATE_TRAIN':
				return state.map((x) => {
          if(x._id !== payload._id) return x

          return payload
        })

			case 'REMOVE_TRAIN':
				return state.filter(x => x._id !== payload._id)
  
      default:
        return state
    }
  }
  
  export default trains
  