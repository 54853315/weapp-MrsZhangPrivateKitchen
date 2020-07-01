import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtNoticebar } from "taro-ui";
import * as actions from "@actions/home";
import { getWindowHeight } from "@utils/style";
import { Loading, Timeline } from "@widgets";
import { connect } from "@tarojs/redux";
import "./home.scss";

const REQUEST_LIMIT = 5;

@connect(state => state.home, { ...actions })
class Home extends Component {
  config = {
    navigationBarTitleText: "小张酷炫生活"
    //NOTE 由于小程序下拉刷新和组件有冲突，所以下边的设置无效（或者说，需要拖动ScrollView以外的区域才能触发～）
    // enablePullDownRefresh: true,
    // onReachBottomDistance: 50
  };

  constructor() {
    super(...arguments);
  }
  // refTimeline = node => (this.timeline = node);

  state = {
    loaded: false,
    loading: false,
    skip: 0,
    hasMore: true,
    scrollTop: 0
  };

  componentWillMount() {
    Taro.showShareMenu();
  }

  onShareAppMessage(res) {
    return {
      title: "我在小张炫酷生活发现了很多美味的私房菜噢～快来看看小张有多厉害！",
      path: "/pages/index/home"
    };
  }

  // NOTE 动画效果回不去，虽然能获取数据，但是loading 一直 雏在那儿
  onRefresherRefresh(res) {
    console.log("onRefresherRefresh");
    this.setState({ scrollTop: 0 });
    this.loadRecommend(true);
    Taro.pageScrollTo({
      scrollTop: 800,
      duration: 300,
      complete:function(res){
        console.error("complete!!",res)
      }
    });
  }

  componentDidShow() {
    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true });
    });
    // this.props.dispatchSearchCount()
    this.loadRecommend();
  }

  loadRecommend = refresh => {
    this.bindrefresherrestore = true;
    if ((!this.state.hasMore && refresh != true) || this.state.loading) {
      return;
    }

    const skip = refresh == true ? 0 : this.state.skip;
    const payload = {
      limit: REQUEST_LIMIT,
      skip: skip
    };
    this.setState({ loading: true });
    Taro.showNavigationBarLoading();
    this.props
      .dispatchRecommend(payload)
      .then(res => {
        this.setState({
          hasMore: res.total <= skip ? false : true,
          skip: skip + REQUEST_LIMIT
        });
      })
      .finally(() => {
        Taro.hideNavigationBarLoading();
        // if (refresh) {
        //   Taro.stopPullDownRefresh();
        // }
        this.setState({ loading: false });
      });
  };

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }
    const { timelines } = this.props;

    return (
      <View ClassName="home">
        <AtNoticebar icon="volume-plus" marquee className="home__noticebar">
          小张炫酷生活小程序，主要是为了取悦张奶油。
        </AtNoticebar>

        <ScrollView
          scrollY
          // scrollWithAnimation
          // refresherEnabled //开启自定义下拉刷新
          // scrollTop={this.state.scrollTop}
          className=""
          style={{ height: getWindowHeight() }}
          onScrollToLower={this.loadRecommend}
          onRefresherRefresh={this.onRefresherRefresh.bind(this)} //自定义下拉刷新被触发
        >
          <Timeline list={timelines} />
          <View>
            {this.state.loading && (
              <View className="home__loading">
                <Text className="home__loading-txt">正在加载中...</Text>
              </View>
            )}
            {!this.state.hasMore && (
              <View className="home__loading home__loading--not-more">
                <Text className="home__loading-txt">更多内容，敬请期待</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
