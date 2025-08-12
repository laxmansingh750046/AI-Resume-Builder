import { Share2, ClipboardCopy } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button.jsx"
import { 
  FacebookIcon, 
  XIcon, 
  WhatsAppIcon, 
  LinkedInIcon 
} from "./icons";

export default function ShareButton({ videoUrl, className="",hideShare=false, children }) {
  const [showOptions, setShowOptions] = useState(hideShare);
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(videoUrl);
  const optionsRef = useRef(null);
  
  useEffect(()=>{
     const handleClickOutside = (e)=>{
        if(optionsRef.current && !optionsRef.current.contains(e.target)){
          setShowOptions(false);
        }
      }
      if(showOptions)document.addEventListener('mousedown', handleClickOutside);
      return ()=> removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  const handleCopy = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowOptions(false);
    }, 1500);
  };
 
  return (
    <div className="relative"
         ref={optionsRef}
    >
     {
       !hideShare && (
          <Button
            onClick={() => setShowOptions(!showOptions)}
            aria-label="Share video"  
          >
            {children}
            <Share2 size={18} />
          </Button>
       )
     }

      {showOptions && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={() => setShowOptions(false)}
  >
    <div
      className="bg-gray-800 border border-gray-600 shadow-lg p-4 rounded-lg w-64"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-center text-white pb-2">Share ur resume</h4>
        <div className="grid grid-cols-4 gap-2">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-2 bg-gray-100 hover:bg-gray-600 rounded transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-2 bg-gray-100 hover:bg-gray-600 rounded transition-colors"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-2 bg-gray-100 hover:bg-gray-600 rounded transition-colors"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
        </div>

        <Button onClick={handleCopy}>
          <ClipboardCopy size={16} />
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}