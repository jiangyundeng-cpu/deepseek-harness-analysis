# DeepSeek Harness 学习计划（模块制）

> 身份约定：Harness 架构导师 × 学员结对，只啃 Agent Runtime 核心。
> 前置：Claude Code Harness 骨架课（M1–M10）已结业。本课用同一套词汇对照，不重讲「loop 是什么」。
> 节奏：每次 1 个完整模块（2~4 个知识点 + 1 个综合 Demo + 1 段口述）。体力够可一天 1~2 个模块；累了就停。

## 这门课补什么

Claude Code 教的是 **一个厚内核怎么转**：`query` 门面、`queryLoop`、Continue/Terminal、日记本 vs 信、`canUseTool`、同构 `query()` 嵌套。

DeepSeek Harness（`dsh`）教的是 **同一套 loop 怎么被做成平台**：

- 循环逻辑只允许出现在 `packages/core/agent-loop`
- 其余全部是插件：挂事件、换提供方，不改循环
- 会话真相源是 append-only 的 `SessionEvent` 日志，模型历史是从日志 **派生** 的

对照口诀：

> CC：内核里什么都有。dsh：内核只转圈，能力全在插件上。

## 明确跳过

- Web UI / VitePress / `packages/web/web`
- `vendor/cordis` 实现细节（只学 primer 里够用的插件 / 事件 / waterfall）
- Python SDK、native/landlock、experimental Agent Teams
- 凭证、设置页、标题生成等产品边角

## 源码锚点（整课共用）

| 主题 | 先读文档 | 再看代码 |
|------|----------|----------|
| 架构总图 | `deepseek-harness/docs/architecture.md` | — |
| 循环驱动 | `docs/subsystems/core.md` | `packages/core/agent-loop/src/agent.ts` |
| 工具调度 | 同上 + `docs/subsystems/tools.md` | `packages/core/agent-loop/src/tool-calls.ts` |
| 会话日志 | `docs/subsystems/session.md` | `packages/core/session/` |
| 压缩 | `docs/subsystems/compaction.md`（若有） | `packages/compaction/` |
| 子 Agent | `docs/subsystems/subagent.md` | `packages/subagent/` |

## 模块总览

| 模块 | 主题 | 状态 | 对照 CC | 核心锚点 |
|------|------|------|---------|----------|
| **D1** | 心智：一切皆插件 + 能力面 | ⏳ 未开始 | M1 门面/deps | Cordis 插件；Service / Provider / Consumer |
| **D2** | 真相源：session log + turn/step | ⏳ 未开始 | M3 日记本 vs 信 | `SessionEvent`；`deriveMessages` |
| **D3** | 循环驱动：idle / turn / step | ⏳ 未开始 | M2 Continue/Terminal；M4 主闭环 | `ReactLoopAgent` |
| **D4** | 工具流水线：闸门 + 并行池 | ⏳ 未开始 | M5 权限；M7 并发 | `tools/pre-execute` → `execute` → `post-execute` |
| **D5** | 压缩与恢复：插件化 compact / retry | ⏳ 未开始 | M3/M8 compact；M6 停机 | `agent/pre-step`；`agent/request-error` |
| **D6** | inbox + 子 Agent | ⏳ 未开始 | M8 inject；M10 嵌套 Agent | `followup` / `steer` / `inject`；`ctx.subagents` |

结课后可加 **D7 对照口述**（可选，对标 CC 的 M11；默认跳过，你开口再做）。

## 每次学习固定流程

1. **串讲**本模块 2~4 个知识点，每点先说 CC 怎么做、再看 dsh 怎么拆
2. **综合问答** 3~5 题（覆盖整模块，至少 1 题是「如果做成 CC 内核会怎样」）
3. **1 个综合 TS Demo** → `demos/dX_*.ts`
4. **1 段口述话术** → `interview/dX-*.md`（结尾必须有一句 CC 对照）
5. 你说 **commit** 我提交；**push** 你来（远程绑好之后）

## 各模块知识点预告

### D1 心智：插件与能力面

