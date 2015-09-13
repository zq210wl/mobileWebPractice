# mobileWebPractice
通过对牛逼的[美团网](http://i.meituan.com/)的页面模仿制作，来提高并总结一下自己对移动web开发的认知。

# 完成度
* 目前首页的H5静态页面基本已经完成
未完待续....

# 还未做功能
* JS功能的添加
* 构建SASS的 source map 文件
* 需要部署到生产环境的相关代码压缩等等的自动化构建任务
* ...

# 怎么运行此项目(需要先安装node和gulp)
1. 下载此项目到本地
2. 在项目根目录下运行 `npm install`
3. 进入到node_modules/bower/.bin目录,然后执行 `bower install`
4. 回到项目根目录，然后执行 `gulp buildZepto`
5. 最后执行 `gulp` 就可以启动server

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

* 巧用 box-sizing: border-box 解决盒子边框溢出
  - 改变元素的默认盒子模型, 让 padding 和 border 的值包含在 width 和 height 中
  - 好处：避免设置了 padding-left,border 等值之后，没法再用 width: 100%
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

* 实现左右两列布局：一边是图片，一边是信息描述
  - 通常是把图片绝对定位，描述信息元素设置 block,并用 margin 来跟图片分开距离

* 禁用鼠标选取
  - -webkit-user-select: none; /* Chrome all / Safari all */
  - -moz-user-select: none; /* Firefox all */
  - -ms-user-select: none; /* IE 10+ */
  - user-select: none; /* Likely future */

* 去除 a 标签选中时出现边框
  - -webkit-tap-highlight-color: transparent;

* 图片的自动缩放
  - 针对 img 标签：设置 height: 100%;
  - 针对 background: 设置 background-size: 100%;

* background 和 img 的正确使用
  - 需要动态加载的图片用 img 来写
  - 不经常变化的图片用 background 来写

* 未完待写...


# 性能优化
* 将一些不是经常变化的icon图标用字体图标来替代
  - 可以通过[阿里巴巴矢量图标](http://iconfont.cn/)来制作 iconfont
  - 可以看看美团的一些 icon 有在用

* 使用专门针对浏览器的__webp格式__图片，文件大小会更小一些

* 未完待写...

# 调试
* 本地调试
  - 可以用 chrome 自带的手机设备模拟器来调试
* 远程调试
  - 使用 Weinre 进行远程调试, 下面是 Weinre 的安装和使用方法
    * [远程调试之 Weinre 的使用](https://developer.mozilla.org/en-US/Firefox_OS/Platform/Gaia/Weinre_As_Remote_Debugger)

# 用到的CSS3属性
* border-radius
* background-size
* box-sizing: border-box;
* transform
  - translate
  - rotate
  - scale
* 未完待写...

# 用到的HTML5标签
* 布局相关
  - header
  - nav
  - footer
  - article
  - section
* 文字相关
  - strong
  - small
  - i
  - del
* 列表相关
  - dl, dt, dd
* 未完待写...