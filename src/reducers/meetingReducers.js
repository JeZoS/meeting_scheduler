//
//
export const meetReducer = (state = { dates: {} }, action) => {
  switch (action.type) {
    case "ADD_MEET":
      !state.dates[action.payload.date]
        ? (state.dates[action.payload.date] = [action.payload.data])
        : state.dates[action.payload.date].push(action.payload.data);
      return { ...state };
    default:
      return { ...state };
  }
};

//
//
export const userReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case "USER_MEET":
      const { username, time, mtype, desc, dte } = action.payload;
      if (!state.users[action.payload.username]) {
        state.users[username] = {};
        state.users[username][time] = { mtype, desc, dte };
      } else {
        state.users[username][time] = { mtype, desc, dte };
      }
      return { ...state };
    default:
      return { ...state };
  }
};
