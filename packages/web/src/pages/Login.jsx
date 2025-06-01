import { useEffect, useState } from "react"
import {  AnimatePresence } from 'framer-motion';
import PhoneNumberLogin from "../components/phoneNumberLogin";
import CodeLogin from "../components/codeLogin";

export default function Login () {
    const [showPhone,setShowPhone] = useState(true)
    
    const changeMode = () => {
        setShowPhone(!showPhone)
    }
    
    return(
        <div className="grid grid-cols-2 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 w-full">
            <div className="p-5 flex flex-col justify-between items-center relative overflow-hidden bg-gradient-to-br from-[#4c4f59] to-[#8a37d2] text-white">
                <div className="absolute inset-0 bg-pattern opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,}}></div>
                <div><img className="w-[80px] drop-shadow-xl" src='./logos/madar.svg' alt="Madar Logo"/></div>
                <div className="flex flex-col shadow-xl gap-4 w-[450px] border border-white/30 p-5 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold">پنل دسترسی ها با مادر</div>
                    <div className="text-white/80 text-sm">به پنل درسترسی ها با مادر خوش آمدید.با ورود به سیستم میتوانید از پنل استفاده نمایید.</div>
                </div>
                <div className="text-xs">© 2025 بامادر. تمامی حقوق محفوظ است.</div>
            </div>
            <div className="h-dvh bg-bgColor flex flex-col justify-center items-center">
                <div className="flex justify-center items-center"><img src="./logos/logo-madar3d.png" className="w-40" alt="Madar 3D Logo" /></div>
                <AnimatePresence mode="wait">
                    {showPhone ? <PhoneNumberLogin onChangeMode={changeMode} /> : <CodeLogin onChangeMode={changeMode} />}
                </AnimatePresence>
            </div>
        </div>
    )
}