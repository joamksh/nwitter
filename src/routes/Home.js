// Home.js
import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
//import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({ userObj }) => {

    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(dbService, "nweets"));
                const nweetArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNweets(nweetArray);
            } catch (error) {
                console.error("Error getting documents:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};

export default Home;
