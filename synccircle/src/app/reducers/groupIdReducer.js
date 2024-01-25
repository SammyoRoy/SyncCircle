const initialState = "";

const groupIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return action.payload;
    default:
      return state;
  }
};

export default groupIdReducer;

// Actions
export const setGroupId = groupId => ({
  type: 'SET_GROUP_ID',
  payload: groupId
});