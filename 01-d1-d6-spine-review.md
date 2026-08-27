# D1–D6 脊柱回顾

脊柱段把 dsh 这台运行时立起来。还不是压缩、子 Agent、沙箱那些精髓课，而是先能讲清一件事：

**插件组成世界，账本是真相，循环只转圈，信是拼出来的，工具要过闸，输入走信箱。**

结业口径：循环始终很瘦；策略全挂在插件和信箱上，不写进驱动器。

---

## 六课各钉住什么

### D1 插件宇宙

没有一块只能打补丁的内核。开机是一层层叠插件。记住五条：插件是 Service；用 `ctx.xxx` 找能力；`inject` 等孔有电；waterfall 不调 `next()` 就是否决；卸掉就带走。循环自己也是插件。

### D2 日志即世界

真相不是可变的 `messages[]`，是只能往后记的流水账。寄给模型的信是投影（`deriveMessages`），chunk 给人看、不进信。硬规则：模型看见的，必须能从账本重建。

### D3 瘦循环

空闲睡着，被叫醒才开工。**turn** = 用户一句办到没工具；**step** = 这一句里每问一次模型。插件出错关的是当前 turn，循环还活着。

### D4 提示词是拼出来的

抬头和工具菜单不是进场写死的。插件交纸条按顺序拼；每个 agent 还有自己的小世界，A 看不见只给 B 的工具。

### D5 被守卫的工具链

模型点名只是提议。先过闸门再动手：allow / deny / ask。拒绝也要交卷。并行要报名，没报名就独占、当屏障。

### D6 Inbox

输入不直接改账本。**followup** = 新说一句并叫醒；**steer** = 中途改口并叫醒；**inject** = 夹菜不叫醒。夹菜 ≠ 开工。

---

## 串成一条故事

用户 followup 一句 → 循环醒来开 turn → 按插件拼抬头和菜单 → 问模型 → 点了工具先过闸门 → 结果写入账本 → 同 turn 再问 → 没工具了 turn 结束、循环继续睡。中途改口用 steer；记忆、提醒用 inject，等下一次真正开工才进信。

---

## 和 Claude Code 怎么对上

| dsh | 已经会的 CC |
|-----|----------------|
| 一切皆插件 | `callModel` 那种 deps，dsh 更彻底 |
| 账本 + 投影成信 | 日记本 `messages` / 信 `messagesForQuery` |
| turn / step，idle 等下一句 | Continue / Terminal |
| 提示词按块拼、按 agent 不同 | 整场 `systemPrompt` |
| `pre-execute` 的 allow/deny/ask | `canUseTool` |
| inject 夹菜不叫醒 | attachment；CC 没把「夹菜」和「开工」拆这么开 |

对照只作旁注。主线仍是 dsh 自己怎么设计。

---

## 材料

| 模块 | Demo | 口述 |
|------|------|------|
| D1 | `demos/d1_plugin_universe.ts` | `interview/d1-plugin-universe.md` |
| D2 | `demos/d2_session_log.ts` | `interview/d2-session-log.md` |
| D3 | `demos/d3_thin_loop.ts` | `interview/d3-thin-loop.md` |
| D4 | `demos/d4_prompt_assembly.ts` | `interview/d4-prompt-assembly.md` |
| D5 | `demos/d5_guarded_tools.ts` | `interview/d5-guarded-tools.md` |
| D6 | `demos/d6_inbox.ts` | `interview/d6-inbox.md` |

后半段见 `02-d7-d13-review.md`；全程见 `03-d1-d13-review.md`。
