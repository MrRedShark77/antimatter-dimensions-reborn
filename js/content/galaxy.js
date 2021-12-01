function resetGalaxy() {
    if (tmp.inf.reached) return
    if (player.dimensions[7].bought.gte(tmp.galaxy.req)) {
        player.galaxy = player.galaxy.add(1)
        if (player.sacrifice.lte(1)) ACHS.give(24, true)
        doResetGalaxy()
    }
}

function doResetGalaxy() {
    let keep = E(0)
    if (player.inf.upgs.includes(8)) keep = keep.add(1)
    if (player.inf.upgs.includes(9)) keep = keep.add(1)
    if (player.inf.upgs.includes(10)) keep = keep.add(1)
    if (player.inf.upgs.includes(11)) keep = keep.add(1)
    player.dimBoost = keep
    doResetDimBoost()
}

tmp_update.push(_=>{
    tmp.galaxy.req = E(5).mul(player.galaxy).add(7)
    tmp.galaxy.bulk = player.dimensions[7].bought.gte(7)?player.dimensions[7].bought.sub(7).div(5).add(1).floor():E(0)

    if (player.galaxy.max(tmp.galaxy.bulk).gte(100)) {
        let start = E(100);
        let exp = E(2);
        tmp.galaxy.cost =
            E(5).mul(
                player.galaxy.pow(exp).div(start.pow(exp.sub(1)))
            ).add(7)
        tmp.galaxy.bulk = player.dimensions[7].bought
            .sub(7)
            .div(5)
            .times(start.pow(exp.sub(1)))
            .root(exp)
            .add(1)
            .floor();
    }

    let g = player.galaxy
    if (player.inf.upgs.includes(6)) g = g.mul(2)
    tmp.galaxy.effect = E(1.015).pow(g)
})

el.update.galaxy = _=>{
    if (tmp.tab == 0 && tmp.stab[0] == 0) {
        tmp.el.galaxy.setTxt(`Dimension Galaxy (${format(player.galaxy,0)}):`)
        tmp.el.galaxy_req.setTxt(format(tmp.galaxy.req,0))
        tmp.el.galaxy_btn.setClasses({small: true, locked: player.dimensions[7].bought.lt(tmp.galaxy.req)})
    }
}