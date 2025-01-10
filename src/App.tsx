import { Routes, Route, Link } from "react-router-dom";
import Art from "./art/Art";
import UIUX from "./uiux/UIUX";
import ResponsiveRedesign from "./uiux/ResponsiveRedesign";
import AB from "./uiux/AB";
import CS from "./cs/CS";
import "./App.css";
import Development from "./uiux/Development";
import Iterative from "./uiux/Iterative";
import { useState } from "react";
import BLT from "./uiux/BLT";
import Bathrooms from "./cs/Bathrooms";
import Pab from "./cs/Pab";
import resume from "/main/JaclynCohenResume0125FE.pdf";
import Dreamweaver from "./cs/Dreamweaver";
import Footer from "./Footer";
import me from "/main/me.jpg";

function App() {
  return (
    <>
      <article className={`route-content min-h-[105vh]`}>
        <nav id="nav" className="mt-[1rem]">
          <div className="left-links grid grid-cols-2 relative">
            <Link to={"/"}>
              <div> JAC</div>
            </Link>
          </div>
          <div className="right-links">
            <Link className="cs" to={"/cs"}>
              Software
            </Link>
            <Link className="uiux" to={"/uiux"}>
              Design
            </Link>
            <Link className="art" to={"/art"}>
              Art
            </Link>
            <a href={resume} target="_blank">
              Resumé
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<Art />} />
          <Route path="/uiux" element={<UIUX />}></Route>
          <Route path="/respred" element={<ResponsiveRedesign />} />
          <Route path="/abtest" element={<AB />} />
          <Route path="/dev" element={<Development />} />
          <Route path="/cs" element={<CS />} />
          <Route path="/iter" element={<Iterative />} />
          <Route path="/blt" element={<BLT />} />
          <Route path="/bath" element={<Bathrooms />} />
          <Route path="/pab" element={<Pab />} />
          <Route path="/terworld" element={<Terrarium />} />
          <Route path="/dream" element={<Dreamweaver />} />
        </Routes>
        <div className="w-full h-fit">
          <Footer />
        </div>
      </article>
    </>
  );
}

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import meArt from "/main/me.png";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Firefly from "./Fireflies.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ColorfulFog from "./ColorfulFog.jsx";

import Terrarium from "./cs/Terrarium";

const Scene = () => {
  // Generate fireflies positions within the sphere
  const generateFireflies = (count: number) => {
    const fireflies = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 6 - 3; // Range -3 to 3
      const y = Math.random() * 6 - 3; // Range -3 to 3
      const z = Math.random() * 6 - 3; // Range -3 to 3
      fireflies.push({ initialPosition: [x, y, z] });
    }
    return fireflies;
  };

  const fireflies = generateFireflies(20); // Generate 20 fireflies

  return (
    <>
      {/* Fireflies */}
      {fireflies.map((firefly, index) => (
        <Firefly
          key={index}
          initialPosition={firefly.initialPosition}
          allFireflies={undefined}
        />
      ))}
      <ambientLight intensity={0.5} />
      <ColorfulFog />
    </>
  );
};

const Home = () => {
  const [img, setImg] = useState<boolean>(false);
  return (
    <>
      {/* Background Canvas */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Scene />
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1>Jaclyn Cohen</h1>
          <p>Developer, Designer, Artist</p>
        </div>

        {/* About Section */}
        <section className="p-32 gap-y-24 flex flex-col bg-orange-50">
          <div className="flex flex-col md:flex-row">
            <div className="flex-col  md:w-2/3">
              <h2>About Me</h2>
              <p className="">
                Hi! My name is Jaclyn Cohen, I'm a junior at{" "}
                <b className="focus"> Brown University </b>
                studying <b className="focus">Computer Science </b> and{" "}
                <b className="focus">Visual Arts.</b> I love both topics
                individually but I'm especially interested in intersections
                between the two from <b>graphics</b> to{" "}
                <b className="focus">frontend development </b>
                to <b className="focus">UIUX</b> and everything inbetween.
              </p>
            </div>

            <div
              className="rounded mx-[2.5%] object-contain flex justify-center flex flex-col"
              onMouseEnter={() => setImg(true)}
              onMouseLeave={() => setImg(false)}
            >
              {!img ? (
                <img className="max-h-[80vh] rounded" src={me} />
              ) : (
                <img className="max-h-[80vh] rounded" src={meArt} />
              )}
              <p>The glasses are perscription!</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
