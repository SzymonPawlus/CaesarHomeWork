class Cipher {
    text = "";
    cipheredText = "";

    constructor(text) {
        this.text = text;
    }

    cipher = (shift)  => {
        // Cipher every character
        this.cipheredText = this.text.split("").map((char) => {
            // Get letter number [A - 0, B - 1, C - 2, ... , Z - 25]
            let letterNumber = char.charCodeAt(0) - 65;

            // Check if letter is latin
            if(letterNumber < 0 || letterNumber > 25) return char;

            // Shift and calulate (positive) modulo
            letterNumber = mod(letterNumber + shift, 26);

            return String.fromCharCode(letterNumber + 65)
        }).join("");
    }

    get ciphered() {
        return this.cipheredText;
    }
}

let timer;

// Always positive modulo
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Getter of elements
function getElements(clear = true) {
    let inputText   = document.getElementById('input-text');
    let textHolder  = document.getElementById('text-holder');
    let shiftHolder = document.getElementById('shift');
    if(clear) textHolder.innerText = "";
    return {
        inputText,
        textHolder,
        shiftHolder
    }
}

// Ciphering function
function cipher(dir = true) {
    // Create Basics
    const { inputText, textHolder, shiftHolder } = getElements();
    let code = new Cipher(inputText.value.toUpperCase());

    // Take shift and check if not null or NaN
    let shift = Number.parseInt(shiftHolder.value) ?? 0;

    // Cipher depending on direction
    if(!Number.isNaN(shift)) code.cipher(shift * (dir ? 1 : -1));
    else code.cipheredText = code.text;

    // Append text
    textHolder.appendChild(document.createTextNode(code.ciphered));
}

function clearAll() {
    const { inputText } = getElements();
    inputText.value = "";
}

function copy() {
    const { textHolder } = getElements(false);
    navigator.clipboard.writeText(textHolder.innerText).then(() => {
        let toast = document.getElementById('toast');
        toast.className = "click";

        timer = setTimeout(function(){ toast.className = ""; }, 5000);
    });
}

function hide() {
    document.getElementById('toast').className = "";
    clearTimeout(timer);
}