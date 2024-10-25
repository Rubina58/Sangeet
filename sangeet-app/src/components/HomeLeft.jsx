import React from 'react';
import { Link } from 'react-router-dom';

const HomeLeft = () => {
  return (
    <div className="w-3/4 bg-white p-4 m-8">
            {/* Trending Songs Title */}
            <a  href="#" className="text-[#8E44AD] hover:text-[#7D3C98]  text-3xl mb-8 block">Trending Songs</a>
            
            {/* Song Cards in a Horizontal Line */}
            <div className="flex space-x-4 overflow-x-auto w-full">
                {/* Card 1 */}
                <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   
            
             <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   

             <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   
             


             
             
            </div>

            

             {/* Popular Songs Title */}
             <a  href="#" className="text-[#8E44AD] hover:text-[#7D3C98]  text-3xl mb-8 mt-8 block">Popular Songs</a>
            
            {/* Song Cards in a Horizontal Line */}
            <div className="flex space-x-4 overflow-x-auto">
                {/* Card 1 */}
                <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   

             <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   
                

            

            
            </div>

             {/* Trending Songs Title */}
             <a  href="#" className="text-[#8E44AD] hover:text-[#7D3C98]  text-3xl mb-8 mt-8 block">Recommended Songs</a>
            
            {/* Song Cards in a Horizontal Line */}
            <div className="flex space-x-4 overflow-x-auto">
                <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   

             <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   

             <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   

             <a href='#' className='group'>
                <div className="bg-[#FAFAFA] p-4 rounded-lg shadow-md flex-shrink-0 w-50 h-[200px] overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-100  border-2  group-hover:border-[#8E44AD]/30 group-hover:bg-[#8E44AD]/10 relative box-border ">
                {/* <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#8E44AD] text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" /> */}
                    {/* Placeholder for album art or song thumbnail */}
                    <div className="flex-items-center justify-center p-2">
                        <img src="https://via.placeholder.com/80" alt="Album Art" className="rounded-md w-30 h-30" />
                    </div>
                    <div className='truncate'>
                        <h2 className="text-[#2C3E50] font-bold text-lg">Song Title 1</h2>
                        <p className="text-[#95A5A6] truncate">Singer: John Doe</p>
                        <p className="text-[#95A5A6] truncate">Artist: Jane Smith</p>
                    </div>
                </div>
               
                
             </a>   

            </div>
        </div>

  )
};

export default HomeLeft;