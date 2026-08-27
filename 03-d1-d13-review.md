# D1–D13 全程回顾

这门课学的是 DeepSeek Harness（`dsh`）怎么把 Agent 做成可组合运行时：循环只转圈，策略全挂在插件、账本和插孔上。对照 Claude Code 只是旁注——你已经会另一种解法，用来认路，不是排课轴。

一句话：**插件组成世界，账本是真相，循环只转圈。**

---

## 两段怎么接上

| 段 | 课 | 钉住的事 |
|----|----|----------|
| 前半（D1–D6） | 插件、账本、瘦循环、拼信、闸门、信箱 | 先能讲清：谁组成世界、什么是真相、圈怎么转、信怎么寄、工具怎么过、谁叫醒循环 |
| 后半（D7–D13） | 压缩重试、帮手、编排、沙箱、复活、Skill、自改 | 证明这些都不进循环；关掉能活；说明书按需进账本；菜单能当场改 |

前半立机器，后半证明新功能是零件不是新发动机。细节分别见 `01-d1-d6-spine-review.md` 和 `02-d7-d13-review.md`。

---

## 十三课一张清单

| 课 | 记住这一句 |
|----|------------|
| D1 | 开机叠插件；`ctx.xxx` 找能力；waterfall 不调 `next()` 就是否决；卸掉就带走 |
| D2 | 真相是只能往后记的流水账；信是投影；chunk 给人看、不进信 |
| D3 | 空闲睡着；turn = 用户一句办到没工具；step = 问一次模型；失败关 turn 不关循环 |
| D4 | 抬头和菜单按块拼，可以按 agent 不同 |
| D5 | 点名只是提议；allow / deny / ask；拒绝也要交卷；并行要报名 |
| D6 | followup 新说一句并叫醒；steer 中途改口并叫醒；inject 夹菜不叫醒 |
| D7 | 压缩和重试是插件；循环只看见 retry 或关 turn；账本不撕页；retry 要有上限 |
| D8 | 家长雇帮手；孩子自己记账；家长只收小结 |
| D9 | 任务单 / 换人接力 / 组里传话，都是工具，不给循环加模式 |
| D10 | 闸门是批不批准；沙箱是真跑 + 操作系统限权；换执行地点工具跟着走 |
| D11 | 对话抄到文件；同一套事件；缺 turn/end 就补打断，已写下的结果不删 |
| D12 | Skill 是说明书不是 Read；先目录后点名；公开形态是文件夹 + `SKILL.md` |
| D13 | 中途可挂/卸工具且不重启循环；临时按钮默认不跟对话抄盘；不变量查账本，错了要响 |

---

## 串成一条故事

用户 followup 一句 → 循环醒来开 turn → 插件拼抬头和菜单 → 问模型。点了工具先过闸门，真跑还进笼子。结果写入账本，同 turn 再问；没工具了 turn 结束、循环继续睡。中途改口用 steer；记忆、提醒用 inject，等下一次真正开工才进信。

信太长：插件压一压或超窗后 retry。活太多：雇帮手，孩子自己转圈，家长只收一张小结。好几个帮手就按任务单、换人接力或组里传话来安排。说明书先给目录，点名后正文才进账本。聊天中途可以给自己加按钮，循环不用重启。

程序关掉：内存会丢，所以把同一本事件抄到文件。再打开投影成信；若崩溃时工具结果已写下、这一轮结束还没记，补一条打断，不要删已经记下的结果。

---

## 学完应能独立讲清

不看对照表，也能说：Agent 从插件叠出来；模型看见的必须能从账本重建；循环失败只关当前 turn；压缩、帮手、沙箱、Skill、自改都不改驱动器那几行；关掉后从同一份事件流活过来。

ACP（Agent Client Protocol）是可选加餐：对外的 JSON-RPC 电话线，不是循环怎么设计。默认不做，开口再说。

---

## 材料总表

| 模块 | Demo | 口述 |
|------|------|------|
| D1 | `demos/d1_plugin_universe.ts` | `interview/d1-plugin-universe.md` |
| D2 | `demos/d2_session_log.ts` | `interview/d2-session-log.md` |
| D3 | `demos/d3_thin_loop.ts` | `interview/d3-thin-loop.md` |
| D4 | `demos/d4_prompt_assembly.ts` | `interview/d4-prompt-assembly.md` |
| D5 | `demos/d5_guarded_tools.ts` | `interview/d5-guarded-tools.md` |
| D6 | `demos/d6_inbox.ts` | `interview/d6-inbox.md` |
| D7 | `demos/d7_compact_retry.ts` | `interview/d7-compact-retry.md` |
| D8 | `demos/d8_subagent.ts` | `interview/d8-subagent.md` |
| D9 | `demos/d9_orchestration.ts` | `interview/d9-orchestration.md` |
| D10 | `demos/d10_providers.ts` | `interview/d10-providers.md` |
| D11 | `demos/d11_resume.ts` | `interview/d11-resume.md` |
| D12 | `demos/d12_skill.ts` | `interview/d12-skill.md` |
| D13 | `demos/d13_self_modify.ts` | `interview/d13-self-modify.md` |

分段回顾：`01-d1-d6-spine-review.md`、`02-d7-d13-review.md`。
