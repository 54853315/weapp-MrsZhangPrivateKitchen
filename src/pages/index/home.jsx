import Taro, { Component, useEffect } from "@tarojs/taro";
import { View, Text, Button, Image, ScrollView } from "@tarojs/components";
import { Loading } from "@widgets";
import Recommend from "./recommend";
import Child from "./child";
import Test from "./test";
// import { connect } from "@tarojs/redux";
import "./home.scss";


// import { lifeCycleRecorder } from "../../tools";
// import searchIcon from './assets/search.png'

const RECOMMEND_SIZE = 20;

// @connect(state => state.home, { ...actions, dispatchCartNum })
class Home extends Component {
  config = {
    navigationBarTitleText: "小张私厨"
  };

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true
  };

  componentDidMount() {
    this.loadRecommend();
  }

  loadRecommend = () => {
    if (!this.state.hasMore || this.state.loading) {
      return;
    }

    const payload = {
      lastItemId: this.state.lastItemId,
      size: RECOMMEND_SIZE
    };
    this.setState({ loading: false, loaded: true });
    // this.props
    //   .dispatchRecommend(payload)
    //   .then(res => {
    //     const lastItem = res.rcmdItemList[res.rcmdItemList.length - 1];
    //     this.setState({
    //       loading: false,
    //       hasMore: res.hasMore,
    //       lastItemId: lastItem && lastItem.id
    //     });
    //   })
    //   .catch(() => {
    //     this.setState({ loading: false });
    //   });
  };

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: "目前只可点击底部推荐商品",
      icon: "none"
    });
  };

  //NOTE useReducer()

  // const [state,dispatch] = useReducer([],initialState,init)

  // NOTE  useState() 严苛
  // const [user,setUser] = useState(null)
  // const [foodCount,setFoodCount] = useState(0)
  // const [items,setItems] = useState(null)
  // const [isOnline,setIsOnline] = useState(null)
  // const [loaded,setLoaded] = useState(null)

  // const userLogin = () => setIsOnline(true)
  // const userLogout = () => setIsOnline(false)

  //NOTE userState() 惰性
  // const [modal,updateModal] = useState({user:null,foodCount:null,items:null,isOnline:null,loaded:null})

  //
  // useEffect(() => {
  //   document.title = `宝宝啊，欢迎回来${user}`
  //   lifeCycleRecorder()
  // }, [])
  // const goToCookBookCreate = () => {
  //   Taro.navigateTo({ url: 'pages/book/create' })
  //   // Taro.navigateTo({url:'pages/book/create='+id})  //带参数
  // }

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    const { homeInfo, recommend } = this.props

    return (
      <View ClassName="home">
        <View className="home__search">
          <View className="home__search-wrap" onClick={this.handlePrevent}>
            <Image className="home__search-img" src="" />
            <Text className="home__search-txt">{`搜索商品，共1款好物`}</Text>
          </View>
        </View>
        <ScrollView
          scrollY
          className="home__wrap"
          onScrollToLower={this.loadRecommend}
        >
          {/* <Child userName='测试' /> */}
          {/* <Button onClick={goToCookBookCreate}>创建菜谱</Button>
        {girls.map((item, index) => {
          return (
            <View key={{ index }}>{item.id}:{item.name}</View>
          )
        })} */}

          <View>

            {/* 练手写一下 */}
            {/* <View className="home-recommend">
              <View className="home-recommend__title">
                <Text className="home-recommend__title-txt">为您推荐</Text>
              </View>
            </View>

            <View clasName="home-recommend__list">
              
              <View className="home-recommend__list-item">
                <Image className="home-recommend__list-item-img" />
                <Text className="home-recommend__list-item-desc" numberOfLines={1}>
                desc...
                </Text>
              </View>

            </View> */}

            {/* <Banner list={homeInfo.focus} /> */}

            {/* 为你推荐 */}
            <Recommend list={recommend} />

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
