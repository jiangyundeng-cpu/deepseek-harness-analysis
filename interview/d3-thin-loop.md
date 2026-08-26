# D3 口述：瘦循环

dsh 的循环驱动器叫 ReactLoopAgent，空闲时睡着，inbox 里来了会叫醒的话才开工。一次用户回合是一个 turn：先在日志里记下 turn/start，再一步步跑 step。一步就是问一次模型，它若点了工具就执行并把结果写回日志，然后同 turn 里再问模型；它不再点工具，就 turn/end，reason 多为 completed。插件出错关的是当前 turn，不是把整个循环拆掉，所以还能再被叫醒。没有内置 max_turns，超限要挂在 turn 快停时的事件上。旁注：Claude Code 的 Continue 相当于还有 step 或还有下一句；Terminal 相当于 turn/end 带上 reason。
