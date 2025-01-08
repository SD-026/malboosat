import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmessages } from "../redux/chatSlice";



const RTNoti =()=>{
    const dispatch=useDispatch()
    const {storemessages}=useSelector(store=>store.chat)
    const {socket}=useSelector(store=>store.socketio)
    // console.log(Array.from(storemessages))

    useEffect(() => {
    socket?.on('new_message',(newMessage)=>{
    console.log(newMessage)

        dispatch(setmessages([...storemessages,newMessage]))
    })

    
    return () => {
        socket?.off('new_message')
    }
    }, [storemessages,setmessages])
    

}
export default RTNoti;