/* fermi_poster.jsx */

import PageLayout from "../components/pageLayout";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function FermiPoster () {
    const navigate = useNavigate();

    return (
        <div className="page-wrapper">
            <div className="back-button-container">
                <button
                    className="back-button"
                    onClick={() => navigate('/projects')}
                >
                    <FaArrowLeft /> Back to Projects
                 </button>
            </div>
        
            <PageLayout title="Fermilab Research Poster">
                <div className="poster-container">
                    <p className="poster-description">
                    During my internship at Fermi National Accelerator 
                    Laboratory, I researched Higgs Boson self-coupling 
                    using simulated data from the LHC at CERN. 
                    My work contributed to understanding fundamental 
                    particle interactions and was presented in this 
                    poster at Fermilab.
                    </p>

                    <div className="poster-display">
                    <embed 
                        src="/public/Yashinsky_FNAL_Poster_URA.pdf" 
                        type="application/pdf" 
                        width="100%" 
                        height="800px"
                    />
                    </div>
                </div>
            </PageLayout>

        </div>
    );
}

export default FermiPoster;