- `dsh` 没有特权内核可打补丁：新行为是再挂一个插件
- 能力面三件套：Service Definition / Service Provider / Consumer；缺一件就不叫 seam
- 核心六包脊柱：`session` / `system-prompt` / `tools` / `agent` / `agent-loop` / `llm`
- waterfall 监听必须 `next()`，不调用就短路——对照 CC 的 `canUseTool` 硬闸门，这里闸门是事件链上的一环

**Demo 意向**：一个假 `ctx` 上挂 loop 插件和 tool 插件，卸载 tool 插件后循环还在、工具菜单消失。

### D2 真相源：日志即上下文

- Session 是 typed 事件的 append-only log，不是可变 `messages[]`
- **Model-visible ⟺ logged**：寄给模型的东西必须能从日志重建
- `turn` = 一次完整用户回合（0 个或多个 step）；`step` = 一次模型请求 + 它点的工具
- `deriveMessages()` 从日志投影模型历史；`assistant/chunk` 留给 UI/回放，不进模型信

**对照 CC**：日记本 vs 信 → 这里连日记本都拆成事件流，信是投影。

**Demo 意向**：往 log 里 append `user/message` + `assistant/message` + `tool/call` + `tool/result`，再 `deriveMessages()` 看出一封信。

### D3 循环驱动：还是 while，但边界更细

- `ReactLoopAgent` 生命周期：`idle` → `running(turn, step)` → 再 idle
- 一圈仍是：claim inbox → assemble prompt → `llm/stream` → 跑工具 → 写回 log → 工具还欠一次请求则下一步，否则结束 turn
- 插件失败结束 **当前 turn**，不一定拆掉整个 loop（对照 CC 的 Terminal 粒度）
- **没有内置 `max_turns`**：超限策略要挂 `agent/turn-stopping`，不写进驱动器

**对照 CC**：Continue = 还有 step / 还有 inbox；Terminal ≈ `turn/end` 的 reason。

**Demo 意向**：假模型第一圈点工具、第二圈只出字；打印 turn/step 边界和结束 reason。

### D4 工具流水线

- 模型点名仍只是提议；真正执行走 `tools/pre-execute` → `tools/execute` → `tools/post-execute` → `tool/result`
- deny / 中止也要交配对结果（对照 CC：deny 也要 `tool_result`）
- `isConcurrencySafe` 默认 **fail-closed**（不声明则独占）；并行用有界滚动池，不是「所有只读一把 Promise.all」
- 取消：未分发的调用补 `ABORTED_BEFORE_DISPATCH`，已开工的等收尾，不丢结果上下文

**Demo 意向**：Read 并行、Edit 串行；pre-execute deny 仍产出 `tool/result`。

### D5 压缩与恢复

- compact **不是 loop 内置阶段**，是监听 `agent/pre-step`（预防）和 `agent/request-error`（溢出后再压）的插件
- 对照 CC：圈顶 autocompact + 413 reactive compact + `hasAttempted` 防死循环 —— dsh 把这两枪都射在事件上
- retry 同样是插件（`agent/request-error` 返回 `{ kind: 'retry' }`）
- 压缩摘要会作为 session 事件写入，派生历史被遮蔽，而不是 splice 掉数组

**Demo 意向**：超窗时 pre-step 先压；仍 413 则 request-error 再压一次并 retry；第三次拒绝，避免无限压。

### D6 inbox 与子 Agent

- 统一 `send(target, wakeup)`：`followup` 排队下一 turn 并唤醒；`steer` 插下一 step 并唤醒；`inject` 同 inbox **不唤醒**（对照 CC 的 attachment：配菜等下一封信）
- 子 Agent 不是再调同一个 `query()`，而是 `ctx.subagents` 提供方 + 独立 SessionId；结果回灌主会话仍是模型可见的 `tool/result`
- 引擎可以同构（都是 AgentLoop），**状态必须隔离**（对照 CC M10 口诀：引擎同构，状态隔离，结果回灌）

**Demo 意向**：主 loop 点 `delegate`；子 session 自己跑完；主 log 只看到一条 tool_result 摘要。

## 文件约定

- `00-module-plan.md` — 本计划
- `interview/dX-*.md` — 口述
- `demos/dX_*.ts` — Demo

## 远程仓库

- URL：https://github.com/jiangyundeng-cpu/deepseek-harness-analysis
- 本地目录：`deepseek-harness analysis/`（独立 git，与 dsh 源码分离）
