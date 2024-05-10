import { useState } from "react";

interface ModalProps {
  title: string;
  imgs: string[];
  date: string;
  media: string;
  awards: string | undefined;
  desc: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}

export default function Modal({
  title,
  imgs,
  date,
  media,
  awards,
  desc,
  setModalOpen,
  dark,
}: ModalProps) {
  const [mainimg, setMainImg] = useState<string>(imgs[0]);
  return (
    <main className=" w-full h-screen fixed top-0">
      {/* bg overlay */}
      <div
        className="top-0 w-full h-screen  bg-black opacity-60 fixed"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="grid grid-cols-2  w-[80vw] h-[80vh] rounded-lg mx-[10vw] my-[10vh] fixed">
        <div className=" self-center p-[1vw] w-[40vw] flex flex-col justify-center ">
          <img src={mainimg} className="max-w-full max-h-full " alt="" />{" "}
          <div className="w-full h-[5vw] flex ">
            {imgs.length > 1 &&
              imgs.map((bby, ind) => {
                return (
                  <img
                    key={ind}
                    src={bby}
                    className="max-w-full max-h-full mx-[.5vw]"
                    alt=""
                    onClick={() => setMainImg(bby)}
                  />
                );
              })}
          </div>
        </div>
        <div
          className={
            (dark ? "dark" : "light") +
            " flex self-center w-[40vw] h-fit rounded-lg justify-self-end fixed p-[2vw]"
          }
        >
          <div className="right w-full flex flex-col">
            <h1 className="text-[3vw] z-3 text-center justify-self-center mb-[1vh]">
              {title}
            </h1>
            <div className=" flex justify-between mb-[2vh]">
              <p>{date}</p> <p>{media}</p>
            </div>
            <div className="">
              <p className="!text-[1.5vw] my-[1vh]">{desc}</p>
              <p className=" !text-[1.2vw]"> {awards}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
