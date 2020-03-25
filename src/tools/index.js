export function lifeCycleRecorder() {
  console.log("告诉你可以这么做");
}

export function matchTheLeftDataWithoutSymbol(symbol, str, cursor) {
  var start = str.lastIndexOf(symbol, cursor);
  // console.error("[matchTheLeftDataWithoutSymbol]上一个"+symbol+"出现的的位置为：" + start);
  // console.log(str.substring(start, cursor).split(" "));
  if (str.substring(start, cursor).split(" ").length == 1) {
    return true;
  }
  return false;
}
