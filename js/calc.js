document.addEventListener('keydown', e=>{
    if (e.keyCode == 77) DIMS.normal.maxAll()
});

function calc(dt) {
    player.totalTime += dt
    
    if (!tmp.inf.reached) {
        player.inf.time += dt
        for (let x = 7; x >= 0; x--) player.dimensions[x].amount = player.dimensions[x].amount.add(tmp.dimensions[x].gain.mul(dt))
        player.points = player.points.add(tmp.amGain.mul(dt))
    }

    if (player.inf.upgs.includes(13)) player.inf.points = player.inf.points.add(tmp.inf.upgs_eff[13].mul(dt))

    ACHS.checkAll()
}

function getPlayerData() {
    let data = {
        totalTime: 0,

        points: E(10),

        dimensions: [],
        tickspeed: E(0),
        dimBoost: E(0),
        sacrifice: E(1),
        galaxy: E(0),

        inf: {
            best: 999999999,
            time: 0,
            infinitied: E(0),
            points: E(0),
            upgs: [],
            mult: E(0),
        },

        achievements: [],

        confirms: {
            sacrifice: true,
        },
    } 
    for (let x = 0; x < 8; x++) data.dimensions.push({amount: E(0), bought: E(0)})
    return data
}

function cannotSave() {
    return tmp.inf.reached
}