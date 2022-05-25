const ACHS = {
    checkAll() {
        for (let r = 1; r <= this.row; r++) for (let c = 1; c <= this.col; c++) if (this[r*10+c]) this.give(r*10+c)
    },
    give(id, free=false) {
        if ((this[id].check?this[id].check():false || free) && !player.achievements.includes(id)) {
            player.achievements.push(id)
            $.notify(this[id].title, "success")
        }
    },
    col: 8,
    row: 4,

    11: {
        title: "Getting Started",
        desc() { return `Purchase 1st Dimension.` },
        check() { return player.dimensions[0].bought.gte(1) },
    },
    12: {
        title: "100 is not googol",
        desc() { return `Purchase 2nd Dimension.` },
        check() { return player.dimensions[1].bought.gte(1) },
    },
    13: {
        title: "1+1=3 SALE",
        desc() { return `Purchase 3rd Dimension.` },
        check() { return player.dimensions[2].bought.gte(1) },
    },
    14: {
        title: "Mista hates 4",
        desc() { return `Purchase 4th Dimension.` },
        check() { return player.dimensions[3].bought.gte(1) },
    },
    15: {
        title: "High Five",
        desc() { return `Purchase 5th Dimension.` },
        check() { return player.dimensions[4].bought.gte(1) },
    },
    16: {
        title: "[Ni]ckel",
        desc() { return `Purchase 6th Dimension.` },
        check() { return player.dimensions[5].bought.gte(1) },
    },
    17: {
        title: "Antimatter Jackopt",
        desc() { return `Purchase 7th Dimension.` },
        check() { return player.dimensions[6].bought.gte(1) },
    },
    18: {
        title: "Rotate into Infinity",
        desc() { return `Purchase 8th Dimension.` },
        check() { return player.dimensions[7].bought.gte(1) },
    },

    21: {
        title: "Big Chungus",
        desc() { return `Go Infinity. Reward: Start with ${format(200)} antimatter.` },
        check() { return player.inf.infinitied.gte(1) },
    },
    22: {
        title: "1e100 is yes googol",
        desc() { return `Get over ${format(1e100)} antimatter.` },
        check() { return player.points.gte(1e100) },
    },
    23: {
        title: "The God are pleased",
        desc() { return `Get over ${format(600)}x from Dimensional Sacrifice. Reward: Sacrifice is 10% stronger.` },
        check() { return player.sacrifice.gte(600) },
    },
    24: {
        title: "I don't believe in Gods",
        desc() { return `Buy a galaxy without Sacrificing. Reward: Sacrifice is 10% stronger.` },
        check() { return false },
    },
    25: {
        title: "Boosting Max!",
        desc() { return `Buy 10 Dimension Boosts.` },
        check() { return player.dimBoost.gte(10) },
    },
    26: {
        title: "Get real galaxy",
        desc() { return `Buy Antimatter Galaxy. Reward: Normal Dimensions are 10% stronger.` },
        check() { return player.galaxy.gte(1) },
    },
    27: {
        title: "Double Galaxy",
        desc() { return `Buy 2 Antimatter Galaxies.` },
        check() { return player.galaxy.gte(2) },
    },
    28: {
        title: "Aren't you tried to buy single?",
        desc() { return `Buy single 1st Dimension when you have over ${format(1e150)} of them. Reward: 1st Normal Dimension is 10% stronger.` },
    },

    31: {
        title: "Wanna Inflation?",
        desc() { return `Get 1st Normal Dimension multiplier over ${format(1e31)}. Reward: lol no...` },
        check() { return tmp.dimensions[0].mult.gte(1e31) },
    },
    35: {
        title: "Super Speed",
        desc() { return `Go Infinity under 1 hour. Reward: Start with ${format(3e3)} antimatter.` },
    },
    36: {
        title: "Only real galaxy",
        desc() { return `Go Infinity with only one galaxy. Reward: Increase starting tickspeed power by 2%.` },
    },
    38: {
        title: "No Eight",
        desc() { return `Go Infinity without buying 8th Normal Dimension. Reward: Dimensions 1-7 are 2% stronger.` },
    },

    45: {
        title: "Hyper Speed",
        desc() { return `Go Infinity under 10 minutes. Reward: Start with ${format(6e6)} antimatter.` },
    },
    
    46: {
        title: "Ultra Speed",
        desc() { return `Go Infinity under 1 minute. Reward: Start with ${format(1.2e12)} antimatter.` },
    },
    
    47: {
        title: "Ultra Speed+",
        desc() { return `Go Infinity under 15 seconds. Reward: Start with ${format(1e18)} antimatter.` },
    },
    48: {
        title: "100 infinites",
        desc() { return `Go Infinity hundred times. Reward: Start with ${format(1e33)} antimatter.` },
        check() { return player.inf.infinitied.gte(100) },
    },

    /*
    11: {
        title: "Placeholder",
        desc() { return `Placeholder` },
        check() { return false },
    },
    */
}

el.setup.achievements = _=>{
    let table = new Element("achievements_table")
    let inner = ""

    for (let r = 1; r <= ACHS.row; r++) {
        inner += `<div class="table_center">`
        for (let c = 1; c <= ACHS.col; c++) {
            let ach = ACHS[r*10+c]
            inner += ach
            ?`<div class="achievement" id="ach_${r*10+c}">${ach.title}</div>`
            :`<div class="achievement" style="visibility: hidden"></div>`
        }
        inner += "</div>"
    }

    table.setHTML(inner)
}

el.update.achievements = _=>{
    if (tmp.tab == 3) {
        for (let r = 1; r <= ACHS.row; r++) for (let c = 1; c <= ACHS.col; c++) {
            let id = r*10+c
            if (ACHS[id]) {
                tmp.el["ach_"+(id)].setClasses({achievement: true, unlocked: player.achievements.includes(id)})
                tmp.el["ach_"+(id)].setTooltip(ACHS[id].desc())
            }
        }
    }
}
