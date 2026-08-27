/**
 * D11 · 从日志复活 Demo
 * 对应 dsh：磁盘上存的还是同一本流水账；打开后再投影成信
 *
 * 核心：
 * - 内存账本是真相；落盘是同一批事件，不是第二套格式
 * - 崩溃停在打开的 turn：补一条 turn/end（打断），已经写下的工具结果不删
 * - resume 后 deriveMessages 和原来一致
 */

type Event =
  | { type: 'turn/start' }
  | { type: 'user/message'; text: string }
  | { type: 'assistant/message'; text: string }
  | { type: 'tool/result'; text: string }
  | { type: 'turn/end'; reason: 'completed' | 'interrupted' }

function deriveMessages(log: Event[]): string[] {
  const letter: string[] = []
  for (const e of log) {
    if (e.type === 'user/message') letter.push(`user: ${e.text}`)
    else if (e.type === 'assistant/message') letter.push(`assistant: ${e.text}`)
    else if (e.type === 'tool/result') letter.push(`tool_result: ${e.text}`)
  }
  return letter
}

function repair(log: Event[]): Event[] {
  const copy = [...log]
  const starts = copy.filter((e) => e.type === 'turn/start').length
  const ends = copy.filter((e) => e.type === 'turn/end').length
  if (starts > ends) copy.push({ type: 'turn/end', reason: 'interrupted' })
  return copy
}

const memory: Event[] = [
  { type: 'turn/start' },
  { type: 'user/message', text: '修 auth' },
  { type: 'assistant/message', text: '我先读文件' },
  { type: 'tool/result', text: 'auth.ts 很长很长…' },
  // 崩溃：还没 turn/end
]

const disk = JSON.parse(JSON.stringify(memory)) as Event[]
console.log('崩溃时磁盘上有', disk.length, '条，最后是', disk[disk.length - 1]?.type)

const resumed = repair(disk)
console.log('复活时补上:', resumed[resumed.length - 1])
console.log('工具结果还在，没有截断')
console.log('再投影成信:', deriveMessages(resumed))
console.log('和崩溃前能看见的内容一样:', deriveMessages(memory))
