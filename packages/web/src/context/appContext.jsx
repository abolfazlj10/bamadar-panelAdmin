import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [userPhoneNumber,setUserPhoneNumber] = useState(0)
    const [userData,setUserData] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [wrapperData,setWrapperData] = useState(null)
    const [countLeave,setCountLeave] = useState(0)
    const [access,setAccess] = useState(null)

    const useToastifyCoustom = (text,mode = 'info') => {
        const toastMap = {
            success: toast.success,
            error: toast.error,
            warn: toast.warn,
            info: toast.info,
        }
        const showToast = toastMap[mode]
        showToast(text)
    }
    
    const getUserData = async () => {
        try {
            const token = localStorage.getItem('access_token')
            const path = location.pathname
            if(!token && path != '/auth'){
                navigate('/auth')
            }else if(token) {
                const req = await fetch('https://testautomationcore.madarnet.net/v1/user',{
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                })
                const res = await req.json()
                // Check if user is employee, if not, logout and redirect
                if (!res.user?.userProfile?.hasEmployee) {
                    localStorage.removeItem('access_token')
                    useToastifyCoustom('شما دسترسی به این بخش را ندارید.', 'error')
                    navigate('/auth')
                    return                  
                }
                setUserData(res)
            }
        } catch (error) {
            localStorage.removeItem('access_token')
            navigate('/auth')
        }
    }

    const getCountLeave = async () => {
        const token = localStorage.getItem('access_token')
        const req = await fetch('https://testautomationcore.madarnet.net/v1/settings/count-leave',{
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
        const res = await req.json()
        setCountLeave(res.data)
    }

    const getUserRoots = async () => {
        const token = localStorage.getItem('access_token')
        const req = await fetch('https://testautomationcore.madarnet.net/v1/user/myUrl',{
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        const res = await req.json()
        setAccess([...res.data,
            {id:res.data.length + 1,title:'اتوماسیون',url:'https://bamadar.com',image:"automation/H-pYqf_ABBziAgC0JprPHACx-fRDt6-USSh9C73hPm7u_QjN.webp"},
            {id:res.data.length + 2,title:'میزیتو',url:'https://www.mizito.ir/',image:'https://office.mizito.ir/assets/img/mizito.svg'}
        ])
    }

    useEffect(()=>{
        const asyncFunction = async () => {
            await getUserData()
        }
        asyncFunction()
    },[])
    
    useEffect(()=>{
        const asyncFunction = async () => {
            if(userData){
                await getUserRoots()
                await getCountLeave()
            }
        }
        asyncFunction()
    },[userData])

    const usage = {
        userPhoneNumber,
        setUserPhoneNumber,
        useToastifyCoustom,
        userData,
        wrapperData,
        setWrapperData,
        getUserData,
        countLeave,
        access
    }   

    return(
        <AppContext.Provider value={usage}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)