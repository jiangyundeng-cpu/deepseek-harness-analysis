# D6 口述：Inbox 谁叫醒循环

dsh 不把输入直接推进账本。统一走信箱，并且把两件事拆开：放哪，以及叫不叫醒。followup 进下一句并唤醒，等于用户又说了一句、新开一个 turn。steer 进下一步并唤醒，是当前这句话做到一半改方向。inject 也进下一步，但不唤醒：空闲时配菜会一直等到有人 followup 或 steer；已经在跑则下一次问模型之前就能看见。旁注：Claude Code 用户再发一条约等于 followup，attachment 约等于配菜；dsh 多钉了一条——夹菜不等于开工。
