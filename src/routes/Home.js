// Home.js
import { dbService } from "fbase";
import { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const nweetsCollection = collection(dbService, "nweets");
            await addDoc(nweetsCollection, {
                text: nweet,
                createdAt: Date.now(),
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
    );
};

export default Home;
