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

  componentWillUnmount() {

    var pagesArray = Taro.getCurrentPages();
    console.error("pagesArray",pagesArray);
    pagesArray.map(item => {
      //判断来源如果是二次跳，则跳回业务页面；否则正常返回上一页。
      if (item.route.indexOf("book-create") != -1) {
        //NOTE 兼容H5和小程序的跳转
        console.log("即将跳转回book-create")
        Taro.switchTab({
          url: "/pages/index/home",
          success: res => {
            //NOTE 解决switchtab后不刷新页面的问题
            var page = Taro.getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        });
        return false;
      }
    });
    //可能跳的时候带个参数，这样那边优先处理参数，就不会在跳转了
    // Taro.navigateBack({ delta: 2 });
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
                Taro.navigateBack({ delta: 2 });
                //@TODO 最好能用redirectTo关闭当前页跳转至其他页面，不过由于不能跳转tabbar，比较坑叠
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
