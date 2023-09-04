import React, { useEffect, useState } from "react";
import { deleteBook, fetchAllBooks, updateBook } from "../network/network";
import BookDetail from "../components/BookDetail";
import ModalForm from "../components/ModalForm";
import { useDispatch } from "react-redux";
import { add } from "../store/bookSlice";
import PlusButton from "../components/PlusButton";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    fetchAllBooks()
      .then((res) => {
        setAllBooks(res);
        dispatch(add(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchKeyword(e.target.value);
      return getBooks();
    }
    setSearchKeyword(e.target.value);
    const filterItems = allBooks.filter((val) => {
      return val.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredBooks(filterItems);
  };

  const deleteHandler = (bookId) => {
    deleteBook(bookId)
      .then((res) => {
        getBooks();
      })
      .catch(() => {});
  };

  return (
    <>
      <div className="w-8/12 flex m-auto justify-between py-6">
        <input
          className="px-4 py-2 w-10/12 sm:w-[420px] rounded border-gray-300 focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder="Search"
          value={searchKeyword}
          onChange={handleSearch}
        />
        <ModalForm updateData={getBooks} />
      </div>
      <div className="w-8/12 flex m-auto  px-5 rounded-md">
        <div className="w-6/12">
          <h1>Title</h1>
        </div>
        <div className="w-6/12">
          <h1>Author</h1>
        </div>
        <div className="w-2/12">
          <h1>Pages</h1>
        </div>
        <div className="w-2/12">
          <h1>Actions</h1>
        </div>
      </div>
      <div className=" w-8/12 h-min-[600px] overflow-scroll m-auto mt-5">
        {(searchKeyword ? filteredBooks : allBooks).map((val) => {
          return (
            <BookDetail
              key={val._id}
              bookData={val}
              updateData={getBooks}
              deleteHandlerFunc={() => deleteHandler(val._id)}
            />
          );
        })}
      </div>
    </>
  );
};
export default Books;
