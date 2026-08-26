/**
 * D5 · 被守卫的工具链 Demo
 * 对应 dsh：模型点名只是提议；闸门 deny 也要配对结果；并行默认关
 *
 * 核心：
 * - 先过闸门，再决定动不动手
 * - 拒绝也要交卷，不能当没这回事
 * - Read 声明安全才能并行；Edit 没声明 → 独占屏障
 */

type Call = { id: string; name: 'Read' | 'Edit'; path: string }

function isSafe(name: Call['name']) {
  // 只有明确说「我安全」才并行；没说的一律独占
  return name === 'Read'
}

function gate(call: Call): 'allow' | 'deny' {
  if (call.name === 'Edit' && call.path.startsWith('/secret')) return 'deny'
  return 'allow'
}

function run(call: Call) {
  if (gate(call) === 'deny') {
    // 没改文件，但仍要有一条结果给模型看
    return { id: call.id, ok: false, text: `拒绝: 不能改 ${call.path}` }
  }
  return { id: call.id, ok: true, text: `${call.name} ${call.path} 完成` }
}

function schedule(calls: Call[]) {
  let i = 0
  while (i < calls.length) {
    const first = calls[i]!
    if (isSafe(first.name)) {
      const batch: Call[] = []
      while (i < calls.length && isSafe(calls[i]!.name)) {
        batch.push(calls[i]!)
        i += 1
      }
      console.log('并行池:', batch.map((c) => `${c.name} ${c.path}`).join(', '))
      for (const c of batch) console.log('  交卷', run(c))
    } else {
      console.log('独占屏障:', first.name, first.path)
      console.log('  交卷', run(first))
      i += 1
    }
  }
}

const calls: Call[] = [
  { id: '1', name: 'Read', path: 'a.ts' },
  { id: '2', name: 'Read', path: 'b.ts' },
  { id: '3', name: 'Edit', path: '/secret/pwd' },
  { id: '4', name: 'Read', path: 'c.ts' },
]

console.log('模型点了 4 个工具（这只是提议）')
schedule(calls)
