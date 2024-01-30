import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Home = ({ userObj }) => {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        try {
            const querySnapshot = await getDocs(collection(dbService, "nweets"));
            const nweetArray = [];
            querySnapshot.forEach((doc) => {
                nweetArray.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setNweets(nweetArray);
            console.log(nweetArray);
        } catch (error) {
            console.error("Error getting documents:", error);
        }
    };

    useEffect(() => {
        getNweets();
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
            // 재로딩 없이 새로운 내용을 바로 가져오기 위해 추가
            getNweets();
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
            {/* 여기에서 nweets를 사용하여 화면에 출력하거나 활용할 수 있습니다. */}
        </div>
    );
};

export default Home;
