// src/components/layout/AppSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../ui/sidebar"
import { Users, LayoutDashboard, LogOut } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import logo from '@/assets/images/logo.jpg'

import { supabase } from "@/lib/supabaseClient";


const AppSidebar = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard", 
    icon: LayoutDashboard,
  },
  {
    title: "Interns",
    url: "/dashboard/interns", 
    icon: Users,
  },
  {
    title: "Corpers",
    url: "/dashboard/corper",
    icon: Users,
  },
]

  return (
    <Sidebar>
      <SidebarHeader className="mt-15 flex justify-center items-center">
        <div>
          <img src={logo} alt="logo" className="max-h-32 object-contain" />
        </div>
      </SidebarHeader>     
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Management</SidebarGroupLabel> */}
          <SidebarGroupContent className="p-3">
            <SidebarMenu className="space-y-10">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={`border border-[#638763] p-6 rounded-full cursor-pointer
                        ${isActive ? "bg-[#638763] text-white" : ""}`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className=" mb-15 p-3">
            <SidebarMenuButton
              className="border border-[#638763] p-6 rounded-full bg-[#638763] text-white cursor-pointer"
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();
                  if (error) {
                    console.error("Logout failed:", error.message);
                  } else {
                    navigate("/login");
                  }
                }}
                >
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar