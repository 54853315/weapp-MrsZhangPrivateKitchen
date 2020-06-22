import Taro, { Component } from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import { saveUser } from "@utils/user";
import { ButtonItem } from "@components";

import "./wechat.scss";

const LOGO = "";

@connect(state => state.user, actions)
class Wechat extends Component {
  config = {
    navigationBarTitleText: "微信登录"
  };

  constructor(props) {
    super(props);
  }

  agreeAuth = userData => {
    console.log(userData, "check userData");
    const { errMsg, userInfo } = userData.detail;
    if (errMsg === "getUserInfo:ok") {
      let props = this.props;
      Taro.setStorageSync("userInfo", userInfo);
      saveUser(userInfo);
      Taro.login({
        success: function(res) {
          console.log("res", res);
          if (res.code) {
            const payload = {
              js_code: res.code,
              thumb: userInfo.avatarUrl,
              name: userInfo.nickName
            };
            props
              .dispatchLogin(payload)
              .then(() => {
                Taro.showToast({
                  title: "感谢使用",
                  icon: "none"
                });
                Taro.switchTab({
                  url: "/pages/index/home",
                });
              })
              .catch(() => {});
          } else {
            Taro.showToast({
              title: "登录失败！" + res.errMsg,
              icon: "none"
            });
          }
        }
      });
    }
  };

  render() {
    return (
      <View className="user-login">
        <View className="user-login__logo">
          <Image src={LOGO} className="user-login__logo-img" />
        </View>

        <ButtonItem
          type="primary"
          text="微信登录"
          openType="getUserInfo"
          onGetUserInfo={this.agreeAuth}
        />
      </View>
    );
  }
}

export default Wechat;
