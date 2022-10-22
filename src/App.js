import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Swal from 'sweetalert2';
import { questions } from "./questions";
const answer = Math.floor(Math.random() * (905 - 895 + 1) + 895);

function App() {
  const quizButton = document.querySelector("#quizButton");
  const [myGuess, setMyGuess] = useState('');
  const [quizBtn, setQuizBtn] = useState('May the Force be with me!');
  const [displayGuess, setDisplayGuess] = useState('block');
  const [displayQuiz, setDisplayQuiz] = useState('none');

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

  function shuffleAnswers(multipleChoice) {
    let elist = document.querySelectorAll(multipleChoice);
    let k,
      j,
      i = elist.length;
    let e;
    // let echild;
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
        // document.querySelector("audio").src =
        //   "https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2Fgreat-kid!-don't-get-cocky.mp3";
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
          // document.querySelector("audio").pause();
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
    // console.log(questions[0].value.checked);
    // console.log(questions[0].correct);
    // if (questions[0].value.checked === questions[0].correct) points++;
    // if (questions[1].correct.checked === true) points++;
    // if (questions[2].correct.checked === true) points++;
    // if (questions[3].correct.checked === true) points++;
    // if (questions[4].correct.checked === true) points++;
    // if (points < 5) document.querySelector("audio").src = "https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2Ffaith.mp3";
    // if (points === 5) document.querySelector("audio").src = "https://cdn.glitch.com/0b63aad7-2a93-4811-b8ef-1383b4d21d7f%2FStar%20Wars%20Main%20Theme.mp3";
    setQuizBtn("You have scored " + points + " points! Click to exit.")
    quizButton.addEventListener("click", () => {
    //   document.querySelector("audio").pause();
      setDisplayQuiz('none');
    });
  }

  return (
    <div className="App">
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
      <form id="quiz">
        {questions.map(element => {
          const {id, question, answer1, answer2, answer3, answer4} = element;
          return (
            <div className="question" key={id}>
              <label>{id} - {question}</label>
              <ul>
                <li><input type="radio" name={`question${id}`} value={answer1} />{answer1}</li>
                <li><input type="radio" name={`question${id}`} value={answer2} />{answer2}</li>
                <li><input type="radio" name={`question${id}`} value={answer3} />{answer3}</li>
                <li><input type="radio" name={`question${id}`} value={answer4} />{answer4}</li>
              </ul>
            </div>
          )
        })}
        <button type="submit" id="quizButton" onClick={(e) => result(e)}>{quizBtn}</button>
      </form>
    </div>
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        backgroundMode: {
          enable: false
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 10,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
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
            speed: .8,
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
