/* SpinnerPage.jsx */

import { useNavigate } from 'react-router-dom';
import SpinningVisual from '../components/SpinningVisual';
import './SpinnerPage.css';

const SpinnerPage = () => {
  const navigate = useNavigate();

  return (
    <div>
        <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Home page
        </button>
        <div className="spinner-page-container">
            <SpinningVisual className="big-spinner" />

        </div>
    </div>
    
  );
};

export default SpinnerPage;
