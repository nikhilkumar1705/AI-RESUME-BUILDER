import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";

const Preview = () => {
  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    setResumeData(dummyResumeData.find(resume => resume._id === resume || null))
  }

  useEffect(() => {
    loadResume()
  }, [])
  return (
    <div>
      <h1>Preview page</h1>
    </div>
  );
};

export default Preview;