import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="Logo" className="w-29" />
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trip">
            <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
            <PopoverTrigger>
            <img 
              src="https://cdn-icons-png.flaticon.com/128/64/64572.png"  
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            </PopoverTrigger>
            <PopoverContent>
              <h2 className='cursur-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>
            </PopoverContent>
            </Popover>

          </div>
        ) : (
          <Button>Get started</Button>
        )}
      </div>
    </div>
  );
};

export default Header;