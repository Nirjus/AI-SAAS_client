import React, { useEffect } from 'react'
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
 import img from "../../../public/images/avatar.png";
import Image from 'next/image';
import { Delete } from 'lucide-react';
import { useUserDeleteByAdminMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import { format } from 'timeago.js';
type Props = {
    item: any;
    refetch: any;
}

const AdminAllUser = ({item, refetch}: Props) => {
   
    const [userDeleteByAdmin,{isSuccess,error, data}] = useUserDeleteByAdminMutation();
   
   useEffect(() => {
    if(isSuccess){
        refetch();
        const message = data?.message || "User deleted";
        toast.success(message);
    }
    if(error){
        if("data" in error){
            const errorMessage = error as any;
            toast.error(errorMessage.data.message);
        }
    }
   },[isSuccess, error, data, refetch])
    const userDeleteHandler = async (e:any) => {
       await userDeleteByAdmin(e);
    }
    const cols:GridColDef[] = [
        { field: 'name', headerName: 'Name' , editable:true,flex:1 },
        { field: 'email', headerName: 'Email',flex:1 , editable: true},
        {
          field: 'avatar',
          editable: true,
          headerName: 'Avatar',
          renderCell: (e) => (
                <div className=' py-1'>
                    <Image src={e.value} alt='avatar' width={500} height={500} className=' w-10 h-10 rounded-full object-cover' /> 
                </div>
            ),
          flex:1
        },
        {
            field: 'joined', headerName: 'Joined',flex:1 , editable: true
        },
        {
            field: 'id',
            headerName: "Delete user",
            flex: 1,
             renderCell: (e) => (
                <button className=' bg-[#88878738] active:bg-[#8a8a8a5f] p-2 rounded'
                onClick={() => userDeleteHandler(e.value)}
                ><Delete /></button>
             )
        }
    ]
    const rows = item && item.map((items:any) => ({
        id: items._id,
        name: items.name,
        email: items.email,
        avatar: items?.avatar?.url ? items?.avatar.url : items.socialAvatar ? items.socialAvatar : img,
        joined: format(items.createdAt)
    }))
  return (
    <div className=' w-full bg-[#dbdbdb62]   rounded-lg'>
        <DataGrid rows={rows} columns={cols}  initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        slots={{
            toolbar: GridToolbar
        }}
        checkboxSelection 
        className=' text-black dark:text-white font-Poppins font-bold'
        />
    </div>
  )
}

export default AdminAllUser