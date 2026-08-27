# D7–D13 后半段回顾

前半段（D1–D6）把运行时立起来：插件、账本、瘦循环、拼信、闸门、信箱。后半段不再给循环加模式，而是证明：压缩、帮手、编排、沙箱、复活、说明书、当场改菜单，都可以挂在插件和插孔上。

结业口径：**循环始终很瘦；新行为不进驱动器。**

---

## 七课各钉住什么

### D7 压缩与重试是插件

太长先压（pre-step），超窗再压并对循环说 retry（request-error）。循环只看见 retry 或关 turn，分不清刚才是压缩还是等了一下。账本不撕旧页，只追加摘要挡住可见历史。超窗 retry 必须有次数上限，否则压不下去会空转烧 token。

### D8 子 Agent

家长雇帮手：点名和其他工具一样先过闸门，再调「给我一个帮手」这个插孔。帮手有自己的 session 和流水账；干完只给家长一张小结（主账本只多 tool/call + tool/result）。插孔后面接进程内还是别的产品，主循环那几行不用改。

### D9 好几个帮手怎么安排

三种雇法都是普通工具，不在主循环里再写 while。Workflow：模型写任务单，先检查抬头再按单雇人。Ralph：目标一句话不变，每轮换全新帮手，不带家长聊天，纸条是 continue / complete / blocked。Team：组里长期几个人，传话沿用 D6 的 followup / inject。

### D10 换提供方，产品跟着走

读文件、终端都不自己碰盘、不自己按回车。闸门是动手前批不批准；沙箱是真跑之后操作系统还限权（不是虚拟机演戏）。deny 不启动；笼子不允许则进程起来了、这一下被内核挡住。换「在哪台电脑读盘、起进程」，同一套工具跟着走，不必各写一份云端版。关严还是有漏洞必须如实上报。

### D11 从日志复活

内存对话关程序会丢，所以把 D2 那本记录抄到文件。文件里存的就是原来那些事件，不是另一套存档。崩溃停在「工具结果已写下、这一轮结束还没记」，打开时补 turn/end（打断），已经写下的结果不删。D11 存的是对话，不是菜单上的临时按钮。

### D12 Skill 是可选说明书

Skill 是说明书，不是 Read。一开始只给目录；模型点名后正文才进账本，下一封信才看得见。公开形态是文件夹 + `SKILL.md`（封面 name / description + 正文，可选 scripts）。各家扫的目录不同，读的是同一份文件，所以一份能装到 Cursor、Claude Code、Codex、dsh 上。

### D13 运行时改自己

聊天中途可以挂上或卸掉工具，下一封信的菜单跟着变，循环不用重启。这和 D1 一样是插件，只是从开机加载变成对话里再挂。临时按钮默认不跟对话一起抄盘；要每次开机都有，做成普通插件启动时加载。不变量查账本合不合理（例如 call 必须有 result），错了要响，不要默默跳过。

---

## 串成一条故事

信太长：插件先压或超窗后再压并 retry，循环照转。活太多：家长雇帮手，孩子自己记账，家长只收小结。好几个帮手：任务单 / 换人接力 / 组里传话，全是工具。真动手：先过闸门，再进笼子。关掉重开：从同一本事件流读回来，缺结束就补打断。说明书按需点名，不整本塞进每一封信。中途还能给自己加按钮；查账本发现 call 没 result 要响。

全程没有一步需要改瘦循环那几行。

---

## 和 Claude Code 怎么对上

| dsh | 已经会的 CC |
|-----|----------------|
| pre-step 预防压；request-error 再压 + retry | autocompact；reactive compact 再 Continue |
| 帮手插孔，主账本只收小结 | Task：孩子干活、家长收总结 |
| Workflow / Ralph / Team 都是工具插件 | 也有模型写 workflow 脚本这一路 |
| 闸门 + 操作系统笼子；换执行地点工具跟着走 | 也有沙箱限权 |
| 同一份事件流抄盘再投影 | 日记本 `messages` 再拿出来 |
| Skill 先目录再点名正文 | 先发现再按需打开 |
| 会话中途挂/卸插件；不变量查账本 | 主要是启动时装插件 |

对照只作旁注。主线仍是 dsh 自己怎么设计。

---

## 材料

| 模块 | Demo | 口述 |
|------|------|------|
| D7 | `demos/d7_compact_retry.ts` | `interview/d7-compact-retry.md` |
| D8 | `demos/d8_subagent.ts` | `interview/d8-subagent.md` |
| D9 | `demos/d9_orchestration.ts` | `interview/d9-orchestration.md` |
| D10 | `demos/d10_providers.ts` | `interview/d10-providers.md` |
| D11 | `demos/d11_resume.ts` | `interview/d11-resume.md` |
| D12 | `demos/d12_skill.ts` | `interview/d12-skill.md` |
| D13 | `demos/d13_self_modify.ts` | `interview/d13-self-modify.md` |

全程回顾见 `03-d1-d13-review.md`。
