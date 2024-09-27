import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const baseurl = "http://localhost:8080";
function App() {
  const [file, setfile] = useState("");

  const handlclick = () => {};

  useEffect(() => {
    getdatafromdb();
  }, []);
  return (
    <>
      <input
        onChange={(e) => setfile(e.target.files[0])}
        type="file"
        name="file"
      />
      <button onClick={handlclick}>Upload</button>

      <h1>Uploaded File</h1>
    </>
  );
}

export default App;
