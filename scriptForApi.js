function callAdventure() {
    // const adventureUrl = "http://localhost/SettlersWebApi/Settlers/adventure";
    const adventureUrl = "./json.json";
    // const testingUrl = "https://statsapi.web.nhl.com/api/v1/conferences";
    fetch(adventureUrl)
        //, { 'mode': 'same-origin', 'headers':{'Access-Control-Allow-Origin': '*'}})
        .then(function(response){
            if(response.status !== 200){
                console.log("Error occured: ", response)   
                return;
            }
            response.json()
            .then(function(data){
                createAdventureDetailTable(data);
                createAttacks(data);
                return data;
            })
        }).catch(function(error){
            console.log("catch: ", error);
        })
}

window.onload = function loader() {
    let data = callAdventure();
}
// function createAdventureDetailTable(dataJson) {
//     console.log(dataJson);
//     // console.log(dataJson[0].General);
//     const divAdventure = document.getElementById("adventure-detail");
//     let listOfTh = [];
//     for (const key in dataJson[0]) {
//         // console.log(key);
//         if (key === "Sectors") {
//             console.log("I am leaving key: " + key);
//         }
//         else{
//             listOfTh.push(key);
//         }
//     }

//     const newTable = document.getElementById("adventure-table");
//     let tr = newTable.insertRow(-1);

//     for (let i = 0; i < listOfTh.length; i++) {
//         let th = document.createElement("th");
//         th.innerHTML = listOfTh[i];
//         tr.appendChild(th);
//     }

//     tr = newTable.insertRow(-1);
//     for (let a = 0; a < listOfTh.length; a++) {
//         let tabCell = tr.insertCell(-1);
//         tabCell.innerHTML = dataJson[0][listOfTh[a]];
//     }
//     newTable.classList.add("adventure-table");
//     divAdventure.appendChild(newTable);
// }
function createAdventureDetailTable(dataJson) {
    const divAdventure = document.getElementById("adventure-detail");
    let listOfTh = [];
    listOfTh.push("General");
    listOfTh.push("Army");
    listOfTh.push("Resources");
    listOfTh.push("Note");

    let listOfThSecondary = [];
    listOfThSecondary.push("AdventureTypeId");
    listOfThSecondary.push("AdventureThemeId");
    listOfThSecondary.push("Difficulty");
    listOfThSecondary.push("Player");
    listOfThSecondary.push("Time");

    const newTable = document.getElementById("adventure-table");
    
    for (let i = 0; i < listOfTh.length; i++) {
        let tr = newTable.insertRow(-1);
        let th = document.createElement("th");
        th.innerHTML = listOfTh[i];
        tr.appendChild(th);
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = dataJson[0][listOfTh[i]];
        tabCell.colSpan = 10;
    }
    let tr = newTable.insertRow(-1);
    for (let a = 0; a < listOfThSecondary.length; a++) {
        let th = document.createElement("th");
        th.innerHTML = listOfThSecondary[a];
        tr.appendChild(th);
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = dataJson[0][listOfThSecondary[a]];
    }
    newTable.classList.add("adventure-table");
    divAdventure.appendChild(newTable);
}

function createSector(dataJson) {
    const divSectors = document.getElementById("sectors");

    for (let i = 0; i < dataJson[0].Sectors.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("sector-" + dataJson[0].Sectors[i]["Id"]);
        let newTitle = document.createElement("h3");
        newTitle.innerHTML = dataJson[0].Sectors[i]["Name"];
        newTitle.classList.add("sector-title");
        newTitle.classList.add("text-center");
        let startNote = document.createElement("p");
        startNote.innerHTML = dataJson[0].Sectors[i]["StartNote"]
        startNote.classList.add("note");
        let endNote = document.createElement("p");
        endNote.innerHTML = dataJson[0].Sectors[i]["EndNote"]
        endNote.classList.add("note");
        newDiv.appendChild(newTitle);
        newDiv.appendChild(startNote);
        newDiv.appendChild(endNote);
        divSectors.appendChild(newDiv);
    }
}

function createCamps(dataJson) {
    const newDiv = document.getElementById("camps");
    const newTable = document.createElement("table");
    let tr = newTable.insertRow(-1);
    let arrayTh = [];
    arrayTh.push("Id")
    arrayTh.push("Name")
    arrayTh.push("OrderId")

    for (let i = 0; i < arrayTh.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = arrayTh[i];
        tr.appendChild(th);
    }

    for (let a = 0; a < dataJson[0].Sectors[0].Camps.length; a++) {
        tr = newTable.insertRow(-1);
        for (let b = 0; b < arrayTh.length; b++) {
            let tableCell = tr.insertCell(-1);
            tableCell.innerHTML = dataJson[0].Sectors[0].Camps[a][arrayTh[b]];
        }
    }
    newDiv.appendChild(newTable);
}

