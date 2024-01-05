import React from 'react'
import DashboardInfo from "../DashboardInfo"
import Conversation from "../Conversation"
import MusicGeneration from "../MusicGeneration"
import VideoGeneration from "../VideoGeneration"
import ImageGeneration from "../ImageGeneration"
import CodeGeneration from "../CodeGeneration"
import SettingsPage from "../SettingsPage";
type Props = {
    openSideBar: boolean;
    active: number;
    setActive: (active: number) => void;
    setOpen: any;
    setRoute: any;
    refetchCredit: any;
}

const Dashboard = ({refetchCredit,active, setActive, setOpen, setRoute}: Props) => {
  return (
    <div className={`pt-[90px] p-10 h-screen overflow-y-scroll w-full `}>
        
      {
        active === 1 && (
            <DashboardInfo setActive={setActive} />
        )
      }
      {
        active === 2 && (
           <Conversation setOpen={setOpen} refetchCredit={refetchCredit} setRoute={setRoute} />
        )
      }
      {
        active === 3 && (
          <ImageGeneration setOpen={setOpen} refetchCredit={refetchCredit} setRoute={setRoute} />
        )
      }
      {
        active === 4 && (
          <VideoGeneration setOpen={setOpen} refetchCredit={refetchCredit} setRoute={setRoute} />
        )
      }
      {
        active === 5 && (
          <MusicGeneration setOpen={setOpen} refetchCredit={refetchCredit} setRoute={setRoute} />
        )
      }{
        active === 6 && (
          <CodeGeneration setOpen={setOpen} setRoute={setRoute} refetchCredit={refetchCredit} />
        )
      }
      {
        active === 7 && (
           <SettingsPage  />
        )
      }
    </div>
  )
}

export default Dashboard