// import blt from "/blt/blt.png";
// import og from "/blt/devog.png";
// import homelofi from "/blt/homelofi.png";
// import partnerslofi from "/blt/partnerslofi.png";
// import homehifi from "/blt/homehifi.png";
// import partnershifi from "/blt/partnerhifi.png";
// import bltnews from "/blt/newsletter.png";
// import designsys from "/blt/designsys.png";
// import pin from "/blt/pinterest.png";

// export default function BLT() {
//   return (
//     <main className="pt-[5vh] pb-[9vh]">
//       <div className="outer">
//         <div className="top items-center">
//           {" "}
//           <h1>Brown Development Labs</h1>
//           <div className="info">
//             <div className="role">
//               <h3>Role</h3>
//               <p>UI/UX Designer</p>
//             </div>
//             <div className="role">
//               <h3>Duration</h3>
//               <p>April 2024</p>
//             </div>
//             <div className="role">
//               <h3>Team</h3>
//               <p> Just Me!</p>
//             </div>
//           </div>
//           <div className="skillwrap">
//             <img className="px-[5rem] py-[2rem]" src={blt} />
//             <div className=""></div>
//             <div className="skills">
//               <div className="skill Figma">Figma</div>
//               <div className="skill Responsive">Responsive Design</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="content">
//         <div className="text grid">
//           <div className="grid  md:grid-cols-9 lg:grid-cols-9 w-full justify-center text-center sm:grid-flow-row md:grid-flow-column lg:grid-flow-column">
//             <div className="lef justify-self-center col-span-4 mb-[2vw] outline">
//               <h3>The People</h3>
//               <p className="btm">
//                 The <b>Brown Development Labs</b> is a group of labs at Brown
//                 University that primarily study the cognitive science,
//                 linguistic, and psychology behind how people think.
//               </p>
//               <p className="btm">
//                 From the summer after my freshman year at Brown to present, I
//                 work as a research assistant for the{" "}
//                 <b>Brown Language and Thought Lab</b>, where I primarily do
//                 anything but research- creating graphics, and working as a
//                 designer and frontend engineer for sites and studies.
//               </p>
//             </div>
//             <div></div>
//             <div className="righ justify-self-center col-span-4 outline">
//               <h3>The Problem</h3>
//               <p className="btm">
//                 Much of the current site is out of date. Containing typos, old
//                 information, and reflecting design principles from researchers
//                 who are no longer affiliated with the Development Labs.
//               </p>
//               <p className="btm">
//                 As the sole designer among a cohort of researchers and
//                 engineers, my task was to give the site a <b>fresh, new look</b>
//                 , and create a sample partnerships page that doesn't currently
//                 have a home on the site.
//               </p>
//             </div>
//           </div>

//           <a href="https://sites.brown.edu/devlabs/">
//             <h3 className="underline">The Original Site</h3>
//           </a>
//           <p className="btm">First, I wanted to see what I was working with.</p>
//           <div className="mockst">
//             <img className="imgg" src={og} alt="" />
//           </div>
//           <p className="btm">
//             The original site leaves much to be desired- for example, why is the
//             nav bar in the middle of the screen? The world may never know. It's
//             also not particularily inviting or visually appealing, given that
//             much of the research is done for children, it should reflect that in
//             its design.
//           </p>
//           <h3>Research and Inspiration</h3>
//           <p className="btm">
//             To get a sense for some popular design styles in this area, I
//             searched for UI of sites with similar purposes. Pictured are some of
//             the many sites I used for inspiration.{" "}
//           </p>
//           <div className="mockst">
//             <img className="imgg" src={pin} alt="" />
//           </div>
//           <p className="btm">
//             These examples helped me get a sense for the style I was going for:
//             a <b>clean, colorful,</b> and <b>simple</b> design, with{" "}
//             <b>rounded elements</b> and{" "}
//             <b>friendly, eye-catching text and images.</b>
//           </p>
//           <h3>Lofi Prototypes</h3>
//           <p className="btm">
//             Because there was an already existing site and I was making minimal
//             content changes, I went directly to Figma and skipped the sketching
//             stage.
//           </p>
//           <div className="mocks">
//             <img className="imgg" src={homelofi} alt="" />
//             <img className="imgg" src={partnerslofi} alt="" />
//           </div>
//           <p className="btm">
//             After making these I was still disatisfied. I felt like the site
//             needed a much more thorough revamp both in color scheme and in
//             layout. My goal was to make the site look both more <b>friendly</b>{" "}
//             and more <b>professional</b>, and I felt like thse designs didn't
//             accomplish either of those goals.
//           </p>
//           <h3>Hifi Protoype</h3>
//           <p className="btm">
//             After some thinking and inspiration gathering from the
//             aforementioned research, I came up with these hifis, which I feel
//             reflect the goals of the project more.
//           </p>
//           <p className="btm">I then used this to make this final prototype.</p>
//           <div className="mockst">
//             <a
//               className="flex justify-around w-full"
//               href="https://www.figma.com/proto/5mJuDRxe0lTrI8aTfhqlNC/BLT?type=design&node-id=70-21&t=NGlf3pGD2SZvMrKK-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=70%3A21"
//               target="_blank"
//             >
//               <img className="imgg !max-w-[40%]" src={homehifi} alt="" />
//               <img className="imgg !max-w-[40%]" src={partnershifi} alt="" />
//             </a>
//           </div>
//           <p className="btm">With this design system in mind:</p>
//           <div className="mocks">
//             <img className="imgg" src={designsys} alt="" />
//           </div>
//           <h3>Bonus Project</h3>
//           <p className="btm">
//             As a secondary project, I also designed a newsletter for the monthly
//             emails that get sent out, based on the same design system.
//           </p>
//           <div className="mocks">
//             <a
//               href="https://www.figma.com/file/5mJuDRxe0lTrI8aTfhqlNC/BLT?type=design&node-id=0-1&mode=design&t=NGlf3pGD2SZvMrKK-0"
//               target="_blank"
//             >
//               <img className="imgg max-h-screen" src={bltnews} alt="" />
//             </a>
//           </div>
//           <div className="bottom grid justify-self-center max-w-[70vw] my-[4vh] outline">
//             <h3 className="justify-self-center">Lessons Learned</h3>
//             <p className="btm">
//               Through completing this project, I learned how to design for a
//               group of people, all with similar (but not exactly the same needs)
//               in a professional setting. The aesthetics of the UI were just as
//               important as the textual information for the lab to look appealing
//               to potential participants, so developing effective branding was
//               crucial.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
