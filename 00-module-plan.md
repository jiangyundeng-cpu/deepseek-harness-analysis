# DeepSeek Harness 学习计划（精髓课）

> 身份约定：Harness 架构导师 × 学员结对。只啃 Agent Runtime，UI 跳过。
> 前置：Claude Code 骨架课已结业，loop 不必从零讲。
> **课的主线是学会 dsh，不是给 CC 做对照表。** 对照放在口述末尾，当「你已经会的另一种解法」。
> 节奏：每次 1 个模块（2~4 个知识点 + 1 个综合 Demo + 1 段口述）。体力够可一天 1~2 个；累了就停。

## 这门课学什么

DeepSeek Harness（`dsh`）的精髓不是又写了一遍 `while(true)`。它把「Agent = LLM + Harness」做成了一套 **可组合运行时**：

1. **循环极瘦**：具体 loop 只允许出现在 `agent-loop`；新行为挂事件，不改驱动器。
2. **日志即世界**：append-only 的 `SessionEvent` 是唯一真相；**寄给模型的东西必须能从日志重建**。
3. **一切皆插件**：Cordis 上服务、事件、可逆 effect；卸载插件，贡献自动撤掉。
4. **能力面可换提供方**：Service Definition / Provider / Consumer 三件套齐全。换 FS/subprocess 提供方，Bash、终端、LSP 跟着走。
5. **每个 Agent 有自己的世界**：`agent.ctx` + `scope` 分层；工具菜单、提示词、Skill 可以按 agent 不同。
6. **运行时可以改自己**：agent 能检查并挂载/卸载插件——这是平台，不只是一次会话脚本。
7. **编排不开新循环**：Workflow / Ralph / Agent Teams 全是挂在子 Agent 能力面上的插件，不给 `agent-loop` 加模式。

学完应能不看对照表，独立讲清：dsh 的 Agent 从哪里来、信怎么拼、圈怎么转、能力怎么换、关掉后怎么活、多 Agent 怎么编而不改内核。

## 课程结构（两段，共 13 模块）

| 段 | 模块 | 作用 |
|----|------|------|
| **I 脊柱** | D1–D6 | 把 dsh 自己的运行时立起来 |
| **II 精髓** | D7–D13 | 压缩、子 Agent、编排（Workflow/Ralph/Teams）、沙箱、Resume、Skill、自改 |

对照 CC 的 M1–M10 会在口述里点一下，**不作为排课轴**。

## 模块总览

| 模块 | 主题 | 状态 | 为什么算精髓 | 核心锚点 |
|------|------|------|--------------|----------|
| **D1** | 插件宇宙 | ✅ 已完成 | 世界观：一切皆插件、可逆、组合开机 | Cordis primer；profile / bundle |
| **D2** | 日志即世界 | ✅ 已完成 | 最硬不变量：Model-visible ⟺ logged | `SessionEvent`；`deriveMessages` |
| **D3** | 瘦循环 | ✅ 已完成 | 驱动器只转圈，失败关 turn 不关 loop | `ReactLoopAgent` |
| **D4** | 提示词是拼出来的 | ✅ 已完成 | 信的抬头由插件贡献，且按 agent 作用域 | `ctx.systemPrompt`；`agent.ctx` |
| **D5** | 被守卫的工具链 | ✅ 已完成 | 闸门是瀑布链；并行默认 fail-closed | `tools/*`；`tool-calls.ts` |
| **D6** | Inbox：谁叫醒循环 | ✅ 已完成 | 把「下一轮 / 下一步 / 不唤醒」拆成原语 | `followup` / `steer` / `inject` |
| **D7** | 压缩与重试是插件 | ✅ 已完成 | 证明新行为不进 `agent-loop` | `agent/pre-step`；`agent/request-error` |
| **D8** | 子 Agent 是能力面 | ✅ 已完成 | 后端可换（进程内 / fork / 甚至别的产品） | `ctx.subagents`；独立 Session |
| **D9** | 编排：Workflow / Ralph / Teams | ✅ 已完成 | 多 Agent 策略是插件，不是新 loop | `ctx.workflowEngine`；`ralph`；`ctx.agentTeams` |
| **D10** | 换提供方，产品跟着走 | ✅ 已完成 | seam 的最大红利：沙箱/FS/subprocess | `ctx.sandbox` / `ctx.fs` / `ctx.subprocess` |
| **D11** | 从日志复活 | ✅ 已完成 | 事件源的工程闭环：persist + resume + 崩溃补 turn | `ctx.sessionPersistence` |
| **D12** | Skill 是可选说明书 | ✅ 已完成 | 能力目录 ≠ 会话事件；按需加载进上下文 | `ctx.skills`；`skill` 工具 |
| **D13** | 运行时改自己 | ⏳ | 签名设计：inspect + 挂载插件；不变量保契约 | `packages/extensions`；`ctx.invariants` |

