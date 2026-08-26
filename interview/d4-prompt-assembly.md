# D4 口述：提示词是拼出来的

dsh 寄给模型的抬头不是进场写死的一整段字符串。插件按顺序登记一块块 PromptSection，组装时按 order 拼起来；工具菜单也是各插件登记的 schema，执行细节不会漏进菜单。同一个进程里，每个 agent 还有自己的小世界：在 agent.ctx 上登记的工具或段落，只给这个 agent 看见，用来隔离多 agent。旁注：Claude Code 里 systemPrompt 基本是整场合同；dsh 把合同拆成可插拔的块，并且可以按 agent 不同。
