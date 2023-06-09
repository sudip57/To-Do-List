import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article
            className="todo-item flex items-center justify-between mb-[0.5rem] transition-all duration-300 ease-linear py-[0.25rem] px-[1rem] rounded capitalize hover:text-[#617d98] hover:bg-[#f1f5f8]  "
            key={id}
          >
            <p className="title mb-0 text-[#102a42] tracking-[2px] transition-all duration-300 ease-linear  ">
              {title}
            </p>
            <div className="btn-container">
              <button
                className="edit-btn text-[#6be675] hover:text-[#25bb32] "
                type="button"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                className="del-btn text-[#e66b6b] hover:text-[#bb2525] "
                type="button"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
