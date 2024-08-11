import { Link } from "react-router-dom";
import { RiCalendarTodoFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
const Header = () => {
  return (
    <>
      <nav className="dark:bg-gray-900">
        <div className="flex justify-between px-8 p-4">
          <Link className="text-2xl font-bold" to={"/"}>
            TODOISM + AUTH1.1
          </Link>
          <ul className="flex items-center gap-6 text-gray-600">
            <li>
              <Link to={"/"} className="flex items-center gap-2">
              <IoHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to={"/todos"} className="flex items-center gap-2">
              <RiCalendarTodoFill />
                <span>Todos</span>
              </Link>
            </li>
          </ul>
          <ul className="flex gap-6">
            <li className="flex">
              <Link
                className="bg-gray-200 p-1 rounded-md w-20 text-center"
                to={"/login"}
              >
                Login
              </Link>
            </li>
            <li className="flex">
              <Link
                className="bg-button-one p-1 text-white rounded-md w-20 text-center"
                to={"/signup"}
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
