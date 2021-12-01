const INF_NUMBER = E(2).pow(1024)

var tmp = {
    tab: 0,
    stab: [0],
    amGain: E(0),
    dimensions: [],
    tickspeed: {
        cost: E(1/0),
        bulk: E(0),
        base: E(1.125),
        effect: E(1),
    },
    dimBoost: {
        req: E(1/0),
        bulk: E(0),
        dimTarget: 3,
        base: E(2),
    },
    galaxy: {
        req: E(1/0),
        bulk: E(0),
        effect: E(1),
    },
    sacrificeBefore: E(1),
    inf: {
        reached: false,
        upgs_eff: [],
    },

    readyGame: false,
}

var tmp_update = []

function updateTemp() {
    for (let x = 0; x < tmp_update.length; x++) tmp_update[x]()
}