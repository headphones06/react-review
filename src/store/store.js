import { createStore, combineReducers } from 'redux';

const numberReducer = (state = { number: 1 }) => {
  return state;
};

const countReducer = (
  state = {
    count: 0,
  },
  action
) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return {
        count: state.count + 10,
      };
    case 'DECREASE_COUNT':
      return {
        count: state.count - 10,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  numberReducer,
  countReducer,
});

const store = createStore(rootReducer);

export default store;
