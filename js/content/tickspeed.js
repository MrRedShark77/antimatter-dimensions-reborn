function buyTickspeed(max = false) {
    if (tmp.inf.reached) return
    if (player.points.gte(tmp.tickspeed.cost)) {
        updateTickspeedTemp()
        let cost = tmp.tickspeed.cost
        let bulk

        if (max) {
            bulk = tmp.tickspeed.bulk
            cost = E(10).pow(bulk.sub(1)).mul(1e3)
            if (player.tickspeed.max(bulk).gte(305)) {
                let start = E(305);
                let exp = E(2);
                cost =
                    E(10).pow(
                        bulk.sub(1).pow(exp).div(start.pow(exp.sub(1)))
                    ).mul(1e3)
            }
        }

        player.points = player.points.sub(cost).max(0)
        player.tickspeed = max?bulk.max(player.tickspeed):player.tickspeed.add(1)
    }
}

function updateTickspeedTemp() {
    tmp.tickspeed.cost = E(10).pow(player.tickspeed).mul(1e3)
    tmp.tickspeed.bulk = player.points.gte(1e3) ? player.points.div(1e3).max(1).log10().add(1).floor() : E(0)

    if (player.tickspeed.max(tmp.tickspeed.bulk).gte(305)) {
        let start = E(305);
        let exp = E(3);
        tmp.tickspeed.cost =
            E(10).pow(
                player.tickspeed.pow(exp).div(start.pow(exp.sub(1)))
            ).mul(1e3)
        tmp.tickspeed.bulk = player.points
            .div(1e3)
            .max(1)
            .log(10)
            .times(start.pow(exp.sub(1)))
            .root(exp)
            .add(1)
            .floor();
    }

    tmp.tickspeed.base = E(1.125).mul(tmp.galaxy.effect)
    if (player.achievements.includes(36)) tmp.tickspeed.base = tmp.tickspeed.base.mul(1.02)
    tmp.tickspeed.effect = tmp.tickspeed.base.pow(player.tickspeed)
}

tmp_update.push(updateTickspeedTemp)

el.update.tickspeed = _=>{
    if (tmp.tab == 0 && tmp.stab[0] == 0) {
        tmp.el.tickspeed_div.setVisible(player.dimensions[1].bought.gte(1))
        if (player.dimensions[1].bought.gte(1)) {
            tmp.el.tickspeed_amount.setTxt(format(player.tickspeed,0))
            tmp.el.tickspeed_base.setTxt(format(tmp.tickspeed.base,3))
            tmp.el.tickspeed.setTxt(format(tmp.tickspeed.effect))
            tmp.el.tickspeed_cost.setTxt(format(tmp.tickspeed.cost))
            tmp.el.tickspeed_btn.setClasses({locked: player.points.lte(tmp.tickspeed.cost)})
        }
    }
}