function resetDimBoost(bulk=false) {
    if (tmp.inf.reached) return
    if (player.dimensions[tmp.dimBoost.dimTarget].bought.gte(tmp.dimBoost.req)) {
        player.dimBoost = player.dimBoost.add(1)
        doResetDimBoost()
    }
}

function doResetDimBoost() {
    for (let x = 0; x < 8; x++) player.dimensions[x] = {amount: E(0), bought: E(0)}
    player.tickspeed = E(0)
    player.sacrifice = E(1)

    let start = E(10)
    if (player.achievements.includes(21)) start = E(200)
    if (player.achievements.includes(35)) start = E(3e3)
    if (player.achievements.includes(45)) start = E(6e6)
    if (player.achievements.includes(46)) start = E(1.2e12)

    player.points = start
}

tmp_update.push(_=>{
    tmp.dimBoost.base = E(2)
    if (player.inf.upgs.includes(12)) tmp.dimBoost.base = tmp.dimBoost.base.mul(1.25)

    tmp.dimBoost.req = E(2)
    tmp.dimBoost.bulk = E(0)
    tmp.dimBoost.dimTarget = player.dimBoost.min(4).floor().toNumber()+3
    if (player.dimBoost.gte(4)) {
        tmp.dimBoost.req = E(1.5).mul(player.dimBoost.sub(4)).add(2).ceil()
        tmp.dimBoost.bulk = player.dimensions[7].bought.gte(2) ? player.dimensions[7].bought.sub(2).mul(10).div(15).add(5).floor() : E(0)
    }
})

el.update.dimBoost = _=>{
    if (tmp.tab == 0 && tmp.stab[0] == 0) {
        tmp.el.dimBoost.setTxt(`Dimension ${player.dimBoost.gte(4)?"Boost":"Shift"} (${format(player.dimBoost,0)}):`)
        tmp.el.dimBoost_req.setTxt(`${format(tmp.dimBoost.req,0)} ${DIMS.names[tmp.dimBoost.dimTarget]} Dimensions`)
        tmp.el.dimBoost_txt.setTxt(player.dimBoost.gte(4)?"Boost":"new Dimension")
        tmp.el.dimBoost_btn.setClasses({small: true, locked: player.dimensions[tmp.dimBoost.dimTarget].bought.lt(tmp.dimBoost.req)})
        tmp.el.dimBoost_base.setTxt(format(tmp.dimBoost.base))
    }
}