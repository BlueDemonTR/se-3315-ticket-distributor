const user = (state = null, action) => {
    const { payload, type } = action

    let ids
    switch (type) {
      case 'INITIAL_DATA':
        if(!payload.user) return {}
  
        return payload.user
  
      case 'SET_USER':
        return payload
				
      case 'LOGOUT':
        return null
  
      default:
        return state
    }
  }
  
  export default user
  