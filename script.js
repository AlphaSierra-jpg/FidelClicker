golds = 0; //Nombre de cigare
gps = 0; //Nombre de cigare par seconde
temp = 0;
minionquantity = 0; //Nombre de fabrique obtenue
multiplicator = 1; //Multiplicateur de la valeur du clique
days = 0; //Nmbre de jours dans le jeu
alreadydo = 0; 
step2Do = 0; //Permet de savoir si l'etape2 est arrivée
ttbutton = 0; //Total des boutons pour savoir si le joueur perd
idCiaButton = 0; //Variable qui incremente de 1 pour donner un id au bouton de l'etape 2
buycheguevara = 0; //Savoir si le che a été acheter
buyleparin = 0; //Savoir si le parin a été acheter

const minionsAtrib = ["id", "Name", "Cost", "CPS", "Owned", "Buy"]; //Permet de savoir comment est organiser le tableau

const autoclick = setInterval(function () { autoClick() }, 10); //Affichage des Cigares
const addday = setInterval(function () { addDay() }, 60000); //Compteur pr l'incrementation des jours
const newciaattack = setInterval(function () { newCiaAttack() }, 60000); //Compteur pour chaque nouvelle attaque de la cia


//Tableau des minions
var minions = [
    { id: 0, Name: "Nicaragua", Cost: 20, CPS: 0.5, Owned: 0 },
    { id: 1, Name: "Honduras", Cost: 80, CPS: 3, Owned: 0 },
    { id: 2, Name: "RepDom", Cost: 600, CPS: 9, Owned: 0 },
    { id: 3, Name: "Etat-Unis", Cost: 4000, CPS: 20, Owned: 0 },
    { id: 4, Name: "France", Cost: 100000, CPS: 80, Owned: 0 },
    { id: 5, Name: "Cuba", Cost: 250000, CPS: 150, Owned: 0 },
    { id: 6, Name: "Italy", Cost: 550000, CPS: 400, Owned: 0 },
    
];

function getGPS() { //Permet de recuperer le gps des minions

    temp = 0;
    for (var i in minions) {
        temp = temp + minions[i]['CPS'] * minions[i]['Owned'];
    }
    gps = temp;
}

function displayGPS() { //permet l'affichage des gps
    document.getElementById('displaygps').innerHTML = gps.toFixed(1);
}

function whenClick() { //Fonction de clique du joueur
    x = 1;
    x = x * multiplicator;
    addGold(x);
}

function addGold(x) { //Ajoute le nouveau gold au gold tt
    golds = golds + x;
    displayGolds();
}
function displayGolds() { //Affiche les golds
    document.getElementById('golds').innerHTML = golds.toFixed(0);
}

function autoClick() { //fonction de refresh de l'affichage des données
    step2();
    getGPS();
    if (gps != 0) {
        addGold(gps / 100);
    }

    if (gps != 0) {
        displayGPS();
        document.getElementById('multiplicator').innerHTML = multiplicator;
        document.getElementById('minionquantity').innerHTML = minionquantity;
    }
    displayDays();
    checkTheEnd();
}

function showBoutique() { //Fonction de l'affichage de la boutique

    let tab2 = document.getElementById("tableau");

    while (tab2.firstChild) {
        tab2.removeChild(tab2.firstChild);
    }

    //Creer les balises <th>
    var tab = document.createElement("tr")
    tab.setAttribute("id", 'IdNumP');
    tab2.appendChild(tab);
    for (let c = 1; c <= 5; c++) {
        var node = document.createElement("th")
        var txt = minionsAtrib[c];
        var textnode = document.createTextNode(txt);
        node.appendChild(textnode);
        document.getElementById('IdNumP').appendChild(node);
    }

    //creer les balises <tr>
    for (var a in minions) {
        var tab = document.createElement("tr")
        atrib = 'IdNum' + a;
        tab.setAttribute("id", atrib);
        tab2.appendChild(tab);
        for (let b = 1; b <= 5; b++) { //creer les balises <td> et les boutons dans les balises <tr>
            if (b >= 5) {
                IdInNum = 'IdNum' + a;
                var button = document.createElement("button")
                var textbutton = document.createTextNode('Buy');
                buttonOnclickValue = 'buyMinion(' + a + ')';
                button.setAttribute('type', 'button');
                button.setAttribute('class', 'button');
                button.setAttribute('onclick', buttonOnclickValue);
                button.appendChild(textbutton);
                document.getElementById(IdInNum).appendChild(button);
            } else {
                IdInNum = 'IdNum' + a;
                var node = document.createElement("td")
                var txt = minions[a][minionsAtrib[b]];
                if (minionsAtrib[b] == 'Cost') {
                    txt = txt.toFixed(0);
                } else if (minionsAtrib[b] == 'CPS') {
                    txt = txt.toFixed(1);
                }
                var textnode = document.createTextNode(txt);
                node.appendChild(textnode);
                document.getElementById(IdInNum).appendChild(node);
            }

        }
    }
}

//Permet l'achat des minions
function buyMinion(id) {
    price = minions[id]['Cost'];
    if (golds >= price) {
        minions[id]['Owned']++;
        minions[id]['Cost'] = price * 1.15;
        golds = golds - price;
        minionquantity++;
        reste = minionquantity % 50;
        if (reste == 0) {
            multiplicator = multiplicator * 2;
        }

        if ((minions[id]['Owned'] == 25) || (minions[id]['Owned'] == 50) || (minions[id]['Owned'] == 100) || (minions[id]['Owned'] == 250) || (minions[id]['Owned'] == 1000)) {
            minions[id]['CPS'] = minions[id]['CPS'] * 2;
        }
        showBoutique();
        freshOnMap(id)
    }
    
}