结课后若还想加餐：ACP 协议。默认不做，开口再说。

## 每次学习固定流程

1. **串讲**本模块 2~4 个知识点（先讲 dsh 自己怎么设计、为什么这样）
2. **综合问答** 3~5 题（至少 1 题是「如果砍掉这个设计，会坏在哪」）
3. **1 个综合 TS Demo** → `demos/dX_*.ts`
4. **1 段口述** → `interview/dX-*.md`（主体是 dsh；最后可用一句 CC 作旁注）
5. 你说 **commit** 我提交；**push** 你来

## 明确跳过（仍然跳）

- Web UI / VitePress / 设置页 / 会话标题
- `vendor/cordis` 源码级实现（D1 只吃 primer 的五条）
- Python SDK、native/Landlock 实现细节（D9 只吃 seam 契约）
- 凭证、遥测、Typert 代码生成
- ACP / JSON-RPC 对外协议（不是 Runtime 内核）

## 源码锚点

| 模块 | 先读 | 再看 |
|------|------|------|
| D1 | `docs/architecture.md`；`docs/cordis-primer.md` | `packages/bundle/base`；`packages/boot/app-boot` |
| D2 | `docs/subsystems/session.md` | `packages/core/session/` |
| D3 | `docs/subsystems/core.md` | `packages/core/agent-loop/src/agent.ts` |
| D4 | `docs/subsystems/system-prompt.md`；`scope.md` | `packages/core/system-prompt/`；`packages/core/scope/` |
| D5 | `docs/subsystems/tools.md` | `packages/core/agent-loop/src/tool-calls.ts` |
| D6 | `docs/subsystems/core.md`（Agent.handle / inbox） | `packages/core/agent-loop/src/agent.ts`（send） |
| D7 | `docs/subsystems/compaction.md` | `packages/compaction/` |
| D8 | `docs/subsystems/subagent.md` | `packages/subagent/` |
| D9 | `docs/subsystems/workflow.md`；`agent-team.md` | `packages/workflow/`；`packages/experimental/agent-team/` |
| D10 | `docs/subsystems/sandbox.md`；`filesystem.md` | `packages/sandbox/`；`packages/fs/`；`packages/subprocess/` |
| D11 | `docs/subsystems/persistence.md` | `packages/session/session-persistence*` |
| D12 | `docs/subsystems/skills.md` | `packages/skill/` |
| D13 | `docs/subsystems/extensions.md`；`invariants.md` | `packages/extensions/`；`packages/runtime-diagnostics/invariants/` |

---

## 各模块知识点预告

### D1 插件宇宙

dsh 没有「打补丁的特权内核」。开机是把 profile 里的 bundle 一层层叠上去：`dsh-base` 先来，再 web/headless，再用户 `cordis.patch.yml`。

Cordis 五条就够用：插件是 Service；`ctx.<key>` 找能力；`inject` 声明依赖；typed 事件（emit / waterfall / parallel / serial）；注册都是可逆 effect。Waterfall 必须 `next()`，不调用就是短路——这是策略闸门的语法。

