import {View,Text} from '@tarojs/components'

function Child(props){
    return(<View><Text>我是儿子 child.jsx，我爸爸是：{props.userName}</Text></View>)
}

export default Child