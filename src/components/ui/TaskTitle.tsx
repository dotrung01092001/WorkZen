import { useState } from "react";
import { createPortal } from "react-dom";

const TaskTitle = ({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: rect.left,
      y: rect.bottom + 8, 
    });

    setIsOpen(true);
  };

  return (
    <>
      <p
        className="truncate max-w-50 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsOpen(false)}
      >
        {title}
      </p>

      {isOpen &&
        createPortal(
          <div
            className="fixed z-50 bg-white dark:text-black border p-3 shadow-lg rounded-md w-72 pointer-events-none"
            style={{
              top: position.y,
              left: position.x,
            }}
          >
            {description}
          </div>,
          document.body
        )}
    </>
  );
};

export default TaskTitle;