**Demo**：假 ctx 上挂 loop 与 tool 两个插件；卸 tool 后菜单消失、循环还在。

### D2 日志即世界

`Session` 不是可变 `messages[]`，是 typed 事件的 append-only log。`turn` 是一次用户回合（0 个或多个 step）；`step` 是一次模型请求加它点的工具。`deriveMessages()` 投影模型历史；`assistant/chunk` 留给 UI/回放。

硬规则：**Model-visible ⟺ logged**。新的模型可见输入必须新增 session 事件。这条不立住，后面 compact、resume、inject 全会漂。

**Demo**：append 一轮 user/assistant/tool 事件，派生出一封信；chunk 不进信。

### D3 瘦循环

`ReactLoopAgent`：`idle` ↔ `running(turn, step)`。一圈：claim inbox → 拼 prompt → `llm/stream` → 跑工具 → 写回 log → 工具还欠请求则下一步，否则 `turn/end`。

插件失败结束当前 **turn**，loop 还活着。没有内置 `max_turns`；超限是 `agent/turn-stopping` 上的策略。取消未分发的工具要补 `ABORTED_BEFORE_DISPATCH`。

**Demo**：第一圈点工具、第二圈只出字；打印 turn/step 和结束 reason。

### D4 提示词是拼出来的

系统提示不是进场写死的一串字符串。插件按 `order` 注册 `PromptSection`；工具 schema 由 registry 的 allowlist 贡献，执行细节不得漏给模型。`complete` 段可以宣布「我就是整份提示词」。

`agent.ctx` + `scope` 让同一个进程里，不同 agent 看到不同菜单和不同人格。这是「多 agent 同进程」能隔离的根。

**Demo**：两个 section 拼出提示词；给 agent B 单独注册一个工具，A 的菜单里没有。

### D5 被守卫的工具链

模型点名只是提议。执行走 `tools/pre-execute` → `execute` → `post-execute` → `tool/result`。deny / 中止也要交配对结果。`isConcurrencySafe` 默认独占；并行是有界滚动池，独占调用是屏障。

**Demo**：Read 进池并行、Edit 独占；pre-execute deny 仍产出 result。

### D6 Inbox：谁叫醒循环

统一原语 `send(target, wakeup)`：

- `followup`：下一 **turn** 的 FIFO，并唤醒
- `steer`：下一 **step** 的 inbox，并唤醒（人在中途插话）
- `inject`：进 next-step inbox，**不唤醒**（配菜等下一封真正的信）

空闲注入会一直等到有人 followup/steer。这是 dsh 对「输入」的拆法，比「往 messages 里塞一条」精细。

**Demo**：inject 一条记忆但不转圈；再 followup 才开工，第一步就能看见记忆。

### D7 压缩与重试是插件

compact 不在 loop 里开阶段。预防挂 `agent/pre-step`；API 仍超窗挂 `agent/request-error`，返回 `{ kind: 'retry' }`。摘要作为 session 事件写入，派生历史被遮蔽，不是 splice 数组。Retry 同样是插件。

这一课的设计课任务：指出「如果把 compact 写回 agent.ts 会破坏什么」。

**Demo**：超窗先压；仍溢出再压一次并 retry；第三次拒绝。

### D8 子 Agent 是能力面

子 Agent 有自己的 `SessionId`、自己的 log。提供方可以是进程内新 agent、fork 前缀、甚至 Claude Code / Codex / ACP 后端——主循环只认 `ctx.subagents` 接口。结果回灌仍是主会话上的 `tool/result`。后台收集走 `ctx.jobs`。

本课只立「一个子 Agent 怎么生、怎么隔离、怎么交卷」。多 Agent 怎么编，留给 D9。

**Demo**：主 loop 点 delegate；子 session 独立跑完；主 log 只见一条摘要 result。

### D9 编排：Workflow / Ralph / Agent Teams

三种编排，共用一条设计原则：**策略是插件，loop 不长新模式。**

