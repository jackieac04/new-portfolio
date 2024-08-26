import { Link } from "react-router-dom";
import link from "/main/link.svg";

interface boxProps {
  outsidelink: string | null;
  insidelink: string;
  skills: string[];
  img: string;
  title: string;
}

export default function Box({
  outsidelink,
  insidelink,
  skills,
  img,
  title,
}: boxProps) {
  return (
    <>
      <div className="box">
        <Link to={insidelink}>
          <div className="img-overlay">
            <img className="imgg" src={img} alt="" />
          </div>
        </Link>
        <div className="topbox">
          <div className="innerbox">
            <h1 className="bxtitle" style={{ fontStyle: "normal" }}>
              {title}
            </h1>
            {outsidelink && (
              <a
                className="link"
                href={outsidelink}
                style={{ transform: "translateX(-70%)" }}
              >
                {" "}
                <img className="imgg" src={link} alt="" />
              </a>
            )}
          </div>
        </div>
        <div className={`skills lil`}>
          {skills.map((skill) => {
            return (
              <div className={`skill sm ${skill}`} key={skill}>
                <p>{skill}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
