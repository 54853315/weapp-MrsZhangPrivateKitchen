import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { getWindowHeight } from "@utils/style";
import { Loading } from "@widgets";
import "./index.scss";
import hash from "@assets/hash.png";

export default class Topic extends Component {
  static defaultProps = {
    
  };

  state = {
    loaded: false,
    list: []
  };

    //父类调用,ref
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
            .map(item => {
              const { id, name } = item;
              return (
                <AtListItem
                  key={id}
                  hasBorder={false}
                  onClick={this.props.handleClick.bind(this, name, id)}
                  title={name}
                  thumb={hash}
                />
              );
            })}
        </AtList>
      </View>
    );
  }
}
