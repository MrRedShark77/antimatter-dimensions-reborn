var el = {
	setup: {},
	update: {},
}

function setupHTML() {
	for (let x in el.setup) el.setup[x]()

    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}

el.update.main = _=> {
	tmp.el.AM_amount.setTxt(format(player.points))
	tmp.el.AM_gain.setTxt(formatGain(player.points, tmp.amGain))
}

function updateHTML() {
    for (let x in el.update) el.update[x]()
}