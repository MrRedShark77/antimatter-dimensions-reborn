el.update.stats = _=>{
    if (tmp.tab == 2) {
        tmp.el.time_played.setTxt(formatTime(player.totalTime))

        tmp.el.inf_stats.setDisplay(player.inf.infinitied.gte(1))
        if (player.inf.infinitied.gte(1)) {
            tmp.el.inf_stats_times.setTxt(format(player.inf.infinitied,0))
            tmp.el.inf_stats_best.setTxt(formatTime(player.inf.best))
            tmp.el.inf_stats_time.setTxt(formatTime(player.inf.time))
        }
    }
}