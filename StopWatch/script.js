//#region Variable initialsers

var secondsLabel = document.getElementById("secondsLabel");
var minutesLabel = document.getElementById("minutesLabel");
var resetButton = document.getElementById("resetButton");
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var timeSeconds = 0;
var timeInMinutes = 0;
var secondsInterval = null;
digitPadder(0, 0);

//#endregion Variable initialsers

buttonStateModifier(0);

function startTimer() {
    //clearInterval(secondsInterval);//clear the started interval
    secondsInterval = setInterval(() => {
        timeSeconds++;//increment the seconds time count
        let minutes = Math.floor(timeSeconds / 60);//find the minutes
        let seconds = Math.floor(timeSeconds % 60);//find the seconds
        //Used pad in following lines for displaying 0 before incase of single digit time count
        digitPadder(minutes, seconds);
    }, 1000);//Increment the interval by 1 second.
    buttonStateModifier(1);
}


function resetTimer() {
    clearInterval(secondsInterval);
    timeSeconds = 0;
    digitPadder(0, 0);
    buttonStateModifier(3);
}


function stopTimer() {
    clearInterval(secondsInterval);
    buttonStateModifier(2);
}

//Used to set buttons state according to current stage of stopwatch(Started,Stopped or Resetted)
function buttonStateModifier(state) {

    switch (state) {
        case 0://Intial State
            resetButton.disabled = true;
            resetButton.style.opacity = "0.4";
            stopButton.disabled = true;
            stopButton.style.opacity = "0.4"; //Disable the reset and stop button at app start,since we dont require it at first load.
            break;
        case 1://Start State
            resetButton.style.opacity = "1";
            resetButton.disabled = false;
            stopButton.style.opacity = "1";
            stopButton.disabled = false;
            startButton.style.opacity = "0.4";
            startButton.disabled = true;
            minutesLabel.classList.remove("fade-in-out");
            secondsLabel.classList.remove("fade-in-out");
            break;

        case 2://Stop State
            startButton.style.opacity = "1";
            startButton.disabled = false;
            minutesLabel.classList.add("fade-in-out");
            secondsLabel.classList.add("fade-in-out");
            break;
        case 3://Reset State
            startButton.style.opacity = "1";
            startButton.disabled = false;
            resetButton.disabled = true;
            resetButton.style.opacity = "0.4";
            stopButton.disabled = true;
            stopButton.style.opacity = "0.4";
            minutesLabel.classList.remove("fade-in-out");
            secondsLabel.classList.remove("fade-in-out");
            break;

        default://Default State : Incase of any issue,fallback to this state and make all buttons enabled.
            resetButton.style.opacity = "1";
            resetButton.disabled = false;
            stopButton.style.opacity = "1";
            stopButton.disabled = false;
            startButton.style.opacity = "1";
            startButton.disabled = false;
            break;
    }
}

//Used to pad in minutes and seconds fields for displaying 0 before incase of single digit time count
function digitPadder(minutes, seconds) {
    minutesLabel.innerText = minutes.toString().padStart(2, '0');
    secondsLabel.innerText = seconds.toString().padStart(2, '0');
}

