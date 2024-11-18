import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import gameKata from '../../assets/Game Kata.png';
import study from '../../assets/study.png';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGameClick = () => {
    navigate('/game', { state: { userData } });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    
    navigate('/login');
  };

  return (
    <div className='page'>
      <nav>
        <div className="wrapper">
          <div className="logo"><a href='#home'>CerdasBerwawasan.</a></div>
          <div className="menu">
            <ul>
              <li><a href ="#home">Beranda</a></li>
              <li><a href ="#mulai-game">Permainan</a></li>
              <li><a href ="#video">Video</a></li>
              <li><a href="#contact">Kontak</a></li>
              {userData ? (
                <span 
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
                >
                  {isHovered ? (
                    <a id="signOut" onClick={handleSignOut}>Sign Out</a>
                  ) : (
                    userData.username
                  )}
                </span>
              ) : (
                <a id="signIn" onClick={handleLoginClick}>SIGN IN</a>
              )}
            </ul>
          </div>
        </div>   
      </nav>
    
      <section id="home">
        <div className="home-container">
          <img src={study} alt="Study"/>
          <div className="kolom">
            <p className="deskripsi"> Kamus Besar Bahasa Indonesia  </p>
            <h2> Bingung dengan arti dari kata Bahasa Indonesia </h2>
            <p>Sampai saat ini Indonesia memiliki kosakata berkisar di angka 120.000. Langsung saja klik KBBI untuk menjelajahi kosakata Bahasa Indonesia</p>
            <a href="https://kbbi.kemdikbud.go.id/" className="tombol-home" target="_blank" rel="noopener noreferrer">KBBI</a>
          </div>
        </div>
      </section>

      <section id="mulai-game">
        <div className="game-container">
          <div className="kolom">
            <p className="deskripsi">#Belajar Sambil Bermain</p>
            <h2>Game Kata Baku</h2>
            <p>Tebak apakah sebuah kata merupakan kata baku atau tidak baku</p>
            <p>Nilai : {userData ? userData.progress : 0}</p>
            <a onClick={handleGameClick} className="tombol-game">Mulai Permainan</a>
          </div>
          <img src={gameKata} alt="Game Kata"/>
        </div>
      </section>

      <section id="video">
        <div className="video-container">
          <div className="kolom">
            <h2>Video Belajar</h2>
            <p>Tonton video-video Tata Tulis Karya Ilmiah berikut untuk belajar lebih dalam!</p>
          </div>
          <div className="video-container">
            <iframe width="460" height="215" src="https://www.youtube.com/embed/vtPkouMKp2I?si=d07eLDeQtZn6oMcR" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <iframe width="460" height="215" src="https://www.youtube.com/embed/rDo2-cnGoL0?si=67vzYAtnlvL_RMb1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <iframe width="460" height="215" src="https://www.youtube.com/embed/FZXn-XqaZGk?si=r9GqHkLoqBmni4UZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="footer">
          <div className="footer-section">
            <h3>CerdasBerwawasan.</h3>
            <p>Sebuah Platform website pembelajaran Tata Tulis Karya Ilmiah yang dikemas menyenangkan</p>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <p>Teruslah perdalam ilmu sebanyak-banyaknya</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Jalan Sayang</p>
            <p>Kode Pos: 123456</p>
          </div>
          <div className="footer-section">
            <h3>Social</h3>
            <p><b>Instagram: </b>@itb1920</p>
            <p><b>YouTube:  </b>Dosen Traveler</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;