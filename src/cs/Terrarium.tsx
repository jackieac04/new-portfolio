import ter from "/cs/ter.png";
import sheep from "/cs/sheep.png";
import rainy from "/cs/rainy.png";

export default function Terrarium() {
  return (
    <main className="min-h-screen pt-[5vh] pb-[7vh]">
      <div className="outer">
        <div className="top">
          <h1 className="text-[5rem]">Terrarium World</h1>
          <div className="info">
            <div className="role">
              <h3>Role</h3>
              <p>Developer</p>
            </div>
            <div className="role">
              <h3>Duration</h3>
              <p>November 2024 - December 2024</p>
            </div>
            <div className="role">
              <h3>Team</h3>
              <p>
                Soujanya C. Aryal (Developer), Anna Wang (Developer), Grace Ma
                (Developer)
              </p>
            </div>
          </div>
          <div className="skillswrap">
            <img src={ter} className="imgg" />

            <div className="skills">
              <div className="skill csskill">JavaScript</div>
              <div className="skill csskill">Three.js </div>
              <div className="skill csskill">React Three Fiber </div>
              <div className="skill designskill">Blender</div>
              <div className="skill csskill">Drei</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="text grid">
          <div className="grid  md:grid-cols-9 lg:grid-cols-9 w-full justify-center text-center sm:grid-flow-row md:grid-flow-column lg:grid-flow-column">
            <div className="lef justify-self-center col-span-9 mb-[2vw] outline">
              <h3>Project Overview</h3>
              <p className="btm">
                Terrarium World was created for our final project in CSCI 1230:
                Introduction to Computer Graphics. It offers a slight twist on
                the traditional terrarium- including its own weather and animals
                that you might not expect to find.
              </p>
            </div>
          </div>
          <h3>Major Features</h3>
          <ul
            className="btm 
    pl-[2rem]"
          >
            <li>
              <p>A Weather simulation (Sunny, Rainy, Snowy, Foggy)</p>
            </li>
            <li>
              <p> A time of day slider</p>
            </li>
            <li>
              <p>Plants made from an L-System</p>
            </li>
            <li>
              <p>Fireflies acting as boids</p>
            </li>
          </ul>
          <div className="mocks"></div>

          <div className="mockst">
            <img src={rainy} alt="" />
          </div>

          <h3>Smaller and Bonus Features</h3>
          <ul
            className="btm 
    pl-[2rem]"
          >
            <li>
              <p>wavy grass, moved by wind speed</p>
            </li>
            <li>
              <p> a moveable desk lamp</p>
            </li>
            <li>
              <p>a clock counting the time</p>
            </li>
            <li>
              <p>a (transparent) cow rigged and animated in blender</p>
            </li>
            <li>
              <p>lots of 3D low poly animals and plants</p>
            </li>
            <li>
              <p>transparency and refraction</p>
            </li>
          </ul>

          <div className="mockst">
            <img src={sheep} alt="" />
          </div>

          <div className="bottom grid justify-self-center max-w-[70vw] my-[4vh] outline">
            <h3 className="justify-self-center">Lessons Learned</h3>
            <p className="btm">
              This project taught me how to work quickly and learn new tools
              under a time crunch- I had never used three.js or blender before!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
