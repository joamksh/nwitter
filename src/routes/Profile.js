import React from "react";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom"; // useNavigate를 import

const Profile = () => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        authService.signOut();
        navigate("/");
    };

    return (
        <div>
            <h2>Profile</h2>
            <button onClick={onLogoutClick}>Log Out</button>
        </div>
    );
};

export default Profile;
