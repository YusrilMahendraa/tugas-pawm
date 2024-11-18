import React, { useState, useEffect } from 'react';
import './Game.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  const [poin, setPoin] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentSoalId, setCurrentSoalId] = useState(1);
  const [jawabanBenar, setJawabanBenar] = useState('');

  const soalData = [
    { soal: 'Kedaluarsa', jawabanBenar: 'tidakBaku' },
    { soal: 'Junior', jawabanBenar: 'baku' },
    { soal: 'Obyek', jawabanBenar: 'tidakBaku' },
    { soal: 'Sekedar', jawabanBenar: 'tidakBaku' },
    { soal: 'Seksama', jawabanBenar: 'tidakBaku' },
    { soal: 'Indra', jawabanBenar: 'baku' },
    { soal: 'Cidera', jawabanBenar: 'tidakBaku' },
    { soal: 'Ijasah', jawabanBenar: 'tidakBaku' },
    { soal: 'Manajemen', jawabanBenar: 'baku' },
    { soal: 'Coklat', jawabanBenar: 'tidakBaku' },
    { soal: 'Apotik', jawabanBenar: 'tidakBaku' },
    { soal: 'Antre', jawabanBenar: 'baku' },
    { soal: 'Desain', jawabanBenar: 'baku' },
    { soal: 'Lembap', jawabanBenar: 'baku' },
    { soal: 'Respons', jawabanBenar: 'baku' },
    { soal: 'Bis', jawabanBenar: 'tidakBaku' },
    { soal: 'Teknologi', jawabanBenar: 'baku' },
    { soal: 'Detil', jawabanBenar: 'tidakBaku' },
    { soal: 'Capek', jawabanBenar: 'tidakBaku' },
    { soal: 'Diagnosa', jawabanBenar: 'tidakBaku' },
  ];

  const handleAnswer = (selectedJawaban) => {
    if (answeredQuestions[currentSoalId]) return;

    const correct = selectedJawaban === jawabanBenar;
    if (correct) {
      setPoin((prevPoin) => prevPoin + 5);
    }

    setAnsweredQuestions((prevAnswered) => ({
      ...prevAnswered,
      [currentSoalId]: selectedJawaban,
    }));
    setButtonColor(selectedJawaban, correct);
  };

  const setButtonColor = (selectedJawaban, correct) => {
    const button = document.getElementById(selectedJawaban);
    button.style.backgroundColor = correct ? 'green' : 'red';
  };

  const clearButtonColors = () => {
    document.getElementById('baku').style.backgroundColor = '';
    document.getElementById('tidakBaku').style.backgroundColor = '';
  };

  const navigateToNext = () => {
    if (currentSoalId < soalData.length) {
      setCurrentSoalId((prevId) => prevId + 1);
      clearButtonColors();
    }
  };

  const navigateToPrev = () => {
    if (currentSoalId > 1) {
      setCurrentSoalId((prevId) => prevId - 1);
      clearButtonColors();
    }
  };

  const handleNavClick = (id) => {
    setCurrentSoalId(id);
    clearButtonColors();
  };

  useEffect(() => {
    const { soal, jawabanBenar } = soalData[currentSoalId - 1];
    setJawabanBenar(jawabanBenar);
    document.getElementById('soalSoal').innerText = soal;
  }, [currentSoalId]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const updateProgressBar = () => {
    const answeredCount = Object.keys(answeredQuestions).length;
    const progress = (answeredCount / soalData.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
  };

  useEffect(() => {
    updateProgressBar();
  }, [answeredQuestions]);

  const handleHomeClick = () => {
    navigate('/', { state: { userData } });
  };

  const saveScoreToFirebase = () => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userData.username);
    set(userRef, {
        username: userData.username,
        password: userData.password,    
        progress: poin,
    }).then(() => {
      console.log("Score saved successfully!");
    }).catch((error) => {
      console.error("Error saving score: ", error);
    });
  };

  const handleFinishClick = () => {
    saveScoreToFirebase();
    const updatedUserData = { ...userData, progress: poin };
    navigate('/', { state: { userData: updatedUserData } });
};

  return (
    <div className='page'>
      <nav>
        <div className="wrapper">
          <div className="logo"><a href='#home'>CerdasBerwawasan.</a></div>
          <div className="menu">
            <ul>
              <li><a onClick={handleHomeClick}>Beranda</a></li>
              <li><a href="#mulai-game">Permainan</a></li>
              <li><a href="#video">Video</a></li>
              <li><a href="#contact">Kontak</a></li>
              {userData ? (
                <span>{userData.username}</span>
              ) : (
                <a id="signIn" onClick={handleLoginClick}>SIGN IN</a>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <section className="game">
        <div className="container">
          <div className="left-container">
            <div className="navigasi">
              <div className="number">
                {soalData.map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handleNavClick(index + 1)}
                    className={answeredQuestions[index + 1] ? 'answered' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="soal">
              <div className="soal-top">
                <h1 id="soalSoal">Kedaluarsa</h1>
              </div>
              <div className="soal-mid">
                <button id="baku" onClick={() => handleAnswer('baku')}><b>Baku</b></button>
                <button id="tidakBaku" onClick={() => handleAnswer('tidakBaku')}><b>Tidak Baku</b></button>
              </div>
              <div className="soal-bottom">
                <p><b>Poin: </b><span id="poin">{poin}</span>/100</p>
              </div>
              <div className="button-next">
                <button onClick={navigateToPrev}>Back</button>
                <button onClick={currentSoalId === soalData.length ? handleFinishClick : navigateToNext}>
                  {currentSoalId === soalData.length ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="progress-container">
          <div id="progress" style={{ width: `${(poin / 100) * 100}%` }}></div>
        </div>
      </section>
    </div>
  );
};

export default Game;
