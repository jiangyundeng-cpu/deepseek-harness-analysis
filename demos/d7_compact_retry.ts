/**
 * D7 · 压缩与重试是插件 Demo
 * 对应 dsh：compact / retry 挂在事件上，循环只转圈
 *
 * 核心：
 * - 寄信前太长 → 插件在 pre-step 先压
 * - API 仍超窗 → 插件再压，并告诉循环 retry
 * - 次数到了就拒绝；循环自己不会压、也不会 splice 账本
 */

const WINDOW = 5
let surface = 10 // 信里现在有多少段（投影后的可见历史）
let overflowTries = 0

function compact(why: string) {
  surface = Math.max(1, surface - 2)
  console.log(`  插件压缩（${why}）→ 可见历史还剩 ${surface} 段（旧节点仍在账本里，只是被挡住了）`)
}

function preStep() {
  if (surface > WINDOW) {
    console.log('pre-step：寄信前先量一量')
    compact('压力')
  }
}

function requestError(): 'retry' | 'fail' {
  if (overflowTries >= 2) {
    console.log('request-error：已经 retry 两次，不再压')
    return 'fail'
  }
  overflowTries += 1
  compact('超窗')
  console.log('  插件对循环说: retry')
  return 'retry'
}

console.log('开 turn，循环只负责寄信')
while (true) {
  preStep()
  console.log('循环寄信，可见历史 =', surface)
  if (surface <= WINDOW) {
    console.log('模型: 好的')
    console.log('turn 结束，循环还活着')
    break
  }
  console.log('API: 超窗')
  if (requestError() !== 'retry') {
    console.log('循环: 关 turn（失败），循环还活着')
    break
  }
  console.log('循环: 收到 retry，再寄一封（它不知道刚才发生了压缩）')
}
