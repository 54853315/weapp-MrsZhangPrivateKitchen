/**
 * NOTE HOST 是在 config 中通过 defineConstants 配置的
 * 所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
/* eslint-enable */

// pic
export const CDN = 'https://'

// home
export const API_HOME = `${host}/xhr/index/index.json`
export const API_HOME_SEARCH_COUNT = `${host}/xhr/search/displayBar.json`
export const API_HOME_RECOMMEND = `${host}/xhr/rcmd/index.json`

// tag
export const API_TAG_SEARCH = `${host}/tags`
// export const API_TAG_SUB = `${host}/xhr/list/subCate.json`
// export const API_TAG_SUB_LIST = `${host}/xhr/list/l2Items2.json`

// user
export const API_USER = `${host}/xhr/user/getDetail.json`
export const API_USER_LOGIN = `${host}/xhr/u/mailLogin.json`
export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`

// item
export const API_ITEM = `${host}/xhr/item/detail.json`
export const API_ITEM_RECOMMEND = `${host}/xhr/rcmd/itemDetail.json`
