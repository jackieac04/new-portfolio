import "./uiux.css";
import respred from "/respred.png";

export default function UIUX() {
  return (
    <main>
      <h1>UIUX Projects</h1>
      <div className="box-grid">
        <a href="/uiux/respred">
          <div className="box">
            <div className="img-overlay">
              <img src={respred} alt="" />
            </div>

            <p>Responsive Redesign</p>
          </div>
        </a>
      </div>
    </main>
  );
}
