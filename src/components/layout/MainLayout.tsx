// src/components/layout/MainLayout.jsx
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { Outlet } from "react-router-dom"
import AppSidebar  from "./AppSideBar"

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-gray-50">
        <div className="p-12">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default MainLayout