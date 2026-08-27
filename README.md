# DeepSeek Harness 学习笔记

精读 DeepSeek 开源 harness（`dsh`）的 **Agent Runtime**：先把它自己的设计立住，再顺带对照 Claude Code。

这不是「找不同」课。主线是学会 dsh 怎么把 agent 做成可组合、可恢复、可自改的平台。

## 仓库

| | 路径 / URL |
|--|------------|
| 源码 | `../deepseek-harness` |
| 笔记 | 本目录 |
| 远程 | https://github.com/jiangyundeng-cpu/deepseek-harness-analysis |
| CC 笔记（对照用） | `../claude code Harness analysis` |

## 目录

| 路径 | 内容 |
|------|------|
| `00-module-plan.md` | 模块制进度（D1–D13） |
| `01-d1-d6-spine-review.md` | 脊柱段回顾（D1–D6）与 CC 对照 |
| `demos/` | 每模块极简 TS Demo |
| `interview/` | 面试口述（先讲 dsh，末尾可选一句 CC） |

## 当前进度

- D1–D10 已完成；下一课 D11 从日志复活
- 远程：https://github.com/jiangyundeng-cpu/deepseek-harness-analysis

日常更新：

```bash
cd "deepseek-harness analysis"
git add .
git commit -m "D1: xxx"
git push
```

## Demo 运行

```bash
npx tsx demos/d1_plugin_universe.ts
```

## 说明

本仓库只存放学习笔记，与 `deepseek-harness` 源码分离。
