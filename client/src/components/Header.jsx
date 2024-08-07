import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="dark:bg-gray-900">
        <div className="flex justify-between px-8 p-4">
          <Link className="text-2xl font-bold" to={"/"}>AUTH1.1</Link>
          <ul className="flex items-center gap-6 text-gray-600">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/todos"}>Todos</Link>
            </li>
          </ul>
          <ul className="flex gap-6">
            <li className="flex">
              <Link className="bg-gray-200 p-1 rounded-md w-20 text-center" to={"/login"}>Login</Link>
            </li>
            <li className="flex">
              <Link className="bg-button-one p-1 text-white rounded-md w-20 text-center" to={"/signup"}>Signup</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
