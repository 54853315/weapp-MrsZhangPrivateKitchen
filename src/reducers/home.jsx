import {
    HOME_INFO, HOME_SEARCH_COUNT, HOME_RECOMMEND
  } from '@constants/home'
  
  const INITIAL_STATE = {
    homeInfo: {},
    searchCount: 0,
    recommend: []
  }
  
  export default function home(state = INITIAL_STATE, action) {
    switch(action.type) {
      case HOME_INFO: {
        return {
          ...state,
          homeInfo: action.payload
        }
      }
      case HOME_SEARCH_COUNT: {
        return {
          ...state,
          searchCount: action.payload.count
        }
      }
      case HOME_RECOMMEND: {
        return {
          ...state,
          timelines: state.recommend.concat(action.payload.result)
        }
      }
      default:
        return state
    }
  }
  