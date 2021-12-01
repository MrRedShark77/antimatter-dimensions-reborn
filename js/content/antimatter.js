tmp_update.push(_=>{
    tmp.amGain = player.dimensions[0].amount.mul(tmp.dimensions[0].mult)
})

el.update.percentage = _=>{
    let per = player.points.max(1).log10().div(INF_NUMBER.log10()).max(0).min(1).mul(100).toNumber()
    tmp.el.bar.setTxt(format(per,2)+"%")
    tmp.el.bar.changeStyle("width", per+"%")
}