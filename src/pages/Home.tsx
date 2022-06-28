// import React, { useEffect } from "react";
// import { logout } from "src/utils/firebase";
// import { useHistory } from "react-router";
// import "./Home.scss";
// import Navbar from "src/components/Navbar";

// export default function Home() {
//   const history = useHistory();
//   return (
//     <>
//       <Navbar />
//       <h2 className="home-h2">File Upload & Image Preview</h2>
//       <p className="lead home-p">
//         No Plugins <b>Just Javascript</b>
//       </p>

//       <form id="file-upload-form" className="uploader">
//         <input
//           id="file-upload"
//           type="file"
//           name="fileUpload"
//           accept="image/*"
//         />

//         <label htmlFor="file-upload" id="file-drag">
//           <img id="file-image" src="#" alt="Preview" className="hidden" />
//           <div id="start">
//             <i className="fa fa-download" aria-hidden="true"></i>
//             <div>Select a file or drag here</div>
//             <div id="notimage" className="hidden">
//               Please select an image
//             </div>
//             <span id="file-upload-btn" className="pf-c-button pf-m-primary">
//               Select a file
//             </span>
//           </div>
//           <div id="response" className="hidden">
//             <div id="messages"></div>
//             <progress className="progress" id="file-progress" value="0">
//               <span>0</span>%
//             </progress>
//           </div>
//         </label>
//       </form>
//       {/* <div>
//         Home
//         <button
//           onClick={() => {
//             logout();
//             history.push("/");
//           }}
//         >
//           Logout
//         </button>
//       </div> */}
//     </>
//   );
// }
import { useState } from "react";
import { Page, PageSection, PageSectionVariants } from "@patternfly/react-core";
import Navbar from "src/components/Navbar";
import Sidebar from "src/components/Sidebar";

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Page
      header={<Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />}
      sidebar={<Sidebar isNavOpen={isNavOpen} />}
    >
      <PageSection variant={PageSectionVariants.darker}>
        <div>
          {/* <Routes>
            <Route path="/todos" element={<TodoList />} />
            <Route path="/" element={<TodoForm />} />
          </Routes> */}
        </div>
      </PageSection>
    </Page>
  );
};
export default Home;
