import Taro from "@tarojs/taro";
import { API_USER, API_USER_LOGIN } from "@constants/api";

const CODE_SUCCESS = 200;
const CODE_AUTH_EXPIRED = 401;

function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => "");
}

function updateStorage(data = {}) {
  console.log("---------updateStorage---------",data)
  return Promise.all([
    Taro.setStorage({ key: "token", data: data["token"] || "" }),
    Taro.setStorage({ key: "uid", data: data["uid"] || "" })
  ]);
}

/**
 * 简易封装网络请求
 * @param {*} options
 */
async function fetch(options) {
  const {
    url,
    payload,
    method = "GET",
    showToast = true,
    autoLogin = true
  } = options;
  // console.log("fetch options = ", options);
  const token = await getStorage("token");
  const header = { Authorization: "Bearer " + token };
  if (method === "POST") {
    header["content-type"] = "application/json";
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  })
    .then(async res => {
      const { code, data } = res.data;
      if (code !== CODE_SUCCESS) {
        if (code === CODE_AUTH_EXPIRED) {
          await updateStorage({});
        }
        return Promise.reject(res.data);
      }

      if (url === API_USER_LOGIN) {
        await updateStorage(data);
      }

      // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
      if (url === API_USER) {
        const uid = await getStorage("uid");
        return { ...data, uid };
      }

      return data;
    })
    .catch(err => {
      const defaultMsg =
        err.code === CODE_AUTH_EXPIRED ? "登录失效" : "请求异常";
      if (showToast) {
        Taro.showToast({
          title: (err && err.errorMsg) || defaultMsg,
          icon: "none"
        });
      }

      if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
        //先自动登录，如果登录失败说明需要用户授权，则跳转

        Taro.navigateTo({
          url: "/pages/user-login/wechat"
        });
      }

      return Promise.reject({ message: defaultMsg, ...err });
    });
}

// 文件上传接口
async function upload(options) {
  const {
    url,
    payload,
    method = "POST",
    showToast = true,
    autoLogin = true
  } = options;
  const token = await getStorage("token");
  const header = { Authorization: "Bearer " + token };

  return Taro.uploadFile({
    url: url,
    method: method,
    filePath: payload.file,
    name: "file",
    formData: {},
    header
  })
    .then(async res => {
      const { code, data } = JSON.parse(res.data); //微信小程序upload接口返回的是string
      if (code !== CODE_SUCCESS) {
        if (code === CODE_AUTH_EXPIRED) {
          await updateStorage({});
        }
        return Promise.reject(data);
      }
      return data["result"]["savePath"];
    })
    .catch(err => {
      const defaultMsg =
        err.code === CODE_AUTH_EXPIRED ? "登录失效" : "请求异常";
      if (showToast) {
        Taro.showToast({
          title: (err && err.errorMsg) || defaultMsg,
          icon: "none"
        });
      }

      if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
        Taro.navigateTo({
          url: "/pages/user-login/wechat"
        });
      }

      return Promise.reject({ message: defaultMsg, ...err });
    });
}

module.exports = {
  fetch,
  upload,
  getStorage,
  updateStorage
};
