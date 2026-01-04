'use client'

import { Plus, Terminal, LayoutTemplate, History, Settings, LogOut, Trash2, Sparkles } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface Chat {
  id: string
  title: string
  created_at: string
}

interface AppSidebarProps {
  currentView: 'workspace' | 'templates' | 'history'
  setCurrentView: (view: 'workspace' | 'templates' | 'history') => void
  chats: Chat[]
  activeChatId: string | null
  setActiveChatId: (id: string | null) => void
  handleNewChat: () => void
  handleDeleteChat: (e: React.MouseEvent, chatId: string) => void
}

export function AppSidebar({
  currentView,
  setCurrentView,
  chats,
  activeChatId,
  setActiveChatId,
  handleNewChat,
  handleDeleteChat,
}: AppSidebarProps) {
  const { user, signOut } = useAuth()

  const navItems = [
    { label: 'Workspace', icon: Terminal, view: 'workspace' as const },
    { label: 'Templates', icon: LayoutTemplate, view: 'templates' as const },
    { label: 'History', icon: History, view: 'history' as const },
  ]

  return (
    <Sidebar className="border-r-2 bru-shadow">
      <SidebarHeader className="p-6 border-b-2 border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md border-2 border-border bru-shadow bg-foreground flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
          <span className="font-black text-sm uppercase tracking-tight">MovingLines</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 mb-4">
            <Button onClick={handleNewChat} className="w-full bru-button">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    onClick={() => setCurrentView(item.view)}
                    isActive={currentView === item.view}
                    className="font-bold uppercase text-xs tracking-tight"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-wider">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <div className="group flex items-center gap-2 w-full">
                    <SidebarMenuButton
                      onClick={() => {
                        setActiveChatId(chat.id)
                        setCurrentView('workspace')
                      }}
                      isActive={activeChatId === chat.id}
                      className="flex-1 text-xs truncate"
                    >
                      {chat.title}
                    </SidebarMenuButton>
                    <button
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t-2 border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 bru-card hover:bg-secondary"
            >
              <div className="h-8 w-8 rounded-full border-2 border-border bg-gradient-to-br from-main to-mainAccent flex items-center justify-center text-background text-xs font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-xs font-bold truncate">{user?.email}</div>
                <div className="text-[10px] text-muted-foreground">Pro Plan</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bru-card">
            <DropdownMenuItem className="font-bold text-xs uppercase">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="font-bold text-xs uppercase text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
