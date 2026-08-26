/**
 * D1 · 插件宇宙 Demo
 * 对应 dsh：Cordis 插件挂到 ctx；注册是可逆 effect
 *
 * 核心：
 * - 循环和工具都是插件，没有「改内核」这一说
 * - 卸载工具插件后，菜单消失，循环还在
 * - waterfall 不调 next() 就是否决
 */

type Disposer = () => void

type Ctx = {
  loop?: { name: string; tick: () => string }
  tools: string[]
  effects: Disposer[]
  listeners: Array<(cmd: string, next: () => string) => string>
  effect: (install: () => Disposer) => void
  waterfall: (cmd: string, builtin: () => string) => string
}

function createCtx(): Ctx {
  const ctx: Ctx = {
    tools: [],
    effects: [],
    listeners: [],
    effect(install) {
      ctx.effects.push(install())
    },
    waterfall(cmd, builtin) {
      const queue = [...ctx.listeners]
      const next = (): string => {
        const fn = queue.shift()
        return fn ? fn(cmd, next) : builtin()
      }
      return next()
    },
  }
  return ctx
}

/** 循环插件：提供 ctx.loop */
function applyLoop(ctx: Ctx) {
  ctx.effect(() => {
    ctx.loop = { name: 'agent-loop', tick: () => 'turn ok' }
    return () => {
      ctx.loop = undefined
    }
  })
}

/** 工具插件：往菜单登记 Bash，并挂一条权限瀑布 */
function applyBash(ctx: Ctx) {
  ctx.effect(() => {
    ctx.tools.push('Bash')
    const gate: Ctx['listeners'][number] = (cmd, next) => {
      if (cmd.includes('rm -rf')) return 'deny' // 不调 next → 短路
      return next()
    }
    ctx.listeners.push(gate)
    return () => {
      ctx.tools = ctx.tools.filter((t) => t !== 'Bash')
      ctx.listeners = ctx.listeners.filter((fn) => fn !== gate)
    }
  })
}

function snapshot(label: string, ctx: Ctx) {
  console.log(label, {
    loop: ctx.loop?.name ?? '(gone)',
    tools: [...ctx.tools],
    ls: ctx.waterfall('ls', () => 'allow'),
    rm: ctx.waterfall('rm -rf /', () => 'allow'),
  })
}

const ctx = createCtx()
applyLoop(ctx)
applyBash(ctx)
snapshot('1 两个插件都在', ctx)

// 卸工具：只跑工具相关的 disposer（最后一个 effect）
ctx.effects.pop()?.()
snapshot('2 卸掉 Bash 插件', ctx)

console.log('循环还在，还能 tick:', ctx.loop?.tick())
