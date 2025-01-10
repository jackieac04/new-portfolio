// import React from "react";
import posters from "/cs/pabhome.png";
import pablofi from "/cs/pablofi.png";
import profile from "/cs/pabprofile.png";
import edit from "/cs/pabprofileedit.png";
import pabcal from "/cs/pabcal.png";

export default function Pab() {
  return (
    <main className="min-h-screen pt-[5vh] pb-[7vh]">
      <div className="outer">
        <div className="top">
          <h1 className="text-[5rem]">Posters@Brown</h1>
          <div className="info">
            <div className="role">
              <h3>Role</h3>
              <p>Fullstack Developer, UI/UX Designer</p>
            </div>
            <div className="role">
              <h3>Duration</h3>
              <p>November 2023 - Present</p>
            </div>
            <div className="role">
              <h3>Team</h3>
              <p>
                {" "}
                Katie Li (Developer), Anna Wang (Developer, Designer), AJ Wu
                (Developer)
              </p>
            </div>
          </div>
          <div className="skillswrap">
            <img src={posters} className="imgg" />

            <div className="skills">
              <div className="skill csskill">Java</div>
              <div className="skill csskill">TypeScript</div>
              <div className="skill csskill">React</div>
              <div className="skill designskill">Fullstack Development</div>
              <div className="skill csskill">APIs</div>
              <div className="skill designskill">Responsive Design</div>
              <div className="skill csskill">SpringBoot</div>
              <div className="skill HTML">MongoDB</div>
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
                <b>Posters@Brown</b> is a centralized event posting hub for
                students in the Brown/RISD community.
              </p>
              <p className="btm">
                Many Brown University buildings will be covered in posters for
                events, speakers, and club meetings. With no streamlined digital
                platform for advertising, students often miss out on events they
                care about. Posters@Brown, solves this problem and serves as an
                event archival platform for student activities for years to
                come.
              </p>
            </div>
          </div>
          <h3>The Design</h3>
          <p className="btm">
            The primary goal of the design was to make an aesthetic,
            user-friendly web application that would attract university
            students. We focused on soft fonts, pastel colors, and eye-catching
            elements to suit modern trends.
          </p>
          <div className="mocks">
            <a
              href="https://www.figma.com/design/G9IlhG0Ztth15YF65V8ACE/Posters%40Brown?t=SKU4gV8P63qZXXCO-0"
              className="flex flex-col items-center mockst"
            >
              <img src={pablofi} className="imgg" />
              <img src={posters} className="imgg" />
            </a>
          </div>
          <p className="btm">
            The corresponding lofi and hifi designs. The colors were made
            brighter, and the overall design was made friendlier.
          </p>

          <h3>Features: Profile, Creating a Poster, Calendar...</h3>
          <p className="btm">
            <b>Posters@Brown</b> has several features that make it a little bit
            * more * than just an event hosting app, and bring it closer into
            the realm of personal planning and social media.
          </p>
          <h3 className="!text-[2.7rem]">Profile</h3>
          <div className="mockst flex flex-col items-center">
            <img className="imgg" src={profile} alt="" />
            <img className="imgg" src={edit} alt="" />
          </div>
          <p className="btm">
            Once a user logs in by authenticating their Brown or RISD email
            through google, the profile allows users to create and view
            user-specific data: their own created events, what they've liked,
            and posters they've begun to create but not yet finished.
          </p>
          <p className="btm">
            Users can also change their profile name, image, and select up to 5
            of their own interests. Currently this is only aesthetic
            functionality, but in future updates we hope to allow users to
            search for posters matching their interests, and be reccommended
            events based on their interests.
          </p>
          <h3 className="!text-[2.7rem]">Creating a Poster</h3>
          <p className="btm">
            Creating a poster is a multi-step process. First a user can choose
            to enter a link to an image online or upload an image from their own
            device. If a user uploads their own image, we use the{" "}
            <b>Imgur API</b> to turn it into a web-based image, so that we don't
            have to store the images on our side.
          </p>
          <p className="btm">
            Next, the image is fed to <b>OpenAI's Whisper ASR</b>, which detects
            text on the image and autmoatically fills in related fields for the
            user, though they can change it if they have other ideas.
          </p>
          <p className="btm">
            Once a user enters in all of the necessary information, they proceed
            to the next page where they can select tags that correspond to their
            event- such as "academic" or "free food". This way, other users can
            easily sort by the types of events they want to attend.
          </p>
          <p className="btm">
            Along the way, hitting "save draft" will allow the user to save data
            without posting it, while after this step the "create poster" option
            will appear. But fear not! If a uesr makes a mistake, they can go
            back and edit their poster after it has been created, from their
            profile.
          </p>
          <h3 className="!text-[2.7rem]">Likes and Calendar</h3>
          <div className="mockst">
            <img className="imgg" src={pabcal} alt="" />
          </div>
          <p className="btm">
            One of P@B's main features is allowing users to easily keep track of
            events they want to go to. After a uesr likes a poster, it will show
            up in their likes and on their P@B calendar. In the future, we hope
            to take advantage of the Google Calendar API to allow users to
            directly add events to their calendar, as this is the most common
            calendar platform for students on College Hill.
          </p>

          <div className="bottom grid justify-self-center max-w-[70vw] my-[4vh] outline">
            <h3 className="justify-self-center">Lessons Learned</h3>
            <p className="btm">
              This project taught me how to work on a longterm project with a
              small team, with emphasis on maintaining code readability for
              years after it began, and continuously adding new features pre-
              and post-deployment.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
