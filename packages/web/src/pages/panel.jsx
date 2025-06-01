import { useEffect, useState } from "react"
import { useAppContext } from "../context/appContext"
import { PiUserLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom"
import AccessCard from "../components/accessCard"
import { Button } from "../components/ui/button"
import { BiLogOut } from "react-icons/bi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../components/ui/accordion"
import { RxExternalLink } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
import Header from "../components/header";
import { BiSupport } from "react-icons/bi";
import { GoQuestion } from "react-icons/go";
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "../components/ui/hoverCard"


export default function Panel () {
    const {userData,countLeave,setWrapperData,access} = useAppContext()
    const [showContent,setShowContent] = useState(false)
    const navigate = useNavigate()
    const [token] = useState(localStorage.getItem('access_token'))

    const goToWrapper = () => {
        setWrapperData({url:`https://testautomation.madarnet.net?t=${token}`,title:'ثبت مرخصی'})
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
                            <div className="text-white">{`شناسه کاربری : ${userData?.user?.id}`}</div>
                        </div>

                        {/* right boxes to options admin */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="text-2xl font-bold">خدمات</div>
                                <Accordion className="flex flex-col gap-2 mr-1" collapsible>
                                    {[""].map((item,index)=>(
                                        <AccordionItem className="rounded-xl flex flex-col gap-5 border px-6 py-2 duration-100 data-[state=open]:hover:bg-[#fff] hover:bg-[#F9FAFB] hover:text-black data-[state=open]:border-blue-500" key={index} value={`item-${index}`}>
                                            <AccordionTrigger className="text-lg rounded-lg hover:no-underline">
                                                <div className="flex items-center gap-2">
                                                    <AiOutlineEdit className="text-xl" />
                                                    <div>ثبت مرخصی</div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-10">
                                                <div className="flex justify-between text-[20px]">
                                                    <div className="flex">
                                                        <span>کل مرخصی ها:</span>
                                                        <span>{countLeave.leaveLeft / 60 / 8}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span>استفاده شده:</span>
                                                        <span>{countLeave.leaveUsed / 60 / 8}</span>
                                                    </div>
                                                </div>
                                                <Button onClick={goToWrapper} className="border py-8 text-xl bg-blue-500 text-white w-full rounded-xl" variant="destructive">
                                                    <div>ثبت مرخصی</div>
                                                    <RxExternalLink className="text-2xl" />
                                                </Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))
                                    }
                                </Accordion>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-bold">لینک ها</div>
                                <div className="flex flex-col gap-5 mr-2">
                                    {["","",""].map((item,index)=>(
                                        <a href="https://bamadar.com/" target="_blank" key={index} className="flex items-center text-xl gap-3 border py-5 px-4 rounded-xl hover:bg-[#F9FAFB]"><BiSupport /> <div>پشتیبانی</div></a>
                                    ))}
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
                            <HoverCard>
                                <HoverCardTrigger>
                                    <GoQuestion className="text-3xl cursor-pointer hover:text-blue-500 duration-100" /> 
                                </HoverCardTrigger>
                                <HoverCardContent side="right" className="backdrop-blur-sm">
                                    در این قسمت سایت هایی که در دسترس شما هستند نمایش داده میشود.
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="p-5 grid grid-cols-3 gap-y-8 justify-items-center mt-5 max-[2476px]:grid-cols-2 max-[1844px]:grid-cols-1">
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