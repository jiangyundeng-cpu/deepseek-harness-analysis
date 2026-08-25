# DeepSeek Harness 学习笔记

对照 Claude Code Harness 课程，精读 DeepSeek 开源 harness（`dsh`）的 **Agent Runtime** 核心。

目标不是再背一遍「寄信 → 跑工具 → 写回」，而是看同一套 loop 如何被拆成 **可插拔产品**：插件、事件、session log、能力面。

## 对照仓库

| | Claude Code | DeepSeek |
|--|-------------|----------|
| 源码 | 本地 CC 解析 | `../deepseek-harness` |
| 笔记 | `claude code Harness analysis/` | 本目录 |
| 远程 | https://github.com/jiangyundeng-cpu/claude-code-Harness-analysis | https://github.com/jiangyundeng-cpu/deepseek-harness-analysis |

## 目录

| 路径 | 内容 |
|------|------|
| `00-module-plan.md` | 模块制进度（D1–D6） |
| `demos/` | 每模块极简 TS Demo，复刻核心逻辑 |
| `interview/` | 面试口述话术（含与 CC 对照一句） |

## 当前进度

- 骨架课未开课；计划已排好
- 远程仓库：https://github.com/jiangyundeng-cpu/deepseek-harness-analysis

日常更新：

```bash
cd "deepseek-harness analysis"
git add .
git commit -m "D1: xxx"
git push
```

## Demo 运行

```bash
npx tsx demos/d1_plugin_and_seam.ts
```

## 说明

本仓库只存放学习笔记，与 `deepseek-harness` 源码仓库分离，方便复习与面试背诵。
