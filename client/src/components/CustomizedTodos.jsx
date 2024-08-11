import React from "react";

import { MdDone } from "react-icons/md";
const CustomizedTodos = ({ customizedTodos, title }) => {

    
  return (
    <>
      <div className="p-6 flex flex-col gap-4">
        {customizedTodos.length > 0 ? (
          customizedTodos?.map((todo) => (
            <div key={todo._id} className="flex gap-3 py-2">
              <div className="checkbox flex items-start mt-2">
                <span className="text-white bg-gray-950 rounded-full">
                  <MdDone />
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-bold">{todo.title}</h2>
                <p className="text-gray-600">{todo.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[400px] flex justify-center items-center">
            <span>No Tasks Found...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomizedTodos;
