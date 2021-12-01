const INF_UPGS = {
    buy(x) {
        if (player.inf.points.gte(this.upgs[x].cost) && !player.inf.upgs.includes(x) && (this.upgs[x].afford?this.upgs[x].afford():true)) {
            player.inf.points = player.inf.points.sub(this.upgs[x].cost)
            player.inf.upgs.push(x)
        }
    },
    buyMult() {
        if (player.inf.points.gte(tmp.inf.mult_cost)) {
            let cost = E(10).pow(tmp.inf.mult_bulk)
            player.inf.points = player.inf.points.sub(cost)
            player.inf.mult = player.inf.mult.max(tmp.inf.mult_bulk)
        }
    },
    upgs: [
        {
            desc: `Normal Dimensions gain a multiplier based on infinites.`,
            cost: E(1),
            effect() {
                let x = player.inf.infinitied.mul(2).pow(1.25).div(10).add(1)
                return x
            },
            effDesc(x) { return format(x,2)+"x" },
        },
        {
            desc: `Increase the multiplier for buying Normal Dimension.<br>x2 -> x2.2`,
            cost: E(1),
        },
        {
            desc: `8th Normal Dimension boost 1st Normal Dimension Multiplier.`,
            cost: E(1),
            effect() {
                let x = player.dimensions[7].amount.add(1).pow(player.dimensions[7].amount.add(1).root(3))
                return x
            },
            effDesc(x) { return format(x,2)+"x" },
        },
        {
            desc: `7th Normal Dimension boost 4nd Normal Dimension Multiplier.`,
            cost: E(1),
            effect() {
                let x = player.dimensions[6].amount.add(1).log10().add(1).pow(2)
                return x
            },
            effDesc(x) { return format(x,2)+"x" },
        },
        {
            desc: `6th Normal Dimension boost 3nd Normal Dimension Multiplier.`,
            cost: E(1),
            effect() {
                let x = player.dimensions[5].amount.add(1).log10().add(1).pow(1.75)
                return x
            },
            effDesc(x) { return format(x,2)+"x" },
        },
        {
            desc: `5th Normal Dimension boost 2nd Normal Dimension Multiplier.`,
            cost: E(1),
            effect() {
                let x = player.dimensions[4].amount.add(1).log10().add(1).pow(1.75)
                return x
            },
            effDesc(x) { return format(x,2)+"x" },
        },
        {
            desc: `Antimatter Galaxies are twice as effective.`,
            cost: E(2),
        },
        {
            desc: `1st Dimesnion gets a multiplier based on unspent Infinity points.`,
            cost: E(3),
            effect() {
                let x = player.inf.points.add(1).pow(1.5)
                return x
            },
            effDesc(x) { return format(x,2)+"x" },
        },
        {
            desc: `You start with 5th Dimension unlocked.`,
            cost: E(20),
        },
        {
            afford() { return player.inf.upgs.includes(8) },
            desc: `You start with 6th Dimension unlocked.`,
            cost: E(40),
        },
        {
            afford() { return player.inf.upgs.includes(9) },
            desc: `You start with 7th Dimension unlocked.`,
            cost: E(80),
        },
        {
            afford() { return player.inf.upgs.includes(10) },
            desc: `You start with 8th Dimension unlocked, and a Galaxy.`,
            cost: E(200),
        },
        {
            desc: `Increase the multiplier for each Dimension Boost.<br>2x -> 2.5x`,
            cost: E(6),
        },
        {
            desc: `Generate IP based on your fastest infinity.`,
            cost: E(10),
            effect() {
                let x = E(2/player.inf.best).mul(tmp.inf.mult_eff).min(10)
                return x
            },
            effDesc(x) { return format(x,2)+" IP/s" },
        },
        /*
        {
            desc: `Placeholder.`,
            cost: E(1),
        },
        */
    ]
}

function gainCrunch() {
    player.inf.points = player.inf.points.add(tmp.inf.gain)
    player.inf.infinitied = player.inf.infinitied.add(1)

    player.inf.best = Math.min(player.inf.best, player.inf.time)

    if (player.galaxy.lte(1)) ACHS.give(36, true)
    if (player.inf.time <= 3600) ACHS.give(35, true)
    if (player.inf.time <= 600) ACHS.give(45, true)
    if (player.inf.time <= 60) ACHS.give(46, true)
    if (player.dimensions[7].bought.lte(1)) ACHS.give(38, true)
}

function bigCrunch() {
    if (document.body.style.animation == "")
    if (player.inf.infinitied.gte(10)) {
        gainCrunch()
        doResetInf()
    } else {
        document.body.style.animation = "implode 2s 1"
        setTimeout(_=>{
            gainCrunch()

            doResetInf()
        },1000)
        setTimeout(_=>{
            document.body.style.animation = ""
        },2000)
    }
}

function doResetInf() {
    player.inf.time = 0

    player.galaxy = player.inf.upgs.includes(11)?E(1):E(0)

    doResetGalaxy()
}

tmp_update.push(_=>{
    tmp.inf.reached = player.points.gte(INF_NUMBER)

    tmp.inf.mult_cost = E(10).pow(player.inf.mult.add(1))
    tmp.inf.mult_bulk = player.inf.points.max(1).log10().floor()
    tmp.inf.mult_eff = E(2).pow(player.inf.mult)

    tmp.inf.gain = tmp.inf.mult_eff

    for (let x = 0; x < INF_UPGS.upgs.length; x++) if (INF_UPGS.upgs[x].effect) tmp.inf.upgs_eff[x] = INF_UPGS.upgs[x].effect()
})

el.update.inf = _=>{
    tmp.el.app.setDisplay((!tmp.inf.reached || player.inf.infinitied.gte(10)) && tmp.readyGame)
    tmp.el.crunch.setDisplay(tmp.inf.reached && tmp.readyGame)

    if (tmp.tab == 4) {
        tmp.el.infAmount.setTxt(format(player.inf.points,0))

        for (let x = 0; x < INF_UPGS.upgs.length; x++) {
            let upg = INF_UPGS.upgs[x]
            let upg_el = "inf_upg"+x
            if (tmp.el[upg_el]) {
                tmp.el[upg_el].setHTML(`
                ${upg.desc}<br>${upg.effDesc?"Currently: "+upg.effDesc(tmp.inf.upgs_eff[x])+"<br>":""}Cost: ${format(upg.cost,0)} IP
                `)
                tmp.el[upg_el].setClasses({inf: true, upg: true, locked: !(player.inf.points.gte(upg.cost) && (upg.afford?upg.afford():true)) && !player.inf.upgs.includes(x), bought: player.inf.upgs.includes(x)})
            }
        }

        tmp.el.inf_mult_eff.setTxt(format(tmp.inf.mult_eff))
        tmp.el.inf_mult_cost.setTxt(format(tmp.inf.mult_cost))
        tmp.el.inf_mult.setClasses({inf: true, upg: true, locked: player.inf.points.lt(tmp.inf.mult_cost)})
    }
}