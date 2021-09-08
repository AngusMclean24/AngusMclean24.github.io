var element_symbols = ['H','He','Li','Be','B','C','N','O','F','Ne',
'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr',
'Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb',
'Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe',
'Cs','Ba','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At',
'Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md',
'No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts',
'Og','E', 'G', 'L', 'M','A', 'Z', 'J', 'T', 'Q', 'D', 'X', 'R']

var element_names = ['Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium','Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc','Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium','Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin','Antimony','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium','Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium','Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury','Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium','Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium','Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadtium','Roentgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson','Electron', 'Gluon', 'Lepton', 'Mass', 'Alpha-Particle', 'Z-Boson', 'Joule', 'Tau', 'Quark', 'Deuterium', 'X-Boson', 'Roentgen']


// Triggers when the try-button is pressed
// Gets input, makes a filtered list and outputs to page
function doTheThing() {
  var input = getInput();
  
  //var sorry = "<br>Hi your message was: " + input + 
  //          "<br>"
  //setOutput(input);


  var out = translate (input);

  console.log(out);

  setOutput(out);

  
  return false;
}

// Retrieves the input from the input-field
function getInput() {
    // Get the input (also keep only letters and convert to lowercase)
    //var input = document.getElementById('input').value.toLowerCase().replace(/[^a-zA-Z]/g, "");
    var input = document.getElementById('input').value.toLowerCase();
    document.getElementById('input').value = input; // Update content of inputfield
    return input;
}

// Writes the output to the output-field on the page
function setOutput(output) {
    document.getElementsByTagName('output')[0].innerHTML = output;
//    applySizes();
}

function translate (str){
    var output = [];
    var word = [];
    var i = 0;
    var failed = [];

    while (i < str.length){
        if (str[i] == ' '){
            output += ' ';
        } else {
           if (isLetter(str[i]) == null) {
                output += str[i];
            } 
            

            else {
                while (isLetter(str[i]) != null) {
                    word += str[i];
                    i++; 
                }
                i--;
                result = chemify(word);
                if (result == 'failed'){
                    if (failed.length == 0){
                        failed += "     The following words couldn't be converted needs additional subatomic particles: "
                        //failed += " {" + word + "} failed to convert needs extra symbols;"; 
                        failed += " {" + word + "} "; 
                    } else {
                        //failed += " {" + word + "} failed to convert needs extra symbols;"; 
                        failed += " {" + word + "} "; 
                    }
                    
                } else {
                    result2 = symbols_to_words(result);
                    output += result2;
                }

                word = [];
                
            }
        }
        i++;
    }

    output += failed;

    return output;
}

function symbols_to_words (str){
    output = [];

    run = 0;

    var index = 0;

    if (str.length == 1){
        var singlechar = str[0];
        for (i = 0; i < element_symbols.length; i++) {
            if (singlechar == element_symbols[i]){
                output += element_names[i];
            }
        }
    }

    else {
          while (index < str.length){
            if (index+1 == str.length){
                var singlechar = str[index];

                for (i = 0; i < element_symbols.length; i++) {
                    if (singlechar == element_symbols[i]){
                        output += '' + element_names[i];
                    }
                } 

                index += 1;
            }

            else {
                var next = str[index+1];
                var next_lower = next.toLowerCase();

                if (next == next_lower){

                    var doublechar = str.substring(index, index+2);

                    for (i = 0; i < element_symbols.length; i++) {
                        if (doublechar == element_symbols[i]){
                            if (run == 0){
                                output += element_names[i];
                            } else {
                                output += '' + element_names[i];
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
                                output += '' + element_names[i];
                            }

                            run++;
                        }
                    } 

                    index += 1;
                }
            }
            console.log(output);
        }
    }

  

    return output;
}

function isLetter(str) {
    if (str == null){
        return null
    } else {
        return str.length === 1 && str.match(/[a-zA-Z]/i);
    }
}

function  chemify(string) {
    var state = 'hello'
    var branches = [];
    var newbranches = [];

    var run = 0;
    
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


//hello

