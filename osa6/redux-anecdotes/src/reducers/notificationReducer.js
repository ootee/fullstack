const notificationAtStart = ''

const notificationReducer = (state = notificationAtStart, action) => {
  console.log(action.type)
  switch (action.type) {
  case 'NOTIFY':
    return state = action.message
  case 'CLEAR':
    return ''
  default:
    return state
  }
}
export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    setTimeout(() => dispatch({ type: 'CLEAR' }), time * 1000)
  }
}

export default notificationReducer

