import { useAppContext } from "../context/appContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Header () {
    const {userData,wrapperData,setWrapperData} = useAppContext()
    return(
        <div className="col-span-2 grid grid-cols-3 items-center bg-white rounded-xl px-5 py-5 shadow-lg select-none m-5 overflow-hidden min-h-[120px]" >
            <div className="flex">
                <div className="flex text-2xl items-center gap-2 font-bold">
                    <motion.img 
                        key="madar-logo"
                        initial={{ scale: 1 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        src="./logos/madar.svg" 
                        className="max-h-[70px] object-contain"
                    />
                    <div className="flex items-center gap-2 text-xl">
                        <Link to="/" className="hover:text-blue-500 duration-75 hover:underline">صفحه اصلی</Link>
                        {wrapperData?.url && (
                            <motion.div
                                initial={{ opacity: 0,x:10 }} 
                                animate={{ opacity: 1,x:0 }} 
                                exit={{ opacity: 0,x:10 }}
                                transition={{duration:0.1}}
                                className="flex items-center gap-2"
                            >
                                <span>/</span>
                                <Link to={`/wrapper`} className="hover:text-blue-500 duration-75 hover:underline">{wrapperData.title}</Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-full flex justify-center items-center">
                {wrapperData?.image && (
                    <motion.img 
                        layoutId={`icon-${wrapperData?.id}`}
                        className="max-h-[70px] object-contain z-[99]" 
                        src={wrapperData.title === 'میزیتو' ? `/logos/mizito.webp` : `https://basesuperapp.bamadar.com/v1/media/${wrapperData?.image}`}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    />
                )}
            </div>
        </div>
    )
}