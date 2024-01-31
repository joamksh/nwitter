// Home.js
import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (attachment !== "") {
                const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
                const nweetsCollection = collection(dbService, "nweets");
                
                // Upload the attachment to Storage
                await uploadString(attachmentRef, attachment, "data_url");
    
                // Get the download URL using getDownloadURL method
                const downloadURL = await getDownloadURL(attachmentRef);
    
                // Store data in Firestore
                await addDoc(nweetsCollection, {
                    text: nweet,
                    createdAt: Date.now(),
                    creatorId: userObj.uid,
                    attachmentUrl: downloadURL,
                });
            } else {
                // If there's no attachment, only store text in Firestore
                const nweetsCollection = collection(dbService, "nweets");
                await addDoc(nweetsCollection, {
                    text: nweet,
                    createdAt: Date.now(),
                    creatorId: userObj.uid,
                });
            }
    
            // Clear form
            setNweet("");
            setAttachment("");
        } catch (error) {
            console.error("문서 추가 중 오류 발생:", error);
        }
    };
    
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment("");

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="Attachment Preview" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;
