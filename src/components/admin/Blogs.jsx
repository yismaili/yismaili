import { useState, useEffect } from "react";
import { database } from "../config/firebase";
import { onValue, ref, set } from "firebase/database";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

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

  //function to delete blog
  const deleteBlog = (id) => {
    const blogRef = ref(database, "blogs/" + id);
    set(blogRef, null);
  };

  return (
    <div className="w-full h-full p-5 flex flex-col gap-3">
      <div>
        <h1 className="text-2xl font-bold">Blogs</h1>
      </div>
      <div className="grid grid-cols-5 gap-x-2 gap-y-2">
        {data != null ? (
          data.map((item) => (
            <div
              className="flex flex-col gap-1 bg-white rounded-md border-2 border-gray-200 aspect-square relative"
              key={item.id}
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="rounded-md w-full h-full object-cover"
              />
              <div className="absolute flex w-full justify-between bottom-3 px-5">
                <div className="my-auto text-white mix-blend-difference">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-md">
                    {truncateDescription(item.description, 25)}
                  </p>
                </div>
                <div className="my-auto flex gap-1">
                  <button
                    onClick={() => deleteBlog(item.id)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    <AiFillDelete />
                  </button>
                  <button className="bg-blue-500 text-white p-2 rounded-md">
                    <AiFillEdit />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
