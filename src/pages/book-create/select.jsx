import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtNavBar,
  AtTextarea,
  AtList,
  AtListItem,
  AtMessage,
  AtImagePicker,
  AtForm,
  AtSwitch
} from "taro-ui";
import { ButtonItem } from "@components";
import Topic from "./topic";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/item";
import "./index.scss";
import { matchTheLeftDataWithoutSymbol } from "../../tools";
import { updateStorage, getStorage } from "@utils/request";

@connect(state => state.home, { ...actions })
export default class BookCreateSelect extends Component {
  static defaultProps = {};
  currentTopic = { cursor: 0, text: "" }; //当前内容
  hasTopic = false; //是否有话题

  constructor() {
    super(...arguments);
    this.state = {
      submitFlag:false,
      userLogined: false,
      formData: {
        id: 0,
        intro: "", //介绍信息
        commentClose: false, //评论开关
        files: []
        // 重组结构为这样的files：
        // files: [
        //   {
        //     url: "https://img.crazyphper.com/home/images/picture.jpg",
        //     text: "", //描述文字
        //     file: "" //所选文件，为空代表没选择图片，而是显示已经上传的图片
        //   }
        // ]
      }
      // replaces:{}, //替换文字，功能待开发
    };
  }

  initState() {
    this.setState({
      submitFlag: false,
      userLogined: false,
      formData: {
        id: 0,
        intro: "", //介绍信息
        commentClose: false, //评论开关
        files: []
      }
      // replaces:{}, //替换文字，功能待开发
    });
  }

  componentDidMount() {
    
  }

  refTopic = node => (this.topic = node);
  refFile = node => (this.file = node);

  handleIntroTyping = (input, event) => {
    console.log("------handleIntroTyping() ... ");
    this.setState({
      formData: { ...this.state.formData, intro: input }
    });

    var hash = "#";

    var isTopicTimeRightNow = false;
    var cursor = event.target.cursor;
    // 搜索#
    if (
      input.charAt(input.length - 1) == hash ||
      matchTheLeftDataWithoutSymbol(hash, input, cursor)
    ) {
      console.info("[topic]用户正在输入话题...");
      isTopicTimeRightNow = true;
    }

    //话题结束的症状条件
    if (this.hasTopic) {
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
      let search = input.substring(start + 1, cursor);
      console.error("[topic]当前话题是:" + search + ",start = " + start);
      this.hasTopic = true;
      this.currentTopic = { cursor: start, text: search };
      this.getTopicData();
    }
    this.hasTopic = isTopicTimeRightNow;
  };

  getTopicData = () => {
    const payload = {
      q: "n=" + this.currentTopic["text"]
    };
    this.props.dispatchTagSearch(payload).then(res => {
      let list = [];

      for (var i = 0; i < res.result.length; i++) {
        list[i] = { id: res.result[i]["id"], name: res.result[i]["name"] };
      }
      this.handleRefreshTopic(list);
    });
  };

  //把所选话题补全至输入框
  handleTopicClick = (name, id, e) => {
    console.log("您已经选择了" + name + "这个话题");
    console.log("目前句首：" + this.currentTopic["cursor"]);
    var intro = this.state.formData.intro;
    var start = this.currentTopic["cursor"];
    name = "#" + name + " ";
    var newIntro =
      intro.slice(0, start) + name + intro.slice(start + name.length, -1);
    this.setState({
      formData: { ...this.state.formData, intro: newIntro }
    });
    this.currentTopic = { cursor: 0, text: "" };
    this.hasTopic = false;
  };

  handleRefreshTopic = list => {
    // const { list } = this.state;
    setTimeout(() => {
      //TODO 当数据处理过快时，这里会报错误 Uncaught TypeError: Cannot read property 'refresh' of null
      //index.esm.js?eb37:1027 Uncaught DOMException: Failed to execute 'replaceChild' on 'Node': The node to be replaced is not a child of this node.
      this.topic.refresh(list);
    }, 1000);
  };
  
  handleCommentClick = e => {
    this.setState({ formData: { ...this.state.formData, commentClose: e } });
  };

  componentDidShow() {
    const uid = Taro.getStorageSync("uid");
    var userLogined = uid > 0 ? true : false;
    this.setState({ userLogined: userLogined });
    if (!userLogined) {
      Taro.redirectTo({
        url: `/pages/user-login/wechat`
      });
    }
  }

