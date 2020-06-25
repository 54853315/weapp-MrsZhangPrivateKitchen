import Taro, { Component, useEffect } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtLoadMore, AtTag } from "taro-ui";
import "./index.scss";
import {
  goToTagPage,
  // goToBookItemPage,
  getMDByDateTIme,
  getBriefDate,
  getBriefTime
} from "../../tools/index";

export default class Timeline extends Component {
  static defaultProps = {
    list: []
  };

  //跳转到详情页面
  goToBookItemPage = id => {
    //NOTE 原来使用的是 import {goToBookItemPage} from "../../tools/index"; 但是在小程序上无效
    Taro.navigateTo({
      url: `/pages/book/item?itemId=${id}`
    });
  };

  render() {
    const { list } = this.props;
    return (
      <View className="at-row">
        <View className="">
          {list.map((item, key) => {
            const { books } = item;
            // NOTE 由于小程序自身的bug，如果if中直接使用books.length 会报错；另外不应该用.length 做比较，而直接用null
            //via : https://developers.weixin.qq.com/community/develop/doc/000c8a7eeb45e8b018b72f01356800
            const outermostBook = books[0];
            return (
              <View className="timeline" key={index}>
                {!!outermostBook && (
                  <View className="tl-time">
                    {/* 日期 */}
                    <Text className="tl-time-txt">
                      {getMDByDateTIme(outermostBook.created_at)}
                    </Text>
                  </View>
                )}

                <View className="tl-line">
                  {/* 右侧顶部区域 */}
                  {!!outermostBook && (
                    <View className="tl-top-line">
                      <Text className="tl-top-line-txt">
                        {getBriefDate(outermostBook.created_at)}
                      </Text>
                    </View>
                  )}

                  {books.map(book => {
                    return (
                      <View className="tl-list" key={book.id}>
                        {/* 时间段内循环 */}
                        <View className="tl-list-item">
                          <View className="tl-list-time">
                            {/* 时间 */}
                            {getBriefTime(book.created_at)}
                          </View>

                          {/* 右侧正文区域 */}
                          <View
                            className="at-row at-row--wrap"
                            style="width:100%"
                          >
                            {/* 图片 */}
                            {book.file_url_json != null &&
                              book.file_url_json.map((image, _) => {
                                return (
                                  <Image
                                    src={image}
                                    className="tl-list-img"
                                    mode="aspectFill"
                                    onClick={this.goToBookItemPage.bind(
                                      this,
                                      book.id
                                    )}
                                  />
                                );
                              })}

                            {/* 标签 */}
                            <View className="tl-list-tags">
                              {book.tags != null &&
                                book.tags.map(tag => {
                                  return (
                                    <AtTag
                                      key={tag.id}
                                      onClick={goToTagPage.bind(this, tag.id)}
                                      name="tag-1"
                                      type="primary"
                                      circle
                                      active={true}
                                      size="small"
                                    >
                                      {tag.name}
                                    </AtTag>
                                  );
                                })}
                            </View>

                            {/* 介绍 */}
                            <View className="tl-list-txt">{book.content}</View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
