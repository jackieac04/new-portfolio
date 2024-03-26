import { Link } from "react-router-dom";
import "./uiux.css";
import respred from "/respred/respred.png";
import abtest from "/ab/bchange.png";
import dev from "/dev/dev.png";

export default function UIUX() {
  return (
    <main>
      <h1>UIUX Projects</h1>
      <div className="box-grid">
        <Link to={"/respred"}>
          <div className="box">
            <p>Responsive Redesign</p>
            <div className="img-overlay">
              <img src={respred} alt="" />
              <div className="skills">
                <div className="skill sm HTML">HTML</div>
                <div className="skill sm CSS">CSS</div>
                <div className="skill sm Figma">Figma</div>
                <div className="skill sm rr">Responsive Design</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/abtest"}>
          <div className="box">
            <p>A/B Testing</p>
            <div className="img-overlay">
              <img src={abtest} alt="" />
              <div className="skills">
                <div className="skill sm HTML">HTML</div>
                <div className="skill sm CSS">CSS</div>
                <div className="skill sm rr">Responsive Design</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/dev"}>
          <div className="box">
            <p>Development</p>
            <div className="img-overlay">
              <img src={dev} alt="" />
              <div className="skills">
                <div className="skill sm react">React</div>
                <div className="skill sm HTML">HTML</div>
                <div className="skill sm CSS">CSS</div>
                <div className="skill sm Figma">Figma</div>
                <div className="skill sm rr">Responsive Design</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
