// 先从babel说起
// - babel的原理
// 1. parse 把代码code变成ast
// 2. traverse 遍历ast进行修改
// 3. generate 把ast变成代码code2
// 既 code =>> ast ==> ast2 ==> code2

// 为什么要用ast
// 你很难用正则表达式来替换 
// 你需要识别每个单词的意思 才能做到只修改用于声明变量的let
// 而ast可以明确的告诉你每个let的意思


import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"
import * as babel from '@babel/core'
// code ->> ast -->> ast2 -->> code2
const code = `let a = 'let'; let b = 2`
const ast = parse(code, { sourceType: 'module' })
//  code -->> ast
console.log(ast)  // ast 为什么表示源代码 因为是把源代码字符串表示成一个树形结构
// ast -->> ast2
// 将ast 里面所有变量声明的let 转换为 var
// traverse(ast, {
//     enter: item => {
//        if( item.node.type  ==  'VariableDeclaration'){
//            if(item.node.kind === 'let'){
//                item.node.kind = 'var'
//            }
//        }
//     }
// })
// //  将最新的ast 转换为代码
// // ast2 -->> code2
// const result = generate(ast, {}, code)
const result = babel.transformFromAstSync(ast, code, {
    presets: ['@babel/preset-env']
})
console.log(result.code)