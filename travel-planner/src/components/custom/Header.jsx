// import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import { useGoogleLogin } from "@react-oauth/google";;
import { useNavigate } from 'react-router-dom';


const Header = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  
  useEffect(() => {
    console.log(user);
  }, [user]);

  const logini = useGoogleLogin({
    onSuccess: (codeResp) => GetuserProfile(codeResp),
    onError: (error) => console.log(error),
    redirectUri: "http://localhost:5173",
  });

  const GetuserProfile = async (tokeninfo) => {
  try {
    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokeninfo?.access_token}`,
          Accept: "application/json",
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(resp.data));
    setUser(resp.data); // ✅ updates UI immediately
    // setOpendailog(false); // comment this if undefined
  } catch (err) {
    console.log("Profile fetch error:", err);
  }};


  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="Logo" className="w-29" />
      <p className="font-logo font-bold text-[28px] text-[#0a0a2f] drop-shadow-md">Make your trip</p>
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
              <h2 className='cursur-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                setUser(null); // ✅ clear the user state
                }}>

              Logout</h2>
            </PopoverContent>
            </Popover>

          </div>
        ) : (
          <Button onClick={logini}>Get Started</Button>
        )}
      </div>
    </div>
  );
};

export default Header;