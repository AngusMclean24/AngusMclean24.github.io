var element_symbols = ['H','He','Li','Be','B','C','N','O','F','Ne',
'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr',
'Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb',
'Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe',
'Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At',
'Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md',
'No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts',
'Og','e', 'g', 'l', 'm','a', 'z', 'j', 't', 'q', 'd', 'x', 'r']

var element_names = ['Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium','Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc','Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium','Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin','Antimony','Tellurium','Iodine','Xenon','Cesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium','Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium','Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury','Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium','Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium','Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadtium','Roentgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson','Electron', 'Gluon', 'Lepton', 'Mass', 'Alpha Particle', 'Z Boson', 'Joule', 'Tau', 'Quark', 'Deuterium', 'X Boson', 'Roentgen']


// Triggers when the try-button is pressed
// Gets input, makes a filtered list and outputs to page
function doTheThing() {
  var input = getInput();
  
  var sorry = "<br>Hi your message was: " + input + 
            "<br>"
  
  setOutput(sorry);
  
  return false;
}
// Retrieves the input from the input-field
function getInput() {
    // Get the input (also keep only letters and convert to lowercase)
    var input = document.getElementById('input').value.toLowerCase().replace(/[^a-zA-Z]/g, "");
    document.getElementById('input').value = input; // Update content of inputfield
    return input;
}

// Writes the output to the output-field on the page
function setOutput(output) {
    document.getElementsByTagName('output')[0].innerHTML = output;
//    applySizes();
}

// Debug
function p(line) {
    console.log(line);
}


function toggleOptions() {
  drop = document.getElementById("optionsDrop")
  if (drop.style.display == "none") {
    drop.style.display = "block"
    document.getElementById("optionsDropLink").innerHTML = "Options&uarr;"
    options()
  } else {
    drop.style.display = "none"
    document.getElementById("optionsDropLink").innerHTML = "Options&darr;"
  }
}

function options() {
  if (window.location.href.indexOf("?") === -1) {
    window.location.href = window.location.href+"?"
  }
  var urlVars = getUrlVars();
  if (urlVars.word != undefined) {
    document.getElementById("defaultWord").value = urlVars.word
  }
  if (urlVars.color != undefined) {
    document.getElementById("colorChoice").value = urlVars.color
  }
  if (urlVars.bgcolor != undefined) {
    document.getElementById("bgcolorChoice").value = urlVars.bgcolor
  }
  if (urlVars.bgcolor != undefined) {
    document.getElementById("bgcolorChoice").value = urlVars.bgcolor
  }
  if (urlVars.trick != undefined) {
    document.getElementById("trickChoice").value = urlVars.trick
  }
  if (urlVars["rev"] != undefined) {
    document.getElementById("rev").checked = false
  }
  if (urlVars["spell"] != undefined) {
    document.getElementById("allspell").checked = true
  }
  if (urlVars["length"] != undefined) {
    document.getElementById("long").checked = true;
  } else {document.getElementById("short").checked = true}
}

function link(page) {
    window.location.href = page+window.location.search
    return false;
}


//hi