// Nweet.js
import { dbService, storageService } from "fbase";
import React from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            try {
                // 문서를 참조하여 삭제
                await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));

                // attachmentUrl이 존재하고 비어있지 않은 경우에만 삭제 진행
                if (nweetObj.attachmentUrl) {
                    const attachmentRef = storageService.refFromURL(nweetObj.attachmentUrl);
                    await attachmentRef.delete();
                }
            } catch (error) {
                console.error("삭제 중 에러 발생:", error);
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev)

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const nweetDocRef = doc(dbService, `nweets/${nweetObj.id}`);

        try {
            // 문서를 가져와서 업데이트
            await updateDoc(nweetDocRef, { text: newNweet });
            setEditing(false);
        } catch (error) {
            console.error("업데이트 중 에러 발생:", error);
        }
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="Attachment Preview" />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
