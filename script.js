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
  
  //var sorry = "<br>Hi your message was: " + input + 
  //          "<br>"
  var ret = chemify(input);

  var out = symbols_to_words(ret);

  setOutput(out);

  
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

function chemify(string) {

    var state = 'hello'
    var branches = [];
    var newbranches = [];

    var run = 0;

    //need to do firt step in branch manually    

    
    while ((state != 'done' ) && (state != 'failed')){
        if (run == 0){
            if (string.length == 1){
                var singlechar = string[0]
                if (isIn(singlechar) == 1){
                    var solution = singlechar.toUpperCase();
                    state = 'done' 
                    break;
                } else {
                    state = 'failed'
                    break;
                }
            } else {
                var singlechar = string[0]
                var doublechar = string.substring(0, 2);

                if (isIn(singlechar) == 1){
                        branches.push(singlechar.toUpperCase());
                }

                if (isIn(doublechar) == 1){
                        var firstletter = doublechar[0];
                        firstletter = firstletter.toUpperCase();

                        doublechar = firstletter + doublechar[1];
                        branches.push(doublechar);  
                } 

            }
        }

        if (branches.length == 0) {
                state = 'failed';
                break;

        }  else {
            for (index=0; index < branches.length; index++){
                branch = branches[index];
                var branchposition = branch.length;

                if (branchposition == string.length){
                    state = 'done';
                    var solution = branch;
                    break;
                }

                else if ((branchposition+1) == string.length){
                    var singlechar = string[branchposition]
                    if (isIn(singlechar) == 1){
                        newbranches.push(branch+singlechar.toUpperCase());
                    }
                }

                else {
                    var singlechar = string[branchposition]
                    var doublechar = string.substring(branchposition, branchposition+2);

                    if (isIn(singlechar) == 1){
                        newbranches.push(branch+singlechar.toUpperCase());
                    }

                    if (isIn(doublechar) == 1){
                        var firstletter = doublechar[0];
                        firstletter = firstletter.toUpperCase();

                        doublechar = firstletter + doublechar[1];
                        newbranches.push(branch+doublechar);  
                    } 
                }
            }
        }
        

        branches = newbranches;
        //console.log(branches);
        newbranches = [];
        run++;

    }

    if (state == 'done') {
       return solution;
    } else {
        return state;
    }
    

}


function isIn (input) {
    input = input.toLowerCase();
    const symbols = element_symbols.map(name => name.toLowerCase());

    if (symbols.includes(input) == true) {
        return 1;
    } 

    else {
        return 0;
    }
}

function symbols_to_words (str){
    output = [];

    run = 0;

    var index = 0;
    while (index < str.length){
        if (index+1 == str.length){
            var singlechar = str[index];

            for (i = 0; i < element_symbols.length; i++) {
                if (singlechar == element_symbols[i]){
                    output += '-' + element_names[i];
                }
            } 

            index += 1;
        }

        else {
            var next = ret[index+1];
            var next_lower = next.toLowerCase();

            if (next == next_lower){
                console.log("Hello");

                var doublechar = str.substring(index, index+2);

                for (i = 0; i < element_symbols.length; i++) {
                    if (doublechar == element_symbols[i]){
                        if (run == 0){
                            output += element_names[i];
                        } else {
                            output += '-' + element_names[i];
                        }

                        run ++;
                    }
                }    

                index += 2;
            }

            else {
                var singlechar = str[index];

                for (i = 0; i < element_symbols.length; i++) {
                    if (singlechar == element_symbols[i]){
                        if (run == 0){
                            output += element_names[i];
                        } else {
                            output += '-' + element_names[i];
                        }

                        run++;
                    }
                } 

                index += 1;
            }
        }
        console.log(output);
    }

    return output;
}

