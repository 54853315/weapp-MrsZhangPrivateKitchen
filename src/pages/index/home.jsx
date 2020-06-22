import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtNoticebar } from "taro-ui";
import * as actions from '@actions/home'
import { getWindowHeight } from '@utils/style'
import { Loading,Timeline } from "@widgets";
import { connect } from "@tarojs/redux";
import "./home.scss";

const RECOMMEND_SIZE = 5;

@connect(state => state.home, { ...actions })

class Home extends Component {
  
  config = {
    navigationBarTitleText: "小张私厨"
  };

  constructor() {
    super(...arguments);
  }

  refTimeline = node => (this.timeline = node);

  state = {
    loaded: false,
    loading: false,
    skip: 0,
    hasMore: true
  };

  componentWillMount(){
    Taro.showShareMenu()
  }

  onShareAppMessage(res){
    console.log("onShareAppMessage res=>",res)
    return {
      title:"我在小张私厨发现了很多美味的私房菜噢～快来看看小张有多厉害！",
      path:"/pages/index/home",
    }
  }

  componentDidShow() {
    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
    // this.props.dispatchSearchCount()
    this.loadRecommend()
  }

  loadRecommend = () => {
    if (!this.state.hasMore || this.state.loading) {
      return;
    }

    const skip = this.state.skip;
    const payload = {
      limit: RECOMMEND_SIZE,
      skip: skip,
    };
    this.setState({ loading: true })
    Taro.showNavigationBarLoading()
    this.props
      .dispatchRecommend(payload)
      .then(res => {
        this.setState({
          loading: false,
          hasMore: res.total <= skip ? false : true,
          skip: skip+RECOMMEND_SIZE,
        });
        Taro.hideNavigationBarLoading()
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    const { homeInfo,timelines } = this.props;
    return (
      <View ClassName="home">
        <AtNoticebar icon="volume-plus" marquee>
          小张私厨小程序，主要是为了取悦张奶油同学。
        </AtNoticebar>

        <ScrollView
          scrollY
          className=""
          style={{ height: getWindowHeight() }}
          // home__wrap
          onScrollToLower={this.loadRecommend}
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
