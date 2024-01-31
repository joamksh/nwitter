// Profile.js
import React, { useState, useEffect } from "react";
import { authService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

const Profile = ({ userObj ,refreshUser}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setNewDisplayName(user.displayName);  // displayName 갱신
            }
        });

        return () => unsubscribe();
    }, []);

    const onLogoutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const currentUser = getAuth().currentUser;

        if (currentUser && currentUser.displayName !== newDisplayName) {
            try {
                // 사용자 프로필 업데이트
                await updateProfile(currentUser, { displayName: newDisplayName });
                refreshUser();

                // 업데이트된 사용자 정보 다시 가져오기
                const updatedUser = getAuth().currentUser;

                // 업데이트된 사용자 정보로 상태 업데이트
                setNewDisplayName(updatedUser.displayName);
            } catch (error) {
                console.error("프로필 업데이트 중 에러 발생:", error);
            }
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <p>user ID: {getAuth().currentUser.uid}</p>
            <p>Display Name: {getAuth().currentUser.displayName}</p>

            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <button type="submit">Update Profile</button>
            </form>

            <button onClick={onLogoutClick}>Log Out</button>
        </div>
    );
};

export default Profile;
