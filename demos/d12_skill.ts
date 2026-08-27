/**
 * D12 · Skill Demo
 * 对应 dsh：说明书先给目录，要点名才把正文写进账本
 *
 * 核心：
 * - 目录只告诉模型「有这份说明书」
 * - 模型点 skill 工具，才加载正文
 * - 正文进账本之后，下一封信才看得见
 */

const catalog = [
  { name: 'debug-auth', description: '怎么排查登录失败' },
]

let log: string[] = []

function letter() {
  return [...log]
}

console.log('第一节：模型先只看见目录，看不见正文')
console.log('  目录:', catalog)
console.log('  现在的信:', letter())

console.log('')
console.log('第二节：模型点名打开 debug-auth')
const body = '登录失败时先看 cookie 是否过期，再查鉴权中间件。'
log.push('skill正文 debug-auth: ' + body)
console.log('  账本新记了一条说明书全文')

console.log('')
console.log('第三节：下一封信里才有全文')
console.log('  现在的信:', letter())