function save() {
    localStorage.setItem('Array', JSON.stringify(minions));
    localStorage.setItem('Golds', golds.toFixed(0));
    localStorage.setItem('Multiplicator', multiplicator);
    localStorage.setItem('Minionquantity', minionquantity);
    localStorage.setItem('Days', days);
    localStorage.setItem('CheGuevara', buycheguevara);
    localStorage.setItem('LeParin', buyleparin);
}

function load() {

    if (localStorage.length > 0) {
        tempo = localStorage.getItem('Golds');
        golds = parseInt(tempo); //parseInt enleve les des variables
        tempo = localStorage.getItem('Multiplicator');
        multiplicator = parseInt(tempo);
        tempo = localStorage.getItem('Minionquantity');
        minionquantity = parseInt(tempo);
        tempo = localStorage.getItem('Days');
        days = parseInt(tempo);
        tempo = localStorage.getItem('CheGuevara');
        buycheguevara = parseInt(tempo);
        tempo = localStorage.getItem('LeParin');
        buyleparin = parseInt(tempo);
        minions = JSON.parse(localStorage.getItem("Array"));
        showBoutique();
        freshBonus();
        i = 0;
        for (var i in minions) {
            freshOnMap(i);
        }
    }
}

function reset() {
    localStorage.clear('Array');
    localStorage.clear('Golds');
    localStorage.clear('Multiplicator');
    localStorage.clear('Minionquantity');
}

function addDay() { //increentation des jours
    days = days + 1;
}

function displayDays() { //affiche les jours
    document.getElementById('days').innerHTML = days;
}

//creer les ping sur le coté de la map
function displayOnMap() {
    for (var i in minions) {
        var HtmlId = 'quantity_' + minions[i]['Name'];
        var onMapH1Id = 'h1_' + minions[i]['Name'];

        var div = document.createElement("div")
        div.setAttribute('id', HtmlId);
        div.setAttribute('class', 'onMap');
        document.getElementById('fabrique').appendChild(div);
        document.getElementById(HtmlId).hidden = true;

        var h1 = document.createElement("h1")
        h1.setAttribute('class', 'h1InDiv');
        h1.setAttribute('id', onMapH1Id);
        var text = document.createTextNode(0);
        h1.appendChild(text);
        document.getElementById(HtmlId).appendChild(h1);

        var src = 'image/ping/ping_' + minions[i]['Name'] + '.png';
        var img = document.createElement("img")
        img.setAttribute('class', 'imgInDiv');
        img.setAttribute('src', src);
        img.setAttribute('alt', minions[i]['Name']);
        document.getElementById(HtmlId).appendChild(img);  
    } 
}

//Rend visible en actualise les ping sur la map
function freshOnMap(id) {
    if (minions[id]['Owned'] > 0) {
        var HtmlId = 'quantity_' + minions[id]['Name'];
        var onMapH1Id = 'h1_' + minions[id]['Name'];

        document.getElementById(onMapH1Id).innerHTML = minions[id]['Owned'];
        document.getElementById(HtmlId).hidden = false;
    }
}

//Fait passer a l'etape 2
function step2() {
    if (days >= 15 && step2Do == 0) {
        button2 = document.getElementById('button_step2');
        button2.remove();
        step2Do = 1;
    } 
}

//creer une attaque de la CIA
function newCiaAttack() {
    if (step2Do == 1) {
        var id = 'idCiaAttack' + idCiaButton;
        var buttonCIA = document.createElement("button")
        var price = Math.floor(Math.random() * 3000000) + 15000;
        var text = 'Prix de défense: ' + price;
        var buttonOnclickValue = 'validateCiaButton("' + id + '", ' + price + ')';
        var textbutton = document.createTextNode(text);
        buttonCIA.setAttribute('class', 'button');
        buttonCIA.setAttribute('id', id);
        buttonCIA.setAttribute('onclick', buttonOnclickValue);
        buttonCIA.appendChild(textbutton);
        document.getElementById('event').appendChild(buttonCIA);
        ttbutton = ttbutton + 1;
        idCiaButton++;
        checkTheEnd();   
    }
    
}

//Permet de payer une attaque
function validateCiaButton(id, price) {
    if (price <= golds) {
        golds = golds - price;
        button = document.getElementById(id);
        button.remove();
        ttbutton = ttbutton - 1;
    }

}

//verifie si le joueur a gagner ou perdu
function checkTheEnd() {
    if (days >= 30) {
        
        reset();
        location.href = "win.html";

    } else if (ttbutton >= 4) {

        location.href = "lose.html";
    }
}

//peremt l'achat du che
function buyCheGuevara() {
    if (buycheguevara == 0 && golds >= 50000) {
        golds = golds - 50000;
        golds = golds * 2;
        buycheguevara = 1;
        document.getElementById('bonus1').value = "Che Guevara ✓";
    }
}

//permet l'achat du parin
function buyLeParin() {
    if (buyleparin == 0 && golds >= 150000) {
        multiplicator = multiplicator * 6;
        golds = golds - 150000;
        buyleparin = 1;
        document.getElementById('bonus2').value = "Le Parin ✓";
    }
}

//Permet de rafraichir l'achat du che et du parin lors du chragement de la sauvgarde
function freshBonus() {
    if (buycheguevara == 1) {
        document.getElementById('bonus1').value = "Che Guevara ✓";
    }
    if (buyleparin == 1) {
        document.getElementById('bonus2').value = "Le Parin ✓";
    }
}

