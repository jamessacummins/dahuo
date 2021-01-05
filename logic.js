let data = [];

data = modern;

function returnTextNode(text){
    let returnable = document.createTextNode(text);
    return returnable;
};

function createPWithClassText(className,text){
    let returnable = document.createElement('p');
    returnable.classList.add(className);
    returnable.appendChild(returnTextNode(text));
    return returnable;
};

function createResultDiv(char, freq, pinyin, def) {
    let returnable = document.createElement('div');
    returnable.classList.add('result');
    let charChild = createPWithClassText('result-character', char);
    let freqChild = createPWithClassText('result-freq', freq);
    let pinyinChild = createPWithClassText('result-pinyin', pinyin);
    let defChild = createPWithClassText('result-def', def);
    returnable.appendChild(charChild);
    returnable.appendChild(freqChild);
    returnable.appendChild(pinyinChild);
    returnable.appendChild(defChild);
    return returnable;
};


function findChar(kan) {
    return data.find(({char}) => char === kan)
};

let searchBox = document.getElementsByClassName('search-box')[0].value;
let resultContainer = document.getElementsByClassName('result-container')[0];

function wipeResultBoxes(){
    let children = resultContainer.children;
    if(children.length !== 0){
        while(resultContainer.hasChildNodes()) {
            resultContainer.removeChild(resultContainer.firstChild);
        };
    };
};

function updateResultBoxes(){
    for(let i = 0; i < searchBox.length; i++){
        let targetChar = findChar(searchBox[i])
        if(targetChar !== undefined){
            let resultDiv = createResultDiv(
                targetChar.char,
                targetChar.freq,
                targetChar.pinyin,
                targetChar.def

            )
            resultContainer.appendChild(resultDiv);
        }
    }
}

function updateSearch(){
    
    searchBox = document.getElementsByClassName('search-box')[0].value;
    wipeResultBoxes();
    updateResultBoxes();
    
}

/** Checkbox logic for changing texts **/

let checkboxArray = document.getElementsByClassName('corpus-toggle');
console.log(checkboxArray);

modernToggle = checkboxArray[0];
imaginativeToggle = checkboxArray[1];
informativeToggle = checkboxArray[2];

function resetToggle(toggle){
    toggle.disabled = false;
    toggle.checked = false;
};

function activateToggle(toggle){
    toggle.disabled = true;
    toggle.checked = true;
};

function updateCorpus(corpus){
    if(corpus === 1){
        if(imaginativeToggle.checked === true){
            data = imaginative;
            activateToggle(imaginativeToggle);
            resetToggle(modernToggle);
            resetToggle(informativeToggle);
            updateSearch();
        };
    };
    if(corpus === 2){
        if(informativeToggle.checked === true){
            data = informative;
            activateToggle(informativeToggle);
            resetToggle(modernToggle);
            resetToggle(imaginativeToggle);
            updateSearch();
        };
    };
    if(corpus === 0){
        if(modernToggle.checked === true){
            data = modern;
            activateToggle(modernToggle);
            resetToggle(informativeToggle);
            resetToggle(imaginativeToggle);
            updateSearch();
        };
    };
}