const ITEMS = [
    {name: "Dirt", image: "images/dirt.webp", chance: 975},
    {name: "Grass Block", image: "images/grass_block.webp", chance: 975},
    {name: "Oak Log", image: "images/oak_log.webp", chance: 800},
    {name: "Crafting Table", image: "images/crafting_table.webp", chance: 600},
    {name: "Cobblestone", image: "images/cobble_stone.webp", chance: 600},
    {name: "Wheat", image: "images/wheat.webp", chance: 400},
    {name: "Carrot", image: "images/carrot.webp", chance: 400},
    {name: "Potato", image: "images/potato.webp", chance: 400},
    {name: "Bread", image: "images/bread.webp", chance: 400},
    {name: "Coal", image: "images/coal.webp", chance: 400},
    {name: "Steak", image: "images/steak.webp", chance: 400},
    {name: "Spruce Log", image: "images/spruce_log.webp", chance: 350},
    {name: "Apple", image: "images/apple.webp", chance: 350},
    {name: "Granite", image: "images/granite.webp", chance: 350},
    {name: "Andesite", image: "images/andesite.webp", chance: 350},
    {name: "Diorite", image: "images/diorite.webp", chance: 350},
    {name: "Deepslate", image: "images/deepslate.webp", chance: 300},
    {name: "Iron Ingot", image: "images/iron_ingot.webp", chance: 200},
    {name: "Jungle Log", image: "images/jungle_log.webp", chance: 200},
    {name: "Crimson Log", image: "images/crimson_log.webp", chance: 150},
    {name: "Warped Log", image: "images/warped_log.webp", chance: 150},
    {name: "Mangrove Log", image: "images/mangrove_log.webp", chance: 150},
    {name: "Gold Ingot", image: "images/gold_ingot.webp", chance: 150},
    {name: "Obsidian", image: "images/obsidian.webp", chance: 120},
    {name: "Chorus Fruit", image: "images/chorus_fruit.webp", chance: 120},
    {name: "Diamond", image: "images/diamond.webp", chance: 100},
    {name: "Wither Skeleton Skull", image: "images/wither_skeleton_skull.webp", chance: 100},
    {name: "Netherite Scrap", image: "images/netherite_scrap.webp", chance: 60},
    {name: "Netherite Ingot", image: "images/netherite_ingot.webp", chance: 40},
    {name: "Nether Star", image: "images/nether_star.webp", chance: 25},
    {name: "Beacon", image: "images/beacon.webp", chance: 25},
    {name: "Elytra", image: "images/elytra.webp", chance: 9},
    {name: "Dragon Egg", image: "images/dragon_egg.webp", chance: 1},
]

//TOTAL CHANCE CALCULATION
//
//let a = 0
//for (var i = 0;i < ITEMS.length;i++) {
//    a += ITEMS[i]["chance"]
//}
//
//console.log(a)

let ITEM_COUNTER = {}
let set_base_cookie = true


for (var item_counter_index = 0; item_counter_index < ITEMS.length; item_counter_index++) {
    ITEM_COUNTER[ITEMS[item_counter_index]["name"]] = 0
}

for (var item_counter_index2 = 0; item_counter_index2 < ITEMS.length; item_counter_index2++) {
    if (getInventory()[ITEMS[item_counter_index2]["name"]] > 0) {
        set_base_cookie = false
    }
}

if (set_base_cookie) {
    console.log("NEW INVENTORY SAVE CREATED")
    setCookie("inventory", JSON.stringify(ITEM_COUNTER), 3650000)
}

let new_val_fix
let inv = {}

for (var inv_item_fix_index = 0;inv_item_fix_index < ITEMS.length; inv_item_fix_index++) {
    if (getInventory()[ITEMS[inv_item_fix_index]["name"]] == null || getInventory()[ITEMS[inv_item_fix_index]["name"]] == undefined) {
        console.log("ADDED NEW ITEM TO YOUR INVENTORY, WHICH DID NOT EXIST BEFORE")
        new_val_fix = 0
    }
    else {
        new_val_fix = getInventory()[ITEMS[inv_item_fix_index]["name"]]
    }
    inv[ITEMS[inv_item_fix_index]["name"]] = new_val_fix
}

setCookie("inventory", JSON.stringify(inv), 3650000)

let RARITIES = {}
let NAME_TO_PATH = {}
let ROLL_NUMBERS = {}

const COMMON = 400
const UNCOMMON = 250
const RARE = 150
const EPIC = 100
const LEGENDARY = 5
const MYTHIC = 1

let items_index = 0
let items_path_index = 0
let chances_index = 0
let items_rolln_index = 0

