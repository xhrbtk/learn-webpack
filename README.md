```
// 执行xxx.ts
node -r ts-node/register xxx.ts
// 执行xxx.ts 且在浏览器调试
node -r ts-node/register let_to_var.ts --inspect-brk
```

## 模块间可以循环依赖 
- a 依赖b  b 依赖a
- a 依赖b b依赖c c依赖a

## 但不能有逻辑漏洞
- a.value = b.value +1
- b.value = a.value +1
- 神经病

