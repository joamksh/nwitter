// Home.js
import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
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
                console.log(nweetArray);
            } catch (error) {
                console.error("Error getting documents:", error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const nweetsCollection = collection(dbService, "nweets");
            await addDoc(nweetsCollection, {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            setNweet("");
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

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
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
