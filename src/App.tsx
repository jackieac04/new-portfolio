import { Routes, Route, Link } from "react-router-dom";
import Art from "./art/Art";
import UIUX from "./uiux/UIUX";
import ResponsiveRedesign from "./uiux/ResponsiveRedesign";
import AB from "./uiux/AB";
import CS from "./cs/CS";
import "./App.css";
import Development from "./uiux/Development";
import Iterative from "./uiux/Iterative";

function App() {
  return (
    <>
      <article className="route-content">
        <nav>
          <div className="left-links">
            {/* TODO replace with logo */}
            <Link to={"/"}>JAC</Link>
          </div>
          <div className="right-links">
            <Link className="cs" to={"/cs"}>
              CS
            </Link>
            <Link className="uiux" to={"/uiux"}>
              UIUX
            </Link>
            <Link className="art" to={"/art"}>
              Art
            </Link>
          </div>
        </nav>
        <div className="dropdowns">
          <div className="art-links"></div>
          <div className="uiux-links">
            <p>Responsive Redesign</p>
          </div>
          <div className="cs-links"></div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/art" element={<Art />} />
          <Route path="/uiux" element={<UIUX />}>
            <Route index element={<UIUX />} />
          </Route>
          <Route path="/respred" element={<ResponsiveRedesign />} />
          <Route path="/abtest" element={<AB />} />
          <Route path="/dev" element={<Development />} />
          <Route path="/cs" element={<CS />} />
          <Route path="/iter" element={<Iterative />} />
        </Routes>
      </article>
    </>
  );
}

function Home() {
  return (
    <main>
      <h1 className="text-5xl">Jaclyn Cohen</h1>
      <h3>Insert actual content here, about me / my work </h3>
      <p>
        This website is still in progress :) I need to migrate all of my code
        from my old, much more poorly constructed (but very pretty!)
        <a href="https://jaclynacohen.vercel.app"> site.</a>
      </p>
    </main>
  );
}

function NotFound() {
  return <h1>Not Found</h1>;
}

export default App;
