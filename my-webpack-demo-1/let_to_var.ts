import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"
// code ->> ast -->> ast2 -->> code2
const code = `let a = 'let'; let b = 2`
const ast = parse(code, { sourceType: 'module' })
//  code -->> ast
console.log(ast)  // ast 为什么表示源代码 因为是把源代码字符串表示成一个树形结构
// ast -->> ast2
// 将ast 里面所有变量声明的let 转换为 var
traverse(ast, {
    enter: item => {
       if( item.node.type  ==  'VariableDeclaration'){
           if(item.node.kind === 'let'){
               item.node.kind = 'var'
           }
       }
    }
})
// 将最新的ast 转换为代码
// ast2 -->> code2
const result = generate(ast, {}, code)
console.log(result.code)