import Taro, { Component, useEffect } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtLoadMore } from "taro-ui";
import "./index.scss";
//NOTE 测试用图
import Food1 from "@assets/foods/food1.jpeg";
import Food2 from "@assets/foods/food2.jpeg";
import Food3 from "@assets/foods/food3.jpeg";

export default class Timeline extends Component {
  static defaultProps = {
    list: []
  };

  //TODO 测试界面用数据，后续要删
  timelines = [
    { id: 1, name: "a" },
    { id: 2, name: "b" }
  ];

  handleClick = item => {
    Taro.showToast({
      title: "未实现",
      icon: "none"
    });
    return false;
    Taro.navigateTo({
      url: `/pages/book/item?itemId=${item.id}`
    });
  };

  render() {
    const { list } = this.timelines;
    return (
      <View className="at-row">
        <View className="">
          {this.timelines.map((item, index) => {
            const { id } = item
            return (
              <View className="timeline" key="logistic~" onClick={this.handleClick.bind(this, id)}>
                <View className="tl-time">
                  <Text className="">03/17</Text>
                </View>

                <View className="tl-line">
                  <View className="tl-top-line">
                    <Text className="tl-top-line-txt">今天</Text>
                  </View>
                  <View className="tl-list">
                    <View className="tl-list-item">
                      <View className="tl-list-time">刚刚</View>
                      <View className="at-row at-row--wrap">
                        <Image 
                          src={Food2}
                          className="tl-list-img at-col at-col-6"
                        />
                        <Image
                          src={Food2}
                          className="tl-list-img at-col at-col-6"
                        />
                        <View className="tl-list-txt">
                          今天心情一般般，随便做一个菜敷衍下熊奶奶... <br />
                          今天心情一般般，随便做一个菜敷衍下熊奶奶...
                        </View>
                      </View>
                    </View>

                    <View className="tl-list-item">
                      <View className="tl-list-time">50分钟前</View>
                      <View className="at-row at-row--wrap">
                        <Image
                          src={Food2}
                          className="tl-list-img at-col at-col-6"
                        />
                        <Image
                          src={Food2}
                          className="tl-list-img at-col at-col-6"
                        />
                        <Image
                          src={Food3}
                          className="tl-list-img at-col at-col-6"
                        />
                        <Image
                          src={Food3}
                          className="tl-list-img at-col at-col-6"
                        />
                      </View>
                      <View className="tl-list-txt">
                        今天的配菜是香葱简单奢华版，专门熊奶奶制作，希望她喜欢吧！下个月的零花钱我要200￥...
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
