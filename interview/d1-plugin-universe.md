# D1 口述：插件宇宙

DeepSeek Harness 没有一块「只能打补丁的内核」。进程启动是组合：profile 按顺序列出 bundle，从空配置开始一层层叠 patch。`dsh-base` 永远第一层，再来 web 或 headless，然后是用户的 `cordis.patch.yml`，最后才是命令行 `--patch`。后写的按 id 整行替换前写的 config，不是深合并。

底下的框架是 Cordis，作者记住五条就够。插件是 Service；别人用 `ctx.tools`、`ctx.llm` 这种键找能力，不 import 具体实现。依赖用 `inject` 声明，服务齐了才激活，所以不用手工排 boot 顺序。插件之间用 typed 事件说话：观察用 emit，拦截用 waterfall。注册全是可逆 effect，卸载插件时贡献自动撤掉。

Waterfall 是绕过式中间件：监听器拿到 `next`，调用就交给下一环，不调用就是否决。权限闸门就是这种语法，不是写死在 loop 里。

旁注：Claude Code 把 callModel 做成 deps 注入；dsh 更彻底，连 loop 自己也是插件，卸掉工具只少菜单，圈还在转。
