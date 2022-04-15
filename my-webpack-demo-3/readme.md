
### bundler 不能打包css文件 因为css 不是js 需要将css转换为js 
```
// 将css 转换为 js 之后 再插入页面的head 里面
 if(/\.css$/.test(filepath)){ // 如何文件路径以 .css 结尾
    code = `
      const str = ${JSON.stringify(code)}
      if(document){
        const style = document.createElement('style')
        style.innerHTML = str
        document.head.appendChild(style)
      }
      export default str
    ` 
  }
```

### loader是什么 
- loader可以是一个普通的函数
```
function transform(code) {
    const code2 = dosth(code)
    return code2
}
```
- loader也可以是一个异步函数
```
async function transform(code){
    const code2 = await dosth(code)
    return code2
}
```

### webpack 里每个loader只做一件事 目前我们的loader 做了两件事 
- 把css 变成js字符串
- 把js字符串放到style标签里

## style-loader不是转译
- sass-loader less-loader这些loader是把代码从一种语言转为另一种
- 因此将这样的laoder链接起来不会出问题
- 但style-loader是在插入代码 不是转移 所以需要寻找插入实际和插入位置
- 但插入代码的时机应该是在获取到css-loader的结果之后
- 插入代码的位置应该是就在代码的下面

## webpack官方style-loader的思路
- style-loader在pitch钩子里通过css-loader来require文件内容
- 然后在文件内容后面添加injectStylesIntoStyleTag 代码


## 加载.scss文件
- 写个sass-loader把scss文件转为css
- 再交给css-loader转为js
- 最后用style-loader创建style标签

## 加载.less文件
- 写个less-loader把less文件转为css
- 再交给css-loader转为js
- 最后用style-loader创建style标签

## 加载.ts文件
- awesome-typescript-loader
- 或者ts-loader

## 加载.md文件
- markdown-loader

## 加载.html 文件
- html-loader

## 加载.txt 文件
- raw-loader

## 加载.vue文件
- vue-loader

## 思考题
- import logo from './images/logo.png'
- React: <img src={logo}>
这个要用什么loader 其工作原理是什么? 至少有两种思路
- 导出一个相对路径: 当发现这个文件是png结尾的 就读取文件内容 不做任何操作 直接把内容拷贝到一个public文件 获取到对应的相对路径 把相对路径作为默认导出 
- 是一个base64编码: 获取到文件内容之后 发现文件内容很小 变为base64编码

## 写一个webpack loader

## webpack 的 loader 是什么
- webpack 自带的打包器只能支持js文件
- 当我们想要加载css less scss stylus ts md 文件时 就需要用loader
- loader的原理 就是把文件内容包装成能运行的js
- 比如 加载css 需要用到style-loader 和 css-loader
- style-loader 把代码挂载到head里的style 标签里
- style-loader 用到了pitch 狗子和request对象