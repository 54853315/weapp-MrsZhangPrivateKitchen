import {
    HOME_INFO, HOME_SEARCH_COUNT, HOME_RECOMMEND
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
   * 商品总数
   * @param {*} payload
   */
  export const dispatchSearchCount = payload => createAction({
    url: API_HOME_SEARCH_COUNT,
    type: HOME_SEARCH_COUNT,
    payload
  })
  
  /**
   * 推荐商品
   * @param {*} payload
   */
  export const dispatchRecommend = payload => createAction({
    url: API_HOME_RECOMMEND,
    type: HOME_RECOMMEND,
    payload
  })
  