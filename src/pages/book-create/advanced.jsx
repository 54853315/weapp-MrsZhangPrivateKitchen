import Taro,{Component} from '@tarojs/taro'
import {View,Text,Image,Picture} from '@tarojs/components'

export default class BookCreateAdvanced extends Component{

    goToPictureFilter = item => {
        Taro.showToast({
          title: "功能未实现",
          icon: "none"
        });
        return false;
        Taro.navigateTo({
          url: `/pages/book/item?itemId=${item.id}`
        });
      };

      render () {
        return(
            <View>
                <Text>表单信息</Text>
            </View>
        )
      }
}
