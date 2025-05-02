/* FakeFriendssWidget.jsx */

import PageLayout from "../components/pageLayout";
import "./FakeFriendsWidget.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import FileUploadBox from "../components/FileUploadBox"; 
import fake_followers from "/public/fake_followers_trans.png";
import confused from "/public/confused.png";

import JSZip from "jszip";


function FakeFriendsWidget() {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const [uploadedFile, setUploadedFile] = useState(null); // Track the uploaded file
    const [loading, setLoading] = useState(false); // Track loading state
    const [fakeFriendsData, setFakeFriendsData] = useState(null); // Store processed data
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);  // States for the disclaimer

    const goToNextStep = () => { setStep(step + 1); };
    const goToPreviousStep = () => { 
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleFileUpload = (file) => {
        setUploadedFile(file);
        setLoading(true);
    
        const zip = new JSZip();
    
        zip.loadAsync(file).then(async (zipContents) => {
            const fileNames = Object.keys(zipContents.files);
    
            try {
                let followersList = [];
                let followingList = [];
    
                const filePromises = fileNames.map(async (filename) => {
                    const lowerName = filename.toLowerCase();
                    const isInsideFollowersFolder = lowerName.includes("followers_and_following/");
                    const isFollowersFile = lowerName.includes("followers_and_following/followers") && lowerName.endsWith(".json");
                    const isFollowingFile = lowerName.includes("followers_and_following/following") && lowerName.endsWith(".json");
                
                    if (isInsideFollowersFolder && (isFollowersFile || isFollowingFile)) {
                        const fileData = await zipContents.file(filename).async("string");
                        const jsonData = JSON.parse(fileData);
                
                        if (isFollowersFile) {
                            const extracted = extractUsernames(jsonData);
                            followersList = followersList.concat(extracted);
                        }
                
                        if (isFollowingFile) {
                            const extracted = extractUsernames(jsonData);
                            followingList = followingList.concat(extracted);
                        }
                    }
                });
                
                await Promise.all(filePromises);
    
                if (followersList.length === 0 || followingList.length === 0) {
                    throw new 
                    Error("Couldn't find both followers and following data. Please make sure you selected the right ZIP file!");
                }
    
                const followerSet = new Set(followersList);

                console.log("👥 [DATA] Total followers:", followerSet.size);
                console.log("➡️ [DATA] Total following:", followingList.length);
    
                function findFakeFriends(followers, following) {
                    const followersSet = new Set(followers);
                  
                    const fakeFriends = following.filter((username) => !followersSet.has(username));
                  
                    return fakeFriends;
                  }
                
    
                const fakeFriends = findFakeFriends([...followerSet], followingList);
    
                setFakeFriendsData(fakeFriends);
                setLoading(false);
            } catch (error) {
                console.error("Error processing ZIP file:", error);
                setFakeFriendsData(null);
                setLoading(false);
            }
        });
    };

    // Helper function to extract usernames safely
    const extractUsernames = (data) => {
        if (!data) {
            console.warn("⚠️ [EXTRACT] No data provided to extractUsernames.");
            return [];
        }
    
        // Instagram sometimes uses different structures depending on date/format
        const keysToCheck = ['relationships_followers', 'relationships_following', 'string_list_data'];
    
        if (Array.isArray(data)) {
            return data.map(item => item?.string_list_data?.[0]?.value).filter(Boolean);
        }
    
        for (const key of keysToCheck) {
            if (Array.isArray(data[key])) {
                return data[key]
                    .map(item => item?.string_list_data?.[0]?.value)
                    .filter(Boolean);
            }
        }
        console.warn("⚠️ [EXTRACT] No valid structure found in data.");
        return [];
    };

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
            <div className="page-container">
                <div className='page-header'>
                    <h1 className='fake-title'>Fake Friends</h1>
                </div>
            </div>
    
            <div className="fake-friends-page">
                {/* Starting Screen */}
                {step === 0 && (
                    <div className="welcome-screen">
                        <img 
                            src={fake_followers} 
                            alt="Fake Friends"
                            className="fakefriends-welcome-image" 
                        />
                        <h1 className="step-title">
                            Welcome to Fake Friends Checker!
                        </h1>
                        <button 
                            onClick={goToNextStep}
                            className="start-button"
                        >
                            Start
                        </button>
                        {/* Disclaimer Section */}
                        <div>
                                <button 
                                    onClick={() => setDisclaimerOpen(!disclaimerOpen)}
                                    className="disclaimer-toggle"
                                >
                                    Disclaimer
                                </button>

                                <AnimatePresence>
                                {disclaimerOpen && (
                                <motion.div 
                                    className="modal-overlay"
                                    onClick={() => setDisclaimerOpen(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div 
                                        className="modal-content"
                                        onClick={(e) => e.stopPropagation()}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button className="close-button" onClick={() => setDisclaimerOpen(false)}>
                                            &times;
                                        </button>
                                        <h2>Disclaimer:</h2>
                                        <p>
                                            Please note that this tool may not 
                                            display a complete list of users 
                                            who do not follow you back. Due to 
                                            Instagram’s data access policies 
                                            and limitations, not all follower 
                                            and following information is made 
                                            fully available to third-party 
                                            applications or personal data 
                                            downloads. While every effort is 
                                            made to provide accurate 
                                            information with the data 
                                            available, results may be 
                                            incomplete.
                                        </p>
                                        <p>
                                            Although Instagram provides users 
                                            with the ability to request their 
                                            personal data, it does not 
                                            guarantee full access to all 
                                            information generated through 
                                            use of the platform. This 
                                            restriction is not a limitation of 
                                            this application, but a choice 
                                            made by Instagram. While the 
                                            platform owns the service, 
                                            the data itself — built through 
                                            the time, relationships, and 
                                            engagement of users — would 
                                            <strong> not</strong> exist without 
                                            the users themselves. I 
                                            believe it's important to make my 
                                            stance clear: people deserve full, 
                                            unrestricted access 
                                            to their own data.
                                        </p>
                                    </motion.div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                            </div>
                    </div>
                    

                )}

                {/* Upload/Instructions Screen */}
                {step === 1 && (
                    <div>
                        <h2 className="step-title">Upload Your Instagram Files</h2>

                        <div className="instructions-container">
                            {/* Website Instructions */}
                            <div className="instruction-box">
                                <ol>
                                    <li>Go to <a 
                                    href="https://www.instagram.com" 
                                    target="_blank" 
                                    className="text-blue-500 underline">instagram.com</a> or open app, and log in.</li>
                                    <li>At the bottom of the side menu, click <strong>More → Settings</strong>.</li>
                                    <li>Go to <strong>Meta Accounts Center</strong>.</li>
                                    <li>
                                        Click <strong> Your information and permissions </strong>, then select <strong> Download your information </strong>.
                                    </li>
                                    <li>
                                        Select the instagram account you want 
                                        to check, choose <strong> Some of your information </strong> scroll down to select <strong> Followers and following </strong>
                                    </li>
                                    <li>Choose how you'd like to receive file and choose <strong>JSON</strong> format and submit.</li>
                                    <li>Wait for files, download the ZIP file.</li>
                                </ol>
                            </div>
                        </div>

                        {/* Upload Box */}
                        <div className="upload-section">
                            <FileUploadBox onFileUpload={handleFileUpload} uploadedFile={uploadedFile}/>
                        </div>

                        {/* Buttons */}


                        <div className="nav-buttons">
                            <button className="fake-buttons" onClick={goToPreviousStep}>
                                Back
                            </button>
                            <button className="fake-buttons" onClick={goToNextStep}>
                                Next
                            </button>
                        </div>
                     

                     </div>
                                    
                )}


                {/* Fake Friends Reveal Screen */}
                {step === 2 && (
                    <div className="centered">
                        {loading ? (
                        <>
                            <h2>Processing your data...</h2>
                            <p>Hang tight while we analyze your Instagram data!</p>
                        </>
                        ) : fakeFriendsData ? (
                        <>
                            <h2 className="step-title">Here Are Your Fake Friends!</h2>
                            <div className="fake-friends-list">
                                {fakeFriendsData.map((username, index) => (
                                    <a
                                        key={index}
                                        href={`https://www.instagram.com/${username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="friend-item"
                                    >
                                        {username}
                                    </a>
                                    
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="nav-buttons">
                                <button onClick={goToPreviousStep}
                                    className="fake-buttons"
                                >
                                    Back
                                </button>
                                <button onClick={() => setStep(0)} className="fake-buttons">
                                    Home
                                </button>
                            </div>
                            {/* Disclaimer Section */}
                            <div>
                                <button 
                                    onClick={() => setDisclaimerOpen(!disclaimerOpen)}
                                    className="disclaimer-toggle"
                                >
                                    Shouldn't I have more fake friends?
                                </button>

                                <AnimatePresence>
                                {disclaimerOpen && (
                                <motion.div 
                                    className="modal-overlay"
                                    onClick={() => setDisclaimerOpen(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div 
                                        className="modal-content"
                                        onClick={(e) => e.stopPropagation()} 
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button className="close-button" onClick={() => setDisclaimerOpen(false)}>
                                            &times;
                                        </button>
                                        <h2>Short answer is – you might.</h2>
                                        <p>
                                            Please note that this tool may not 
                                            display a complete list of users 
                                            who do not follow you back. Due to 
                                            Instagram’s data access policies 
                                            and limitations, not all follower 
                                            and following information is made 
                                            fully available to third-party 
                                            applications or personal data 
                                            downloads. While every effort is 
                                            made to provide accurate 
                                            information with the data 
                                            available, results may be 
                                            incomplete.
                                        </p>
                                        <p>
                                            Although Instagram provides users 
                                            with the ability to request their 
                                            personal data, it does not 
                                            guarantee full access to all 
                                            information generated through 
                                            use of the platform. This 
                                            restriction is not a limitation of 
                                            this application, but a choice 
                                            made by Instagram. While the 
                                            platform owns the service, 
                                            the data itself — built through 
                                            the time, relationships, and 
                                            engagement of users — would 
                                            <strong> not</strong> exist without 
                                            the users themselves. I 
                                            believe it's important to make my 
                                            stance clear: people deserve full, 
                                            unrestricted access 
                                            to their own data.
                                        </p>
                                    </motion.div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                            </div>
                        </>
                        ) : (
                        <div className="error-screen">
                            <h2 className="step-title">Oops! Something went wrong.</h2>
                            <p>Make sure you uploaded the correct Instagram ZIP file.</p>
                            <img 
                                src={confused} 
                                alt="Confused"
                                className="confused-error-image" 
                            />
                            <div className="nav-buttons">
                                <button onClick={goToPreviousStep} className="fake-buttons">
                                    Try Again
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                    )}



            </div>

    </div>
    );
}

export default FakeFriendsWidget;