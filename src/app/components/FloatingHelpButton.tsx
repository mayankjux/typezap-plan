import { MessageCircle } from 'lucide-react';

interface FloatingHelpButtonProps {
  onClick?: () => void;
}

export default function FloatingHelpButton({ onClick }: FloatingHelpButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open('https://wa.me/+919876543210', '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-white shadow-lg rounded-full px-6 py-3 text-gray-600 hover:text-blue-500 font-medium transition-colors flex items-center gap-2 z-50"
    >
      <MessageCircle className="w-5 h-5" />
      <span>Need Help?</span>
    </button>
  );
} 