import { useEffect } from "react";
import Header from "../components/header";
import { useAppContext } from "../hooks/appContext";  
import { useNavigate } from "react-router-dom";
export default function Wrapper () {
    const {wrapperData,useToastifyCoustom} = useAppContext()
    const navigate = useNavigate()
    useEffect(() => {
        if(!wrapperData){
            useToastifyCoustom('از قسمت دسترسی ها انتخاب کنید.')
            navigate('/')
        }
    }, []);
    return(
        <div className=" h-screen flex flex-col">
            {wrapperData && (
                <>
                    <Header />
                    <div className="overflow-hidden grow">
                        {
                            
                            <iframe className="w-full h-full z-10" src={wrapperData.url}></iframe>
                        }
                    </div>
                </>
            )}
        </div>
    )
}