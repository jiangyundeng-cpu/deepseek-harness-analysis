/**
 * D9 · 好几个帮手怎么安排 Demo
 * 对应 dsh：三种安排都是工具插件，主循环不新开 while
 *
 * 核心：
 * - Workflow：按一份说明书，串行雇帮手，最后 return 汇总
 * - Ralph：同一目标，每轮换一个全新帮手，家长只收最后一张纸条
 * - Team：给队友传话；安静放着或拍醒（D6）
 */

function hire(name: string, job: string) {
  console.log(`  雇帮手 ${name}：${job} → 交小结`)
  return `${name}完成:${job}`
}

console.log('【Workflow】模型写了说明书，先检查抬头再跑')
const metaOk = { name: 'review', description: '两人审代码' }
console.log('  抬头合格:', metaOk.name)
const a = hire('A', '读 diff')
const b = hire('B', '找风险')
console.log('  家长只收到汇总:', [a, b].join('；'))

console.log('')
console.log('【Ralph】固定流程，不是模型写脚本')
let handoff = '目标: 把 README 写完'
for (const round of [1, 2, 3]) {
  console.log(`  第${round}轮：全新帮手（不带家长聊天记录）`)
  console.log(`    只看见工作区和上一张纸条: ${handoff}`)
  if (round < 3) {
    handoff = `continue: 第${round}轮写了一节`
  } else {
    handoff = 'complete: README 写完了'
  }
}
console.log('  家长只收到最后一张:', handoff)

console.log('')
console.log('【Team】组长账本上记传话')
const leadLog = [
  '花名册: 组长, 队友小李',
  '待投递: 给小李「帮看测试」(拍醒)',
]
console.log('  从组长账本读出:', leadLog[1])
console.log('  实际投递 = D6 的 followup（拍醒）')
console.log('  若写「先放着」= D6 的 inject（不叫醒）')
