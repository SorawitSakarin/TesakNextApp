'use client';
import { useEffect, useRef } from 'react';
// import Video from '@/assets/test-video.mp4';
const ScrollVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleScroll = () => {
    if (videoRef.current) {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScreens = 8;
      const videoDuration = 20; // 20 seconds

      // Calculate the scroll range for the video playback
      const maxScrollPosition = (totalScreens - 1) * windowHeight;
      const scrollRatio = scrollPosition / maxScrollPosition;
      const currentVideoTime = scrollRatio * videoDuration;

      videoRef.current.currentTime = currentVideoTime;
      console.log(currentVideoTime);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      {/* <video
        // ref={videoRef}
        className='w-full h-auto'
        src='/public/assets/video.mp4'
        muted
      /> */}
      <video ref={videoRef} preload='auto' playsInline>
        <source src='/assets/test-video2.mp4' type='video/mp4' />
        <source src='/assets/test-video3.webm' type='video/webm' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ScrollVideo;
