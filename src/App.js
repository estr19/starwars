import { useCallback, useState, useRef, useEffect } from "react";
import { loadFull } from "tsparticles";
import { questions } from "./questions";
import Particles from "react-tsparticles";
import Typewriter from "typewriter-effect";
import Swal from "sweetalert2";
import cocky from "./cocky.mp3";
import faith from "./faith.mp3";
import throne from "./throne.mp3";
const answer = Math.floor(Math.random() * (905 - 895 + 1) + 895);

function App() {
  const [displaySentence, setDisplaySentence] = useState("block");
  const [displayParts, setDisplayParts] = useState("none");
  const [displayGuess, setDisplayGuess] = useState("none");
  const [displayQuiz, setDisplayQuiz] = useState("none");
  const [displayQuizBtn, setDisplayQuizBtn] = useState("none");
  // const [bg, setBg] = useState();
  const [myGuess, setMyGuess] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const winSong = useRef(new Audio(cocky));
  const loseSong = useRef(new Audio(faith));
  const winQuiz = useRef(new Audio(throne));

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);
  
  useEffect(() => {
    const tick = setTimeout(() => {
      setDisplaySentence("none");
      document.body.style.backgroundImage = `url("/swbgsm.jpg")`;
      setDisplayGuess("block");
      setDisplayParts("block");
    }, 5500);
    return () => clearInterval(tick);
  }, [displaySentence]);

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      console.log('correct');
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (score === questions.length - 1) {
        winQuiz.current.play();
      } else {
        loseSong.current.play();
      }
      setShowResults(true);
      // console.log(score);
      // console.log(questions.length);
    }
  };

  const restartGame = () => {
    setDisplayQuiz("none");
    winQuiz.current.pause();
    loseSong.current.pause();
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  // let x = window.matchMedia("(max-width: 650px)");
  // x.onchange = (e) => {
  //   mediaQueries(e);
  // };

  // function mediaQueries(x) {
  //   if (x.matches) {
  //     setBg("/swbgsm.jpg");
  //   } else {
  //     setBg("/swbg.jpg");
  //   }
  // }

  const handleChange = (e) => {
    setMyGuess(e.target.value);
  };

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

  const quizStart = () => {
    shuffleAnswers('div>ul');
    setDisplayGuess("none");
    setDisplayQuiz("block");
    winSong.current.pause();
  };

  const play = (e) => {
    e.preventDefault();
    const userGuess = parseInt(myGuess, setMyGuess);
    if (userGuess < 895 || userGuess > 905) {
      Swal.fire({
        icon: "error",
        title: `It's a trap!`,
        text: "Way off must you be!!",
        imageUrl:
          "https://lumiere-a.akamaihd.net/v1/images/image_0d02312b.jpeg", // https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2013/11/04-400x225.jpg
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: "Yoda not happy",
      });
    } else if (isNaN(userGuess)) {
      Swal.fire({
        icon: "error",
        title: "I have a bad feeling about this...",
        text: "Numbers only must you use",
        imageUrl:
          "https://lumiere-a.akamaihd.net/v1/images/image_2fd59b97.jpeg", // https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2013/11/08-400x225.jpg
        imageWidth: 400,
        imageHeight: 225,
        imageAlt: "Yoda fail",
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
          imageAlt: "Baby Yoda",
        });
      } else if (userGuess > answer) {
        Swal.fire({
          icon: "warning",
          title: "IM-POSSIBLE!",
          text: "Too old you must think I am",
          imageUrl:
            "https://lumiere-a.akamaihd.net/v1/images/image_c9311401.jpeg", //  https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2013/11/10-400x225.jpg
          imageWidth: 400,
          imageHeight: 225,
          imageAlt: "Yoda try",
        });
      } else {
        winSong.current.play();
        setDisplayQuizBtn('block');
        Swal.fire({
          title: "You did it!",
          imageUrl:
            "https://media.giphy.com/media/tp7wl5PVFWuYw/giphy.gif", // https://64.media.tumblr.com/f42a7f41e636ee459cf386c7a626deb5/tumblr_pam1d8dPMr1s0127so2_540.gif
          imageWidth: 400,
          imageHeight: 171,
          imageAlt: "Han Solo one in a million",
          confirmButtonText: `Great, Kid! Don't Get Cocky 😒`,
        });
      }
    }
    setMyGuess("");
  };

  return (
    <div>
      <div id="sentence" style={{ display: displaySentence }}>
        <Typewriter
          options={{
            strings: ["A long time ago in a galaxy far, far away...."],
            cursor: "",
            delay: 75,
            autoStart: true,
            loop: false,
          }}
        />
      </div>
      <div
        className="container col-xxl-8 p-4 text-center profile"
        style={{ display: displayGuess }}
      >
        <h3 className="display-5 fw-bold">
          Smarter than a Wookie you think you are? 😏
        </h3>
        <div className="col-lg-6 mx-auto">
          <h4 className="mb-4">Then check if Yoda's age you can guess.</h4>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <form className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                onChange={(e) => handleChange(e)}
                value={myGuess}
                placeholder="Use the Force and pick between 895 and 905"
                aria-label="quess-field"
                aria-describedby="basic-addon1"
              />
              <button
                className="btn btn-warning"
                type="submit"
                onClick={(e) => play(e)}
                id="button-addon2"
              >
                Play!
              </button>
            </form>
          </div>
          <div className="d-flex justify-content-center py-2">
            <button className="btn btn-warning" id='quizBtn' style={{ display: displayQuizBtn }} onClick={() => quizStart()}>Quiz must you now complete.</button>
          </div>
        </div>
      </div>
      <div
        className="container col-xxl-6 profile"
        style={{ display: displayQuiz }}
      >
        <div id="quiz" className="container col-xxl-8 p-4 text-center">
        <h3 className="display-5 fw-bold">
          Smarter than an Ewok you think you are? 😏
        </h3>
        <br></br>
          {showResults ? (
            <div className="final-results">
              <h2>
                You scored {score} out of {questions.length} - {(score / questions.length) * 100}%
              </h2>
              <br></br>
              <button id="quizButton" onClick={() => restartGame()}>
                Close the game
              </button>
            </div>
          ) : (
            <div className="qquestion">
              <h2>
                Question: {currentQuestion + 1} out of {questions.length}
              </h2>
              <h3 className="question-text">
                {questions[currentQuestion].text}
              </h3>
              <ul>
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <li
                      key={option.id}
                      onClick={() => optionClicked(option.isCorrect)}
                    >
                      {option.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Particles
        style={{ display: displayParts }}
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          backgroundMode: {
            enable: false,
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
              speed: 0.6,
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