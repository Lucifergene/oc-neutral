import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import { storage, firestore } from "../utils/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { randomString } from "../utils/helpers";
import { Alert } from "@patternfly/react-core/dist/esm/components";

const UploadConfig = () => {
  const user = "avika";
  const file = useRef<any>(null);
  const generatedFileName = useRef<string>("");
  const fileURL = useRef<any>("");
  const [status, setStatus] = useState("");
  const fileRef = useRef<any>();
  const history = useHistory();

  const createRecord = async () => {
    const recordRef = collection(firestore, "kubeconfig_mapping");
    // check whether user exists in db
    const q = query(recordRef, where("user", "==", user));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (querySnapshot.docs.length > 0) {
      // user exists, update the record
      console.log("user exists");
      const docRef = doc(recordRef, querySnapshot.docs[0].id);
      console.log(docRef);
      await updateDoc(docRef, {
        configs: [
          ...querySnapshot.docs[0].data().configs,
          {
            name: generatedFileName.current,
            displayName: "Demo3",
            updatedAt: Timestamp.now(),
            configURL: fileURL.current,
          },
        ],
      });
    } else {
      // user does not exist, create a new record
      console.log("user does not exist");
      await addDoc(recordRef, {
        user: user,
        createdAt: Timestamp.now(),
        configs: [
          {
            name: generatedFileName.current,
            displayName: randomString(),
            updatedAt: Timestamp.now(),
            configURL: fileURL.current,
          },
        ],
      });
    }
    setStatus("Uploaded Successfully");
    // history.push("/configs");
  };

  function handleChange(event) {
    console.log("aa");
    file.current = event.target.files[0];
    console.log("File: ", file.current);
    handleUpload();
  }

  const handleUpload = () => {
    console.log("bb");
    if (file.current === null) return;
    console.log("cc");
    const storageRef = ref(
      storage,
      `kubeconfig/${user}/kubeconfig-${randomString()}`
    );
    generatedFileName.current = storageRef.name;
    console.log(generatedFileName.current);
    uploadBytes(storageRef, file.current)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          fileURL.current = url;
          console.log(url);

          createRecord();
        });
      })
      .catch((error) => {
        console.log(error);
        setStatus(error.message);
      });
  };

  const focusFileInput = () => {
    fileRef.current.click();
    file.current = fileRef.current.files[0];
    console.log(fileRef);
    console.log(fileRef.current.files);
  };

  return (
    <div style={{ height: "100vh" }}>
      {/* <h2 className="home-h2">File Upload & Image Preview</h2>
      <p className="lead home-p">
        No Plugins <b>Just Javascript</b>
      </p> */}
      {status && (
        <Alert
          variant={status === "Uploaded Successfully" ? "success" : "danger"}
          title={status}
        />
      )}
      <br />
      <br />
      <div id="file-upload-form" className="uploader">
        <input
          id="file-upload"
          onChange={handleChange}
          ref={fileRef}
          type="file"
          name="fileUpload"
          accept="*/*"
        />
        <label htmlFor="file-upload" id="file-drag">
          <div id="start">
            <i className="fa fa-download" aria-hidden="true"></i>
            <div>Select a file or drag here</div>
            <button
              id="file-upload-btn"
              className="pf-c-button pf-m-primary"
              onClick={focusFileInput}
            >
              Select a file
            </button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadConfig;
