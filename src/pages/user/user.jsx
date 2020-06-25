import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import Profile from './profile'
import Menu from './menu'
import Activity from './activity'
import { getWindowHeight } from '@utils/style'
import "./user.scss";

// @connect(state => state.user, { ...actions })
export default class User extends Component {
  config = {
    navigationBarTitleText: "小张炫酷会员"
  };

  constructor() {
    super(...arguments);
    this.state = {
      userLogined: false,
      userInfo:null
    };
  }

  componentDidMount() {
  }

  componentDidShow() {
    const token = Taro.getStorageSync('token');
    this.getUserInfo();
// this.props.dispatchUser();
  }

  getUserInfo(){
    const userInfo =  Taro.getStorageSync('userInfo')
    const uid =  Taro.getStorageSync('uid')
    if (uid > 0 && userInfo!=null){
      userInfo["uid"] = uid;
    }

    this.setState({
      userLogined: uid > 0,
      userInfo
    })
  }

  render() {

    const { userInfo,userLogined } = this.state

    return (

      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
          <Profile userInfo={userInfo} logined={userLogined} />
          <Menu />
          <View className='user__empty' />
        </ScrollView>
        <View className='user__activity'>
          <Activity />
        </View>
      </View>
    );
  }
}
