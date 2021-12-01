const DIMS = {
    names: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
    normal: {
        expCostStart: [1,2,4,6,9,13,18,24],
        expCostInc: [3,4,5,6,8,10,12,15],
        maxAll() {
            if (tmp.inf.reached) return
            buyTickspeed(true)
            for (let x = 0; x < 8; x++) if (player.points.gte(tmp.dimensions[x].cost) && player.dimBoost.gte(x-3)) {
                let bulk = tmp.dimensions[x].bulk
                let dim_start = E(10).pow(this.expCostStart[x])
                let dim_inc = E(10).pow(this.expCostInc[x])
                let cost = dim_inc.pow(bulk.sub(1)).mul(dim_start)

                if (player.dimensions[x].bought.max(bulk).gte(100)) {
                    let start = E(100);
                    let exp = E(3);
                    cost =
                        dim_inc.pow(
                            bulk.sub(1).pow(exp).div(start.pow(exp.sub(1)))
                        ).mul(dim_start)
                }

                player.points = player.points.sub(cost).max(0)
                player.dimensions[x].amount = bulk.max(player.dimensions[x].amount)
                player.dimensions[x].bought = bulk.max(player.dimensions[x].bought)
            }
        },
        buy(x) {
            if (tmp.inf.reached) return
            if (player.points.gte(tmp.dimensions[x].cost) && player.dimBoost.gte(x-3)) {
                if (x == 0 && player.dimensions[0].amount.gte(1e150)) ACHS.give(28, true)
                player.points = player.points.sub(tmp.dimensions[x].cost).max(0)
                player.dimensions[x].amount = player.dimensions[x].amount.add(1)
                player.dimensions[x].bought = player.dimensions[x].bought.add(1)
            }
        },
        getDimMult(i) {
            let base = E(2)
            if (player.inf.upgs.includes(1)) base = base.mul(1.1)
            if (player.achievements.includes(28) && i == 0) base = base.mul(1.1)
            if (player.achievements.includes(38) && i < 7) base = base.mul(1.02)

            let a = player.dimensions[i].bought
            if (player.achievements.includes(26)) a = a.mul(1.1)

            let x = base.pow(a).mul(tmp.dimBoost.base.pow(player.dimBoost.sub(i).max(0)))
            if (i==7) x = x.mul(player.sacrifice)

            if (player.inf.upgs.includes(0)) x = x.mul(tmp.inf.upgs_eff[0])
            if (player.inf.upgs.includes(2) && i == 0) x = x.mul(tmp.inf.upgs_eff[2])
            if (player.inf.upgs.includes(3) && i == 3) x = x.mul(tmp.inf.upgs_eff[3])
            if (player.inf.upgs.includes(4) && i == 2) x = x.mul(tmp.inf.upgs_eff[4])
            if (player.inf.upgs.includes(5) && i == 1) x = x.mul(tmp.inf.upgs_eff[5])
            if (player.inf.upgs.includes(7) && i == 0) x = x.mul(tmp.inf.upgs_eff[7])

            return x
        },
        getDimGain(i) {
            let x = i < 7 ? player.dimensions[i+1].amount.mul(tmp.dimensions[i+1].mult) : E(0)
            x = x.mul(tmp.tickspeed.effect)
            return x
        },
        getDimData(x) {
            let data = {}
            let dim_start = E(10).pow(this.expCostStart[x])
            let dim_inc = E(10).pow(this.expCostInc[x])

            data.cost = dim_inc.pow(player.dimensions[x].bought).mul(dim_start)
            data.bulk = player.points.gte(dim_start) ? player.points.div(dim_start).max(1).log(dim_inc).add(1).floor() : E(0)

            if (player.dimensions[x].bought.max(data.bulk).gte(100)) {
                let start = E(100);
                let exp = E(3);
                data.cost =
                    dim_inc.pow(
                        player.dimensions[x].bought.pow(exp).div(start.pow(exp.sub(1)))
                    ).mul(dim_start)
                data.bulk = player.points
                    .div(dim_start)
                    .max(1)
                    .log(dim_inc)
                    .times(start.pow(exp.sub(1)))
                    .root(exp)
                    .add(1)
                    .floor();
            }

            data.mult = this.getDimMult(x)
            data.gain = this.getDimGain(x)

            return data
        },
    },
}

tmp_update.push(_=>{
    for (let x = 7; x >= 0; x--) tmp.dimensions[x] = DIMS.normal.getDimData(x)
})

el.setup.dimensions = _=>{
    let table = new Element("dims_table")
    let inner = ""

    for (let x = 0; x < 8; x++) inner += `
    <div class="dim" id="dim${x}_div" style="background-color: ${["#0002", "#f004"][x%2]}">
        <div style="width: 300px; text-align: left;">${DIMS.names[x]} Dimension (<span id="dim${x}_bought">X</span>)<br>x<span id="dim${x}_mult">X</span></div>
        <div style="width: 400px; text-align: left;"><span id="dim${x}_amount">X</span></div>
        <button style="width: 200px" id="dim${x}_btn" onclick="DIMS.normal.buy(${x})">Cost: <span id="dim${x}_cost">X</span></button>
    </div>
    `

    table.setHTML(inner)
}

el.update.dimensions = _=>{
    if (tmp.tab == 0) {
        if (tmp.stab[0] == 0) {
            for (let x = 0; x < 8; x++) {
                let unl = (x == 0 ? true : player.dimensions[x-1].bought.gte(1)) && player.dimBoost.gte(x-3)
                tmp.el["dim"+x+"_div"].setVisible(unl)
                if (unl) {
                    tmp.el["dim"+x+"_bought"].setTxt(format(player.dimensions[x].bought,0))
                    tmp.el["dim"+x+"_mult"].setTxt(format(tmp.dimensions[x].mult))
                    tmp.el["dim"+x+"_amount"].setHTML(format(player.dimensions[x].amount,0)+(x < 7 ? "<br>"+formatGain(player.dimensions[x].amount,tmp.dimensions[x].gain) : ""))
                    tmp.el["dim"+x+"_cost"].setTxt(format(tmp.dimensions[x].cost))
                    tmp.el["dim"+x+"_btn"].setClasses({locked: player.points.lt(tmp.dimensions[x].cost)})
                }
            }
        }
    }
}