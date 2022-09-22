import React from "react";
import "./style.scss";

const Footer = () => {
  const sections = [
    {
      Albums: [
        "English",
        "Hindi",
        "Telugu",
        "Punjabi",
        "Tamil",
        "Kannada",
        "Bhojpuri",
        "Malayalam",
        "Marathi",
        "Bengali",
        "Gujarati Songs",
        "Haryanvi",
        "View al",
      ],
    },
    {
      Genres: [
        "Bollywood Songs",
        "Devotional Songs",
        "Ghazals",
        "Bhajan",
        "Patriotic Songs",
        "Kids Songs",
        "Rock Songs",
        "Disco Songs",
        "Sufi Songs",
        "Love Songs",
        "View all",
      ],
    },
    {
      Artists: [
        "Arijit Singh",
        "Neha Kakkar",
        "Honey Singh",
        "Atif Aslam",
        "A R Rahman",
        "Lata Mangeshkar",
        "Kishore Kumar",
        "Armaan Malik",
        "Sunidhi Chauhan",
        "Nusrat Fateh Ali Khan",
        "Mohammed Rafi",
        "Guru Randhawa",
        "Justin Bieber",
        "BTS",
        "View all",
      ],
    },
    {
      "New Release": [
        "English Songs",
        "Hindi Songs",
        "Punjabi Songs",
        "Tamil Songs",
        "Telugu Songs",
        "Kannada Songs",
        "Bhojpuri Songs",
        "Malayalam Songs",
        "Marathi Songs",
        "Bengali Songs",
        "Odia Songs",
        "Urdu Songs",
        "Rajasthani Songs",
        "Assamese Songs",
        "Haryanvi Songs",
        "View all",
      ],
    },
    // {
    //     'Trending Albums': [
    //         "Happy Birthday Songs",
    //         "Sad Songs",
    //         "PK Songs",
    //         "Jersey",
    //         "Bunty Aur Babli 2",
    //         "Chandigarh Kare Aashiqui",
    //         "Sooryavanshi",
    //         "Dhamaka",
    //         "Gaming Music",
    //         "Atrangi Re",
    //         "Radhe Shyam",
    //         "Master Tamil",
    //         "Pushpa The Rise",
    //         "Uppena",
    //         "Enemy Tamil",
    //         "View all",
    //     ]
    // }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <h1 className="text-center title">Bas Bajna Chahiye Gaana</h1>
        <p className="text-center desc">Gaana is the one-stop solution for all your music needs. Gaana offers you free, unlimited access to over 30 million Hindi Songs, Bollywood Music, English MP3 songs, Regional Music & Mirchi Play.</p>
        <div className="border-b"></div>
        <h4 className="text-center">Quicklinks</h4>
        <div className="footer-category-list">
          {sections.map((section) => (
            <div className="flex">
              {Object.keys(section).map((key) => (
                <div>
                  <span className="list-label">{key}</span>
                  {section[key]?.map((item) => (
                    <div>
                      <span className="list-item">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <h1>Quicklinks</h1>
   
      </div>
    </footer>
  );
};

export default Footer;