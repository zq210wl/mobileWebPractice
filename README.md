# mobileWebPractice
通过对牛逼的[美团网](http://i.meituan.com/)的页面模仿制作，来提高并总结一下自己对移动web开发的认知。

未完待续...

# Wait to do
* 构建SASS的 source map 文件

# 技巧总结
* 用 rem 替代 px
  - 给 html 设置一个固定的px宽度值，例如10px,100px, 然后用rem来做单位
  - 注意：我建议设置为100px,不要设置10px;为什么呢？
    * 因为Chrome浏览器在解析字体大小时，最小字号为12px,小于这个大小的字号都会解析成12px,当你把一行文字设为10px时Chrome浏览器会按12px来解析
    * 又有人要说了，可以设置 -webkit-text-size-adjust:none 来禁用浏览器文字大小调整的功能
      - But, 在新版的Chrome中已经禁止了改属性, so, 设置 -webkit-text-size-adjust:none 也没用了
    * 美团用的就是100px
    
* 所有可点击的元素要放在 a 标签中
  - 好处：可以在元素点击的时候出现点击效果

* 可点击的元素要放在 a 标签中，尽量放大可点击元素(a)的可点区域
  - 方法：
    * 设置 display: block
    * 用 padding 替代 margin
    * 用 height:100%
  - 可以去试着点击美团的header中的 a 元素，就会发现每个a元素可点区域都是一个大的区域块

* 巧用 box-sizing: border-box;
  - 改变元素的默认盒子模型, 让 padding 和 border 的值包含在 width 和 height 中
  - 好处：避免设置了 padding-left 值之后，没法再用 width: 100%
  - 美团的 header 中的搜索框就用了此属性

* 巧用弹性盒子布局(display: flex, display: box)
  - 例如：可以实现左右定宽度、中间自动变化的布局
    * 参照__header__部分
  - 例如：实现空间平均分配
  - 注意：display: box , 此属性已经过时，但是为了兼容老的浏览器还是需要用的
  - 下面是一篇弹性盒子兼容性的写法的文章介绍
    * [使用Flexbox：新旧语法混用实现最佳浏览器兼容](http://www.w3cplus.com/css3/using-flexbox.html)

* 多个inline-block元素间会出现多余的空白 
  - 原因：空白是inline-block元素间的回车字符造成的
  - 解决：设置父级元素的font-size:0(或不要有回车,或父级使用弹性盒子)
  - 例如：用 width:25% 实现四个inline-block图标等宽布局的时候，四个元素之间不能有回车,不然最后一个图标老是会换行显示
  - 当时我就是用了回车，最后一个元素老是换行，我纠结了好久才解决了

# 性能优化
* 将一些不是经常变化的icon图标用字体图标来替代
  - 可以通过[阿里巴巴矢量图标](http://iconfont.cn/)来制作 iconfont
  - 可以看看美团的一些 icon 有在用 

* 使用专门针对浏览器的__webp格式__图片，文件大小会更小一些

# 用到的CSS3属性