  handleImageClick(index, file) {
    Taro.previewImage({
      content:file.url,
      urls:[file.url]
    })
  }

  // handleImageChange = files => {
  handleImageChange = datas => {
    var arr = [];
    for (var i = 0; i < datas.length; i++) {
      arr[i] = {
        url: datas[i]["url"],
        file: datas[i]["file"],
        text: ""
      };
    }
    this.setState({
      formData: {
        ...this.state.formData,
        files: arr
      }
    });
  };

  // handleDeletePic = index => {
  //   Taro.showModal({
  //     title: "提示",
  //     content: "是否确定删除?"
  //   }).then(res => {
  //     if (res.confirm) {
  //       this.setState({
  //         formData: {
  //           ...this.state.formData,
  //           files: this.state.formData.files.filter((x, i) => {
  //             return i["url"] !== index;
  //           })
  //         }
  //       });
  //     }
  //   });
  // };

  handleSubmit = () => {
    const { formData } = this.state;
    let that = this;
    const { files, intro } = formData;

    if (files.length == 0) {
      Taro.atMessage({ message: "请选择图片呀", type: "warning" });
      return false;
    }

    if (!intro) {
      Taro.atMessage({ message: "请输入心情呀", type: "warning" });
      return false;
    }

    wx.showNavigationBarLoading();
    this.setState({ submitFlag: true });

    var promise = Promise.all(
      files.map((file, index) => {
        if (file["file"] == "") {
          return;
        }

        var payload = {
          file: file["file"]["path"]
        };
        return this.props.dispatchUpload({ payload }).then(res => {
          files[index] = { url: res, file: "" };
        });
      })
    ).then(res => {
      const { formData } = this.state;
      var payload = {
        id: formData.id,
        content: formData.intro,
        allow_comments: formData.commentClose,
        // share_wx: formData.shareWechatFirendsZone,
        files: files.map((file, index) => {
          return file["url"];
        }),
        status: "publish"
      };

      this.props
        .dispatchStore(payload)
        .then(res => {
          Taro.hideNavigationBarLoading();
          Taro.atMessage({
            message: "发布成功！恭喜你呀恭喜你！",
            type: "success"
          });
          //清理当前state
          setTimeout(() => {
            Taro.switchTab(
              {
                url: `/pages/index/home`
              },
              that.initState()
            );
          }, 1500);
        })
        .catch(error => {
          Taro.atMessage({
            message: "发布失败…… ",
            type: "error"
          });
          this.setState({ submitFlag: false });
        });
    });
  };

  render() {
    const { formData, submitFlag } = this.state;
    return (
      <View>
        {/* <AtNavBar
          onClickRgIconSt={this.handleSubmit.bind(this)}
          // onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.goBack}
          color="#000"
          title="选择图片"
          leftText="取消"
          rightColor="#888"
          rightFirstIconType="check-circle"
        /> */}

        <AtMessage />

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
          {this.hasTopic && (
            <Topic handleClick={this.handleTopicClick} ref={this.refTopic} />
          )}
          {/* 选择图片 */}
          {!this.hasTopic && (
            <AtImagePicker
              // mode="top"
              files={formData.files}
              onChange={this.handleImageChange.bind(this)}
              onImageClick={this.handleImageClick.bind(this)}
              count={9}
            />
          )}
          {/* 底部区域 */}
          {!this.hasTopic && (
            <AtList hasBorder={false}>

              {/* 评论开关 */}
              <AtSwitch
                border={false}
                title="关闭评论功能"
                disabled
                checked={this.state.commentClose}
                onChange={this.handleCommentClick}
              />

              {/* 替代文字 */}
              {/* <AtListItem
                hasBorder={false}
                title="输入替代文字"
                note=""
                arrow="right"
              /> */}
            </AtList>
          )}
        </AtForm>

        {!this.hasTopic && (
          <ButtonItem
            type="primary"
            text="发布"
            loading={submitFlag}
            disabled={submitFlag}
            onClick={this.handleSubmit}
            compStyle={{
              background: "#b59f7b",
              width: "80%",
              marginTop: "50px",
              position: "absolute",
              bottom: Taro.pxTransform(20),
              left: "10%",
              borderRadius: Taro.pxTransform(50)
            }}
          />
        )}
      </View>
    );
  }
}
