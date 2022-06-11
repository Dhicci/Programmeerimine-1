let lives = 7;
let blockFirstRoll = false;
let blockSecondRoll = false;
let letterNbr = 0;
let letterCounter = 0;
let hiddenWord = "";

let wordList = "HOBUNE KAELKIRJAK RAIESMIK KALLAS KOTKAS KILPKONN ÕPETAJA ÜLIKOOL VABADUS VABARIIK AASTAAEG SAADETIS SAMMAS AUDIITOR RAAMATUPIDAJA ARENDAJA KAABAKAS TELEVISIOON RÖSTER KORTER SELJANKA";

function FirstRoll() {
    if (blockFirstRoll == true) {
        return;
    }
    //HTML element to hold dice roll results
    let firstRollResult = document.getElementById("firstRollResult");

    //Generate random dice values
    let result = Math.floor(Math.random() * 20) + 1;

    //Create display text for a dice roll
    let resultText = "Veeretasid: " + result.toString();

    if (result == 1) {
        resultText += " , see on kohutav veeretus, kaotad kõik oma elud";
        Lives(-7);
    } else if (result == 20) {
        Lives(1);
        resultText += " , suurepärane vise, saad juurde ühe elupunkti";
    } else {
        resultText += " , midagi ei juhtu...";
    }
    
    firstRollResult.innerHTML = resultText;

    let btn = document.getElementById("firstRollBtn");
    btn.style.backgroundColor = "gray";
    blockFirstRoll = true;
}

function SecondRoll() {
    if (blockSecondRoll == true) {
        return;
    }

    //HTML element to hold dice roll results
    let secondRollResult = document.getElementById("secondRollResult");

    //Generate random dice values
    let result = (Math.floor(Math.random() * 10) + 1) * 10;
    secondRollResult.innerHTML = "Veeretuse tulemus: " + result.toString() + ", see tähendab, et me paljastame " + (result/2).toString() + "% sõnast.";

    let btn = document.getElementById("secondRollBtn");
    btn.style.backgroundColor = "gray";
    blockSecondRoll = true;
    showRandoms(result/2);
}

//Show the specified percentage of random letters that are hidden
function showRandoms(percentage) {
    let amount = Math.floor(letterNbr * (percentage/100));
    for(let i = 0; i < amount; i++) {
        let index = Math.floor(Math.random() * letterNbr);
        let foundLetter = document.getElementById(index.toString());
        if (foundLetter.style.visibility == 'visible') {
            i--;
        } else {
            foundLetter.style.visibility = 'visible';
            letterCounter--;
        }
    }
}

function Lives(i) {
    lives += i;
    let lifeDisplay = document.getElementById("hitpoints");
    lifeDisplay.innerHTML = "Elupunkte on " + lives.toString();
    console.log(lives);
    if (lives <= 0) {
        //End game
        document.getElementById("defeat").style.visibility = 'visible';
    }
}

//Check if the letter given by the user is in the word
function CheckLetter() {
    let guess = document.getElementById("guessText").value.toUpperCase();
    document.getElementById("guessText").value = "";

    let succesful = false;
    for (let i in hiddenWord) {
        if (hiddenWord[i] == guess) {
            let foundLetter = document.getElementById(i.toString());
            if (foundLetter.style.visibility != 'visible') {
                succesful = true;
                foundLetter.style.visibility = 'visible';
                letterCounter--;

            }
        }
    }
    if (succesful == false) {
        Lives(-1);
    }

    CheckEnd();
}

function CheckEnd() {
    
    if (letterCounter <= 0) {
        console.log(letterCounter)
        document.getElementById("victory").style.visibility = 'visible';
    }
}

function Refresh() {
    location.reload();
}

function GenerateWord() {
    let wordArray = wordList.split(' ');
    let randomNbr = Math.floor(Math.random() * wordArray.length);
    let word = wordArray[randomNbr];
    hiddenWord = word;
    console.log(word);

    let letters = word.split('');
    letterNbr = letters.length;
    letterCounter = letterNbr;
    //Create a div and a text element for every letter
    let wordDiv = document.getElementById("wordDiv");
    let i = 0;
    for (let letter in letters) {
        let container = document.createElement("div");
        container.setAttribute("class", "letterDiv");
        let letterText = document.createElement("p");
        letterText.setAttribute("class", "letterText");
        letterText.setAttribute("id", i.toString());
        letterText.innerHTML = letters[letter];

        //Put the container and text to html
        container.appendChild(letterText);
        wordDiv.appendChild(container);
        i++;
    }

}

GenerateWord();
