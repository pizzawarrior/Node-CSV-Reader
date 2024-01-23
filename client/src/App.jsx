//Break this into a pages page and use react router to simplify (refer to mod 3 project gamma file structure)

import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "../components/table";

const uploadToServer = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return axios.post("http://localhost:8080/api/csv/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

function App() {
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Customer ID",
        accessor: "customer_id",
      },
      {
        Header: "Event Type",
        accessor: "event_type",
      },
      {
        Header: "Event ID",
        accessor: "event_id",
      },
      {
        Header: "Event Date",
        accessor: "event_date",
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8080/api/records/");
      setData(result.data);
    })();
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    uploadToServer(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(async (response) => {
        setMessage(response.data.message);

        const result = await axios("http://localhost:8080/api/records/");
        setData(result.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the selected file");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <div className="App">
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
