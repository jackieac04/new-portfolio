import flowers from "/main/flowers.mp4";
import flowersdark from "/main/flowersdark.mp4";

interface FlowerInterface {
  dark: boolean;
}

export default function Flowers({ dark }: FlowerInterface) {
  return (
    <>
      {!dark ? (
        <video
          src={flowers}
          loop
          typeof="video/mp4"
          autoPlay
          className="w-[10%]"
        />
      ) : (
        <video
          src={flowersdark}
          loop
          typeof="video/mp4"
          autoPlay
          className="w-[10%]"
        />
      )}
    </>
  );
}
