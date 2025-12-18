import { useState } from "react";
import "./modal.css";

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
    <main className="modal-root">
      {/* bg overlay */}
      <div
        className="modal-overlay"
        onClick={() => setModalOpen(false)}
      />

      <div className="modal-container">
        <div className="modal-left">
          {mainimg.endsWith("mp4") ? (
            <video
              autoPlay
              loop
              controls
              className="modal-main-img"
              src={mainimg}
            />
          ) : (
            <img
              src={mainimg}
              className="modal-main-img"
              alt=""
            />
          )}

          <div className="modal-thumbnails">
            {imgs.length > 1 &&
              imgs.map((bby, ind) => (
                <img
                  key={ind}
                  src={bby}
                  className="modal-thumb-img"
                  alt=""
                  onClick={() => setMainImg(bby)}
                />
              ))}
          </div>
        </div>

        <div className="modal-right modal">
          <div className="modal-right-inner">
            <h1 className="modal-title">{title}</h1>

            <div className="modal-meta">
              <p>{date}</p>
              <p>{media}</p>
            </div>

            <div>
              <p className="modal-desc">{desc}</p>
              <p className="modal-awards">{awards}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
