import { useState } from "react";

interface ModalProps {
  title: string;
  imgs: string[];
  date: string;
  media: string;
  awards: string | undefined;
  desc: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  title,
  imgs,
  date,
  media,
  awards,
  desc,
  setModalOpen,
}: ModalProps) {
  const [mainimg, setMainImg] = useState<string>(imgs[0]);
  return (
    <main className=" w-full h-screen fixed top-0">
      {/* bg overlay */}
      <div
        className="top-0 w-full h-screen  bg-black opacity-60 fixed z-5"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex flex-col md:grid md:grid-cols-2  w-[80vw] h-[80vh] rounded-lg mx-[10vw] my-[10vh] fixed">
        <div className=" self-center flex flex-col justify-center max-h-[60vh] md:max-h-screen md:w-[40vw] ">
          {mainimg.endsWith("mp4") ? (
            <video
              autoPlay
              loop
              controls
              className="imgg !max-w-[75%] max-h-full "
              src={mainimg}
            />
          ) : (
            <img
              src={mainimg}
              className="imgg !max-w-[75%] max-h-full "
              alt=""
            />
          )}

          <div className="w-[30vw] h-[5vw] flex overflow-x-scroll">
            {imgs.length > 1 &&
              imgs.map((bby, ind) => {
                return (
                  <img
                    key={ind}
                    src={bby}
                    className="imgg max-w-full max-h-full mx-[.5vw]"
                    alt=""
                    onClick={() => setMainImg(bby)}
                  />
                );
              })}
          </div>
        </div>
        <div
          className={
            "bg-orange-50 flex self-center w-[80vw] md:w-[40vw] md:fixed h-fit max-h-[80vh] overflow-y-scroll rounded-lg justify-self-end  p-[2vw] modal"
          }
        >
          <div className="right w-full flex flex-col">
            <h1 className="!text-[3rem] z-3 text-center justify-self-center mb-[1vh]">
              {title}
            </h1>
            <div className=" flex justify-between mb-[2vh] !text-[1.8rem]  ">
              <p>{date}</p> <p>{media}</p>
            </div>
            <div className="">
              <p className="!text-[2vw] md:!text-[1.5rem] my-[1vh]">{desc}</p>
              <p className=" !text-[1.2rem]"> {awards}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
