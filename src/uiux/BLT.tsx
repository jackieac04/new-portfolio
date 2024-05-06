import blt from "/blt/blt.png";
import og from "/blt/devog.png";
import homelofi from "/blt/homelofi.png";
import partnerslofi from "/blt/partnerslofi.png";
import homehifi from "/blt/homehifi.png";
import partnershifi from "/blt/partnerhifi.png";
import bltnews from "/blt/newsletter.png";
import designsys from "/blt/designsys.png";

export default function BLT() {
  return (
    <main className="pt-[5vh]">
      <div className="outer">
        <div className="top">
          {" "}
          <h1 className="text-5xl">Brown Development Labs</h1>
          <div className="skillwrap">
            <img src={blt} />
            <div className=""></div>
            <div className="skills">
              <div className="skill Figma">Figma</div>
              <div className="skill Responsive">Responsive Design</div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div
          className="lightsvg custom-shape-divider-top-1714497700 relative w-screen"
          style={{ transform: "translateY(-5.1vh)" }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="lightsvg shape-fill"
            ></path>
          </svg>
        </div>
        <div className="text grid">
          <div className="grid grid-cols-2 w-full justify-center text-center ml-[5vw]">
            <div className="lef max-w-[40vw]">
              <h3>The People</h3>
              <p className="btm">
                The <b>Brown Development Labs</b> is a group of labs at Brown
                University that primarily study the cognitive science,
                linguistic, and psychology behind how people think.
              </p>
              <p className="btm">
                From the summer after my freshman year at Brown to present, I
                work as a research assistant for the{" "}
                <b>Brown Language and Thought Lab</b>, where I primarily do
                anything but research- creating graphics, and working as a
                designer and frontend engineer for sites and studies.
              </p>
            </div>
            <div className="righ max-w-[40vw]">
              <h3>The Problem</h3>
              <p className="btm">
                Much of the current site is out of date. Containing typos, old
                information, and reflecting design principles from researchers
                who are no longer affiliated with the Development Labs.
              </p>
              <p className="btm">
                So my task was to give the site a <b>fresh, new look</b>, and
                create a sample partnerships page that doesn't currently have a
                home on the site.
              </p>
            </div>
          </div>

          <a href="https://sites.brown.edu/devlabs/">
            <h3 className="underline">The Original Site</h3>
          </a>
          <p className="btm">First, I wanted to see what I was working with.</p>
          <div className="mockst">
            <img src={og} alt="" />
          </div>
          <p className="btm">
            The original site leaves much to be desired- for example, why is the
            nav bar in the middle of the screen? The world may never know. It's
            also not particularily inviting or visually appealing, given that
            much of the research is done for children, it should reflect that in
            its design.
          </p>
          <h3>Lofi Prototypes</h3>
          <p className="btm">
            Because there was an already existing site and I was making minimal
            content changes, I went directly to Figma and skipped the sketching
            stage.
          </p>
          <div className="mocks">
            <img src={homelofi} alt="" />
            <img src={partnerslofi} alt="" />
          </div>
          <p className="btm">
            After making these I was still disatisfied. I felt like the site
            needed a much more thorough revamp both in color scheme and in
            layout. My goal was to make the site look both more <b>friendly</b>{" "}
            and more <b>professional</b>, and I felt like thse designs didn't
            accomplish either of those goals.
          </p>
          <h3>Hifi Protoype</h3>
          <p className="btm">
            After some thinking and inspiration gathering from{" "}
            <a
              href="https://www.pinterest.com/search/pins/?q=child%20lab%20website%20ui&rs=typed"
              target="_blank"
            >
              this Pinterest search
            </a>
            , I came up with these hifis, which I feel reflect the goals of the
            project more.
          </p>
          <p className="btm">I then used this to make this final prototype.</p>
          <div className="mockst">
            <a
              className="flex justify-around w-full"
              href="https://www.figma.com/proto/5mJuDRxe0lTrI8aTfhqlNC/BLT?type=design&node-id=70-21&t=NGlf3pGD2SZvMrKK-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=70%3A21"
              target="_blank"
            >
              <img className="!max-w-[40%]" src={homehifi} alt="" />
              <img className="!max-w-[40%]" src={partnershifi} alt="" />
            </a>
          </div>
          <p className="btm">With this design system in mind:</p>
          <div className="mocks">
            <img src={designsys} alt="" />
          </div>
          <h3>Bonus Project</h3>
          <p className="btm">
            As a secondary project, I also designed a newsletter for the monthly
            emails that get sent out, based on the same design system.
          </p>
          <div className="mocks">
            <a
              href="https://www.figma.com/file/5mJuDRxe0lTrI8aTfhqlNC/BLT?type=design&node-id=0-1&mode=design&t=NGlf3pGD2SZvMrKK-0"
              target="_blank"
            >
              <img className="max-h-screen" src={bltnews} alt="" />
            </a>
          </div>
          <div className="bottom grid justify-self-center max-w-[70vw] my-[4vh]">
            <h3 className="justify-self-center">Lessons Learned</h3>
            <p className="btm">
              Through completing this project, I learned how to design for a
              group of people, all with similar but not exactly the same needs
              in a professional setting.{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
