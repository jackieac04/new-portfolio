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
            <div className="img-overlay">
              <img src={respred} alt="" />
            </div>

            <p>Responsive Redesign</p>
          </div>
        </Link>
        <Link to={"/abtest"}>
          <div className="box">
            <div className="img-overlay">
              <img src={abtest} alt="" />
            </div>

            <p>A/B Testing</p>
          </div>
        </Link>
        <Link to={"/dev"}>
          <div className="box">
            <div className="img-overlay">
              <img src={dev} alt="" />
            </div>

            <p>Development</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
