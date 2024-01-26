import { CheckCircle, MessagesSquare, User } from 'lucide-react';
import React from 'react'

type Props = {
    active: number;
    setActive: (active: number) => void;
}

const Adminsidebr = ({active, setActive}: Props) => {
    const routes = [
        {
            active: 1,
            color: "text-green-500",
            icon: User,
            label: "all-User"
        },
        {
            active: 2,
            color: "text-red-500",
            icon: MessagesSquare,
            label: "Messages"
        },
        {
            active: 3,
            color: "text-blue-500",
            icon: CheckCircle,
            label: "Subscriptions"
        },
    ]
  return (
    <div className=' w-full h-screen pt-[100px] bg-slate-300 dark:bg-slate-950'>
        <div className=" space-y-1 800px:pt-5 px-3 pt-4">
          {routes.map((route) => (
            <div
              key={route.active}
              className={`w-full text-sm p-3 flex justify-start gap-3 cursor-pointer hover:dark:bg-white/10 hover:bg-white/70 rounded-lg transition
               ${active === route.active && " bg-white/70 dark:bg-white/10"}`}
              onClick={() => setActive(route.active)}
            >
              <route.icon size={20} className={` ${route.color}`} />
              <p
                className={`font-Poppins text-black dark:text-white 800px:text-[16px] 800px:block hidden`}
              >
                {route.label}
              </p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Adminsidebr