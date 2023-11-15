import { useState, useEffect } from "react";
import { database } from "../config/firebase";
import { onValue, ref, set } from "firebase/database";
import { useParams } from "react-router-dom";
import { BsCalendarFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Blog() {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onValue(ref(database, "blogs/" + id), (snapshot) => {
      const dataObject = snapshot.val();
      setdata(dataObject);
      console.log(data);
    });
    return () => unsubscribe();
  }, []);

  const updateLikeCount = () => {
    const blogRef = ref(database, "blogs/" + id);
    set(blogRef, {
      ...data,
      likeCount: data.likeCount + 1,
    });
    setLiked(true);
    localStorage.setItem(id, true);
  };

  useEffect(() => {
    const isLiked = localStorage.getItem(id);
    if (isLiked) {
      setLiked(true);
    }
  }, [id]);

  return (
    <div className="pt-[80px]  px-[5%] xl:px-[5%] 2xl:px-[10%] container flex flex-col gap-2">
      {data ? (
        <div className="flex flex-col gap-2 ">
          <div className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-start">{data.title}</h1>
            <h1 className="text-md font-bold text-start">
              <button
                onClick={updateLikeCount}
                className="px-2 py-1 rounded-md bg-slate-50 hover:bg-slate-100 transition-all ease-in-out duration-200"
                disabled={liked}
              >
                {data.likeCount}{" "}
                {liked ? (
                  <AiFillHeart className="inline mb-1" />
                ) : (
                  <AiOutlineHeart className="inline mb-1" />
                )}
              </button>
            </h1>
          </div>
          <h2 className="text-slate-500">Written by Younes Ismaili</h2>
          <h3 className="flex gap-2 text-slate-500 text-md">
            <span className="my-auto">
              <BsCalendarFill />
            </span>
            <span className="my-auto">date</span>
          </h3>
          <div className="h-5"></div>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
