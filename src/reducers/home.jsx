import {
  HOME_INFO,
  HOME_SEARCH_COUNT,
  HOME_RECOMMEND,
  HOME_RECOMMEND_CLEAN
} from "@constants/home";

const INITIAL_STATE = {
  homeInfo: {},
  searchCount: 0,
  timelines: []
};

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_INFO: {
      return {
        ...state,
        homeInfo: action.payload
      };
    }
    case HOME_SEARCH_COUNT: {
      return {
        ...state,
        searchCount: action.payload.count
      };
    }
    case HOME_RECOMMEND_CLEAN: {
      var timelines = [];
      if (action.id > 0) {
        for (let i = 0; i < state.timelines.length; i++) {
          timelines[i] = [];
          if (state.timelines[i]["books"]) {
            timelines[i]["books"] = [];
            for (let x = 0; x < state.timelines[i]["books"].length; x++) {
              if (state.timelines[i]["books"][x]["id"] == action.id) {
                continue
              }
              timelines[i]["books"].push(state.timelines[i]["books"][x])
            }
          }
        }
      }
      return {
        ...state,
        timelines: timelines
      };
    }
    case HOME_RECOMMEND: {
      if (action.payload.result == null) {
        return {
          ...state
        };
      } else {
        return {
          ...state,
          timelines:
            action.payload.skip == 0
              ? action.payload.result
              : state.timelines.concat(action.payload.result)
        };
      }
    }
    default:
      return state;
  }
}
