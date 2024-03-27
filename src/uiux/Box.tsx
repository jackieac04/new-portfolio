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
            <img src={img} alt="" />
          </div>
        </Link>
        <div className="topbox">
          <div className="innerbox">
            <p className="bxtitle">{title}</p>
            {outsidelink && (
              <Link className="link" to={outsidelink}>
                {" "}
                <img src={link} alt="" />
              </Link>
            )}
          </div>
        </div>
        <div className="skills lil">
          {skills.map((skill) => {
            return (
              <div className={`skill sm ${skill}`} key={skill}>
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
