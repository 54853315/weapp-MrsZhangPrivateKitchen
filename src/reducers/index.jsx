import { combineReducers } from 'redux'
// import Tag from './tag'
import home from './home'
import item from './item'
import user from './user'

export default combineReducers({
  home,
//   tag,
  item,
  user
})
