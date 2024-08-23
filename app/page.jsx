'use client'

import React, { useContext, useEffect, useRef, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { ImUser } from "react-icons/im";
import { BsRobot } from "react-icons/bs";
import { GrRefresh } from "react-icons/gr";
import {Button} from "@nextui-org/react";
import Image  from 'next/image';
import { useRouter } from "next/navigation";
import { chatlogs, getDataAI } from "@/services/api";
import { FaStop } from "react-icons/fa";
import { motion } from "framer-motion"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { RiRobot2Line } from "react-icons/ri";
const Home = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone); 
  const [prompt, setPrompt] = useState([]);
  const [isLoading , setIsLoading ] = useState(true);
  const [userInput, setUserInput] = useState('');
  const router = useRouter();
  const chatDivRef = useRef(null);
  const timestamp = dayjs().tz('Asia/Bangkok');


  const handleSubmit = async (e) => {
    setIsLoading(false)
    const _timestamp = timestamp.format()
    const newMessages = [...prompt, { role: 'user', content: userInput }];
    setPrompt(newMessages);
    await chatlogs(userInput,_timestamp)
    const data = await getDataAI (userInput)
    const result = data?.data[0]?.message;
    newMessages.push({ role: 'assistant', content: result?.content })
    setUserInput('');
    setPrompt(newMessages);
    setIsLoading(true)
  };

  const scrollToBottom = () => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [prompt]);

  return (
    <div className="w-screen h-screen bg-[#2E2D2A]">
      <div className="flex flex-col justify-between h-[100vh] items-center">
          <div className={`flex justify-between w-full p-4`}>
            <div className={`flex gap-4`}>
              <Image src="/Images/logo.png" alt="My Logo" width={50} height={50} />
              <div></div>
            </div>
            <div className={`flex justify-center items-center font-semibold text-xl text-white`}>AAPICO - ARTIFICIAL INTELLIGENCE</div>
            <div className={`flex gap-4`}>
              <div className={`flex items-center justify-center`}
              onClick={() => router.push('/adminAI') }
              >
              <div  
              className="hover:shadow-md hover:shadow-orange-400 ease-linear  hover:cursor-pointer select-none rounded-2xl w-[80px] h-9 flex uppercase justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg round ">
                Upsert
              </div>
              </div>
              <div className={` hover:cursor-pointer flex items-center justify-center `}
              onClick={() => window.location.reload()}
              >
              <GrRefresh color="white" size={24} />
              </div>
            </div>
          </div>
          <div ref={chatDivRef} className={`flex flex-col items-start w-full overflow-y-auto h-full px-[15%] `}>
            {/* Chat */}
            {prompt.length === 0 &&
            <>
            <div className={`h-full w-full flex items-center pl-24 gap-24`}>
            <motion.div
                 
                  animate={{
                    scale: [1, 1.2, 1.5, 1.5, 1.2, 1],
                    // rotate: [0, 0, 180, 180, 0],
                    // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  >
                    <RiRobot2Line color="white" size={180}/>
                  </motion.div>
                  <div>
                    <p className={`bg-gradient-to-r from-amber-500 to-pink-500 text-transparent bg-clip-text text-[60px] font-semibold`}>Hello there! </p>
                    <p className={`text-[30px] text-white`}>How can I help you today?</p>
                  </div>
            </div>
            </>
            }
            {prompt.map((message, index) => (
            <>
            {/* {console.log("message",message)} */}
            {message.role === "user"
            ?
            <div key={index} className={`bg-[#201F1B] mt-4 p-4 rounded-xl flex gap-4`}>
              <div className={`flex items-center justify-center`}>
                <ImUser color="white" size={28}/>
              </div>
              <div className={`text-white`}>
                {message.content}
              </div>
            </div>
            :
            <div key={index} className={`bg-[#201F1B] mt-4 p-4 rounded-xl flex gap-4`}>
              <div className={`flex items-center justify-center`}>
                <BsRobot size={28} color={`blue`} />
              </div>
              <div className={`text-white`}>
                {message.content}
              </div>
            </div>
            }
            {/* <div key={index} className={`bg-[#201F1B] mt-4 p-4 rounded-xl flex gap-4`}>
              <div className={`flex items-center justify-center`}>
                <ImUser size={28}/>
              </div>
              <div>
                {message.content}
              </div>
            </div> */}
            </>
            ))}
            {!isLoading && 
            <div className={`bg-[#201F1B] mt-4 p-4 rounded-xl flex gap-4 w-full blur-[1px]`}>
              <div className="flex w-full flex-col gap-4 ">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-[#CBCFC3]"></div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="skeleton h-4 w-20 bg-[#CBCFC3]"></div>
                    <div className="skeleton h-4 w-[40%] bg-[#CBCFC3]"></div>
                    <div className="skeleton h-4 w-[60%] bg-[#CBCFC3]"></div>
                    {/* <div className="skeleton h-4 w-[70%] bg-[#CBCFC3]"></div>
                    <div className="skeleton h-4 w-[90%] bg-[#CBCFC3]"></div> */}
                  </div>
                </div>
              </div>
            </div>
            }

            {/* <div className={`bg-gray-900 mt-4 p-4 rounded-xl flex gap-4`}>
              <div className={`flex items-center justify-center`}>
              <BsRobot size={28} color={`blue`} />
              </div>
              <div>
                
              </div>
            </div> */}

          </div>
          <div className={`p-[4px]`}></div>
          <div className={`px-[15%] w-full `}>
            <div className={`w-full h-[80px] backdrop-blur-sm bg-[#21201C] p-2 rounded-full flex justify-between items-center`}>
              <div className={`pl-4 w-full`}>
                <input type="text" 
                disabled={!isLoading}
                placeholder="What's on your mind ? " 
                className={`w-full h-10 outline-none bg-transparent text-white`} 
                value={userInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && userInput  !== "") {
                  handleSubmit();
                  }
                }}
                onChange={(event) => {
                  setUserInput(event.target.value);
                }}
                />
              </div>
              
              {/* {prompt} */}
              {
                userInput ?
                <button 
                className={` rounded-full bg-[#676767] w-[60px] h-[60px] flex justify-center items-center ${isLoading?"border hover:cursor-pointer ":"border border-red-600"}  `}
                onClick={handleSubmit}
                disabled={!isLoading}
                >
                  {isLoading
                  ?<GoArrowUp size={28} /> 
                  :
                  <motion.div
                  animate={{
                    scale: [1, 1.2, 1.2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  >
                    <FaStop color="red" size={28}/>
                  </motion.div>
                  }
                </button>
                :
                ""
              }
              
            </div>
          </div>
          <div className={`p-2`}>
          </div>
      </div>
    </div>
  )
}

export default Home