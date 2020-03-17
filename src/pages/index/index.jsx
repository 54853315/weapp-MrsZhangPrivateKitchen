import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Button, Image, ScrollView } from '@tarojs/components'
import './index.scss'

// import Recommend from './recommend'  //@TODO 当未注册时，推荐其他人发的内容
// import Child from './child'

const RECOMMEND_SIZE = 20

function Index() {

  // config = {
  //   navigationBarTitleText: '小张私厨'
  // }

  // Taro.showToast({
  //   title: '欢迎使用，爱你么么哒之小张私厨小程序',
  //   icon: 'none',
  //   duration: 5000
  // })

  return (
    <View ClassName='home'>
      <View className='home__search'>
        <View className='home__search-wrap' onClick={this.handlePrevent}>
          <Image className='home__search-img' src={searchIcon} />
          <Text className='home__search-txt'>
            {`搜索商品，共${searchCount}款好物`}
          </Text>
        </View>
      </View>
      <ScrollView
        scrollY
        className='home__wrap'
        onScrollToLower={this.loadRecommend}
        style={{ height: getWindowHeight() }}
      >
        <Text>{userName}</Text>
        <Child userName={userName} />
        <Button onClick={goToCookBookCreate}>创建菜谱</Button>
        {girls.map((item, index) => {
          return (
            <View key={{ index }}>{item.id}:{item.name}</View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Index