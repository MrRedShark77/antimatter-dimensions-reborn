function sacrifice() {
    if ((player.dimBoost.gte(5) || player.inf.infinitied.gte(1)) && player.dimensions[7].bought.gte(1)) if (player.confirms.sacrifice?confirm("Are you sure you want to sacrifice?"):true) {
        player.sacrifice = player.sacrifice.mul(tmp.sacrificeBefore)
        for (let x = 0; x < 7; x++) player.dimensions[x].amount = E(0)
    }
}

tmp_update.push(_=>{
    let pow = E(2)
    if (player.achievements.includes(23)) pow = pow.mul(1.1)
    if (player.achievements.includes(24)) pow = pow.mul(1.1)
    tmp.sacrificeBefore = player.dimensions[0].amount.add(1).log10().div(10).add(1).pow(pow).div(player.sacrifice).max(1)
})

el.update.sacrifice = _=>{
    if (tmp.tab == 0 && tmp.stab[0] == 0) {
        let unl = player.dimBoost.gte(5) || player.inf.infinitied.gte(1)

        tmp.el.sacrificeConfirm.setDisplay(unl)
        tmp.el.sacrifice_btn.setDisplay(unl)
        if (unl) {
            tmp.el.sacrificeConfirm.setTxt(player.confirms.sacrifice?"ON":"OFF")
            tmp.el.sacrificeMult.setTxt(format(tmp.sacrificeBefore,2))
            tmp.el.sacrifice_btn.setTooltip(`Boost the 8th Dimension by ${format(player.sacrifice,2)}x`)
            tmp.el.sacrifice_btn.setClasses({locked: !(player.dimBoost.gte(5) && player.dimensions[7].bought.gte(1))})
        }
    }
}