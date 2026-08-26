# D2 口述：日志即世界

DeepSeek Harness 的会话真相不是一份可变的 messages 数组，而是只能往前追加的事件日志。一轮用户回合叫 turn，一次模型请求加它点的工具叫 step。UI 要的流式字、回放、压缩记录，都可以作为事件进日志；但寄给模型的信不是把日志原样塞进去，而是用 deriveMessages 投影：只取 user/message、assistant/message、tool/result。流式的 chunk 和 turn 边界留在日志里，不进信。硬规则是：模型看见的东西必须能从日志重建，新的模型可见输入必须先写成事件。旁注：Claude Code 把日记本和信分成两份数组；dsh 连日记本都拆成事件流，信是投影。
