import { useState } from "react";
import SideBar from "./SideBar";
import Blogs from "./Blogs";
import AddBlog from "./AddBlog";

const pages = [
  {
    id: 0,
    component: Blogs,
  },
  {
    id: 1,
    component: AddBlog,
  },
];

export default function Dashboard() {
  const [page, setpage] = useState(0);

  return (
    <div className="flex h-screen w-screen">
      <SideBar setPage={setpage} />
      <div className="w-full h-full">
        {pages.map((item) =>
          item.id === page ? (
            <item.component key={item.id} />
          ) : (
            <div key={item.id}></div>
          )
        )}
      </div>
    </div>
  );
}