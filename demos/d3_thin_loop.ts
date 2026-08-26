/**
 * D3 · 瘦循环 Demo
 * 对应 dsh：ReactLoopAgent 只转圈；停靠 turn/end 的 reason
 *
 * 核心：
 * - 空闲时被叫醒 → 开一个 turn
 * - 一个 turn 里可以有多个 step（问模型 + 跑它点的工具）
 * - 没工具了就结束这一 turn，循环实例还活着，还能再被叫醒
 */

type Reason = 'completed' | 'blocked'

function model(turn: number, step: number): { text: string; tool?: string } {
  if (turn === 1 && step === 1) return { text: '我先读文件', tool: 'Read' }
  return { text: '改好了' }
}

function runTurn(turn: number): Reason {
  console.log(`turn ${turn} 开始`)
  let step = 0

  while (true) {
    step += 1
    const out = model(turn, step)
    console.log(`  step ${step} 模型:`, out.text)

    if (!out.tool) {
      console.log(`turn ${turn} 结束: completed（没有工具了）`)
      return 'completed'
    }

    console.log(`  step ${step} 跑工具:`, out.tool, '→ 结果写回账本')
    // 有工具 → 还欠一次问模型 → 同 turn 里下一步
  }
}

console.log('空闲')
runTurn(1)
console.log('空闲（循环还在，没有死）')
console.log('再来一句用户话 → 再开 turn')
runTurn(2)
