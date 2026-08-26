/**
 * D6 · Inbox Demo
 * 对应 dsh：输入不直接往账本里塞，而是投进信箱；叫不叫醒是另一回事
 *
 * 核心：
 * - followup：下一句用户话，叫醒 → 新 turn
 * - inject：配菜进下一步，不叫醒；空闲时干等
 * - 真正开工后，第一步就能看见刚才注入的配菜
 */

type Msg = { text: string; kind: 'user' | 'side' }

const inbox = {
  nextTurn: [] as Msg[],
  nextStep: [] as Msg[],
}

let idle = true

function send(msg: Msg, where: 'next-turn' | 'next-step', wakeup: boolean) {
  if (where === 'next-turn') inbox.nextTurn.push(msg)
  else inbox.nextStep.push(msg)
  console.log(`投入 ${where}${wakeup ? ' + 叫醒' : '（不叫醒）'}:`, msg.text)
  if (wakeup) work()
  else if (idle) console.log('  仍空闲，圈没转')
}

function followup(text: string) {
  send({ text, kind: 'user' }, 'next-turn', true)
}

function inject(text: string) {
  send({ text, kind: 'side' }, 'next-step', false)
}

function work() {
  if (!idle) return
  const user = inbox.nextTurn.shift()
  const sides = inbox.nextStep.splice(0)
  if (!user) {
    inbox.nextStep.push(...sides)
    console.log('没有新的一句用户话，不转圈')
    return
  }
  idle = false
  console.log('turn 开始')
  console.log('  用户句:', user.text)
  console.log('  这一步看见的配菜:', sides.map((m) => m.text))
  console.log('turn 结束')
  idle = true
}

console.log('空闲')
inject('记住：这个项目用 TypeScript')
console.log('---')
followup('帮我改 README')
