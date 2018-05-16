function win(attr,value) {
  if(value===undefined){
    //此时只传了一个参数说明想要获取
    return document.documentElement[attr]||document.body[attr];
  }else {
    //此时想要设置
    document.documentElement[attr]=value;
    document.body[attr]=value;
  }
}
function offset(curEle) {
  let parent=curEle.offsetParent;
  let L=curEle.offsetLeft;
  let T=curEle.offsetTop;
  while (parent){
    if(!/MS 8/.test(navigator.userAgent)){
      L+=parent.clientLeft;
      T+=parent.clientTop;
    }
    L+=parent.offsetLeft;
    T+=parent.offsetTop;
    parent=parent.offsetParent;
  }
  return {left:L,top:T}
}