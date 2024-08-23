"use client";
import React, { useEffect, useState } from "react";
import "../i18n";
import MatrixRainingCode from "./bg";
import { useRouter } from "next/navigation";
import { getCookieLogin, setCookieLogin } from "@/services/cookie";
import { Backdrop } from "@mui/material";
import toast from "react-hot-toast";

const quizPage = () => {
  const router = useRouter();
  const [userID,setUserID] = useState()
  const [tricker,setTricker] = useState(false)
  const handlePush = (parth) => {
    router.push(`${parth}`)
  }
  
  const handleSingIN = () => {
    if (userID) {
      setCookieLogin(userID);
      setTricker(true)
      toast.success("Success")
    }else{
      toast("Please Enter ID",
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      )
    }
  }
  useEffect(() => {
    // setCookieLogin(``);
    const cookieData = getCookieLogin();
    console.log("🚀 ~ useEffect ~ cookieData:", cookieData)
    if (cookieData !== undefined) {
      setTricker(true)
    }
  }, []);
  return (
    <>
      <div className={`h-screen w-screen  overflow-hidden -z-10`}>
        <MatrixRainingCode className={`absolute inset-0 -z-10`} />
        <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4 ">
          <div
            className={`w-[500px] h-[300px] `}
          >
          {tricker
          ?
          <div className={`p-10 flex flex-col items-center justify-center rounded-3xl w-full h-full backdrop-filter backdrop-blur-sm `}>
            <h1 className= {`text-4xl font-bold mb-6`}>Welcome to the Quiz</h1>
            <div className="flex gap-16 w-full">
            <button className={`
                    bg-[#010029]
                    text-white
                    py-4
                    px-8
                    text-md
                    font-bold
                    rounded-xl
                    relative
                    before:block
                    before:w-full
                    before:h-full
                    before:absolute
                    before:top-0
                    before:left-0
                    before:bg-gradient-to-br
                    before:from-[#1E96FC]
                    before:to-[#A2D6F9]
                    before:-z-10
                    before:scale-105
                    before:rounded-xl
                    hover:z-0
                    hover:shadow-xl
                    hover:shadow-[#072AC8]
                    hover:text-black
                    transition-all
                    ease-in-out
                    w-full
                    uppercase
                    `}
                    onClick={()=>(
                      handlePush('beginer-quiz')
                    )}
                    >Beginner Quiz
                    </button>
                    <button className="
                    bg-[#010029]
                    text-white
                    py-4
                    px-8
                    text-md
                    font-bold
                    rounded-xl
                    relative
                    before:block
                    before:w-full
                    before:h-full
                    before:absolute
                    before:top-0
                    before:left-0
                    before:bg-gradient-to-br
                    before:from-red-500
                    before:to-orange-500
                    before:-z-10
                    before:scale-105
                    before:rounded-xl
                    hover:z-0
                    hover:shadow-xl
                    hover:shadow-red-600
                    hover:text-black
                    transition-all
                    ease-in-out
                    w-full
                    uppercase
                    "
                    onClick={()=>(
                      handlePush('beginer-quiz')
                    )}
                    >Advanced Quiz
                    </button>
            </div>
            </div>
          :
          <div className={`p-10 gap-10 flex flex-col items-center justify-center rounded-3xl w-full h-full backdrop-filter backdrop-blur-sm `}>
            <h1 className= {`text-4xl font-bold mb-6`}>Welcome to the Quiz</h1>
            <label className="input input-bordered border-green-400  flex items-center gap-2 w-full p-7 bg-[#1D232A] text-white">
              ID : 
              <input type="url" className="grow uppercase pl-1"  value={userID}
              onChange={(e) => setUserID(e.target.value)} 
              placeholder="AH1000xxxx"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSingIN();
                }
            }} 
              />
            </label>
            <div className="flex gap-16 w-full">
            <button className={`
                    bg-black
                    text-white
                    py-4
                    px-8
                    text-md
                    font-bold
                    rounded-xl
                    relative
                    before:block
                    before:w-full
                    before:h-full
                    before:absolute
                    before:top-0
                    before:left-0
                    before:bg-gradient-to-br
                    before:from-green-400
                    before:to-emerald-900
                    before:-z-10
                    before:scale-105
                    before:rounded-xl
                    hover:z-0
                    hover:shadow-xl
                    hover:shadow-emerald-500
                    hover:text-white
                    transition-all
                    ease-in-out
                    w-full
                    uppercase
                    `}
                    
                    onClick={()=>(
                      handleSingIN()
                    )}
                    >Sign IN
                    </button>
            </div>
            </div>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default quizPage;
