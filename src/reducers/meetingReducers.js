export const meetReducer = (state = { dates: {}, tp: true }, action) => {
  switch (action.type) {
    case "ADD_MEET":
      var check = action.payload.date in state.dates;
      console.log(check);
      //   if (!check) {
      !state.dates[action.payload.date]
        ? (state.dates[action.payload.date] = [action.payload.data])
        : state.dates[action.payload.date].push(
            action.payload.data
            // ...state.dates[action.payload.date],
          );
      // return { ...state };
      //   } else {
      // state.dates[action.payload.date].push(action.payload.data);
      return { ...state };
    //   }
    default:
      return { ...state };
  }
};
