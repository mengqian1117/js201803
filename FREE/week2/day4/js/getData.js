//造数据
// [{name:"",age:10,sex:1,score:99},];
//年龄 随机12-65
let nameStr="赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨";//0-15
let str="玉梅美华超帅倩梦龙强国正轩瑄磊凯楠悦";//0-17
let data=[];
for (let i=0;i<20;i++){
  data.push({
    name:nameStr[Math.round(Math.random()*15)]+str[Math.round(Math.random()*17)],
    age:Math.round(Math.random()*(65-12)+12),
    sex:Math.round(Math.random()*1),
    score:Math.round(Math.random()*100),
  })
}
console.log(data);