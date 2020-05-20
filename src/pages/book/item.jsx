import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import { Loading,Blank } from "@widgets";
import {
  AtTag,
  AtAvatar,
  AtNavBar,
  AtDivider,
  AtTabs,
  AtTabsPane
} from "taro-ui";
import "./item.scss";
import img1 from "@assets/foods/food1.jpeg";
import img2 from "@assets/foods/food2.jpeg";
import { goBack, goToTagPage } from "../../tools/index";

export default class BookItem extends Component {
  static defaultProps = {
    list: [],
    id: null,
    img1: "https://blog.img.crazyphper.com/2019/12/DSC4807.jpg",
    avatar: "https://img.crazyphper.com/home/images/picture.jpg"
  };

  constructor() {
    super(...arguments);
    this.state = {
    loaded: false,
    loading: false,
    showShareIcon:"share"
    // lastItemId: 0,
  };
}

  // Taro 提供了 componentWillPreload 钩子，它接收页面跳转的参数作为参数。可以把需要预加载的内容通过 return 返回，然后在页面触发 componentWillMount 后即可通过 this.$preloadData 获取到预加载的内容。
  // componentWillMount() {
  //   console.log("isFetching: ", this.isFetching);
  //   this.$preloadData.then(res => {
  //     console.log("res: ", res);
  //     this.isFetching = false;
  //   });
  // }

  componentWillPreload(params) {
    return this.fetchData(params.url);
  }

  fetchData() {
    this.isFetching = true;
  }

  render() {
    const { list, img1, avatar } = this.props;
    const hasListData = list.length > 0 ? true:false; 
    const tabList = [{ title: "猜你喜欢" }];
    // if (!this.state.loaded) {
    //   return <Loading />;
    // }

    return (
      <View className="item">

        <AtNavBar
          onClickRgIconSt={this.goNext}
          // onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.goBack}
          color="#000"
          title="菜品"
          leftText="返回"
          onClickLeftIcon={goBack}
          leftIconType="chevron-left"
          rightColor="#888"
          rightFirstIconType={this.state.showShareIcon}
        />

<Blank hasListData={hasListData} />
        
        {/* TODO */}
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
            {/* {[img0, img1, img2].map(img => (<SwiperItem key={img}><Image src={img}/></SwiperItem>))} */}
            <SwiperItem>
              <View className="item-banner-item">
                <Image className="item-banner-img" src={img1} />
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className="item-banner-item">
                <Image className="item-banner-img" src={img2} />
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className="item-banner-item">
                <Image className="item-banner-img" src={img1} />
              </View>
            </SwiperItem>
          </Swiper>

          {/* 作者头像 */}
          <View className="item-avatar">
            <AtAvatar
              className="item-avatar-img"
              size="small"
              circle
              image={avatar}
            ></AtAvatar>
            <Text>燃烧的胸毛</Text>
          </View>

          {/* 标签 */}
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

          {/* 菜品信息 */}
          <View className="item-main">
            <View className="item-main-title">最美的菜</View>
            <View className="item-main-date">2020-05-16 22:29</View>
            <View className="item-main-content">
              我想在每个人的青春年岁里，都曾有过一段关于旅行的憧憬，一段说走就走的旅行。可是在现实里，因为种种的原因，这个美好的希冀变成了每个午夜梦回的美好梦想。
            </View>
          </View>
          <AtDivider>
            {/* 一条线 */}
            <AtDivider content="" />
            {/* <View className="item-divider-with-avatar-anchor"></View> */}
          </AtDivider>

          {/* 下边是评论区 */}
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

              {/* <View className='at-col at-col-10'> */}
              <View className="at-col at-col-3 item-comment-nickname">
                昵称昵称
              </View>
              <View className="at-col at-col__offset-4 at-col-3">
                <Text className="item-comment-more">全部评论(37)</Text>
                {/* <AtIcon content=''></AtIcon> */}
              </View>
              {/* </View> */}
            </View>
            <View className="item-comment-content">你做的菜很棒啊!</View>
          </View>

          <View style="background:#f4f4f4;height:10px;"></View>

          {/* 猜你喜欢区域 */}
          <AtTabs current={this.state.current} tabList={tabList}>
            <AtTabsPane current={this.state.current} index={0}>
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
          </AtTabs>
        </View>
        </View>
    );
  }
}
