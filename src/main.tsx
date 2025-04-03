import React, { useState, useEffect, useRef } from "react";
import "./CSS/main.css";

const Main: React.FC = () => {
  // スライドショー画像格納用の配列
  const images = [
    `${process.env.PUBLIC_URL}/photo/slideShow/photo1.jpeg`,
    `${process.env.PUBLIC_URL}/photo/slideShow/photo2.jpeg`,
    `${process.env.PUBLIC_URL}/photo/slideShow/photo3.jpeg`,
    `${process.env.PUBLIC_URL}/photo/slideShow/photo4.jpeg`,
    `${process.env.PUBLIC_URL}/photo/slideShow/photo5.jpeg`,
    `${process.env.PUBLIC_URL}/photo/slideShow/photo6.jpeg`,
  ];

  // むぎ画像用の配列
  const mugiImages = [
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo1.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo2.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo3.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo4.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo5.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo6.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo7.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo8.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo9.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo10.jpeg`,
  ];

  // つくね画像用の配列
  const tukuneImages = [
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo1.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo2.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo3.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo4.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo5.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo6.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo7.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo8.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo9.jpeg`,
    `${process.env.PUBLIC_URL}/photo/tukune/tukune_photo10.jpeg`,
  ];

  // スライドショーのインデックスを管理するstate
  const [currentIndex, setCurrentIndex] = useState(0);

  // スライドショーの自動切り替え用のuseEffect
  const photoRefs = useRef<(HTMLImageElement | null)[]>([]);

  // スライドショーの切り替え用の関数
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  // 前の画像に戻る関数
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 次の画像に進む関数
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    photoRefs.current.forEach((photo) => {
      if (photo) {
        observer.observe(photo);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <section className="slide-section">
        <div className="slideshow-container">
          <div className="slideshow-controls">
            <button onClick={handlePrev} className="slideshow-button">
              &lt;
            </button>
            <button onClick={handleNext} className="slideshow-button">
              &gt;
            </button>
          </div>
          <div className="slide">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slide-item ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`むぎとつくね ${index + 1}`}
                  className="slide-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mugi-section">
        <h1 className="mugi-font md:text-5xl text-3xl mt-8 mb-8 text-center title">
          Mugi
        </h1>
        <video
          className="w-full"
          src={`${process.env.PUBLIC_URL}/movie/mugi/mugi_movie1.mp4`}
          controls
          autoPlay
          loop
          muted
        />
        <div className="photo-container mt-8 m-auto">
          {mugiImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`むぎ ${index + 1}`}
              className="photo"
              ref={(el) => {
                if (el) {
                  photoRefs.current[index] = el;
                }
              }}
            />
          ))}
        </div>
      </section>

      <section className="tukune-section">
        <h1 className="tukune-font md:text-5xl text-3xl mt-12 mb-4 text-center title">
          Tukune
        </h1>
        <video
          className="w-full"
          src={`${process.env.PUBLIC_URL}/movie/tukune/tukune_movie1.mp4`}
          controls
          autoPlay
          loop
          muted
        />
        <div className="photo-container mt-8 m-auto">
          {tukuneImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`つくね ${index + 1}`}
              className="photo"
              ref={(el) => {
                if (el) {
                  photoRefs.current[mugiImages.length + index] = el;
                }
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
