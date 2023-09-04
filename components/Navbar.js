import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/userSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    document.cookie = `token=`;
    dispatch(remove(""));
    router.push("/login");
  };
  const value = useSelector((state) => state.token);
  return (
    <div className="w-8/12 m-auto mt-10">
      <div className="border-b-[1px] border-gray-500 p-5 flex justify-between items-center">
        <div>
          <h1 className="font-extrabold text-4xl">Library.</h1>
        </div>
        <div>
          <Link href={"/books"}>
            <span className="mr-5">Books</span>
          </Link>
          <Link href={"/documentaries"}>
            {" "}
            <span className="mr-5">Documentaries</span>{" "}
          </Link>
          <Link href={"/news"}>
            {" "}
            <span className="mr-5">News</span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
