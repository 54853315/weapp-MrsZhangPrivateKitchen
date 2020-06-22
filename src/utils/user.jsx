import Taro from "@tarojs/taro";
import { fetch } from "./request";
import { API_USER_LOGIN } from "@constants/api";

function getLocation() {
  return new Promise(function(resolve, reject) {
    wx.getLocation({
      type: "wgs84",
      success: res => {
        // console.log(res, "res of location");
        if (res.errMsg == "getLocation:ok") {
          const { latitude, longitude } = res;

          Taro.setStorageSync("locationGetted", true);
          Taro.setStorageSync("lat", latitude);
          Taro.setStorageSync("lng", longitude);
          resolve({
            success: true,
            code: 200,
            data: {
              locationGetted: true,
              lat: latitude,
              lng: longitude
            }
          });
        } else {
          Taro.setStorageSync("locationGetted", false);
          Taro.setStorageSync("lat", 26.59909);
          Taro.setStorageSync("lng", 106.663556);
          resolve({
            success: true,
            code: 200,
            data: {
              locationGetted: false,
              lat: 26.59909,
              lng: 106.663556
            }
          });
        }
      },
      fail: res => {
        Taro.setStorageSync("locationGetted", false);
        Taro.setStorageSync("lat", 26.59909);
        Taro.setStorageSync("lng", 106.663556);
        resolve({
          success: true,
          code: 200,
          data: {
            locationGetted: false,
            lat: 26.59909,
            lng: 106.663556
          }
        });
      }
    });
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    Taro.clearStorage({
      success: () => {
        resolve({
          code: 200
        });
      },
      fail: () => {
        reject();
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        console.error(err, "get info failed");
        reject(err);
      }
    });
  });
}

function getPhone(phone) {
  // console.log(phone, "phone of bind");
  const {
    detail: { encryptedData, iv }
  } = phone;

  if (!encryptedData || !iv) {
    Taro.showToast({
      title: "获取手机号失败"
    });
    return false;
  }

  //   getUserPhone({ encryptedData, iv }).then(res => {
  //     console.log(res, "res of get phone");
  //   });
}

function saveUser(userData) {
  for (let key in userData) {
    Taro.setStorageSync(key, userData[key]);
  }
}

// 调用微信登陆
export async function normalWxlLogin(callback) {
  let code = null;
  return new Promise(function(resolve, reject) {
    return wxLogin()
      .then(res => {
        code = res.code;
        // console.log(code, "step 1");
        return getUserInfo();
      })
      .then(wxUserInfo => {
        Taro.setStorageSync("userInfo", wxUserInfo.userInfo);
        //登录远程服务器
        const userLoginParams = {
          code : code,
          userinfo : wxUserInfo.userInfo
        }
        userLogin(userLoginParams)
          .then(() => {})
          .catch(err => {
            // console.log(err, "login failed");
            reject(err);
          });
      })
      .catch(err => {
        // console.log(err, "get info failed");
        // userLogin({ code })
        //   .then(res => {
        //     if (res.errMsg == "request:ok") {
        //       // Taro.setStorage({
        //       //   key: "token",
        //       //   data: res.data.data.accessToken
        //       // });
        //       saveUser(res.data.data);
        //       resolve(res.data);
        //     } else {
        //       console.log(res.data, err, "login failed");
        //       reject(err);
        //     }
        //   })
        //   .catch(err => {
        //     console.log(res.data, err, "login failed");
        //     reject(err);
        //   });
      });
  });
}

function userLogin(params){
  // console.log('user login called')
  const {code ,userinfo } = params
  const payload = {
    js_code: code,
    thumb: userinfo.avatarUrl ? userinfo.avatarUrl : "",
    name: userinfo.nickName ? userinfo.nickName  : ""
  };
  const url = API_USER_LOGIN
  const method = "POST"
  return fetch({ url, payload, method })
}

function wxLogin() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          // console.log(res, "res in wxLogin");
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  getPhone,
  userLogin,
  wxLogin,
  normalWxlLogin,
  saveUser,
  getLocation,
  getUserInfo,
  logout
};
