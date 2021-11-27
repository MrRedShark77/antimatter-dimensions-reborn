function E(x){return new Decimal(x)};

function calc(dt) {
    
}

function getPlayerData() {
    return {
        
    }
}

function wipe() {
    player = getPlayerData()
}

function loadPlayer(load) {
    player = Object.assign(getPlayerData(), load)
    convertStringToDecimal()
}

function convertStringToDecimal() {
    
}

function save(){
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",btoa(JSON.stringify(player)))
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    save();
    let file = new Blob([btoa(JSON.stringify(player))], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Test Save.txt"
    a.click()
}

function importy() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
    if (loadgame != null) {
        load(loadgame)
    }
}

function loadGame() {
    wipe()
    //load(localStorage.getItem("testSave"))
    setupHTML()
    //setInterval(save,1000)
}