# D7 口述：压缩与重试是插件

压缩和重试都不进循环。寄信前太长，插件挂在 pre-step 先压，相当于 Claude Code 的 autocompact。API 报超窗，插件挂在 request-error 再压，并对循环说 retry，相当于 reactive compact 再 Continue。网络抖动的重试也挂在同一扇门上。循环只看见 retry 或关 turn，分不清刚才是压缩还是等了一下。账本不撕旧页，只追加摘要把可见历史挡住。超窗 retry 必须有次数上限，否则压不下去就会空转烧 token。旁注：Claude Code 用 hasAttemptedReactiveCompact 挡住无限再压；dsh 把上限放在插件里，不写进循环。
