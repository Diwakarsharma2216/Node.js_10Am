import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const baseurl = "http://localhost:8080";
function App() {
  const [file, setfile] = useState("");

  const [imagesfromdb,setimagesfromdb]=useState([])
  const getdatafromdb=()=>{
    axios.get(`${baseurl}/getimages`)
    .then((res)=>{
      setimagesfromdb(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handlclick = () => {
    axios
      .post(
        `${baseurl}/upload`,
        { file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        getdatafromdb()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    getdatafromdb()
  },[])
  return (
    <>
      <input
        onChange={(e) => setfile(e.target.files[0])}
        type="file"
        name="file"
      />
      <button onClick={handlclick}>Upload</button>

      <h1>Uploaded File</h1>
      {
        imagesfromdb.map((el)=>{
          return <img  height={200} width={200} src={baseurl+"/"+el.filename} alt="uploaded image" />
        })
      }
    </>
  );
}

export default App;
