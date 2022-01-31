import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

function Post({ userImg, username, img, caption, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () => (
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
      [db, id]
    )
  );

  useEffect(
    () => (
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) =>
        setLikes(snapshot.docs)
      ),
      [db, id]
    )
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="inline-block object-cover w-12 h-12 mr-2 rounded-full"
        />
        <p className="flex-grow font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <img src={img} alt="" className="object-cover w-full" />
      {session && (
        <div className="flex justify-between px-4 pt-4 items-center">
          <div className="flex items-center space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment ..."
            className="border-none flex-grow outline-none focus:ring-0"
          />
          <button onClick={sendComment} className="font-semibold text-blue-400">
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
