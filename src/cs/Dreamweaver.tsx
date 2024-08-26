import dream from "/cs/dream.png";
import dreamfigma from "/cs/dreamfigma.png";
import entryfigma from "/cs/entryfigma.png";
import statsfigma from "/cs/statsfigma.png";
import stats from "/cs/dreamgraphs.png";
import dreamentry from "/cs/dreamentry.png";

export default function Dreamweaver() {
  return (
    <main className="min-h-screen pt-[5vh] pb-[7vh]">
      <div className="outer">
        <div className="top">
          <h1 className="text-[5vw]">Dreamweaver</h1>
          <div className="info">
            <div className="role">
              <h3>Role</h3>
              <p>Front end Developer, UI/UX Designer</p>
            </div>
            <div className="role">
              <h3>Duration</h3>
              <p>November 2023 - December 2023</p>
            </div>
            <div className="role">
              <h3>Team</h3>
              <p> Wangdrak Dorji (Developer), Cassius Hall (Developer)</p>
            </div>
          </div>
          <div className="skillswrap">
            <img src={dream} className="imgg" />

            <div className="skills">
              <div className="skill HTML">TypeScript</div>
              <div className="skill CSS">React</div>
              <div className="skill Figma">Frontend Development</div>
              <div className="skill Responsive">APIs</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="text grid">
          <div className="grid  md:grid-cols-9 lg:grid-cols-9 w-full justify-center text-center sm:grid-flow-row md:grid-flow-column lg:grid-flow-column">
            <div className="lef justify-self-center col-span-9 mb-[2vw]">
              <h3>Project Overview</h3>
              <p className="btm">
                <b>Dreamweaver</b> is a <b>hypermedia</b> based sleep tracking
                webapp that allows users to record their dreams through text,
                audio (which is transcribed to text), and images.
              </p>
              <p className="btm">
                Users can record details about their sleep quality, dreams, and
                hours slept and within each dream note, users can link
                timestamps and common themes in their dreams to other dreams, to
                find connections between dreams. They can also make dream
                folders, containing dreams of similar time periods or themes.{" "}
              </p>
              <p className="btm">
                This project was made in collaboration with <b>Cassius Hall</b>{" "}
                and <b>Wangdrak Dorji</b>, where my role was primarily{" "}
                <b>design and frontend engineering.</b>
              </p>
            </div>
          </div>
          <h3>The Design</h3>
          <p className="btm">
            My first primary task on the project was to revamp the design. While
            the existing interface was clean and usuable, it didn't reflect the
            cozy atmosphere we were intending on presenting for the app. I began
            with the existing layout, and made some mockups for how the pages
            might look.
          </p>
          <div className="mocks">
            <a
              href="https://www.figma.com/design/uu9Gefn6bl8bfFIPCzMYh4/Dreamweaver?node-id=0-1&t=f3vrdXoW0Crih5RI-0"
              className="flex flex-col items-center"
            >
              <img src={dreamfigma} className="imgg" />
              <img src={entryfigma} className="imgg" />
              <img src={statsfigma} className="imgg" />
            </a>
          </div>
          <p className="btm">
            {" "}
            The dark blue color scheme, hand-drawn elements and rounded icons
            reflect the vibe we were going for. Even though much of the added
            "cutsiness" didn't end up being implemented due to the short
            timeframe for the project, the overall concept looks similar to the
            final product.
          </p>
          <p className="btm">
            Additionally, the stats page on the final design maximizes for
            accessibility, maintaining high contrast and roughly equal sizing
            between each type of graph.
          </p>
          <h3>The Statistics Page</h3>
          <p className="btm">
            My primary logical work on the project was to implement the frontend
            and design for the statistics modal.
          </p>
          <p className="btm">
            One of Dreamweaver's functions is to aggregate your sleep data, so
            if you report you slept 8 hours every day for a week, it'll display
            that in a graph.
          </p>
          <p className="btm">
            We also used a word cloud to visually display which words were most
            commonly found in your dreams, and a pie chart to display a user's
            average sleep quality.
          </p>
          <div className="mockst">
            <img src={stats} className="imgg" />
          </div>
          <p className="btm">
            I primarily used the Chart API to create these diagrams.
          </p>
          <h3>The Final Site</h3>
          <p className="btm">
            The UI of the final site looks fairly similar, but not identical to
            my designs.
          </p>
          <div className="mockst ">
            <a
              href="https://dreamweaver-ten.vercel.app"
              className="flex flex-col justify-center items-center"
            >
              <img src={dream} className="imgg" />
              <img src={dreamentry} className="imgg" />
            </a>
          </div>
          <div className="bottom grid justify-self-center max-w-[70vw] my-[4vh]">
            <h3 className="justify-self-center">Lessons Learned</h3>
            <p className="btm">
              This project taught me how to rework UI from an existing site, and
              work with a preestablished codebase, while applying new APIs and
              adding features that used existing data to create new elements.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
