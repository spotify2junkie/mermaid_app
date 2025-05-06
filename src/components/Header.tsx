import { DiagramIcon } from 'lucide-react'; // You can use another icon library if preferred

const Header = () => {
  return (
    <header className="w-full py-4 px-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <DiagramIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Mermaid Diagram Generator
        </h1>
      </div>
      {/* ... other header content like theme toggle ... */}
    </header>
  );
};

export default Header;