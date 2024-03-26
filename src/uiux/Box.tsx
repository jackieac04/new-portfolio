import { Link } from "react-router-dom";

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
        <div className="topbox">
          <div className="innerbox">
            <p className="bxtitle">{title}</p>
            {outsidelink && (
              <Link className="link" to={outsidelink}>
                {" "}
                <img src="/link.svg" alt="" />
              </Link>
            )}
          </div>
        </div>
        <Link to={insidelink}>
          <div className="img-overlay">
            <img src={img} alt="" />
            <div className="skills">
              {skills.map((skill) => {
                return (
                  <div className={`skill sm ${skill}`} key={skill}>
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
