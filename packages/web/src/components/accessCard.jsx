import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/appContext";
export default function AccessCard ({data,id}) {
    const navigate = useNavigate()
    const {setWrapperData} = useAppContext()
    const goToWrapper = () => {
        setWrapperData({...data,logo:'dynamic'})
        navigate(`/wrapper`)
    }

    return (
        <motion.div
        className="h-[500px] w-[600px] bg-[#fff] shadow-xl rounded-3xl px-10 py-6 grid grid-rows-[1fr_2fr_1fr] text-center border duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500">
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center rounded-full w-[150px] h-[150px] p-5 ring-blue-600 ring-2">
                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: 0.1 }} layoutId={`icon-${data.id}`} className="w-full" src={`https://basesuperapp.bamadar.com/v1/media/${data.image}`} />
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-center">
                <div className="font-bold text-2xl">{data.title}</div>
                <div className="bg-abolfazlColor">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={goToWrapper} className="flex items-center justify-center gap-5 text-2xl w-full py-5 rounded-xl cursor-pointer border border-black/10 duration-100 bg-blue-600 text-white">
                    <div>مشاهده</div> 
                    <FaArrowLeft className="text-2xl" />
                </button>
            </div>
        </motion.div>
    )
}