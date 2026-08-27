/**
 * D13 · 运行时改自己 Demo
 * 对应 dsh：聊天中途挂上/卸掉插件，循环不用重启
 *
 * 核心：
 * - 先看现在有哪些工具
 * - 挂上 echo，下一封信的菜单里出现
 * - 卸掉后菜单没有了
 * - 不变量：有 tool/call 就必须有配对 tool/result，错了要响
 */

let menu = ['Read', 'Edit']

function inspect() {
  console.log('现在的工具菜单:', menu)
}

function mountEcho() {
  menu = [...menu, 'echo']
  console.log('挂上 echo（循环没重启）')
}

function unmountEcho() {
  menu = menu.filter((name) => name !== 'echo')
  console.log('卸掉 echo')
}

function checkPairing(log: string[]) {
  const calls = log.filter((e) => e === 'tool/call').length
  const results = log.filter((e) => e === 'tool/result').length
  if (calls !== results) {
    throw new Error(`不变量失败: ${calls} 次调用，${results} 条结果`)
  }
  console.log('不变量通过: 每次调用都有配对结果')
}

console.log('第一节：先看现在有什么')
inspect()

console.log('')
console.log('第二节：中途挂上 echo')
mountEcho()
inspect()

console.log('')
console.log('第三节：卸掉')
unmountEcho()
inspect()

console.log('')
console.log('第四节：账本配对检查')
checkPairing(['tool/call', 'tool/result', 'tool/call', 'tool/result'])
try {
  checkPairing(['tool/call'])
} catch (e) {
  console.log('缺结果时会响:', (e as Error).message)
}
