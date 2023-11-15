import { useState, useEffect } from "react";
import { database } from "../config/firebase";
import { onValue, ref } from "firebase/database";

export default function Blogs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = onValue(ref(database, "blogs"), (snapshot) => {
      const dataObject = snapshot.val();
      const dataArray = dataObject
        ? Object.keys(dataObject).map((key) => ({
            id: key,
            ...dataObject[key],
          }))
        : [];
      setData(dataArray);
      console.log(dataArray);
    });
    return () => unsubscribe();
  }, []);
  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  }
  return (
    <div className="pt-[80px] px-[5%] xl:px-[5%] 2xl:px-[10%] flex flex-col gap-2">
      <h1 className="text-2xl font-bold">BLOG</h1>
      <div className="grid grid-cols-5 gap-x-2 gap-y-2">
        {data != null ? (
          data.map((item) => (
            <a
              href={`/blog/${item.id}`}
              className="flex flex-col gap-1 rounded-md aspect-square relative group border-2"
              key={item.id}
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="rounded-md w-full h-full object-cover relative group-hover:brightness-75 transition-all duration-200 ease-in-out"
              />
              <div className="absolute bottom-5 left-5 text-white group-hover:mix-blend-normal mix-blend-difference transition-all duration-200 ease-in-out">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-md overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {truncateDescription(item.description, 33)}
                </p>
              </div>
            </a>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