- **Workflow**：模型写一段 JS 脚本（`script` + JSON `meta`/`args`），引擎在 worker thread 里跑，脚本里 `agent()` 出去的孩子都记在父 Agent 名下。`ctx.workflowEngine` 每个 context 只有一个引擎实现，不是命名提供方注册表。脚本跑前校验 meta，失败要响，不会先 eval 再取身份。
- **Ralph**：固定前台工作流，不是模型写脚本。把一个不可变 `objective` 依次交给多个 **全新** 子 agent；共享工作区是长期记忆，不把父对话当种子。每轮结构化交接 `continue | complete | blocked`。它证明：专用编排策略 = `workflowEngine` + `subagents` 上的普通工具插件。
- **Agent Teams**（实验域）：在 Lead Session 的日志上 fold 出花名册、任务 DAG、邮箱。队友仍是可继续的子 Agent；消息 `quiet` / `wakeup` 对上 D6 的 inject / followup。任务带 `blockedBy` 和 `writeScopes`，状态从 log 派生，不另造一套真相。

**Demo**：假 workflow 脚本串行起两个子 agent 再 `return` 汇总；Ralph 三轮 fresh child，只把最后一份交接交回父级；Team 往队友 inbox 投一封 wakeup 信，从 lead log fold 出未投递邮箱。

### D10 换提供方，产品跟着走

文件系统、子进程、沙箱是三个 seam。本地 Bash 经 `ctx.subprocess` 再经 `ctx.sandbox` 包一层 argv。把 FS+subprocess 指到远程沙箱，Bash / PTY / LSP 一起搬家，不必给每个工具写远程版。

`SandboxMode`：`read-only` / `workspace-write` / `danger-full-access`。执行是否 `full` 还是 `partial` 必须上报，不能假装封住了。

**Demo**：假 Bash 不直接 spawn，而是 `sandbox.wrap(argv)` 再交给 subprocess；换一个 remote provider，同一 Bash 工具输出「在远端跑」。

### D11 从日志复活

内存 log 是真相；持久化是另一条 seam（jsonl / sqlite），**没有第二套事件类型**。`session/event` 不阻塞 loop，后台分批写；`session/flush` 是观测屏障。崩溃若停在打开的 turn，恢复时补合成 `turn/end { interrupted }`，不截断已经落下的超长工具输出。`resume()` 从同一 id 重建历史再发布 agent。Header（cwd、谱系）走元数据，不进 `deriveMessages()`。

**Demo**：跑完两 step 后把事件数组当「磁盘」；新 loop `resume` 出来，派生信与原来一致。

### D12 Skill 是可选说明书

Skill **不是** session 事件。`ctx.skills` 合并多层提供方目录；模型用 `skill` 工具按需加载正文，加载后的内容再作为模型可见输入进入 log。目录按 scope 分层，和工具菜单同一套隔离。

**Demo**：catalog 里有 `debug-auth`；模型点 skill 后，下一封信多出说明书，且这条进了 log。

### D13 运行时改自己

agent 可以 inspect 当前 Cordis 树，并挂载/卸载自己写的插件——loop 不用重启。这把「一切皆插件」从开机配置推进到 **会话中的演化**。配套的是 `ctx.invariants`：每个包登记自己的运行时断言，查的是事件流和数据关系，不是「服务在不在」。配置错误 fail loud，不默默跳过。

**Demo**：运行中挂上一个 `echo` 工具，下一 step 菜单里出现；卸掉后消失。另做一条不变量：有 `tool/call` 就必须有配对 `tool/result`。

---

## 文件约定

- `00-module-plan.md` — 本计划
- `01-d1-d6-spine-review.md` — 脊柱段回顾与 CC 对照
- `interview/dX-*.md` — 口述
- `demos/dX_*.ts` — Demo

## 远程仓库

- URL：https://github.com/jiangyundeng-cpu/deepseek-harness-analysis
- 本地目录：`deepseek-harness analysis/`
