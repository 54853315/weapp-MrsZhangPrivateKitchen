import Taro, { Component } from "@tarojs/taro";

export function lifeCycleRecorder() {
  console.log("告诉你可以这么做");
}

export function matchTheLeftDataWithoutSymbol(symbol, str, cursor) {
  var start = str.lastIndexOf(symbol, cursor);
  // console.error("[matchTheLeftDataWithoutSymbol]上一个"+symbol+"出现的的位置为：" + start);
  // console.log(str.substring(start, cursor).split(" "));
  if (start > 0 && str.substring(start, cursor).split(" ").length == 1) {
    return true;
  }
  return false;
}

export function goToTagPage(id){
  console.log(id);
  Taro.showToast({
    title: "标签功能还未实现",
    icon: "none"
  });
}

export function goBack(){
  Taro.navigateBack();
}

export function goToBookItemPage(id) {
  Taro.navigateTo({
    url: `/pages/book/item?itemId=${id}`
  });
};