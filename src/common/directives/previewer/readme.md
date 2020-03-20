#### 图片预览插件使用说明。
1. v-previwer 注册为全局指令之后，需要放到图片列表的父元素上。
2. 图片想要实现自适应宽高度不变形，垂直居中等backgroundImage特性，自身比较难实现，需借助父元素，可以通过以下用法达到目的。
3. 如此的话，用户看到的是背景图，但是指令用到的只是src里面的内容，比较契合我们的需求。

```css
img
{
    width: 31.33%;
    height: 0;
    padding-bottom: 31.33%;
    display: inline-block;
    margin: 0 1% 20px;
    background-position: center center;
    background-size: cover;
}
```
```html
<div v-previewer>
    <img v-for="item in ['http://www.aspku.com/uploads/allimg/180830/1520431201-0.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOwDThgu-3tVYIJqqfDFfHymk7kpAlZj-G6bDSY8HPYmFT6gJ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73XX6mo0nSXAlwKrp92yIg32PnJ5Fq6ZJONEY-wAEr13soZNa']" :key="item" :src="item" :style="{backgroundImage: `url(${item})`}"/>
</div>
```
