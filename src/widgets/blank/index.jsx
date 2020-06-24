import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import img from "@assets/default-blank.jpg";
import "./index.scss";

export default class Blank extends Component {
  render() {
    return (
      <View className="blank">
        <Image className="blank-img" src={img} mode="heightFix" />
        <View className="blank-text">暂时没有数据～</View>
      </View>
    );
  }
}
