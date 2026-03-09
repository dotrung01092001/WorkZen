import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const AddButton = ({ onAdd, title }: { onAdd: () => void; title: string }) => {
  return (
    <motion.button
      type="button"
      onClick={onAdd}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-700"
    >
      <PlusCircle className="h-4 w-4" />
      {title}
    </motion.button>
  );
};

export default AddButton;
