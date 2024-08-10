import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../state/api/todoApis";
const Home = () => {
  const createTodoFormRef = useRef();
  const responsePopupRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTodoResponse, setCreateTodoResponse] = useState("");
  const { data: todos, isError, isLoading } = useGetTodosQuery();
  const [addTodo, { isLoading: isAdding, isError: isAddError }] =
    useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteTodoMutation();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await addTodo({ title, description });
      if (response.error) {
        setCreateTodoResponse(
          response.error.data.message || response.error.error
        );
      } else {
        setCreateTodoResponse(response.data.message);
        setIsActive(false);
        setTitle("");
        setDescription("");
      }
      responsePopupRef.current.classList.remove("hide");
    } catch (error) {
      console.log(error.error);
    }
  };

  useEffect(() => {}, [isActive]);

  return (
    <>
      <div className="main relative">
        <div
          ref={responsePopupRef}
          className={`hide rounded-md add-message fixed top-10 left-[50%] -translate-x-[50%] z-20`}
        >
          <span
            className={`px-4 py-2 shadow-md ${
              createTodoResponse === "Created"
                ? "text-green-700 bg-green-300"
                : "text-red-700 bg-red-300"
            } rounded-md flex items-center gap-4`}
          >
            <span>{createTodoResponse}</span>
            <span
              onClick={() => responsePopupRef.current.classList.add("hide")}
              className="text-xl cursor-pointer"
            >
              <IoCloseSharp />
            </span>
          </span>
        </div>
        <div className="cotents shadow-2xl flex items-center justify-center flex-col md:w-[70%] mx-auto p-8 bg-[rgba(255,255,255,.2)]">
          <h1 className="text-4xl mb-4">Welcome to Todoism</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum fuga
            consequuntur ab veritatis officiis architecto suscipit aliquid
            provident? Iste officia consequuntur ipsam magni, perferendis
            voluptatem rerum, quisquam veniam nam ducimus dolores aperiam aut
            vero expedita. Obcaecati quisquam, in hic nihil cum dolorum officia
            minus enim neque fugiat doloribus vero dolorem delectus quidem
            cumque eligendi molestias. Aliquid deserunt quibusdam sed nulla,
            adipisci itaque laborum quis doloremque voluptatem cum minima id
            alias quae expedita corrupti eius fuga. Possimus alias, harum
            sapiente sit nobis exercitationem obcaecati officiis dolor non vitae
            suscipit laborum porro aut ratione architecto libero corrupti. Eos
            dolor soluta architecto reprehenderit!
          </p>
          <button
            onClick={() => setIsActive(true)}
            className="button-create px-4 py-2 rounded-md mt-4"
          >
            Create Todo
          </button>
        </div>
      </div>

      {/* Todos */}

      <div className="todos">
        {todos?.map((todo) => (
          <div key={todo._id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>

      {/* Create Todo Model */}
      <div
        className={`create-todo fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] ${
          isActive ? "visible" : "invisible"
        }`}
      >
        <form
          ref={createTodoFormRef}
          className={`${
            isActive ? "active" : "inactive"
          } flex rounded-md gap-6 flex-col absolute top-[50%] left-[50%] -translate-x-[50%] p-4 -translate-y-[50%] w-[400px] bg-create-todo-form`}
        >
          <h1 className="text-3xl p-4 text-center text-gray-600">
            Create Todo
          </h1>
          <input
            type="text"
            className="px-4 py-2 bg-[rgba(0,0,0,.1)] outline-none text-gray-950 rounded-md placeholder:text-gray-950 relative z-0 focus:ring-2 ring-[#006989] input-placeholder"
            id="title"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-2 bg-[rgba(0,0,0,.1)] outline-none rounded-md text-gray-950 placeholder:text-gray-950 focus:ring-2 ring-[#006989] input-placeholder"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={(e) => handleAddTodo(e)}
            className="button-create px-4 py-2 rounded-md mt-4"
          >
            {isAdding ? "Adding Todo" : "Add Todo"}
          </button>
          <span
            onClick={() => {
              setIsActive(false);
              responsePopupRef.current.classList.add("hide");
            }}
            className="absolute w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-[rgba(0,0,0,.1)] rounded-full top-6 right-6"
          >
            <IoCloseSharp
              size={20}
              className=" text-gray-950 active:scale-95 transition-transform duration-150"
            />
          </span>
        </form>
      </div>
    </>
  );
};

export default Home;
