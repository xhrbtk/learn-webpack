
## 浏览器不支持直接运行带有import 和 export 关键字的代码
- 现代浏览器可以通过<script type=module> 来支持import export
- ie8-15 不支持import export 所以不可能运行

## 兼容策略
- 激进的兼容策略 把代码全放在<script type=module>里
- 缺点 不被ie8-15支持 且会导致文件请求过多
- 平稳的兼容策略 把关键字转译为普通代码 并把所有文件打包成一个文件
- 缺点 需要写复杂的代码来完成这件事情 


## 怎么把import / export 转换成函数
- @babel/core 已经做了 转换代码见bundler_1.ts
- import 关键字变成 require函数
- export 关键字变成exports 对象
- 本质 esmodule 语法变成了commonjs 规则


## 问题列表
- 生成的代码中有多个重复的_interopxxx 函数
- 只能引入和运行jswenj
- 只能理解import 无法理解require
- 不支持插件
- 不支持配置入口文件和dist文件名
- 后面的课程慢慢解决
- 不一定全都要解决 内容太多 简化后在理解