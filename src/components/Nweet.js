// Nweet.js
import { dbService } from 'fbase';
import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';

const Nweet = ({ nweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
          console.log(nweetObj.id);
          try {
            // 문서를 참조하여 삭제
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            console.log("삭제 완료");
          } catch (error) {
            console.error("삭제 중 에러 발생:", error);
          }
        }
      };
      
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
