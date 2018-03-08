const filterReducer = (state = '', action) => {
  console.log(action.type)
  switch (action.type) {
  case 'FILTER':
    return action.filter
  default:
    return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer