import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtImagePicker } from "taro-ui";
import "./index.scss";

export default class Selection extends Component {

  static defaultProps = {
    files: []
  };

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    // this.itemId = parseInt(this.$router.params.itemId)
  }

  onChange(files) {
    this.setState({
      files
    });
  }
  onFail(mes) {
    console.log(mes);
  }
  onImageClick(index, file) {
    console.log(index, file);
  }

  render() {
    const { files } = this.props;
    return (
      <View>
        <AtImagePicker
          mode="top"
          files={files}
          onChange={this.onChange.bind(this)}
          onFail={this.onFail.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
        />
      </View>
    );
  }
}
