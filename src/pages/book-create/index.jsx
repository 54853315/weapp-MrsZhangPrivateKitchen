import Taro, { Component } from "@tarojs/taro";
import {getStorage} from "@utils/request";
export default class BookCreate extends Component {
  constructor() {
    super();
    this.state = {
      userLogined: false
    };
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  componentDidHide(){
    console.log("--BookCreate:componentDidHide()")
  }

  async componentDidShow() {        
    //日后再调试
    // const uid = Taro.getStorageSync("uid");
    // this.setState({ userLogined: uid > 0 ? true : false });
    // if (this.state.userLogined) {
    //   console.log("已登录");
    //   Taro.navigateTo({
    //     url: `/pages/book-create/select`
    //   });
    // } else {
    //   console.log("未登录");
    //   Taro.navigateTo({
    //     url: `/pages/user-login/wechat`
    //   });
    // }
  }

  render() {
    return <View></View>;
  }
}
