"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { handleCopy } from "./utils/handleCopy";
import { callGemini } from "./utils/callGemini";

export default function Home() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    
    <div className="relative min-h-screen flex flex-col items-center justify-start px-4 py-10 overflow-x-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Decorative blurred glows */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
      
      <div className="flex flex-col justify-center items-center space-y-2 z-10">
        <div className="pt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-[#EEEFEE] to-[#EEFFEE] text-transparent bg-clip-text drop-shadow-sm">
          Humanize Linkedin Post
        </div>

        {mounted && (
          <div className="pt-6 pb-8 text-center text-[1.75rem] md:text-3xl font-extrabold tracking-tight leading-snug text-[#EFEEEE] italic">
            Stop this "🚀🚀🚀" and just say what you mean.
          </div>
        )}
      </div>

      <div className="pt-8 w-full max-w-3xl z-10">
        <div className="pb-8 flex flex-col justify-center items-center">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            minLength={30}
            placeholder={"Paste That Goofy Post Here"}
            className="w-full h-60 resize-none text-slate-900"
          />
        </div>

        <div className="flex flex-col justify-center items-center">
          <Button onClick={() => callGemini(input, setResponse, setLoading)}>Clean It Up</Button>
        </div>

        {loading ? (
          <div className="mt-8 flex items-center justify-center text-white text-lg animate-pulse">
            <svg
              className="animate-spin h-6 w-6 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Generating prompt...
          </div>
        ) : (
          response && (
            <div className="relative flex justify-center items-center mt-8 w-full z-10">
              <button
                onClick={() => handleCopy(response, setCopied)}
                className="absolute top-2 right-2 px-7 py-3 text-sm bg-white/10 text-white border border-white/20 rounded-md hover:bg-white/20 transition-all backdrop-blur-md"
              >
                {copied ? "Copied!" : "Copy"}
              </button>

              <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/10 shadow-xl text-white p-6 rounded-3xl text-base leading-relaxed tracking-wide transition-all duration-300 whitespace-pre-wrap w-full max-w-3xl">
                {response}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
