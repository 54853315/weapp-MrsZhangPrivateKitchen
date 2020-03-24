import Taro, { Component } from "@tarojs/taro";

export default class BookCreate extends Component {
  
  componentWillMount() {
    Taro.navigateTo({
      url: `/pages/book-create/select`
    });
  }

}
