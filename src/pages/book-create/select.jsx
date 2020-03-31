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
import { matchTheLeftDataWithoutSymbol } from "../../tools";

export default class BookCreateSelect extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      formData: {
        intro: "Hi! #ad Is #social product.", //介绍信息
        shareWechatFirendsZone: false, //分享到朋友圈
        commentClose: false, //评论开关
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
      },
      hasTopic: false, //是否有话题
      currentTopic: [{ cursor: 0, text: "" }] //当前内容
      // replaces:{},
    };
  }

  componentDidMount() {}

  refTopic = node => (this.topic = node);

  handleIntroTyping = (input, event) => {
    console.log("handleIntroTyping");
    this.setState({
      formData: { ...this.state.formData, intro: input }
    });

    var hash = "#";

    var isTopicTimeRightNow = false;
    var cursor = event.target.selectionStart;
    // 搜索#
    if (
      input.charAt(input.length - 1) == hash ||
      matchTheLeftDataWithoutSymbol(hash, input, cursor)
    ) {
      console.info("[topic]用户正在输入话题...");
      isTopicTimeRightNow = true;
    }

    //话题结束的症状条件
    if (this.state.hasTopic) {
      if (
        input.charAt(input.length - 1) == " " ||
        !matchTheLeftDataWithoutSymbol(hash, input, cursor)
      ) {
        console.info("[topic]用户离开了一个话题的编辑");
        isTopicTimeRightNow = false;
      }
    }

    if (isTopicTimeRightNow) {
      var start = input.lastIndexOf(hash, cursor);
      //@TODO 如果句首获取不了，则不更新
      let search = input.substring(start, cursor);
      console.error("[topic]当前话题是:" + search);
      this.setState({
        hasTopic: true,
        currentTopic: { cursor: start, text: search }
      });
      this.getTopicData();
    }
    this.setState({ hasTopic: isTopicTimeRightNow });
  };

  getTopicData = () => {
    //@TODO 发起请求
    // ...
    // const play = {
    //   ...this.state.currentTopic,
    //   ...params,
    // }

    let list = [
      { id: 1, name: "et" },
      { id: 2, name: "eosr" },
      { id: 3, name: "eosrp" },
      { id: 4, name: "eos" },
      { id: 5, name: "exo" },
      { id: 6, name: "ex" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" },
      { id: 7, name: "ef" }
    ];
    this.handleRefreshTopic(list);
  };

  //把所选话题补全至输入框
  handleTopicClick = (name, id, e) => {
    console.log("您已经选择了" + name + "这个话题");
    console.log("目前句首：" + this.state.currentTopic.cursor);
    var intro = this.state.formData.intro;
    var start = this.state.currentTopic.cursor;
    name = "#" + name + " ";
    var newIntro =
      intro.slice(0, start) + name + intro.slice(start + name.length, -1);
    this.setState({
      currentTopic: { cursor: 0, text: "" },
      formData: { ...this.state.formData, intro: newIntro },
      hasTopic: false
    });
  };

  handleRefreshTopic = list => {
    // const { list } = this.state;
    setTimeout(() => {
      //TODO 当数据处理过快时，这里会报错误 Uncaught TypeError: Cannot read property 'refresh' of null
      //index.esm.js?eb37:1027 Uncaught DOMException: Failed to execute 'replaceChild' on 'Node': The node to be replaced is not a child of this node.
      this.topic.refresh(list);
    }, 1000);
  };

  handleShareWechatFirndsZoneClick = e => {
    this.setState({
      formData: { ...this.state.formData, shareWechatFirendsZone: e }
    });
  };

  handleCommentClick = e => {
    this.setState({ formData: { ...this.state.formData, commentClose: e } });
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
    const { formData } = this.state;
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
            value={formData.intro}
            onChange={this.handleIntroTyping.bind(this)}
            maxLength={400}
            autoFocus={true}
            placeholder="请描述这是一道什么菜，或者你的心情..."
          />
          {/* 话题标签选择 */}
          {this.state.hasTopic && (
            <Topic handleClick={this.handleTopicClick} ref={this.refTopic} />
          )}
          {/* 选择图片 */}
          {!this.state.hasTopic && <Selection files={formData.files} />}
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
