import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
// {
//   "id":"recAGJfiU4CeaV0HL",
//   "order":3,
//   "title":"Full Stack Web Developer",
//   "dates":"December 2015 - Present",
//   "duties":[
//   "Tote bag sartorial mlkshk air plant vinyl banjo lumbersexual poke leggings offal cold-pressed brunch neutra. Hammock photo booth live-edge disrupt.",
//   "Post-ironic selvage chambray sartorial freegan meditation. Chambray chartreuse kombucha meditation, man bun four dollar toast street art cloud bread live-edge heirloom.",
//   "Butcher drinking vinegar franzen authentic messenger bag copper mug food truck taxidermy. Mumblecore lomo echo park readymade iPhone migas single-origin coffee franzen cloud bread tilde vegan flexitarian.",
//   ],
//   "company":"TOMMY",
//   }

function App() {
  const [projects, setProjects] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const resp = await fetch(url);
    const data = await resp.json();
    setProjects(data);
    setTabs([...new Set(data.map((tab) => tab.company))]);
    setSelectedJob(data[0].company);
    console.log(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const Job = () => {
    const job = projects.filter((p) => p.company === selectedJob);
    if (job.length < 1) return <></>;

    const { title, dates, duties, company } = job[0];
    console.log(job);
    return (
      <article className="job-info">
        <h3>{title}</h3>
        <p>
          {duties.map((d) => (
            <p>{d}</p>
          ))}
        </p>
      </article>
    );
  };

  if (loading) {
    return <h3> Loading... </h3>;
  }

  return (
    <>
      <div className="jobs-center">
        <div className="btn-container">
          {tabs.map((tab, index) => {
            return (
              <button key={index} className="job-btn">
                {tab}
              </button>
            );
          })}
        </div>
      </div>
      <Job></Job>
    </>
  );
}

export default App;
