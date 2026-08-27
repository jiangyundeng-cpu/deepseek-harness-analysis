/**
 * D8 · 子 Agent 是能力面 Demo
 * 对应 dsh：主循环只认 subagents 接口；孩子有自己的账本
 *
 * 核心：
 * - 主模型点名只是提议，去调能力面，不在循环里再开一个 while
 * - 孩子用自己的 session 跑完自己的 turn/step
 * - 主账本只多一条摘要 result；孩子的流水账不进主信
 */

function runChild(prompt: string, backend: string) {
  const childLog = [
    `user: ${prompt}`,
    'assistant: 我先读 README',
    'tool/result Read ok',
    'assistant: 结论是 TypeScript',
  ]
  console.log(`  孩子（${backend}）自己的账本:`)
  for (const line of childLog) console.log('   ', line)
  return '结论是 TypeScript'
}

function parentTurn(prompt: string, backend: string) {
  const parentLog: string[] = []
  console.log(`主循环: 模型点了 subagent，后端=${backend}`)
  parentLog.push(`tool/call subagent: ${prompt}`)

  const summary = runChild(prompt, backend)

  parentLog.push(`tool/result: ${summary}`)
  console.log('  主账本只多了调用和摘要:')
  for (const line of parentLog) console.log('   ', line)
}

parentTurn('这个项目用什么语言？', 'in-process')
console.log('--- 换后端，主循环这几行不用改 ---')
parentTurn('再确认一次', 'claude-code')
