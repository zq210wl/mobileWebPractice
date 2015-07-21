# mobileWebPractice
Learn to develop mobile website

_This project is not finished, just did some buliding work. Wait to do._
# Wait to do
* 构建SASS的sourcemap文件

# 技巧
* 所有可点击的元素要放在 a 标签中
  - 好处：可以在元素点击的时候出现点击效果

* 尽量放大可点击元素(a)的可点区域
  - 设置 display: block
  - 用 paddng 替代 margin
  - 用 height:100%

* 巧用 box-sizing: border-box;
  - 改变元素的默认盒子模型, 让 padding 和 border 的值包含在 width 和 height 中
  - 好处：避免设置了 padding-left 值之后，没法再用 width: 100%

* 巧用弹性盒子布局(display: flex)
  - 例如：可以实现左右定宽度、中间自动变化的布局

* 用 rem 替代 px
  - 给 html 设置一个固定的px宽度值，例如10px,100px, 然后用rem来做单位


# 性能优化
* 将一些不是经常变化的icon图标用字体图标来替代
  - 可以通过[阿里巴巴矢量图标](http://iconfont.cn/)来制作 iconfont