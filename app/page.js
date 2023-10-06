"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [myBooks, setMyBooks] = useState([]);
  const [readingMethod, setReadingMethod] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [popUpActive, setPopUpActive] = useState(false);
  const fetchData = async () => {
    const res = await fetch("/api/books", { method: "GET" });
    const booksObjs = await res.json();
    setMyBooks(booksObjs.book);
  };
  const submitBook = async () => {
    setPopUpActive(false);
    if (readingMethod != ""|| bookTitle != "") {
      try {
        const response = await fetch("/api/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: bookTitle,
            method: readingMethod,
          }),
        });
  
        const responseData = await response.json();
        fetchData()
        setBookTitle("")
        setReadingMethod("")
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    } else {
      alert("Fill all details")
    }

  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="dark:bg-gray-900 pt-5 min-w-screen min-h-screen">
      <nav className="w-fit mb-5 mx-auto">
        <h1 className="px-5 py-2 rounded-xl border-2 border-gray-800 text-3xl font-bold">
          iBooks - Management
        </h1>
      </nav>
      <div className="p-5 flex flex-wrap">
        {myBooks.map(({ title, method }) => {
          return (
            <div
              key={title}
              className="m-5 inline-flex w-[300px] flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
            >
              <div className="p-2 md:p-3 w-[300px]">
                <p className="inline-flex bg-blue-500 p-2 rounded-full px-5 items-center text-sm font-bold text-white ">
                  {method}
                </p>
                <h3 className="text-xl p-2 mt-3 font-semibold text-gray-800 dark:text-white">
                  {title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="text-3xl text-blue-500 border-2 border-blue-500 py-2 px-5 rounded-xl font-bold w-[40vw] mx-auto fixed bottom-10 left-[30vw] text-center hover:bg-blue-500 hover:text-white cursor-pointer transition-all"
        onClick={() => {
          setPopUpActive(true);
        }}
      >
        Add a Book
      </button>
      {popUpActive && (
        <div className="absolute top-0 bottom-0 z-10 w-screen h-screen flex items-center justify-center bg-slate-950 bg-opacity-40">
          <div className="flex flex-col min-w-[40vw] bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                Add book
              </p>
            </div>
            <div className="py-5 px-2">
              <input
                type="text"
                className="py-3 px-5 block w-full border border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder="Book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
              <select
                className="py-3 px-4 pr-9 block w-full border mt-2 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                value={readingMethod}
                onChange={(e) => setReadingMethod(e.target.value)}
                defaultValue={""}
              >
                <option value="">Selected reading method</option>
                <option value={"Audibook"}>Audibook</option>
                <option value={"Bought"}>Bought</option>
                <option value={"Rent"}>Rent</option>
                <option value={"eBook"}>eBook</option>
              </select>
              <div className="flex items-center">
                <button
                  className="py-[.688rem] mt-5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-blue-500"
                  onClick={submitBook}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="py-[.688rem] ml-3 mt-5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-red-500"
                  onClick={()=>setPopUpActive(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
