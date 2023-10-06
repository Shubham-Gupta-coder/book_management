"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [myBooks, setMyBooks] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false)
  const fetchData = async () => {
      const res = await fetch("/api/books", { method: "GET" });
      const booksObjs = await res.json();
      setMyBooks(booksObjs.book);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <nav className="w-fit m-5 mx-auto">
        <h1 className="px-5 py-2 rounded-xl border-2 border-gray-800 text-3xl font-bold">
          iBooks - Management
        </h1>
      </nav>
      <div className="p-5 flex flex-wrap">
        {myBooks.map(({title, method}) => {
          return (
            <div key={title} className="m-5 inline-flex w-[300px] flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="p-2 md:p-3 w-[300px]">
                <p className="inline-flex bg-blue-500 p-2 rounded-full px-5 items-center uppercase text-sm font-bold text-white ">
                  {method}
                </p>
                <h3 className="text-lg p-2 font-bold text-gray-800 dark:text-white">
                  {title}
                </h3>
              </div>
            </div>
          );
        })
        }
      </div>
      <div className="text-3xl text-blue-500 border-2 border-blue-500 py-5 px-10 rounded-xl font-bold w-[40vw] mx-auto fixed bottom-10 left-[30vw] text-center hover:bg-blue-500 hover:text-white cursor-pointer transition-all" onClick={()=>setPopUpActive(true)}>Add a Book</div>
    </main>
  );
}
