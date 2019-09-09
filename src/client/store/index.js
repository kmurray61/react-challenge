import { applyMiddleware, createStore } from "redux";
import { createReducer } from "redux-act";
import logger from "redux-logger";

import { toggleModal } from "./actions";

const reducer = createReducer(
  {
    [toggleModal]: ({ isAddingComment, ...state }) => ({
      isAddingComment: !isAddingComment,
      ...state
    })
  },
  {
    isAddingComment: false
  }
);

export default createStore(reducer, applyMiddleware(logger));
