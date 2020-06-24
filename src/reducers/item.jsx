import { ITEM_INFO, ITEM_RECOMMEND,ITEM_POST,ITEM_UPLOAD,ITEM_TAG } from '@constants/item'

const INITIAL_STATE = {
  itemInfo: null
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ITEM_INFO: {
      return {
        ...state,
        itemInfo: action.payload.result.detail
      }
    }
    case ITEM_TAG:{
      return {
        ...state,
        tags:action.payload
      }
    }
    case ITEM_RECOMMEND: {
      return { ...state }
    }
    default:
      return state
  }
}
