import React, { useState, useEffect, useRef } from "react";
import "../CSS/main.css";

// コンポーネントのpropsの型定義
interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  // 動画の再生状態を管理するstate
  const videoRef = useRef<HTMLVideoElement>(null);

  // 動画の表示状態を管理するstate
  const [isVisible, setIsVisible] = useState(false);

  // 動画の読み込み状態を管理するstate
  const [isVideoReady, setIsVideoReady] = useState(false);

  // 動画の再生状態を判定するuseEffect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // 動画の再生状態を判定するuseEffect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // 動画の再生状態を判定するuseEffect
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    if (isVisible) {
      video.play().catch((error) => {
        console.error("動画の再生中にエラーが発生しました:", error);
      });
    } else {
      video.pause();
    }
  }, [isVisible, isVideoReady]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="w-full"
        src={src}
        controls
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
