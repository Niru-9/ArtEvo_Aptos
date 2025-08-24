import React from "react";

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // don’t render if closed

  return (
    <div className="top-0 inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-[800px] h-[500px] overflow-y-auto relative">
        {/* Close Button */}
      
        {/* Profile Content */}
        <div className="flex flex-col items-center">
            <button 
          onClick={onClose} 
          className="absolute  right-10 text-black hover:text-red-500  text-5xl"
        >
          ✖
        </button>
        <div className="flex gap-6 ">
          <img 
            src="/profile.jpg" 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md items-left"
          />
          <div><h2 className="text-xl font-bold mt-4">Your Name</h2> <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
      wallet address:-
          </p></div></div>
         
          <div className="flex justify-evenly m-10">
  <div className="bg-gray-700 w-[180px] h-[60px] rounded flex items-center justify-center text-white p-0 mt-2 mb-2 m-10">buy/sell</div>
  <div className="bg-gray-700 w-[180px] h-[60px] rounded flex items-center justify-center p-0 mt-2 mb-2 m-10">YourNFTs</div>
  <div className="bg-gray-700 w-[180px] h-[60px] rounded flex items-center justify-center text-white p-0 mt-2 mb-2 m-10">cart</div>
</div>

        
            <div className=" px-6 max-w-4xl mx-auto">
                {/* Form Section */}
                <form className="mt-7 flex flex-col gap-4">
                    <input type="text" placeholder="NFT Name"
                        className="p-3 rounded bg-gray-800 text-white animate-item" />
                    <textarea placeholder="Description"
                        className="p-3 rounded bg-gray-800 text-white animate-item"></textarea>
                    <input type="number" placeholder="price of nft"
                        className="p-3 rounded bg-gray-800 text-white animate-item" />
                    <input type="file" placeholder="choose your file "
                        className="p-3 rounded bg-gray-800 text-white animate-item" />
                    <button className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold animate-item">
                        Create
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
