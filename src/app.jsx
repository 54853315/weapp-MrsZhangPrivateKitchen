import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/home',  //@TODO 测试学习用的page，将来要改成欢迎首页
      // 'pages/book/book',    //菜谱时间线界面
      // 'pages/book/item',    //菜谱详情界面
      'pages/book/create',  //创建菜谱界面
      // 'pages/book/edit',  //编辑菜谱页面
      // 'pages/search/index', //搜索页面
      // 'pages/user-login/wechat',  //微信登录注册页面
      // 'pages/user-login/mobile' //手机登录注册页面
      'pages/user/user'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '小张私厨',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/index/home",
        // iconPath: "./assets/tab-bar/home.png",
        // selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "首页"
      }, { 
        pagePath: "pages/book/create",
        // iconPath: "./assets/tab-bar/cate.png",
        // selectedIconPath: "./assets/tab-bar/cate-active.png",
        text: "新增"
      },{
        pagePath: "pages/user/user",
        // iconPath: "./assets/tab-bar/user.png",
        // selectedIconPath: "./assets/tab-bar/user-active.png",
        text: "个人"
      }]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
