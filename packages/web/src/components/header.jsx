import { useEffect,useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { PiUserLight } from "react-icons/pi";
import { useAppContext } from "../context/appContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link,useLocation } from "react-router-dom";
export default function Header () {
    const {userData,wrapperData,setWrapperData} = useAppContext()
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname == '/'){
            setTimeout(() => {
                setWrapperData({logo:'static'})            
            }, 100);
        }
         
    },[location.pathname])
    return(
        <div className="col-span-2 grid grid-cols-3 items-center bg-[#fff] rounded-xl px-5 py-5 shadow-lg select-none m-5 overflow-hidden min-h-[120px]" >
            <div className="flex items-center gap-1 h-full">
                 <div className=" aspect-square flex items-center justify-center">
                    {userData?.user?.avatar ? (
                        <div className="h-[calc(100%-1rem)] aspect-square rounded-full text-[50px] ml-4 ring-2 ring-white ring-offset-2 ring-offset-blue-500">
                            <img className="max-h-[70px] rounded-full object-cover" src={`https://basesuperapp.bamadar.com/v1/media/${userData?.user?.avatar}`} />
                        </div>
                    ):(
                        <div className="max-h-[50px] aspect-square bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-[50px] ml-4 flex-shrink-0 ring-2 ring-white ring-offset-2 ring-offset-blue-500">
                            <PiUserLight />
                        </div>
                    )}
                </div>
                <div>
                    <div className="text-2xl font-bold">{`${userData?.user?.firstName} ${userData?.user?.lastName}`}</div>
                    <div className="text-black/50 text-lg">{userData?.user?.userProfile?.currentJobStatus == 'employed' ? 'کارمند' : ''}</div>
                </div>
            </div>
            <div className="h-full flex justify-center items-center">
                <AnimatePresence mode="wait">
                    {wrapperData?.image && (
                        <motion.img 
                            key="daynamic-logo"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 1 }}
                            transition={{ duration: 0.1 }} 
                            layoutId={`icon-${wrapperData?.id}`} 
                            className="max-h-[70px] absolute" 
                            src={`https://basesuperapp.bamadar.com/v1/media/${wrapperData?.image}`} 
                        />
                    )}
                    {wrapperData?.logo == 'static' && (
                        <motion.img 
                            key="madar-logo"
                            initial={{ scale: 1 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0 }}
                            transition={{ delay: 0.2, duration: 0.1 }} 
                            src="./logos/madar.svg" 
                            className="max-h-[70px] absolute"
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className="flex justify-end">
                <div dir="ltr" className="flex text-2xl items-center gap-2 font-bold">
                    <RiDashboardFill className="text-[50px] text-blue-500 " />
                    <div className="flex items-center gap-2 text-xl">
                        <Link to="/" className="hover:text-blue-500 duration-75 hover:underline">پنل ادمین</Link>
                        {wrapperData?.url && (
                            <>
                                <span>/</span>
                                <Link to={`/wrapper`} className="hover:text-blue-500 duration-75 hover:underline">{wrapperData.title}</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}