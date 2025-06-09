import { useEffect, useState } from "react"
import { useAppContext } from "../hooks/appContext"
import { PiUserLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom"
import AccessCard from "../components/accessCard"
import { Button } from "../components/ui/button"
import { BiLogOut } from "react-icons/bi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../components/ui/accordion"
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
import Header from "../components/header";
import { FiPercent } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineNewspaper } from "react-icons/hi2";


export default function Panel () {
    const {userData,countLeave,setWrapperData,access} = useAppContext()
    const [showContent,setShowContent] = useState(false)
    const navigate = useNavigate()
    const [token] = useState(localStorage.getItem('access_token'))


    const goToWrapper = (type) => {
        setWrapperData({url:`https://testautomation.madarnet.net/panel/${type}?t=${token}`,title:type == 'leave' ? 'ثبت مرخصی' : 'گزارش ترددها'})
        navigate('/wrapper')
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        navigate('/auth')
    }

    useEffect(()=>{
        if(userData){
            // user autherazition
            const getData = async () => {
                if(userData.status){
                    setShowContent(true)
                }else
                    navigate('/auth')
            }
            getData()
        }
    },[userData])

    useEffect(()=>{
        setWrapperData(null)
    },[])

    return(
        <>
            {showContent && (
                <div className="grid grid-cols-[500px_1fr] grid-rows-[auto_1fr] h-dvh max-h-dvh min-h-dvh gap-x-5 bg-[#f1f1f1]">
                    <Header />
                    <div className="p-4 rounded-xl bg-[#fff] grid grid-rows-[auto_1fr_auto] gap-3 shadow-xl mr-5 mb-5">
                        <div className="flex flex-col gap-3 justify-center items-center text-center p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white ">
                            {userData?.user?.avatar ? (
                                <div className="w-36 h-36 rounded-full text-[50px] ml-4 ring-2 ring-white ring-offset-2 ring-offset-blue-500"><img className="w-full h-full rounded-full object-cover" src={`https://basesuperapp.bamadar.com/v1/media/${userData.user.avatar}`} /></div>
                            ):(
                                <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-[50px] ml-4 flex-shrink-0 ring-2 ring-white ring-offset-2 ring-offset-blue-500"><PiUserLight /></div>
                            )}
                            <div className="text-2xl font-extrabold text-white">{`${userData?.user?.firstName} ${userData?.user?.lastName}`}</div>
                            <div className="text-white">{`سمت : ${userData?.user?.role}`}</div>
                        </div>

                        {/* right boxes to options admin */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="text-2xl font-bold">خدمات</div>
                                <Accordion className="flex flex-col gap-2 mr-1" collapsible>
                                        <AccordionItem className="rounded-xl flex flex-col gap-5 border px-6 py-2 duration-100 data-[state=open]:hover:bg-[#fff] hover:bg-[#F9FAFB] hover:text-black data-[state=open]:border-blue-500" value="item-1">
                                            <AccordionTrigger className="text-lg rounded-lg hover:no-underline">
                                                <div className="flex items-center gap-2">
                                                    <HiOutlineNewspaper className="text-xl" />
                                                    <div>درخواست مرخصی</div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-10 text-black">
                                                <div className="flex flex-col items-center gap-5 text-[20px]">
                                                    <div className="relative size-[250px] mt-5">
                                                        <div className="absolute inset-0 rounded-full blur-md opacity-25 bg-[#10b981]"></div>
                                                        <svg className="size-full -rotate-90 rounded-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">                                                        
                                                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-white" strokeWidth="2.8"></circle>                                                            
                                                            <circle 
                                                                cx="18" 
                                                                cy="18" 
                                                                r="16" 
                                                                fill="none" 
                                                                className="stroke-current text-[#62cbaa]" 
                                                                strokeWidth="2.8" 
                                                                strokeDasharray="100.53" 
                                                                strokeDashoffset={`${100.53 - ((countLeave.leaveUsed / (countLeave.leaveUsed + countLeave.leaveLeft)) * 100.53)}` || "100.53"} 
                                                                strokeLinecap="round"
                                                            ></circle>
                                                        </svg>
                                                        <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center gap-3">
                                                            <span className="text-center text-[40px] font-bold flex items-center"><FiPercent />{Math.round((countLeave.leaveUsed / (countLeave.leaveUsed + countLeave.leaveLeft)) * 100) || 0}</span>
                                                            <span className="text-center text-xs text-gray-500">استفاده شده</span>
                                                        </div>
                                                    </div>
                                                    <div>میزان مصرف مرخصی</div>
                                                    <div className="flex w-full justify-between gap-2 text-sm">
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className="w-10 h-10 flex items-center justify-center bg-amber-100 text-amber-700 rounded-full">{countLeave.leaveUsed}</div>
                                                            <div className="text-gray-500">استفاده شده</div>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-700 rounded-full">{countLeave.leaveLeft}</div>
                                                            <div className="text-gray-500">باقی مانده</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button onClick={() => goToWrapper('requests')} className="border py-8 text-xl bg-blue-500 text-white w-full rounded-xl" variant="destructive">
                                                    <div>درخواست مرخصی</div>
                                                    <RxExternalLink className="text-2xl" />
                                                </Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                </Accordion>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-bold">لینک ها</div>
                                <div className="flex flex-col gap-5 mr-2">
                                    <div onClick={() => goToWrapper('attendance')} className="flex items-center text-xl gap-3 border py-5 px-4 rounded-xl hover:bg-[#F9FAFB] cursor-pointer"><TbReportSearch /> <div>گزارش ترددها </div></div>
                                </div>
                            </div>
                        </div>
                        {/* button logout */}
                        <Button onClick={logout} className="border rounded-xl border-gray-300 py-7 hover:bg-red-500 hover:text-white text-red-500 text-lg" variant="destructive">
                            <div>خروج از حساب کاربری</div>
                            <BiLogOut className="text-2xl" />
                        </Button>
                    </div>
                    <div className="bg-[#fff] rounded-2xl shadow-xl p-5 ml-5 mb-5 overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-blue-500/10
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-blue-500/50
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:hover:bg-blue-500/70
                        [&::-webkit-scrollbar-thumb]:hover:cursor-grab
                        [&::-webkit-scrollbar-thumb]:active:cursor-grabbing
                    ">
                        {/* left cards for usage admin */}
                        <div className="flex justify-between">
                            <div className="text-3xl border-b pb-3 border-blue-500/30">دسترسی ها</div>
                        </div>
                        <div className="p-5 grid grid-cols-3 gap-x-2 gap-y-10 justify-items-center mt-5 max-[2476px]:grid-cols-2 max-[1844px]:grid-cols-1">
                            {access && access.map((element,key)=>(
                                <AccessCard data={element} id={key} key={key} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}