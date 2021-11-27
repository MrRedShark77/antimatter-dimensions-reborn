var diff = 0;
var date = Date.now();
var player
var tmp = {}

function loop() {
    diff = Date.now()-date;
    calc(diff);
    updateHTML()
    date = Date.now();
}

function format(ex, acc=4) {
    ex = E(ex)
    if (ex.toString() == "NaNeInfinity") return 'Infinity'
    neg = ex.lt(0)?"-":""
    if (ex.lt(0)) ex = ex.mul(-1)
    let e = ex.log10().floor()
    if (e.lt(4)) {
        return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
    } else {
        let m = ex.div(E(10).pow(e))
        return neg+(e.log10().gte(9)?'':m.toFixed(4))+'e'+format(e, 0, "sc")
    }
}

setInterval(loop, 50)