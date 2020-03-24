import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtNavBar,
  AtTextarea,
  AtList,
  AtListItem,
  AtForm,
  AtSwitch
} from "taro-ui";
import Selection from "./selection";
import Topic from "./topic";
import "./index.scss";

export default class BookCreateSelect extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      hasTopic: false, //是否有话题
      currentTopic: "", //当前内容
      intro: "", //介绍信息
      shareWechatFirendsZone: false, //分享到朋友圈
      commentClose: false, //评论开关
      // replaces:{},
      files: [
        {
          url: "https://img.crazyphper.com/home/images/picture.jpg",
          text: ""
        },
        {
          url: "https://img.crazyphper.com/home/images/picture.jpg",
          text: ""
        },
        {
          url: "https://img.crazyphper.com/home/images/picture.jpg",
          text: ""
        }
      ]
    };
  }

  handleIntroTyping = e => {
    let input = e;
    let hash = "#";
    // 搜索#
    if (input.charAt(input.length - 1) == hash) {
      console.info("[topic]用户输入了一个#");
      this.setState({ hasTopic: true });
      //TODO 出现相关话题加载和选择区域
    }
    if (this.state.hasTopic) {
      if (input.charAt(input.length - 1) == " ") {
        console.info("[topic]用户结束了一个话题");
        this.setState({ hasTopic: false });
      } else {
        let start = input.lastIndexOf(hash);
        let word = input.substring(start, start + input.length);
        console.error("[topic]当前话题是:" + word);
        this.setState({ currentTopic: word });
      }
    }

    this.setState({ intro: input });
  };

  handleShareWechatFirndsZoneClick = e => {
    this.setState({ shareWechatFirendsZone: e });
  };

  handleCommentClick = e => {
    this.setState({ commentClose: e });
  };

  goBack = () => {
    // TODO 需要解决返回上一页的问题
    Taro.navigateTo({
      url: `/pages/index/home`
    });
    //NOTE 无法正常使用哈
    // Taro.navigateBack({delta:2});
  };

  goNext = id => {
    Taro.showToast({
      title: "功能未实现",
      icon: "none"
    });
    return false;
    Taro.navigateTo({
      url: `/pages/item/item?itemId=${id}`
    });
  };

  render() {
    const { files, intro } = this.state;
    return (
      <View>
        <AtNavBar
          onClickRgIconSt={this.goNext}
          // onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.goBack}
          color="#000"
          title="选择图片"
          leftText="取消"
          rightColor="#888"
          rightFirstIconType="check-circle"
        />

        <AtForm>
          {/* 描述输入 */}
          <AtTextarea
            className="intro"
            count={false}
            value={intro}
            onChange={this.handleIntroTyping.bind(this)}
            maxLength={400}
            autoFocus={true}
            placeholder="请描述这是一道什么菜，或者你的心情..."
          />
          {/* 话题标签选择 */}
          {this.state.hasTopic && <Topic string={this.state.currentTopic} />}
          {/* 选择图片 */}
          {!this.state.hasTopic && <Selection files={files} />}
          {/* 底部区域 */}
          {!this.state.hasTopic && (
            <AtList hasBorder={false}>
              {/* 分享到朋友圈 */}
              <AtSwitch
                border={false}
                title="分享到朋友圈"
                checked={this.state.shareWechatFirendsZone}
                onChange={this.handleShareWechatFirndsZoneClick}
              />

              {/* 评论开关 */}
              <AtSwitch
                border={false}
                title="关闭评论功能"
                disabled
                checked={this.state.commentClose}
                onChange={this.handleCommentClick}
              />

              {/* 替代文字 */}
              <AtListItem
                hasBorder={false}
                title="输入替代文字"
                note=""
                arrow="right"
              />
            </AtList>
          )}
        </AtForm>
      </View>
    );
  }
}
