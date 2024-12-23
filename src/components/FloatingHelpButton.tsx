import { HelpCircle } from 'lucide-react';

const FloatingHelpButton = () => {
  const handleClick = () => {
    const element = document.getElementById("plan-comparison");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-shadow"
      aria-label="Help"
    >
      <HelpCircle className="w-6 h-6 text-gray-600" />
    </button>
  );
};

export default FloatingHelpButton; 