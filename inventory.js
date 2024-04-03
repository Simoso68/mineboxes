function setCookie(name, value, days) {
    var expires = ""
    if (days) {
        var date = new Date()
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/"
}

function getCookie(name) {
    var nameEQ = name + "="
    var ca = document.cookie.split(';')
    for(var i=0;i < ca.length;i++) {
        var c = ca[i]
        while (c.charAt(0)==' ') c = c.substring(1,c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
    }
    return null
}

function updateInventory(item, quantity) {
    var inventory = getCookie('inventory')
    if (inventory) {
        inventory = JSON.parse(inventory)
    } else {
        inventory = {};
    }
    inventory[item] = quantity
    setCookie('inventory', JSON.stringify(inventory), 365)
}

function getInventory() {
    var inventory = getCookie('inventory')
    if (inventory) {
        return JSON.parse(inventory)
    } else {
        return {}
    }
}