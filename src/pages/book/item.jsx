import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtLoadMore, AtTag } from "taro-ui";
import "./index.scss";

export default class Timeline extends Component {
  // Taro 提供了 componentWillPreload 钩子，它接收页面跳转的参数作为参数。可以把需要预加载的内容通过 return 返回，然后在页面触发 componentWillMount 后即可通过 this.$preloadData 获取到预加载的内容。
  componentWillMount() {
    console.log("isFetching: ", this.isFetching);
    this.$preloadData.then(res => {
      console.log("res: ", res);
      this.isFetching = false;
    });
  }

  componentWillPreload(params) {
    return this.fetchData(params.url);
  }

  fetchData() {
    this.isFetching = true;
  }
}
