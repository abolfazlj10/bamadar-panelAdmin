import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/appContext";
export default function AccessCard ({data,id}) {
    const navigate = useNavigate()
    const {setWrapperData} = useAppContext()
    const goToWrapper = () => {
        setWrapperData(data)
        navigate(`/wrapper`)
    }

    return (
        <motion.div
        onClick={goToWrapper}
        className="h-[500px] w-[600px] cursor-pointer bg-gradient-to-br to-purple-600 from-blue-600 shadow-xl grid grid-rows-[8fr_1fr] rounded-xl p-5 text-center border duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500">
            <div className="flex justify-center items-center">
                <motion.img 
                    layoutId={`icon-${data.id}`} 
                    className="w-[200px] object-contain z-[99]" 
                    src={ data.title === 'میزیتو' ? `/logos/mizito.webp` : `https://basesuperapp.bamadar.com/v1/media/${data.image}`}
                    transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                />
            </div>
            <div className="flex gap-5 justify-end items-center">
                <div className="font-bold text-white text-[35px]">{data.title}</div>
            </div>
        </motion.div>
    )
}