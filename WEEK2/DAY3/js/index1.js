//1.获取想要操作的元素
let list=document.getElementById("list");
let header=document.getElementById("header");
let sortBtn=header.getElementsByTagName("a");
let data=null;
//2.获取数据
let xhr=new XMLHttpRequest();
xhr.open("get","data/product.json",false);
xhr.onreadystatechange=function () {
  data=JSON.parse(xhr.responseText);
};
xhr.send(null);

//3.将数据绑定到页面上
function bindHTML(data) {
  //循环拼接字符串 ES6模板字符串
  var strHTML=``;
  data.forEach((item)=>{
    //item是一个对象
    strHTML+=`
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
  //将拼接好的字符串放在页面上 给list.innerHTML赋值
  list.innerHTML=strHTML;
}
bindHTML(data);

//4.排序
//操作的是数据 数据变了让视图刷新 重新执行bindHTML页面就会重新渲染
//我们排序排的是data 将data按照一定的维度排完序之后再去执行bindHTML即可

//循环所有的a排序
for(let i=0;i<sortBtn.length;i++){
  sortBtn[i].flg=-1;
  sortBtn[i].onclick=function () {
    //点击每一个a标签传的参数不一样 都是自己的某一个排序的维度
    //将每一个a标签的属性"sort-attr"的值获取出来传给sort
    //第一个 a, this.getAttribute("sort-attr")->"time" ->sort("time")
    //第二个 a, this.getAttribute("sort-attr")->"price" ->sort("price")
    //第三个 a, this.getAttribute("sort-attr")->"hot" ->sort("hot")
    this.flg*=-1;
    sort.call(this,this.getAttribute("sort-attr"));//this->window
  }
}
function sort(sortStr) {
  //注意 sortStr是"time"的时候sort中要不同的处理方式
  // if(sortStr=="time"){
  //   data.sort((a,b)=>(new Date(a[sortStr])-new Date(b[sortStr]))*this.flg);
  // }else {
  //   data.sort((a,b)=>(a[sortStr]-b[sortStr])*this.flg);
  // }
  data.sort((a,b)=>{
    return sortStr=="time"?new Date(a[sortStr])-new Date(b[sortStr])*this.flg:(a[sortStr]-b[sortStr])*this.flg;
  });
  bindHTML(data);
}