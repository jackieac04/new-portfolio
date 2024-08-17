import { useState, useEffect } from "react";
import phone from "/main/iPhone.mp4";
import ipad from "/main/iPad_Version.mp4";
import desktop from "/main/webfishbg.mp4";

const VideoComponent = () => {
  const [videoSrc, setVideoSrc] = useState(desktop);

  useEffect(() => {
    const updateVideoSrc = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setVideoSrc(phone);
      } else if (window.matchMedia("(max-width: 1190px)").matches) {
        setVideoSrc(ipad);
      } else {
        setVideoSrc(desktop);
      }
    };

    // Initial check
    updateVideoSrc();

    // Add event listener to handle screen resize
    window.addEventListener("resize", updateVideoSrc);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  return (
    <video
      loop
      src={videoSrc}
      className="!w-screen object-cover"
      typeof="video/mp4"
      autoPlay
      id="video"
    />
  );
};

export default VideoComponent;
