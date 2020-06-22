import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import { Provider } from "@tarojs/redux";
import configStore from "./store";
import "./app.scss";
import { normalWxlLogin } from "@utils/user";
import "taro-ui/dist/style/index.scss"; // 全局引入一次即可

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  componentDidMount() {
    normalWxlLogin().then(res => {
      // console.log(res, 'user login')
    });
  }

  componentDidShow() {
    Taro.onNetworkStatusChange( (res) => {
      console.log("res", res);
      if (res.networkType == "none") {
        Taro.showToast({
          title: "网络中断或不稳定，待网络恢复会自动重新加载",
          icon: "none",
          duration: 6000
        });
      } else {
        Taro.reLaunch({url:'/pages/index/home'})
      }
    });
  }

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      "pages/index/home",
      "pages/book/item", //菜谱详情界面
      "pages/book-create/index", //创建菜谱
      "pages/book-create/select", //创建菜谱
      // 'pages/book-create/advanced',  //创建菜谱-进阶设置
      // 'pages/book/edit',  //编辑菜谱页面
      // 'pages/search/index', //搜索页面
      "pages/user-login/wechat", //微信登录注册页面
      // 'pages/user-login/mobile' //手机登录注册页面
      "pages/user/user",
      "pages/show-image/index" //图片查看
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "小张私厨",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#666",
      selectedColor: "#3e53b4",
      backgroundColor: "#fafafa",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index/home",
          iconPath: "./assets/tab-bar/home2.png",
          selectedIconPath: "./assets/tab-bar/home-active.png",
          text: "首页"
        },
        {
          pagePath: "pages/book-create/select",
          iconPath: "./assets/tab-bar/book.png",
          selectedIconPath: "./assets/tab-bar/book-active.png",
          text: "新增"
        },
        {
          pagePath: "pages/user/user",
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/user-active.png",
          text: "我的"
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
