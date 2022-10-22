document.body.style.backgroundImage = "none";

let text = "A long time ago in a galaxy far, far away...."; //45
let i = 0;
let speed = 75;

function type() {
  if (i < text.length) {
    document.getElementById("sentence").textContent += text.charAt(i);
    i++;
    setTimeout(type, speed);
  }
}

setInterval(type, 1000);

function disappear() {
  document.querySelector("#sentence").style.display = "none";
}

setTimeout(disappear, 5000);

function imageAppear() {
  document.body.style.backgroundImage =
    "url('https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2F640px-Star_Wars_Logo.svg.png')";
  document.querySelector("#main").style.display = "block";
  document.querySelector("#particles-js").style.opacity = "1";
}

setTimeout(imageAppear, 5000);

const input = document.querySelector("#guess");
const button = document.querySelector("#button");
const guessPause = document.querySelector("button.swal2-confirm");
const answer = Math.floor(Math.random() * (905 - 895 + 1) + 895);

button.addEventListener("click", play);

input.addEventListener("keypress", e => {
  if (e.keyCode === 13) play();
});

function shuffleAnswers(multipleChoice) {
  let elist = document.querySelectorAll(multipleChoice);
  let k,
    j,
    i = elist.length;
  let e;
  let echild;
  while (i--) {
    e = elist[i];
    let echilds = [];
    j = e.childNodes.length;
    while (j--) {
      echilds.push(e.removeChild(e.childNodes[j]));
    }
    j = echilds.length;
    while (j) {
      k = Math.floor(j-- * Math.random());
      e.appendChild(echilds.splice(k, 1)[0]);
    }
  }
}

function play() {
  const userNumber = document.querySelector("#guess").value;
  if (userNumber < 895 || userNumber > 905) {
    Swal.fire({
      icon: "error",
      title: `It's a trap!`,
      text: "Way off must you be!!",
      imageUrl:
        "https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2013/11/04-400x225.jpg",
      imageWidth: 400,
      imageHeight: 225,
      imageAlt: "Yoda not happy"
    });
  } else if (isNaN(userNumber)) {
    Swal.fire({
      icon: "error",
      title: "I have a bad feeling about this...",
      text: "Numbers only must you use",
      imageUrl:
        "https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2013/11/08-400x225.jpg",
      imageWidth: 400,
      imageHeight: 225,
      imageAlt: "Yoda fail"
    });
  } else {
    if (userNumber < answer) {
      Swal.fire({
        icon: "warning",
        title: "Not quite!",
        text: "Not that young I am like I once was",
        imageUrl:
          "https://bloximages.newyork1.vip.townnews.com/postguam.com/content/tncms/assets/v3/editorial/e/36/e36fb280-ac72-11ea-bdce-17e5d2c17ba3/5ee31bb6113c3.image.jpg",
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: "Baby Yoda"
      });
    } else if (userNumber > answer) {
      Swal.fire({
        icon: "warning",
        title: "IM-POSSIBLE!",
        text: "Too old you must think I am",
        imageUrl:
          "https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2013/11/10-400x225.jpg",
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: "Yoda try"
      });
    } else {
      document.querySelector("audio").src =
        "https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2Fgreat-kid!-don't-get-cocky.mp3";
      Swal.fire({
        title: "You did it!",
        imageUrl:
          "https://64.media.tumblr.com/f42a7f41e636ee459cf386c7a626deb5/tumblr_pam1d8dPMr1s0127so2_540.gif",
        imageWidth: 400,
        imageHeight: 171,
        imageAlt: "Han Solo one in a million",
        confirmButtonText: "Great, Kid! Don’t Get Cocky 😒"
      });
      const guessPause = document.querySelector("button.swal2-confirm");
      guessPause.addEventListener("click", () => {
        document.querySelector("audio").pause();
        document.querySelector("#main").style.display = "none";
        shuffleAnswers('div>ul');
        document.querySelector("form").style.display = "block";
      });
    }
  }
  input.value = "";
}

const quizButton = document.querySelector("#quizButton");
quizButton.addEventListener("click", result);

function result(e) {
  e.preventDefault();
  let points = 0;
  if (document.querySelector("#answer1").checked == true) points++;
  if (document.querySelector("#answer2").checked == true) points++;
  if (document.querySelector("#answer3").checked == true) points++;
  if (document.querySelector("#answer4").checked == true) points++;
  if (document.querySelector("#answer5").checked == true) points++;
  if (points < 5) document.querySelector("audio").src = "https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2Ffaith.mp3";
  if (points === 5) document.querySelector("audio").src = "https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2FStar%20Wars%20Main%20Theme.mp3";
  quizButton.textContent= "You have scored " + points + " points! Click to exit.";
  quizButton.addEventListener("click", () => {
    document.querySelector("audio").pause();
    document.querySelector("form").style.display = "none";
  });
}