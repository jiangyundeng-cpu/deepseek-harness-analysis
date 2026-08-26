/**
 * D4 · 提示词是拼出来的 Demo
 * 对应 dsh：system prompt / 工具菜单由插件按块登记，可按 agent 不同
 *
 * 核心：
 * - 抬头不是进场写死的一整段，是多块按顺序拼
 * - 工具菜单也是登记上去的
 * - 给 B 单独登记的工具，A 看不见
 */

type Section = { name: string; order: number; text: string }
type Tool = { name: string; owner: 'global' | 'B' }

function assemble(who: 'A' | 'B', sections: Section[], tools: Tool[]) {
  const prompt = [...sections]
    .sort((a, b) => a.order - b.order)
    .map((s) => s.text)
    .join('\n')

  const menu = tools
    .filter((t) => t.owner === 'global' || t.owner === who)
    .map((t) => t.name)

  return { who, prompt, menu }
}

const sections: Section[] = [
  { name: 'identity', order: -100, text: '你是 dsh 助手。' },
  { name: 'persona', order: 0, text: '说话简短。' },
]

const tools: Tool[] = [
  { name: 'Read', owner: 'global' },
  { name: 'SecretDebug', owner: 'B' }, // 只给 agent B
]

console.log(assemble('A', sections, tools))
console.log(assemble('B', sections, tools))
