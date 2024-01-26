import { useSelector } from "react-redux";

export default function AdminAuth(){
    const {user} = useSelector((state:any) => state.auth);

    if(user && user.role === "Admin"){
        return true;
    }else{
        return false;
    }
}