while (items_index < ITEMS.length) {
    if (ITEMS[items_index]["chance"] >= COMMON) {
        RARITIES[ITEMS[items_index]["name"]] = "common"
    }
    else if (ITEMS[items_index]["chance"] >= UNCOMMON) {
        RARITIES[ITEMS[items_index]["name"]] = "uncommon"
    }
    else if (ITEMS[items_index]["chance"] >= RARE) {
        RARITIES[ITEMS[items_index]["name"]] = "rare"
    }
    else if (ITEMS[items_index]["chance"] >= EPIC) {
        RARITIES[ITEMS[items_index]["name"]] = "epic"
    }
    else if (ITEMS[items_index]["chance"] >= LEGENDARY) {
        RARITIES[ITEMS[items_index]["name"]] = "legendary"
    }
    else if (ITEMS[items_index]["chance"] >= MYTHIC) {
        RARITIES[ITEMS[items_index]["name"]] = "mythic"
    }

    items_index++
}

while (items_path_index < ITEMS.length) {
    NAME_TO_PATH[ITEMS[items_path_index]["name"]] = ITEMS[items_path_index]["image"]
    items_path_index++
}

while (chances_index < 10000) {
    let item = ITEMS[items_rolln_index]
    let itemname = item["name"]
    let itemchance = item["chance"]

    let added = chances_index
    let temprolllist = []

    while (added != chances_index + itemchance) {
        added++
        temprolllist.push(added)
    }

    ROLL_NUMBERS[itemname] = temprolllist

    chances_index += itemchance

    items_rolln_index++
}

function findKeyByValueInList(object, searchValue) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let valueList = object[key]
            if (valueList.includes(searchValue)) {
                return key
            }
        }
    }
    return null;
}

function roll() {
    let audio = new Audio("audio/xp.mp3")
    audio.play()
    let rollnum = Math.floor(Math.random() * 10000) + 1
    let key = findKeyByValueInList(ROLL_NUMBERS, rollnum)
    let image = NAME_TO_PATH[key]
    let rarity = RARITIES[key]
    let rarity_color
    globalThis.key = key

    if (rarity == "common") {
        rarity_color = "#fff"
    }
    else if (rarity == "uncommon") {
        rarity_color = "#00cc00"
    }
    else if (rarity == "rare") {
        rarity_color = "#0066ff"
    }
    else if (rarity == "epic") {
        rarity_color = "#cc00ff"
    }
    else if (rarity == "legendary") {
        rarity_color = "#ffcc00"
    }
    else if (rarity == "mythic") {
        rarity_color = "#ff00ff"
    }

    console.log("ROLLED ITEM: " + key)

    if (key == "Dragon Egg") {
        daud = new Audio("audio/dragon.mp3")
        daud.play()
    }

    document.body.innerHTML = document.body.innerHTML + "<div id='overlay'><img src='" + image + "' class='looted-item' style='filter: drop-shadow(0px 0px 100px " +  rarity_color + ");'><p id='item-title' style='color:" + rarity_color + "'>" + key + "</p><div id='ok-btn' onclick='rollback()'>Collect</div></div>"
}

function rollback() {
    updateInventory(key, getInventory()[globalThis.key] + 1)
    document.body.innerHTML = '<img src="images/chest_static.webp" onclick="openbox()" id="BOX"><div onclick="view_inv()" id="inv-btn">Inventory</div>'
}

function openbox() {
    image = document.getElementById("BOX");
    image.src = "images/chest_opening.gif";
    image.classList.add("shake")

    roll()
}

function view_inv() {
    let invboard = "<div id='invboard'><br>"
    for (var inv_item_index = 0; inv_item_index < ITEMS.length; inv_item_index++) {
        rarity = RARITIES[ITEMS[inv_item_index]["name"]]

        if (rarity == "common") {
            rarity_color = "#fff"
        }
        else if (rarity == "uncommon") {
            rarity_color = "#00cc00"
        }
        else if (rarity == "rare") {
            rarity_color = "#0066ff"
        }
        else if (rarity == "epic") {
            rarity_color = "#cc00ff"
        }
        else if (rarity == "legendary") {
            rarity_color = "#ffcc00"
        }
        else if (rarity == "mythic") {
            rarity_color = "#ff00ff"
        }

        invboard = invboard + "<span style='color:" + rarity_color + "'>" + ITEMS[inv_item_index]["name"] + "</span><span style='color: white'> : </span><span style='color: #00e613'>" + getInventory()[ITEMS[inv_item_index]["name"]] + "</span><br>"

    }

    invboard = invboard + "<br></div>"

    document.body.innerHTML = document.body.innerHTML + "<div id='overlay-inv'>" + invboard + "<div id='close-btn' onclick='close_inv()'>Close</div></div>"
}

function close_inv() {
    document.body.innerHTML = '<img src="images/chest_static.webp" onclick="openbox()" id="BOX"><div onclick="view_inv()" id="inv-btn">Inventory</div>'
}