// funkcni reseni, ktere vraci vsechny udaje k z utoku v jsonu
// function createAttacks(dataJson) {
//     const newDiv = document.getElementById("attacks");
//     const newTable = document.createElement("table");
//     let tr = newTable.insertRow(-1);
    
//     let attackArray = [];
//     for (const key in dataJson[0].Sectors[0].Camps[0].Attacks[0]) {
//         attackArray.push(key);
//     }
    
//     for (let i = 0; i < attackArray.length; i++) {
//         let th = document.createElement("th");
//         th.innerHTML = attackArray[i];
//         th.colSpan = 2;
//         tr.appendChild(th);
//     }

//     for (let a = 0; a < dataJson[0].Sectors[0].Camps[0].Attacks.length; a++) {
//         tr = newTable.insertRow(-1);
//         console.log(dataJson[0].Sectors[0].Camps[0].Attacks[a]);
//         for (let b = 0; b < attackArray.length; b++) {
//             let tableCell = tr.insertCell(-1);
//             tableCell.innerHTML = dataJson[0].Sectors[0].Camps[0].Attacks[a][attackArray[b]];
//         }
//     }
//     newDiv.appendChild(newTable);
// }

function createAttacks(dataJson) {
    const div = document.getElementById("sectors");
    dataJson[0].Sectors.forEach(sector =>{
        let sectorClassName = sector.Name.replace(" ","-");
        loadImgs(sectorClassName);
        const newDiv = document.createElement("div");
        newDiv.classList.add("sector-table-container");
        div.appendChild(newDiv);
        const newTable = document.createElement("table");
        newTable.classList.add("sector-table");
        let tr = newTable.insertRow(-1);
        const tableDiv = document.createElement("div");
        tableDiv.classList.add(sectorClassName);
        tableDiv.classList.add("sector-all");

        let sectorHeaderDiv = createSectorHeader(sectorClassName, sector.Name);

        let startNote = document.createElement("p");
        if (sector.StartNote) {
            startNote.innerText = sector.StartNote;
            startNote.classList.add("text-center");
            startNote.classList.add("note");    
        }
        let endNote = document.createElement("p");
        if (sector.EndNote) {
            endNote.innerText = sector.EndNote;
            endNote.classList.add("text-center");
            endNote.classList.add("note");   
        }

        tr = newTable.insertRow(-1);

        let listOfAttacks = [];
        sector.Camps.forEach(camp =>{
            tr = newTable.insertRow(-1);
            let thCamp = document.createElement("th");
            thCamp.innerHTML = camp.Name;
            thCamp.colSpan = 4;
            tr.appendChild(thCamp);
            let campWaves = [];
            for (let i = 0; i < camp.Attacks.length; i++) {
                for (let w = 0; w < camp.Attacks[i].Waves.length; w++) {
                    campWaves.push(Object.assign(camp.Attacks[i].Waves[w],{CampAttackId: i}));
                    listOfAttacks.push(camp.Attacks[i].AttackTypeId);
                }
            }
            let campWavesMaxOrderId = getMaxOrderId(campWaves);
            for (let cw = 1; cw <= campWavesMaxOrderId; cw++) {
                tr = newTable.insertRow(-1);
                let forIterator = 0;
                campWaves.filter(order => order.OrderId === cw).forEach(wave => {
                    // console.log(wave);
                    if (campWaves.filter(order => order.OrderId === cw).length <= 1) {
                        if (wave.CampAttackId === 0) {
                            let td1 = tr.insertCell(0);
                            td1.innerHTML = wave.GeneralName;
                            let td2 = tr.insertCell(1);
                            td2.innerHTML = wave.NumberOfUnits;
                        }
                        else if (wave.CampAttackId === 1) {
                            let td1 = tr.insertCell(0);
                            td1.innerHTML = " ";
                            let td2 = tr.insertCell(1);
                            td2.innerHTML = " ";
                            let td3 = tr.insertCell(2);
                            td3.innerHTML = wave.GeneralName;
                            let td4 = tr.insertCell(3);
                            td4.innerHTML = wave.NumberOfUnits;
                        }
                    }
                    else{
                        if (wave.CampAttackId === 0) {
                            let td1 = tr.insertCell(forIterator++);
                            td1.innerHTML = wave.GeneralName;
                            let td2 = tr.insertCell(forIterator++);
                            td2.innerHTML = wave.NumberOfUnits;
                        }
                        else{
                            let td1 = tr.insertCell(forIterator++);
                            td1.innerHTML = wave.GeneralName;
                            let td2 = tr.insertCell(forIterator++);
                            td2.innerHTML = wave.NumberOfUnits;
                        }
                    }
                })
            }
        });
        let uniqueAttacks = [...new Set(listOfAttacks)]
        tr = newTable.insertRow(0);
        for (let ua = 0; ua < uniqueAttacks.length; ua++) {
            let thAttackType = document.createElement("th");
            thAttackType.innerHTML = (uniqueAttacks[ua]);
            thAttackType.colSpan = 2;
            tr.appendChild(thAttackType);
        }
        newDiv.appendChild(sectorHeaderDiv);
        newDiv.appendChild(tableDiv);
        tableDiv.appendChild(startNote);
        tableDiv.appendChild(newTable);
        tableDiv.appendChild(endNote);
    })
}
function loadImgs(sectorName) {
    const div = document.getElementById("sectors");
    const divContainer = document.createElement("div");
    div.appendChild(divContainer);
    const imgDiv = document.createElement("div");
    imgDiv.classList.add(sectorName + "-imgs");
    imgDiv.classList.add("imgs");
    imgDiv.classList.add("grid");
    let img1 = document.createElement("img");
    let img2 = document.createElement("img");
    img1.src = "./images/" + sectorName +"-1.png";
    img2.src = "./images/" + sectorName +"-2.png";

    img1.addEventListener('click',() => {
        displayModal(img1,"modal");
        // window.scrollTo(0,0);
    });
    img2.addEventListener('click',() => {
        displayModal(img2,"modal");
        // window.scrollTo(0,0);
    });
    // img1.addEventListener('click',displayModal(img1,"modal"));
    divContainer.appendChild(imgDiv);
    imgDiv.appendChild(img1);
    imgDiv.appendChild(img2);
}
function getMaxOrderId(jsonArray) {
    let jsonValue = 0;
    for (let i = 0; i < jsonArray.length; i++) {
        jsonValue = jsonArray[i].OrderId;
        if (jsonValue < jsonArray[i].OrderId) {
            jsonValue = jsonArray[i].OrderId;
        }
    }
    return jsonValue;
}
function createSectorHeader(sectorClassName, sectorName) {
    let sectorHeaderDiv = document.createElement("div");
    sectorHeaderDiv.classList.add("flex");
    sectorHeaderDiv.classList.add("sector-header");
    let checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox-section");
    let checkboxLabel = document.createElement("label");
    let checkboxIcon = document.createElement("i");
    checkboxIcon.classList.add("icon");
    checkboxIcon.id = "check";
    checkboxLabel.setAttribute("for",sectorClassName);
    checkboxLabel.innerHTML = "Done ";
    checkboxLabel.classList.add("m");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = sectorClassName;
    checkbox.value = sectorClassName;
    checkboxDiv.appendChild(checkboxLabel);
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(checkboxIcon);
    checkbox.addEventListener('change',() => {
        if (checkbox.checked) {
            console.log("Checknuto");
            console.log(sectorClassName);
            let gridSectors = document.getElementsByClassName(sectorClassName);
            for (const gridSector of gridSectors) {
                gridSector.style.display = "none";
            }
            let gridSectorImgs = document.getElementsByClassName(sectorClassName + "-imgs");
            for (const img of gridSectorImgs) {
                img.style.display = "none";
            }
        }
        else{
            let gridSectors = document.getElementsByClassName(sectorClassName);
            for (const gridsector of gridSectors) {
                gridsector.style.display = "block";
            }
            let gridSectorImgs = document.getElementsByClassName(sectorClassName + "-imgs");
            for (const img of gridSectorImgs) {
                img.style.display = "grid";
            }
        }
    });
    let sectorH3 = document.createElement("h3");
    sectorH3.innerHTML = sectorName;
    sectorH3.classList.add("text-center");
    sectorH3.classList.add("l");
    sectorHeaderDiv.appendChild(sectorH3);
    sectorHeaderDiv.appendChild(checkboxDiv);
    return sectorHeaderDiv;
}


