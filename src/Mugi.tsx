import React, { useState, useEffect, useRef } from "react";
import "./CSS/main.css";
import VideoPlayer from "./Component/VideoPlayer";

const Mugi: React.FC = () => {
  // スライドショー画像格納用の配列
  const mugiImages = [
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo11.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo12.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo13.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo14.jpeg`,
    `${process.env.PUBLIC_URL}/photo/mugi/mugi_photo15.jpeg`,
  ];

  // 画像用の配列
  const mugiMovies = [
    `${process.env.PUBLIC_URL}/movie/mugi/mugi_movie2.mp4`,
    `${process.env.PUBLIC_URL}/movie/mugi/mugi_movie3.mp4`,
    `${process.env.PUBLIC_URL}/movie/mugi/mugi_movie4.mp4`,
    `${process.env.PUBLIC_URL}/movie/mugi/mugi_movie5.mp4`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // スライドショーの自動切り替え用のuseEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mugiImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [mugiImages.length]);

  return (
    <div>
      <div className="mugi-slideshow-container">
        <div className="mugi-slide">
          {mugiImages.map((image, index) => (
            <div
              key={index}
              className={`mugi-slide-item ${
                index === currentIndex ? "mugi-active" : ""
              }`}
            >
              <img
                src={image}
                alt={`Mugi ${index + 1}`}
                className="mugi-slide-image"
              />
            </div>
          ))}
        </div>
      </div>
      <section className="mugi-video-section mt-8">
        <h2 className="text-center title mb-8 md:text-4xl text-2xl">
          Mugi Movie
        </h2>
        {mugiMovies.map((movie, index) => {
          return (
            <div
              key={index}
              className="mugi-video-container w-full object-cover mt-2"
            >
              <VideoPlayer src={movie} />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Mugi;
