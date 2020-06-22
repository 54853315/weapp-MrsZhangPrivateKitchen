import {
  ITEM_INFO,
  ITEM_DELETE,
  ITEM_UPLOAD,
  ITEM_POST,
  ITEM_TAG,
  ITEM_RECOMMEND
} from "@constants/item";
import {
  API_ITEM,
  API_ITEM_UPLOAD,
  API_ITEM_CHANGE_STATUS,
  API_TAG_SEARCH
} from "@constants/api";
import { createAction } from "@utils/redux";
import { upload } from "@utils/request";

/**
 * 获取信息
 * @param {*} id
 */
export const dispatchItem = id =>
  createAction({
    url: API_ITEM + "/" + id,
    fetchOptions: {
      showToast: false,
      autoLogin: false
    },
    method: "GET",
    type: ITEM_INFO
  });

/**
 * 删除
 * @param {*} id
 */
export const dispatchItemDelete = id =>
  createAction({
    url: API_ITEM + "/" + id,
    method: "DELETE",
    type: ITEM_DELETE,
  });

/**
 * 改变状态
 * @param {*} payload
 */
export const dispatchItemChangeStatus = payload =>
  createAction({
    url: API_ITEM_CHANGE_STATUS,
    fetchOptions: {
      showToast: false,
      autoLogin: false
    },
    method: "PUT",
    type: ITEM_INFO,
    payload
  });

/**
 * 上传
 * @param {*} options
 */
export const dispatchUpload = options => {
  const { payload, cb } = options;
  const type = ITEM_UPLOAD;

  return dispatch => {
    return upload({
      url: API_ITEM_UPLOAD,
      type: type,
      payload,
      method: "POST"
    }).then(res => {
      dispatch({ type, payload: cb ? cb(res) : res });
      return res;
    });
  };
};

/**
 * 新增
 * @param {*} payload
 */
export const dispatchStore = payload =>
  createAction({
    url: API_ITEM,
    method: "POST",
    type: ITEM_POST,
    payload
  });

/**
 * 获取标签
 * @param {*} payload
 */
export const dispatchTagSearch = payload =>
  createAction({
    url: API_TAG_SEARCH,
    type: ITEM_TAG,
    payload
  });
