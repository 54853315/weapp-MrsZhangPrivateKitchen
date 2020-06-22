import Taro, { Component } from '@tarojs/taro'
import { View, Image, } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import './index.scss'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: {},
    }
  }

  config = {
    navigationBarTitleText: '查看图片'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    const { url } = this.$router.params
    this.setState({
      url
    })
  }

  componentDidHide () { }

  // 使用wxParse
  componentDidMount() {
  }

  getData(params={}) {
  }

  onPullDownRefresh(){
  }

  render () {
    return (
      <View className='image-container flex-x-c'>
        <AtMessage />
        <Image src={this.state.url}></Image>
      </View>
    )
  }
}

export default Index
