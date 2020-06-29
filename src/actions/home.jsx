import {
    HOME_INFO, HOME_SEARCH_COUNT, HOME_RECOMMEND,HOME_RECOMMEND_CLEAN
  } from '@constants/home'
  import {
    API_HOME, API_HOME_SEARCH_COUNT, API_HOME_RECOMMEND
  } from '@constants/api'
  import { createAction } from '@utils/redux'
  
  /**
   * 首页数据
   * @param {*} payload
   */
  export const dispatchHome = payload => createAction({
    url: API_HOME,
    type: HOME_INFO,
    payload
  })
  
  /**
   * 搜索总数
   * @param {*} payload
   */
  export const dispatchSearchCount = payload => createAction({
    url: API_HOME_SEARCH_COUNT,
    type: HOME_SEARCH_COUNT,
    payload
  })
  
  /**
   * 时间线
   * @param {*} payload
   */
  export const dispatchRecommend = payload => createAction({
    url: API_HOME_RECOMMEND,
    type: HOME_RECOMMEND,
    payload
  })
  
    /**
   * 清空时间线
   * @param {*} id
   */
  export const dispatchRecommendClean = id =>({ 
    type:HOME_RECOMMEND_CLEAN,
    id:id,
    // return dispatch => {
    //   return fetch({ url, payload, method, ...fetchOptions }).then((res) => {
    //     dispatch({ type, payload: cb ? cb(res) : res })
    //     return res
    //   })
    // }
  })