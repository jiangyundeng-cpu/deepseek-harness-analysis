/**
 * D2 · 日志即世界 Demo
 * 对应 dsh：Session 是事件日志；模型看到的信是投影，不是另存一份数组
 *
 * 核心：
 * - 只往 log 里 append 事件，不直接改「消息列表」
 * - 寄给模型的信 = deriveMessages()
 * - chunk / turn 边界不进信；user / assistant / tool_result 才进
 */

type Event =
  | { type: 'turn/start' }
  | { type: 'assistant/chunk'; text: string }
  | { type: 'user/message'; text: string }
  | { type: 'assistant/message'; text: string }
  | { type: 'tool/result'; text: string }
  | { type: 'turn/end' }

function deriveMessages(log: Event[]): string[] {
  const letter: string[] = []
  for (const e of log) {
    if (e.type === 'user/message') letter.push(`user: ${e.text}`)
    else if (e.type === 'assistant/message') letter.push(`assistant: ${e.text}`)
    else if (e.type === 'tool/result') letter.push(`tool_result: ${e.text}`)
    // chunk、turn/start、turn/end 故意不进信
  }
  return letter
}

const log: Event[] = []
log.push({ type: 'turn/start' })
log.push({ type: 'user/message', text: '修 auth' })
log.push({ type: 'assistant/chunk', text: '我' })
log.push({ type: 'assistant/chunk', text: '先读' })
log.push({ type: 'assistant/message', text: '我先读文件' })
log.push({ type: 'tool/result', text: 'auth.ts 内容…' })
log.push({ type: 'turn/end' })

console.log('日志里有几条事件:', log.length, log.map((e) => e.type))
console.log('寄给模型的信   :', deriveMessages(log))
console.log('chunk 在日志里，但不在信里')
