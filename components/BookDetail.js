import ModalForm from "./ModalForm";

const BookDetail = ({ bookData, updateData, deleteHandlerFunc }) => {
  return (
    <>
      <div className="w-full items-center  flex mb-2 bg-[#3B3B3B] p-4 rounded-md">
        <div className="w-6/12">
          <h1>{bookData.title}</h1>
        </div>
        <div className="w-6/12">
          <h1>{bookData.author}</h1>
        </div>
        <div className="w-2/12">
          <h1>{bookData.pages}</h1>
        </div>
        <div className="w-2/12 flex">
          <button
            onClick={(e) => {
              deleteHandlerFunc();
            }}
            className="border rounded-md m-1  border-red-600 text-red-600 p-2"
          >
            Delete
          </button>
          <ModalForm
            updateButton
            updateData={updateData}
            dataForUpdate={bookData}
          />
        </div>
      </div>
    </>
  );
};

export default BookDetail;
