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
            <h3
              className="bxtitle !text-lg"
              style={{ fontFamily: "var(--sans)", fontStyle: "normal" }}
            >
              {title}
            </h3>
            {outsidelink && (
              <a
                className="link"
                href={outsidelink}
                style={{ transform: "translateX(-70%)" }}
              >
                {" "}
                <img src={link} alt="" />
              </a>
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
