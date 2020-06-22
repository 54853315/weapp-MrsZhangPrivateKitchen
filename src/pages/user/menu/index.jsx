import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import jump from "@utils/jump";
import classNames from "classnames";
import "./index.scss";

const MENU_LIST = [
  {
    key: "book",
    text: "我的发布",
    url: "",
    img: require("./assets/book.png")
  },
  {
    key: "red-packet",
    text: "红包",
    img: require("./assets/red-packet.png")
  },
  {
    key: "safe",
    text: "账号安全",
    url: "",
    img: require("./assets/safe.png")
  },
  {
    key: "contact",
    text: "联系帅T",
    img: require("./assets/contact.png")
  },
  {
    key: "feedback",
    text: "用户反馈",
    url: "",
    img: require("./assets/feedback.png")
  },
  {
    key: "help",
    text: "帮助中心",
    url: "",
    img: require("./assets/help.png")
  }
];
const COUNT_LINE = 3;

export default class Menu extends Component {
  handleClick = menu => {
    //用于演示多端 webview
    if (menu.key == "contact") {
      //跳转去微信客服
      Taro.showModal({
        title: "你确定要联系无敌帅T吗？～ ",
        icon: "none",
        success: function(res) {
          if (res.confirm) {
            Taro.showToast({
              title: "哎哟，帅T还在化妆~",
              icon: "none"
            });
          } else {
            Taro.showToast({
              title: "你的损失~",
              icon: "none"
            });
          }
        }
      });
    }
    if (menu.key !== "help") {
      jump({ url: menu.url, title: menu.text });
    } else {
      Taro.showToast({
        title: "目前还没实现任何功能~",
        icon: "none"
      });
    }
  };

  render() {
    return (
      <View className="user-menu">
        {MENU_LIST.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          const nth = (index + 1) % COUNT_LINE === 0;
          const lastLine =
            parseInt(index / COUNT_LINE) ===
            parseInt(MENU_LIST.length / COUNT_LINE);
          return (
            <View
              key={menu.key}
              className={classNames(
                "user-menu__item",
                nth && "user-menu__item--nth",
                lastLine && "user-menu__item--last"
              )}
              onClick={this.handleClick.bind(this, menu)}
            >
              <Image className="user-menu__item-img" src={menu.img} />
              <Text className="user-menu__item-txt">{menu.text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
