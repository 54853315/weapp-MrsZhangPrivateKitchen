import Taro,{useState} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'

function Create(){

    const [pageTitle,setPageTitle] = useState('创建菜谱')
    return(
        <View>
            <Text>你可以从我这里创建菜谱了</Text>
        </View>
    )
}

export default Create