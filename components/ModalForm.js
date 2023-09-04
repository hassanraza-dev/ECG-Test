import { useEffect, useState } from "react";
import Link from "next/link";
import PlusButton from "./PlusButton";
import { createBook, updateBook } from "../network/network";

export default function ModalForm({ updateData, updateButton, dataForUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", pages: 0, author: "" });

  useEffect(() => {
    if (dataForUpdate) {
      setFormData(dataForUpdate);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (dataForUpdate) {
      console.log(dataForUpdate, "dataForUpdatedataForUpdatedataForUpdate");
      updateBook(dataForUpdate._id, {
        ...formData,
      })
        .then((res) => {
          console.log(res.data);
          handleModalClose();
          setFormData({ title: "", pages: 0, author: "" });
          updateData();
        })
        .catch((err) => console.log(err));
    } else {
      createBook(formData)
        .then((res) => {
          console.log(res.data);
          handleModalClose();
          setFormData({ title: "", pages: 0, author: "" });
          updateData();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onChangeFormFields = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateHandler = (bookId) => {};

  return (
    <>
      <div className="relative">
        {updateButton ? (
          <button
            onClick={() => handleModalOpen()}
            className="border rounded-md m-1  border-yellow-400 text-yellow-400 p-2"
          >
            Update
          </button>
        ) : (
          <PlusButton onModalOpen={handleModalOpen} />
        )}
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 z-20 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center"
            onClick={handleModalClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white absolute z-10 rounded-lg shadow-lg p-4 py-12 w-4/12"
            >
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-2 text-black">Add Book</h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(event) => onChangeFormFields(event)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="numberOfPages"
                  >
                    Number of Pages
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
                    id="numberOfPages"
                    name="pages"
                    required
                    placeholder="Enter number of pages"
                    value={formData.pages}
                    onChange={(event) => onChangeFormFields(event)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="numberOfKgs"
                  >
                    Author
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
                    id="author"
                    name="author"
                    type="text"
                    required
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(event) => onChangeFormFields(event)}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    className="bg-gray-600 w-32 text-white mr-2 py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 w-32 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    type="submit"
                  >
                    {updateButton ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
}
