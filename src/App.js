import { useCallback, useState, useRef } from "react";
import { loadFull } from "tsparticles";
import { questions } from "./questions";
import Particles from "react-tsparticles";
import Typewriter from 'typewriter-effect';
import Swal from 'sweetalert2';
import cocky from './cocky.mp3';
import faith from './faith.mp3';
import throne from './throne.mp3';
const answer = Math.floor(Math.random() * (905 - 895 + 1) + 895);

function App() {
  const quizButton = document.querySelector("#quizButton");
  const [quizBtn, setQuizBtn] = useState('May the Force be with me!');
  const [displaySentence, setDisplaySentence] = useState('block');
  const [displayParts, setDisplayParts] = useState('none');
  const [displayGuess, setDisplayGuess] = useState('none');
  const [displayQuiz, setDisplayQuiz] = useState('none');
  const [bg, setBg] = useState('/swbg.jpg');
  const [myGuess, setMyGuess] = useState('');
  const winSong = useRef(new Audio(cocky));
  const loseSong = useRef(new Audio(faith));
  const winQuiz = useRef(new Audio(throne));

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  const handleChange = e => {
    setMyGuess(e.target.value);
  }

  let x = window.matchMedia("(max-width: 650px)");
  x.onchange = (e) => {mediaQueries(e)};

  function mediaQueries(x) {
    if (x.matches) {
      setBg('/swbgsm.jpg');
    } else {
      setBg('/swbg.jpg');
    }
  }
  function sentenceDisappear() {
    setDisplaySentence('none');
    document.body.style.backgroundImage = `url(${bg})`;
    setDisplayGuess('block');
    setDisplayParts('block');
  }
  
  setTimeout(sentenceDisappear, 5500);

  function shuffleAnswers(multipleChoice) {
    let elist = document.querySelectorAll(multipleChoice);
    let k,
      j,
      i = elist.length;
    let e;
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

  const play = e => {
    e.preventDefault();
    const userGuess = parseInt(myGuess, setMyGuess);
    if (userGuess < 895 || userGuess > 905) {
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
    } else if (isNaN(userGuess)) {
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
      if (userGuess < answer) {
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
      } else if (userGuess > answer) {
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
        winSong.current.play();
        Swal.fire({
          title: "You did it!",
          imageUrl:
            "https://64.media.tumblr.com/f42a7f41e636ee459cf386c7a626deb5/tumblr_pam1d8dPMr1s0127so2_540.gif",
          imageWidth: 400,
          imageHeight: 171,
          imageAlt: "Han Solo one in a million",
          confirmButtonText: `Great, Kid! Don't Get Cocky 😒`
        });
        const guessPause = document.querySelector("button.swal2-confirm");
        guessPause.addEventListener("click", () => {
          winSong.current.pause();
          setDisplayGuess('none');
          shuffleAnswers('div>ul');
          setDisplayQuiz('block');
        });
      }
    }
    setMyGuess('');
  }

  const result = (e) => {
    e.preventDefault();
    let points = 0;
    if (document.getElementById('answer1').checked === true) points++;
    if (document.getElementById('answer2').checked === true) points++;
    if (document.getElementById('answer3').checked === true) points++;
    if (document.getElementById('answer4').checked === true) points++;
    if (document.getElementById('answer5').checked === true) points++;
    if (points < 5) loseSong.current.play();
    if (points === 5) winQuiz.current.play();
    setQuizBtn("You have scored " + points + ` ${points === 1 ? 'point' : 'points'}! Click to exit.`)
    quizButton.addEventListener("click", () => {
      // loseSong.current.pause();
      // winQuiz.current.pause();
      setDisplayQuiz('none');
    });
  }

  return (
    <div className="App">
      <div id="sentence" style={{display: displaySentence}}>
        <Typewriter
          options={{
            strings: ["A long time ago in a galaxy far, far away...."],
            cursor: '',
            delay: 75,
            autoStart: true,
            loop: false,
          }}
        />
      </div>
      <div className="container col-xxl-8 p-5 text-center profile" style={{display: displayGuess}}>
        <h3 className="display-5 fw-bold">Smarter than a Wookie you think you are? 😏</h3>
        <div className="col-lg-6 mx-auto">
          <h4 className="mb-4">Then check if Yoda's age you can guess.</h4>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <form className="input-group mb-3">
                <input className="form-control" type="text" onChange={(e) => handleChange(e)} value={myGuess} placeholder="Use the Force and pick between 895 and 905" aria-label="quess-field" aria-describedby="basic-addon1" />
              <button className="btn btn-warning" type="submit" onClick={(e) => play(e)} id="button-addon2">Play!</button>
              </form>
          </div>
      </div>
    </div>
    <div className="container col-xxl-6 profile" style={{display: displayQuiz}}>
      <form id="quiz" onSubmit={(e) => result(e)}>
        {questions.map(element => {
          const {id, question, answer1, answer2, answer3, answer4} = element;
          return (
            <div className="qquestion profile" key={id}>
              <label>{id} - {question}</label>
              <ul>
                <li><input type="radio" name={`question${id}`} value={answer1} id={`answer${id}`} />&nbsp;{answer1}</li>
                <li><input type="radio" name={`question${id}`} value={answer2} />&nbsp;{answer2}</li>
                <li><input type="radio" name={`question${id}`} value={answer3} />&nbsp;{answer3}</li>
                <li><input type="radio" name={`question${id}`} value={answer4} />&nbsp;{answer4}</li>
              </ul>
            </div>
          )
        })}
        <button type="submit" id="quizButton" onClick={(e) => result(e)}>{quizBtn}</button>
      </form>
    </div>
    <Particles
      style={{display: displayParts}}
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        backgroundMode: {
          enable: false
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#FFFFFF",
          },
          links: {
            color: "#FFE81F",
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: "none",
            enable: true,
            outModes: "out",
            random: false,
            speed: .6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "star",
          },
          size: {
            random: true,
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  </div>
  );
}

export default App;
