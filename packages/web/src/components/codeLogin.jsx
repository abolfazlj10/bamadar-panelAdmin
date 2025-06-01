import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { BsClock } from "react-icons/bs";


export default function CodeLogin ({onChangeMode}) {
    const [inputValues,setInputValues] = useState(['','','','',''])
    const [code,setCode] = useState(0)
    const [allowSend, setAllowSend] = useState(false)
    const {userPhoneNumber,useToastifyCoustom,userData,getUserData} = useAppContext()
    const navigate = useNavigate()
    const [inputs] = useState('border border-[#EDEDED] rounded-xl outline-hidden text-center h-[60px] focus:border-[#B145ED] caret-[#B145ED] outline-none')
    const inputRefs = useRef([])
    const [time,setTime] = useState({min:3,sec:0})
    const intervalRef = useRef(null)


    const authCode = async () => {
        // in this function we send otp code to server and get response token and save it in localstorage, also we check does user is employee or
        setAllowSend(false)
        try {
            const sendReq = await fetch(`${import.meta.env.VITE_API_URL}/user/verify` , {
                method:'POST',
                headers:{
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({mobile:userPhoneNumber, otp:code})
            })
            const data = await sendReq.json()
            // here we check, the otp is valid or not
            if(data.status){
                localStorage.setItem('access_token',data.data.token)
                await getUserData()
                useToastifyCoustom('ورود موفقیت آمیز بود.','success')
                navigate('/')
            }else{
                setCode(0)
                setInputValues(['','','','',''])
                inputValues.map((e,index)=>{
                    inputRefs.current[index].value = ''
                    index != 0 && (inputRefs.current[index].disabled = true)
                })
                inputRefs.current[0].focus()
                useToastifyCoustom('کد اشتباه است.','error')
            }
        } catch (error) {
            useToastifyCoustom('مشکلی رخ داده است.','warn')
            console.log(error)
        }
        setAllowSend(true)
    }

    const handleKeyDown = (e,index) => {
        if(e.key == 'Backspace'){
            e.preventDefault();
            if(index != 0 && e.target.value == ''){
                inputRefs.current[index].disabled = true
                inputRefs.current[index-1].focus()
            }
            const updateValue = [...inputValues]
            updateValue[index] = ''
            e.target.value = ''
            setInputValues(updateValue)
        }else if(Number(e.key && e.target.value.length)){
            handleChange(e,index)
        }
    }
    const handleChange = (e,index) => {
        if(index != 4){
            inputRefs.current[index+1].disabled = false
            inputRefs.current[index+1].focus()
        }
        const updateValue = [...inputValues]
        updateValue[index] = e.target.value
        setInputValues(updateValue)
        if(index == 4){
            setCode(updateValue.join(""))
        }
    }

    const timer = () => {
        let minutes;
        let second;
        intervalRef.current = setInterval(() => {
            setTime(prevTime => {
                minutes = prevTime.min
                second = prevTime.sec
                if(second == 0){
                    if(minutes == 0){
                        clearInterval(intervalRef.current)
                        return {min:0,sec:0}
                    }
                    minutes -= 1
                    second = 60
                }
                second -= 1
                return {min:minutes, sec:second}
            })
        }, 1000);
    }

    const displayTimer = () => {
        const min = time.min.toString().padStart(2,'0')
        const sec = time.sec.toString().padStart('2',0)
        return `${min}:${sec}`
    }
    
    const checkAllowInputs = (index) => {
        // index == 0 
        if(index != 0){
            return true
        }else{
            return false
        }
    }

    useEffect(()=>{
        if (time.min === 0 && time.sec === 0) {
            onChangeMode()
            useToastifyCoustom('کد شما منقضی شد، دوباره امتحان کنید.','error')
        }
    },[time])

    useEffect(()=>{
        if(code.length == 5)
            authCode()
    },[code])

    useEffect(()=>{
        inputRefs.current[0].focus()
        timer()
        return () => clearInterval(intervalRef.current)
    },[])
    
    return(
        <motion.div key='code' className='flex flex-col gap-10'
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0}}
            transition={{ duration: 0.5 }}
        >
            <div className='bg-[#fff] px-[20px] py-[30px] rounded-xl shadow-xl flex flex-col gap-7 w-[450px] text-center'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#434343]'>کد ارسال‌شده به شماره <span className='font-bold'>{userPhoneNumber}</span> را وارد کنید</div>
                    <div onClick={onChangeMode} className='text-[#757575] cursor-pointer hover:text-[#434343] duration-75'>ویرایش شماره موبایل</div>
                </div>
                <div dir='ltr' className='grid grid-cols-5 gap-5 px-5 text-2xl'>
                    {inputValues.map((value,index)=>(
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            onChange={(e)=> handleChange(e,index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={inputs}
                            type="text"
                            maxLength="1"
                            inputMode="numeric"
                            pattern="[0-9]"
                            disabled={checkAllowInputs(index)}
                        />
                    ))}
                </div>
                <div className='flex justify-center items-center gap-2 text-sm text-[#757575]'>
                    <div><BsClock /></div>
                    <div dir='ltr' className='text-[#DC2626]'>{displayTimer()}</div>
                    <div>تا دریافت مجدد کد</div>
                </div>
                <button onClick={authCode} disabled={!allowSend} className={` ${allowSend ? ' hover:scale-105' : ''} duration-75 disabled:opacity-50 disabled:cursor-default cursor-pointer w-full bg-gradient-to-b from-[#BF87DE] to-[#8827BE] text-white rounded-xl py-4`}>تایید</button>
            </div>
        </motion.div>
    )
}