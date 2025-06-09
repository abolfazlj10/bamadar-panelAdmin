import { useEffect, useRef, useState} from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../hooks/appContext'
import { PiWarningOctagon } from "react-icons/pi";

export default function PhoneNumberLogin ({onChangeMode}) {
    const {userPhoneNumber, setUserPhoneNumber,useToastifyCoustom} = useAppContext()
    const [allowSend,setAllowSend] = useState(true)
    const focusInput = useRef(null)

    const loginOTP = async () => {
        setAllowSend(false)
        try{
            const sendReq = await fetch(`${import.meta.env.VITE_API_URL}/user/login`,{
                method:'POST',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({mobile:userPhoneNumber})
            })
            const data = await sendReq.json()
            if(data.status){
                useToastifyCoustom('کد با موفقیت ارسال شد.','success')
                onChangeMode()
            }else{
                useToastifyCoustom('خطایی رخ داده است.','error')
            }
        }catch(err){
            useToastifyCoustom('خطایی رخ داده است.','warn')
            console.error(err)
        }
        setAllowSend(true)
    }

    const handleKeyDown = (e) => {
        if(e.key == 'Enter' && allowSend)
            loginOTP()
    }

    useEffect(()=>{
        if(userPhoneNumber.length == 11)
            setAllowSend(true)
        else 
            setAllowSend(false)
    },[userPhoneNumber])
    useEffect(()=>{
        focusInput.current.focus()
    },[])
    return(
        <motion.div key='phone' className='flex flex-col gap-10'
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='bg-[#fff] px-[20px] py-[30px] rounded-xl shadow-xl flex flex-col gap-7 w-[450px]'>
                <div className='text-gray/08 text-xl'>ورود</div>
                <div>
                    <input className='placeholder:text-[#B2B6BD] border border-[#EDEEF0] rounded-xl w-full px-2 py-3 outline-hidden mb-3 outline-none' placeholder='شماره موبایل'  ref={focusInput} onKeyDown={handleKeyDown} maxLength={11} onChange={(e)=>setUserPhoneNumber(e.target.value)} type="text" />
                    <div className='flex items-center gap-1 text-[#8E949E] text-sm'><div className='text-xl'><PiWarningOctagon /></div><div>شماره موبایل باید به نام خودتان باشد.</div></div>
                </div>
                <button onClick={loginOTP} disabled={!allowSend} className={` ${allowSend ? ' hover:scale-105' : ''} duration-75 disabled:opacity-50 disabled:cursor-default cursor-pointer w-full bg-gradient-to-b from-[#BF87DE] to-[#8827BE] text-white rounded-xl py-4`}>ادامه</button>
            </div>
        </motion.div>
    )
}