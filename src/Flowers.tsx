interface FlowerInterface {
  dark: boolean;
  video: string;
  videoDark: string;
}

export default function Flowers({ dark, videoDark, video }: FlowerInterface) {
  return (
    <>
      {!dark ? (
        <video
          src={video}
          loop
          typeof="video/mp4"
          autoPlay
          className="w-[10%]"
        />
      ) : (
        <video
          src={videoDark}
          loop
          typeof="video/mp4"
          autoPlay
          className="w-[10%]"
        />
      )}
    </>
  );
}
