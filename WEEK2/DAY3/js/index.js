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
    this.flg*=-1;
    //上架时间排序 第一个 a标签 索引为0 i==0
    if(i==0){
      //时间是 "2017-01-25"
      //new Date("2017-01-25") - new Date("2018-01-01")
      data.sort((a,b)=>(new Date(a.time)-new Date(b.time))*this.flg);
      bindHTML(data);
    }else if(i==1){
      //价格排序 i==1
      //将data按照每一项的price属性排序
      data.sort((a,b)=>(a.price-b.price)*this.flg);
      //不要忘记让视图改变 执行bindHTML(data);
      bindHTML(data);
    }else {
      //热度排序
      data.sort((a,b)=>(a.hot-b.hot)*this.flg);
      bindHTML(data);
    }
  }
}