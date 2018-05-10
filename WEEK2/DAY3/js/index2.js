//1.获取想要操作的元素
let list=document.getElementById("list");
let header=document.getElementById("header");
let sortBtn=header.getElementsByTagName("a");
let data=null;

//2.获取数据
let xhr=new XMLHttpRequest();
xhr.open("get","data/product.json",false);
xhr.onreadystatechange=function () {
  if(xhr.status==200&&xhr.readyState==4){
    data=JSON.parse(xhr.responseText);
  }
};
xhr.send(null);

//3.绑定数据到页面上
function bindData(data) {
  let str=``;
  data.forEach((item)=>{
    str+=`
     <li>
        <a href="javascript:;">
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <p class="hot">热度:${item.hot}</p>
            <del>$9999</del>
            <span>￥${item.price}</span>
            <p class="time">上架时间：${item.time}</p>
        </a>
    </li>
    `
  });
  list.innerHTML=str;
}
bindData(data);

//4.给三个a绑定事件
for(let i=0;i<sortBtn.length;i++){
  sortBtn[i].flg=-1;
  sortBtn[i].onclick=function () {
    this.flg*=-1;
    sort.call(this,this.getAttribute("sort-attr"));
    //up和down跟随
    arrowFollow.call(this);//将函数中的this变成你点击的那个a标签
    clearOther.call(this);
  }
}
function sort(sortAttr) {
  data.sort((a,b)=>{
    return sortAttr=="time"?(new Date(a[sortAttr])-new Date(b[sortAttr]))*this.flg:(a[sortAttr]-b[sortAttr])*this.flg;
  });
  bindData(data);
}

function arrowFollow() {
  //根据点击的a标签(this)将下面的俩三角(up和down) 实现对应
  //获取当前点击的a标签中的俩个i 就是获取他的俩孩子
  let up=this.children[0];
  let down=this.children[1];
  //根据每一个a的flg(this.flg)来确定是谁有高亮样式
  if(this.flg>0){
    //升序 up加上一个类名
    up.classList.add("bg");
    down.classList.remove("bg");
  }else {
    down.classList.add("bg");
    up.classList.remove("bg");
  }
}

function clearOther() {
  //只要this(不是当前点击的a)标签让里面的i标签没有'bg'类名
  for(let i=0;i<sortBtn.length;i++){
    if(sortBtn[i]!=this){
      sortBtn[i].children[0].classList.remove("bg");
      sortBtn[i].children[1].classList.remove("bg");
      //将其他的状态重置初始化
      sortBtn[i].flg=-1;
    }
  }
}