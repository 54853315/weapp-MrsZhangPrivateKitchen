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
    
  };

  state = {
    loaded: false,
    // loading: false,
    list: []
  };

  refresh(data) {
    this.setState({
      loaded: true,
      list: data
    });
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }
    return (
      <View className='topic' style={getWindowHeight()}>
        <AtList>
          {this.state.list
            //   .filter(item => item.type === 1)
            .map(item => {
              const { id, name } = item;
              return (
                <AtListItem
                  key={id}
                  hasBorder={false}
                  onClick={this.props.handleClick.bind(this, name, id)}
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
