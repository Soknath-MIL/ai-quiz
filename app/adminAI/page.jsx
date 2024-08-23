"use client";
import { trainAIPrompt, trainAIurl } from "@/services/api";
import { Backdrop, TextField } from "@mui/material";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const AdminPage = () => {

  const [url,setUrl] = useState("");
  const [file,setFile] = useState(null);
  const [prompt,setPrompt] = useState("");
  const [loading,setLoading] = useState(false)
  const [showDialog,setShowDialog] = useState({
    url:false,
    file:false,
    prompt:false
  })
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const handleTrainURL = async () => {
    // console.log("🚀 ~ handleTrainURL ~ _prompt:", _prompt)
    setLoading(true)
    if(url !== "" && url.match(urlRegex) ){
      const response = await trainAIurl(url);
      const result = response.data
      if (response.data === "Learning successfully") {
          setLoading(false)
          setShowDialog(prev => ({
              ...prev,
              url: false,
            }))
          setUrl("")
          toast.success(result)
      }else{
        setLoading(false)
        toast({result},
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
    }else{
      setLoading(false)
      toast('Please enter URL',
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

  const handleTrainPrompt = async () => {
    if (prompt) {
      console.log("🚀 ~ handleTrainPrompt ~ _prompt:", _prompt)
      setLoading(true)
        const response = await trainAIPrompt(prompt);
        // console.log("🚀 ~ handleTrainPrompt ~ response:", response.data)
        const result = response.data
        if (response.data === "Learning successfully") {
            setLoading(false)
            setShowDialog(prev => ({
                ...prev,
                prompt: false,
              }))
            setPrompt("")
            toast.success(result)
        }else{
          setLoading(false)
          toast({result},
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
    }else{
          setLoading(false)
          toast("Please enter prompt",
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

  const handleFile = (e) => {
    if(e.target.files.length === 0){
      return
    }
    const selectedfile = e.target.files[0]
    if(selectedfile?.type !== "text/csv"){
      setDialogAlert({
        open: true,
        message: "File is not allowed please choose .CSV file"
      })
      return
    }
    setFile(selectedfile)
  }
  const handlePrompt = (e) => {
    if(e.target.files.length === 0){
      return
    }
    const selectedfile = e.target.files[0]
    if(selectedfile?.type !== "text/csv"){
      setDialogAlert({
        open: true,
        message: "File is not allowed please choose .CSV file"
      })
      return
    }
    setFile(selectedfile)
  }
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <span className="loading loading-infinity loading-lg"></span>
    </Backdrop>

    <dialog id="my_modal_1" className="modal" open={showDialog.url} >
        <div className="modal-box w-[800px] max-w-5xl h-[250px] flex flex-col justify-between bg-[#1D232A]">
          <div onClick={()=>setShowDialog(prev => ({
              ...prev,
              url: false,
            }))}>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </div>
          <h3 className="font-bold text-lg text-center uppercase text-white ">Learn from URL</h3>
          <div className={`flex justify-center items-center pt-8 `}>
            <label className="input input-bordered input-info flex items-center gap-2 min-w-[600px] bg-[#1D232A] text-white">
              URL : 
              <input type="url" className="grow"  value={url}
              onChange={(e) => {setUrl(e.target.value)}} 
              placeholder="Please enter URL" 
              />
            </label>
          </div>
          <div>
          <div  onClick={handleTrainURL} className={`flex justify-end pt-4`}>
          {/* if there is a button in form, it will close the modal */}
            {/* <button className="btn">Close</button> */}
            <button className="bg-[#1D232A] btn uppercase text-white my-2 mx-2 w-[150px] border-2 border-blue-300
            hover:bg-gradient-to-r 
            hover:from-fuchsia-600 
            hover:to-purple-600 
            hover:shadow-lg
            hover:border-purple-300
            hover:shadow-fuchsia-300 
            "
            >
              submit
            </button>
          </div>
          </div>
        </div>
        <div 
        onClick={()=>setShowDialog(prev => ({
              ...prev,
              url: false,
            }))} 
        className="modal-backdrop">
          <button>close</button>
        </div>
    </dialog>

    <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-[800px] max-w-5xl h-[250px] flex flex-col justify-between">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center uppercase">Learn from URL</h3>
          <div className={`flex justify-center items-center pt-8`}>
            <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
          </div>
          <div>
          <form method="dialog" className={`flex justify-end pt-4`}>
          {/* if there is a button in form, it will close the modal */}
            {/* <button className="btn">Close</button> */}
            <button className="btn uppercase text-white my-2 mx-2 w-[150px] border-2 border-blue-300
            hover:bg-gradient-to-r 
            hover:from-fuchsia-600 
            hover:to-purple-600 
            hover:shadow-lg
            hover:border-purple-300
            hover:shadow-fuchsia-300 
            ">
              submit</button>
          </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
    </dialog>

    <dialog id="my_modal_3" className="modal" open={showDialog.prompt}>
        <div className="modal-box w-11/12 max-w-5xl h-[500px] bg-[#1D232A]">
          <div onClick={()=>setShowDialog(prev => ({
              ...prev,
              prompt: false,
            }))}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
          </div>
          <h3 className="font-bold text-lg text-center uppercase text-white">Learn from Prompt</h3>
          <div className={`flex justify-center items-center `}>
          <textarea className="bg-[#1D232A] textarea textarea-info min-h-72 min-w-[800px] mt-6 text-base " placeholder="Please enter your prompt " onChange={(e) => {setPrompt(e.target.value)}}></textarea>
          </div>
            <div>
              <div onClick={handleTrainPrompt}  className={`flex justify-end pt-8`}>
                <button className="bg-[#1D232A] btn uppercase text-white my-2 mx-2 w-[150px] border-2 border-blue-300
                hover:bg-gradient-to-r 
                hover:from-fuchsia-600 
                hover:to-purple-600 
                hover:shadow-lg
                hover:border-purple-300
                hover:shadow-fuchsia-300 
                ">
                  submit</button>
              </div>
            </div>
        </div>
        <div onClick={()=>setShowDialog(prev => ({
              ...prev,
              prompt: false,
            }))} className="modal-backdrop">
          <button>close</button>
        </div>
    </dialog>

    

    <div className={`inset-0  h-screen w-screen bg-black`}>
      <div className={`p-32 w-full  flex item-center justify-center `}>
        <div className={` w-full p-10 bg-black rounded-xl`}>
          <div
            className={`flex flex-col justify-center items-center text-white gap-4 `}
          >
            <label className={`text-2xl font-bold tracking-[4px] `} htmlFor="">
              AAPICO - AI{" "}
            </label>
            <label className={`text-2xl font-bold tracking-[4px] `} htmlFor="">
              Upsert
            </label>
          </div>
          <div className={`px-16 flex flex-col items-center justify-center gap-8 mt-8`}>
            <div className={`text-black`}>
              <button className="
              bg-[#010029]
              text-white
              py-4
              px-8
              text-lg
              rounded-xl
              relative
              before:block
              before:w-full
              before:h-full
              before:absolute
              before:top-0
              before:left-0
              before:bg-gradient-to-tr
              before:from-[#00fff7]
              before:to-[#ff00f7]
              before:-z-10
              before:scale-105
              before:rounded-xl
              hover:z-0
              hover:shadow-2xl
              hover:shadow-cyan-400
              transition-all
              ease-in-out
              w-[250px]
              "
              onClick={()=>setShowDialog(prev => ({
                ...prev,
                url: true,
              }))}
              >Learn from URL</button>
            </div>
            <div className={`text-black`}>
              <button className="
              bg-[#010029]
              text-white
              py-4
              px-8
              text-lg
              rounded-xl
              relative
              before:block
              before:w-full
              before:h-full
              before:absolute
              before:top-0
              before:left-0
              before:bg-gradient-to-tr
              before:from-[#00fff7]
              before:to-[#ff00f7]
              before:-z-10
              before:scale-105
              before:rounded-xl
              hover:z-0
              hover:shadow-2xl
              hover:shadow-cyan-400
              transition-all
              ease-in-out
              w-[250px]
              "
              onClick={()=>toast.success('test')}
              >Learn from File</button>
            </div>
            <div className={`text-black`}>
              <button className="
              bg-[#010029]
              text-white
              py-4
              px-8
              text-lg
              rounded-xl
              relative
              before:block
              before:w-full
              before:h-full
              before:absolute
              before:top-0
              before:left-0
              before:bg-gradient-to-tr
              before:from-[#00fff7]
              before:to-[#ff00f7]
              before:-z-10
              before:scale-105
              before:rounded-xl
              hover:z-0
              hover:shadow-2xl
              hover:shadow-cyan-400
              transition-all
              ease-in-out
              w-[250px]
              "
              onClick={()=>setShowDialog(prev => ({
                ...prev,
                prompt: true,
              }))}
              >Learn from Prompt</button>
            </div>
            {/* <div className={`text-black `}>
              <button className="
              bg-[#010029]
              text-white
              py-4
              px-8
              text-lg
              rounded-xl
              relative
              before:block
              before:w-full
              before:h-full
              before:absolute
              before:top-0
              before:left-0
              before:bg-gradient-to-tr
              before:from-[#00fff7]
              before:to-[#ff00f7]
              before:-z-10
              before:scale-105
              before:rounded-xl
              hover:z-0
              hover:shadow-2xl
              hover:shadow-cyan-400
              transition-all
              ease-in-out
              w-[250px]
              "
              onClick={()=>setShowDialog(prev => ({
                ...prev,
                prompt: true,
              }))}
              >BACK</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminPage;
