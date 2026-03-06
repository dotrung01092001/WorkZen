import styled from "styled-components";
import { motion } from "framer-motion";

const Button = ({ onAdd, title }: { onAdd: () => void; title: string }) => {
  return (
    <StyledWrapper>
      <motion.button
        onClick={onAdd}
        className="group shadow-lg shadow-blue-500/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-circle-plus-icon lucide-circle-plus ${title === "Add Tasks" ? "group-hover:-translate-x-2" : ""}`}
            >
              <circle cx={12} cy={12} r={10} />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </div>
        </div>
        <span>{title}</span>
      </motion.button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 14px;
    background: royalblue;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    margin-bottom: 1em;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(3em) rotate(90deg) scale(1.1);
  }

  button:hover span {
    transform: translateX(10em);
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
`;

export default Button;