// function createAttacks(dataJson, attackId) {
//     const div = document.getElementById("sectors");
//     const newDiv = document.createElement("div");
//     const newTable = document.createElement("table");
//             newTable.classList.add("sector-table");
//     let tr = newTable.insertRow(-1);
//     div.appendChild(newDiv);
//     const sector = dataJson[0].Sectors[0];
//     for (const camp of sector.Camps) {
//         tr = newTable.insertRow(-1);
//         let thCamp = document.createElement("th");
//         thCamp.innerHTML = camp.Name;
//         tr.appendChild(thCamp);
//         thCamp.colSpan = 2;
//         for (let i = 0; i < camp.Attacks[attackId].Waves.length; i++) {
//             tr = newTable.insertRow(-1);
//             let tdWave1 = tr.insertCell(-1);
//             tdWave1.innerHTML = camp.Attacks[attackId].Waves[i].GeneralName;
//             let tdWave2 = tr.insertCell(-1);
//             tdWave2.innerHTML = camp.Attacks[attackId].Waves[i].NumberOfUnits;
//         }
//     }
//     newDiv.appendChild(newTable);
// }
//2d array solution
// function createAttacks(dataJson) {
//     const div = document.getElementById("sectors");
//     const newDiv = document.createElement("div");
//     const newTable = document.createElement("table");
//     let tr = newTable.insertRow();
//     div.appendChild(newDiv);
//     const sector = dataJson[0].Sectors[6];
//     // console.log(sector);

