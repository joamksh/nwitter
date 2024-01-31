// Profile.js
import React, { useEffect } from "react";
import { authService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const getMyNweets = async () => {
        try {
            const nweets = await dbService
                .collection("nweets")
                .where("creatorId", "==", userObj.uid)
                .orderBy("createdAt", "asc")
                .get();

            console.log(nweets.docs.map((doc) => doc.data()));
        } catch (error) {
            //console.error("에러 발생:", error);
        }
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            <p>user ID: {userObj.uid}</p>
            <button onClick={onLogoutClick}>Log Out</button>
        </div>
    );
};

export default Profile;
