import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import { Loading, Blank } from "@widgets";
import { AtTag, AtAvatar, AtDivider, AtTabs, AtTabsPane } from "taro-ui";
import "./item.scss";
import * as actionsItem from "@actions/item";
import * as actionsHome from "@actions/home";
import { goToTagPage, getBriefDate, getBriefTime } from "../../tools/index";
import { postcss } from "@utils/style";
import { connect } from "@tarojs/redux";

@connect(state => state.item, { ...actionsItem })
@connect(state => state.home, { ...actionsHome })
export default class BookItem extends Component {
  config = {
    navigationBarTitleText: "小张酷炫生活"
  };

  static defaultProps = {
    data: []
  };

  state = {
    uid: null,
    id: null,
    loaded: false,
    showShareIcon: "share"
  };

  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    var id = this.$router.params.itemId;
    this.setState({ id: id });
    if (id > 0) {
      Taro.showShareMenu();
    }
  }

  onShareAppMessage(res) {
    const { id } = this.state;
    const { name } = this.props.itemInfo.user;
    const { image } = this.props.itemInfo.file_url_json[0];
    return {
      title: "我在小张炫酷生活上看到这道菜美极了～快来看看有多厉害！",
      desc: "作者：" + name,
      path: `/pages/book/item?itemId=${id}`,
      imageUrl: image //显示图片长宽比5:4
    };
  }

  componentDidShow() {
    const uid = Taro.getStorageSync("uid");
    this.setState({ uid: uid });
    this.props
      .dispatchItem(this.state.id)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        this.setState({ loaded: true });
      });
  }

  // handlePreviewImage(src) {
  //   Taro.navigateTo({ url: `/pages/show-image/index?url=${src}` });
  // }

  handleImageClick = (image, key) => {
    const { file_url_json } = this.props.itemInfo;
    if (file_url_json) {
      var images = [];
      if (key > 0) {
        images = images.concat(
          file_url_json.slice(0, key),
          file_url_json.slice(key + 1)
        );
        images.splice(0, 0, image);
      } else {
        images[0] = image;
      }
      Taro.previewImage({
        content: image,
        urls: images
      });
    }
  };

  handleDelete = () => {
    let that = this;
    const { id } = that.state;

    Taro.showModal({
      content: "一经删除无法回复哦",
      title: "确认要删除吗？",
      success: res => {
        if (res.confirm) {
          that.props.dispatchItemDelete(id).then(() => {
            Taro.showToast({
              title: "已删除",
              icon: "success",
              success: res => {
                Taro.switchTab({
                  url: `/pages/index/home`,
                  success: res => {
                    this.props.dispatchRecommendClean(id);
                  }
                });
              }
            });
          });
        }
      }
    });
  };

  render() {
    const { itemInfo } = this.props;
    // const tabList = [{ title: "猜你喜欢" }];
    if (!this.state.loaded) {
      return <Loading />;
    }
    if (!itemInfo) {
      return <Blank />;
    }

    return (
      <View className="item">
        <View>
          <Swiper
            className="item-banner"
            indicatorColor="#999"
            indicatorActiveColor="#78A4F4"
            // autoplay='true'
            indicatorDots="true"
            circular="true"
            interval="3000"
          >
            {itemInfo &&
              itemInfo.file_url_json &&
              itemInfo.file_url_json.map((img, imgKey) => (
                <SwiperItem key={imgKey}>
                  <View className="item-banner-item">
                    <Image
                      mode="aspectFill"
                      onClick={this.handleImageClick.bind(this, img, imgKey)}
                      className="item-banner-img"
                      src={img}
                    />
                  </View>
                </SwiperItem>
              ))}
          </Swiper>

          {/* 作者头像 */}
          <View
            className="item-avatar"
            style={postcss({
              width:
                (itemInfo.user.name != null ? itemInfo.user.name.length : 0) *
                  20 +
                "px"
            })}
          >
            {" "}
            {/* NOTE 根据用户的名称长度传递width值 */}
            <AtAvatar
              className="item-avatar-img"
              size="small"
              circle
              image={itemInfo.user.thumb}
            ></AtAvatar>
            <Text className="item-avatar-txt">{itemInfo.user.name}</Text>
          </View>

          {/* <View className="item-divider-with-avatar-anchor"></View> */}

          {/* 标签 */}
          {itemInfo.tags &&
            itemInfo.tags.map(tag => {
              return (
                <AtTag
                  key={tag.id}
                  onClick={goToTagPage.bind(this, tag.id)}
                  name="tag-1"
                  type="primary"
                  circle
                  active={true}
                  size="small"
                >
                  {tag.name}
                </AtTag>
              );
            })}

          {/* 菜品信息 */}
          <View className="item-main">
            <View className="item-main-title">{itemInfo.name}</View>
            <View className="item-main-date">
              发布于 {getBriefDate(itemInfo.created_at)}{" "}
              {getBriefTime(itemInfo.created_at)}
              {itemInfo.user.id == this.state.uid && (
                <Text
                  onClick={this.handleDelete}
                  className="item-main-date-delete-btn"
                >
                  删除
                </Text>
              )}
            </View>
            <View className="item-main-content">
              <Text>{itemInfo.content}</Text>
            </View>
          </View>

          {/* 下边是评论区,待实现 */}
          {/* {itemInfo.comments &&
              itemInfo.comments.map(comment => {
                return (
                  <View className="item-comment">
                    <View className="at-row">
                      <View className="at-col at-col-2 item-comment-avatar">
                        <AtAvatar
                          className=""
                          size="small"
                          circle
                          image={avatar}
                        ></AtAvatar>
                      </View>

                      <View className="at-col at-col-3 item-comment-nickname">
                        昵称昵称
                      </View>
                      <View className="at-col at-col__offset-4 at-col-3">
                        <Text className="item-comment-more">全部评论(37)</Text>
                      </View>
                    </View>
                    <View className="item-comment-content">
                      你做的菜很棒啊!
                    </View>
                  </View>
                );
              })} */}

          {/* <View style="background:#f4f4f4;height:10px;"></View> */}

          {/* 猜你喜欢区域 */}
          {/* <AtTabs
            current={this.state.current}
            tabList={tabList}
            animated={true}
            show={false}
          > */}
          {/* <AtTabsPane current={this.state.current} index={0}>
              <View className="recommend__list">
                <View className="at-row at-row--wrap">
                  <Image
                    src={img1}
                    className="recommend__list-img at-col at-col-4"
                  />
                  <Image
                    src={img1}
                    className="recommend__list-img at-col at-col-4"
                  />
                  <Image
                    src={img1}
                    className="recommend__list-img at-col at-col-4"
                  />
                  <AtTag
                    onClick={goToTagPage.bind(this, 1)}
                    name="tag-1"
                    type="primary"
                    circle
                    active="true"
                    size="small"
                  >
                    粤系
                  </AtTag>
                  <AtTag
                    onClick={goToTagPage.bind(this, 1)}
                    name="tag-1"
                    type="primary"
                    circle
                    active="true"
                    size="small"
                  >
                    欧式糕点
                  </AtTag>
                </View>
              </View>
            </AtTabsPane>
          </AtTabs> */}
        </View>
      </View>
    );
  }
}
