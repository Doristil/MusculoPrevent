import Header from "../components/Header";
import "./Job.css";
import jobs from "../data/jobs";
import { useNavigate } from "react-router-dom";

function Job() {

    const navigate = useNavigate();

    return (

        <>
            <Header />

            <div className="card job-card">

                <h1 className="job-title">
                    Choisissez votre poste à bord
                </h1>

                <div className="job-grid">

                    {jobs.map((job) => (

                        <div
                            key={job.id}
                            className="job-card"
                            onClick={() => navigate("/exercises")}
                        >

                            <div className="job-icon">
                                {job.icon}
                            </div>

                            <h2>{job.name}</h2>

                        </div>

                    ))}

                </div>

            </div>

        </>

    );
}

export default Job;