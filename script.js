const ball = document.querySelector("#ball")
const bg = document.querySelector(".container")
const content = document.querySelector(".content")

const display_points = document.querySelector("#points")
const settings_click = document.querySelector("#settings")

const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const reset = document.querySelector("#reset")

const settings_menu = document.querySelector(".settings-menu")
const close_settings = document.querySelector("#close-settings")

const high_score = document.querySelector("#high-score")

const allowSounds = document.querySelector("#allow-sounds")
const slider = document.querySelector("#range-volume")
var volume = 0.2;

var x = 0;
var y = 0;

var started = false;
var points = 0;
var variableText = "Points: ";
const defaultText = "Points: 0";

var score = 0;

var audio = document.createElement("audio")

ball.style = "visibility: hidden;";
settings_menu.style = "visibility: hidden;";

start.addEventListener("click",() => {
    if(!started) {
        ball.style = "visibility: visible;";
        started = true    
    }
})
reset.addEventListener("click",() => {
    display_points.innerHTML = defaultText;
    points = 0;
})

ball.addEventListener("click",() => {
    changPos();
})

function addPoints() {
    points += 1;
    display_points.innerHTML = variableText+points;
}

stop.addEventListener("click",() => {
    if(started) {
        ball.style = "visibility: hidden;"
        started = false
        
        if(points > score) {
            score = points;
            alert("Congratulations!! You set a new PR of "+score+" points")
            high_score.innerHTML = "Highest Score: "+score;
        } else if(points === score) {
            alert("You equaled the points with your PR of "+score+"points")
        } else {
            alert("You need "+(score-points)+" more points to get a new record")
        }
        points = 0;

        display_points.innerHTML = variableText+points;
    }
})

function changPos() {
    x = Math.floor(Math.random()*70)
    y = Math.floor(Math.random()*70)
    
    ball.style = "top: "+x+"vh; left: "+y+"vh;"

    addPoints();
}

settings_click.addEventListener("click", () => {
    settings_menu.style = "visibility: visible;"
    content.style = "background-color: rgba(0,0,0,0.2)"
})

close_settings.addEventListener("click", () => {
    settings_menu.style = "visibility: hidden;"
    content.style = "background-color: rgba(0,0,0,0)"
    content.disabled = true;
})

allowSounds.addEventListener("click",() => {
    if(!allowSounds.checked) {
        stopAudio();
    } else {
        playSong("bgmp3.mp3");
    }
})

slider.value = volume*100;

slider.addEventListener("change",() => {
    volume = slider.value/100;    
    console.log(volume);

})

function playSong(url){
    audio.style.display="none";
    audio.src=url;
    audio.loop = true;
    audio.play();
    audio.volume = volume;
    document.body.appendChild(audio);
}

function playAudio(url) {
    audio.style.display="none";
    audio.src=url;
    audio.loop = false;
    audio.volume = volume;
    document.body.appendChild(audio);
    audio.play();
}

function stopAudio() {
    audio.pause();
}