//     let campWaves = new Array();
//     for (const camp of sector.Camps) {
//         // console.log(camp);
//         for (const attack of camp.Attacks) {
//             // console.log(attack);
//             for (const wave of attack.Waves) {
//                 campWaves.push({...wave, 'AttackTypeId': attack.AttackTypeId, 'CampId': camp.Id});
//             }
//         }
//     }
//     console.log(campWaves);
//     let orderIds = [];
//     let attackIds = [];
//     for (const key of campWaves) {
//         orderIds.push(key.OrderId);
//         attackIds.push(key.AttackTypeId);
//     }
//     let uniqueOrderIds = [...new Set(orderIds)];
//     let uniqueAttackIds = [...new Set(attackIds)];
//     let wtf = {};
//     let wtfArr = [];
//     for (const camp of sector.Camps) {
//         // console.log(camp);
//         let maxOrderId = returnHighesValue(campWaves.filter(w => w.CampId === camp.Id));
//         for (let i = 1; i <= maxOrderId; i++) {
//             wtf = [campWaves.filter(f => f.OrderId === i && f.AttackTypeId === 1 && f.CampId === camp.Id), campWaves.filter(f => f.OrderId === i && f.AttackTypeId === 2 && f.CampId === camp.Id)];
//             wtfArr.push(wtf);
//         }
//     }
//     // console.table(wtfArr);
//     // console.log(wtfArr[0][1]);
//     // console.log(wtfArr[0][1][0]);
//     for (const iterator of wtfArr) {
//         if (iterator[0][0]) {
//             if (iterator[0][0].Note) {
//                 tr = newTable.insertRow(-1);
//                 let tdNote1 = tr.insertCell(-1);
//                 tdNote1.innerHTML = iterator[0][0].Note;
//                 tr.appendChild(tdNote1);
//             }
//         }
//         tr = newTable.insertRow(-1);
//         let td1 = tr.insertCell(-1);
//         td1.innerHTML = iterator[0][0].GeneralName;
//         let td2 = tr.insertCell(-1);
//         td2.innerHTML = iterator[0][0].NumberOfUnits;
//         let td3 = tr.insertCell(-1);
//         td3.innerHTML = (iterator[1][0]) ? iterator[1][0].GeneralName : "";
//         let td4 = tr.insertCell(-1);
//         td4.innerHTML = (iterator[1][0]) ? iterator[1][0].NumberOfUnits : "";
//     }
//     newDiv.appendChild(newTable);
// }
function returnHighesValue(values) {
    let newValues = new Array();
    for (const orderId of values) {
        newValues.push(orderId.OrderId);
    }
    return Math.max(...newValues);
}



//MODAL
function displayModal(el, elId) {
    const modal = document.getElementById(elId);
    modal.style.display = "block";
    const imgId = document.getElementById("modal-img");
    imgId.src = el.src; 
}
function closeModal(elId) {
    const modal = document.getElementById(elId);
    modal.style.display = "none"
}
