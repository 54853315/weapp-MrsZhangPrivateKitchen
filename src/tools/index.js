import Taro, { Component } from "@tarojs/taro";

// 检查词首是否为symol符号
export function matchTheLeftDataWithoutSymbol(symbol, str, cursor) {
  var start = str.lastIndexOf(symbol, cursor);
  // console.error("[matchTheLeftDataWithoutSymbol]上一个"+symbol+"出现的的位置为：" + start);
  // console.log(str.substring(start, cursor).split(" "));
  if (start >= 0 && str.substring(start, cursor).split(" ").length == 1) {
    return true;
  }
  return false;
}

export function GotoLogin () {
  Taro.navigateTo({
    url: '/pages/user-login/wechat'
  })
}

export function goToTagPage(id) {
  console.log(id);
  Taro.showToast({
    title: "标签功能还未实现",
    icon: "none"
  });
}

export function goBack() {
  Taro.navigateBack();
}

// export function goToBookItemPage(id) {
//   console.log("click goToBookItemPage")
//   Taro.showToast({
//     title: "我被点了呢！",
//     icon: "none"
//   });
//   Taro.navigateTo({
//     url: `/pages/book/item?itemId=${id}`
//   });
// }

export function getMDByDateTIme(date) {
  var d = new Date(date);
  var month = zeroize(d.getMonth());
  var day = zeroize(d.getDate());
  return month + "/" + day;
}

export function zeroize(num) {
  return (String(num).length == 1 ? "0" : "") + num;
}

/**
 * 获取时间的格式化
 * @param {string} datetime
 */
export function getBriefTime(datetime) {
  var d = new Date(datetime);
  var hour = zeroize(d.getHours());
  var min = zeroize(d.getMinutes());
  return hour + ":" + min;
}

/**
 * 获取刚刚、今天、昨天、前天、_(今年)、去年的时间显示
 * @param {string} datetime
 */
export function getBriefDate(datetime) {
  var timestamp = Date.parse(datetime) / 1000;

  var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

  var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

  var Y = tmDate.getFullYear(),
    m = tmDate.getMonth() + 1,
    d = tmDate.getDate();
  var H = tmDate.getHours(),
    i = tmDate.getMinutes(),
    s = tmDate.getSeconds();

  if (timestampDiff < 60) {
    // 一分钟以内
    return "刚刚";
  } else if (timestampDiff < 3600) {
    // 一小时前之内
    return Math.floor(timestampDiff / 60) + "分钟前";
  } else if (
    curDate.getFullYear() == Y &&
    curDate.getMonth() + 1 == m &&
    curDate.getDate() == d
  ) {
    return "今天";
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
    if (
      newDate.getFullYear() == Y &&
      newDate.getMonth() + 1 == m &&
      newDate.getDate() == d
    ) {
      return "昨天";
    } else if (curDate.getFullYear() == Y) {
      if (curDate.getMonth() == m) {//上个月
        return "上个月";
      }else if ((curDate.getMonth()+1) == m) {  //本月
        return zeroize(m) + "月" + zeroize(d) + "日 ";
      } else {  //几个月
        return Math.abs(m + 1 - curDate.getMonth()) + "个月前";
      }
    } else if ((curDate.getFullYear()+1) == Y) {
      return "去年";
    }else{
      return Y+"年前";
      // return (
      //   Y +
      //   "年" +
      //   zeroize(m) +
      //   "月" +
      //   zeroize(d) +
      //   "日 " +
      //   zeroize(H) +
      //   ":" +
      //   zeroize(i)
      // );
    }
  }
}
