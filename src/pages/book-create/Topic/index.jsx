import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { getWindowHeight } from "@utils/style";
import fetch from "@utils/request";
import { Loading } from "@widgets";
import "./index.scss";
import hash from "@assets/hash.png";

export default class Topic extends Component {
  static defaultProps = {
    string: []
  };

  state = {
    loaded: false,
    loading: false,
    list: []
  };

  //   componentDidShow() {
  //     fetch({ url: API_CHECK_LOGIN, showToast: false, autoLogin: false }).then((res) => {
  //       if (res) {
  //         this.setState({ loaded: true, login: true })
  //         this.props.dispatchCart()
  //         this.props.dispatchCartNum()
  //         this.props.dispatchRecommend()
  //       } else {
  //         this.setState({ loaded: true, login: false })
  //       }
  //     })
  //   }

  componentWillMount() {
    return this.loadTopic();
  }

  loadTopic() {
    if (this.state.loading) {
      return;
    }
    const payload = {};
    this.setState({ loading: true, loaded: true });

    //NOTE 发起请求，获取新数据，渲染结果
    this.setState({
      list: [
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
      ]
    });
  }

  handleClick = string => {
    console.log(event.target.key);
    console.log(string);
    //NOTE 把所选话题补全至输入框
  };
  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }
    return (
      <View className="topic" style={getWindowHeight()}>
        <AtList>
          {this.state.list
            //   .filter(item => item.type === 1)
            .map(item => {
              const { id, name } = item;
              return (
                <AtListItem
                  key={id}
                  hasBorder={false}
                  onClick={this.handleClick.bind(this)}
                  title={name}
                  //   arrow="right"
                  thumb={hash}
                />
              );
            })}
        </AtList>
      </View>
    );
  }
}
