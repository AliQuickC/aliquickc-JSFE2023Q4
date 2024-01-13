export default function reducer(stateData, action) {
  const state = stateData;
  switch (action.type) {
    case 'SELECT_ANSWER':
      return state;
    case 'APPLY_EXECUTION':
      return state;
    default:
      return state;
  }
}
