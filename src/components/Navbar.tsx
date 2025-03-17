import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SpecialPriceModal from "./SpecialPriceModal";
import { createPortal } from "react-dom";
import SearchUserSpecialPriceModal from "./SearchUserSpecialPrice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSpecialPrice, setIsModalOpenSpecialPrice] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <header className="bg-gradient-to-r from-[#5e60e7] via-[#9c7af2] to-[#9c7af2] text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold tracking-wide">
            <Link to="/home">🌟 DRenvio | developers</Link>
          </h1>
          <div className="relative">
          <button ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="text-1xl px-4 py-2 text-white rounded-md font-medium hover:bg-black transition"
            >
              Menú
            </button>
            {isOpen && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden">
                <button className="block px-4 py-2 cursor-pointer"
                onClick={()=> {setIsModalOpenSpecialPrice(true); setIsOpen(false);}}>
                  Artículos
                </button>
                <button
                  onClick={() => {setIsModalOpen(true); setIsOpen(false)}}
                  className="block px-4 py-2 cursor-pointer"
                >
                  Subida
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {createPortal(
        <SpecialPriceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />,
        document.body
      )}

      {createPortal(
        <SearchUserSpecialPriceModal
          isOpen={isModalOpenSpecialPrice}
          onClose={() => setIsModalOpenSpecialPrice(false)}
        />,
        document.body
      )}
    </>
  );
};

export default Header;
