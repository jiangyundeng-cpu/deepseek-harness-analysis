# D5 口述：被守卫的工具链

模型点名只是提议。真正动手走 pre-execute → execute → post-execute，再往账本写配对的 tool/result。pre-execute 是动手前的闸门，三种裁决是 allow / deny / ask；不调用 next 就是短路。deny 和中止都不跑真工具，但仍必须交配对失败结果，否则下一封信缺页。并行要报名：只有 isConcurrencySafe 明确为真才能进池，没声明就独占，独占是屏障，后面的要等。旁注：Claude Code 的 canUseTool 就是这扇门的 allow/deny/ask；dsh 把闸门做成可插拔瀑布，后面还多了执行外包和跑完后的 post-execute。
