export default function reducer(stateData, action) {
  const state = stateData;
  switch (action.type) {
    case 'INIT_NEW_GAME':
      return state;
    default:
      return state;
  }
}
