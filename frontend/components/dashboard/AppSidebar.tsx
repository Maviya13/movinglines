'use client'

import Image from 'next/image'
import { Plus, Wand2, BookOpen, Clock, Settings, LogOut, Trash2, ChevronDown } from 'lucide-react'
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

  // Get user avatar from Google
  const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'

  const navItems = [
    { label: 'Create', icon: Wand2, view: 'workspace' as const },
    { label: 'Templates', icon: BookOpen, view: 'templates' as const },
    { label: 'History', icon: Clock, view: 'history' as const },
  ]

  return (
    <Sidebar className="border-r border-white/5 bg-[#0a0a0a]">
      {/* Header with Logo */}
      <SidebarHeader className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-black overflow-hidden flex items-center justify-center">
            <Image src="/logo.png" alt="MovingLines" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="text-base font-semibold text-white tracking-tight">movinglines</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#0a0a0a] px-2">
        {/* New Animation Button */}
        <SidebarGroup className="pt-4 pb-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Animation
          </button>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="text-[11px] font-medium text-white/30 uppercase tracking-wider px-3 mb-1">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <button
                    onClick={() => setCurrentView(item.view)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === item.view
                      ? 'text-white bg-white/10'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Divider */}
        <div className="mx-3 my-2 border-t border-white/5" />

        {/* Recent Animations */}
        <SidebarGroup className="flex-1 py-2">
          <SidebarGroupLabel className="text-[11px] font-medium text-white/30 uppercase tracking-wider px-3 mb-2">
            Recent
          </SidebarGroupLabel>
          <SidebarGroupContent className="overflow-y-auto max-h-[calc(100vh-400px)]">
            <SidebarMenu className="space-y-0.5">
              {chats.length === 0 ? (
                <div className="px-3 py-8 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-white/5 flex items-center justify-center">
                    <Wand2 className="h-5 w-5 text-white/20" />
                  </div>
                  <p className="text-sm text-white/30">No animations yet</p>
                  <p className="text-xs text-white/20 mt-1">Create your first one!</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <div className="group flex items-center w-full">
                      <button
                        onClick={() => {
                          setActiveChatId(chat.id)
                          setCurrentView('workspace')
                        }}
                        className={`flex-1 text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${activeChatId === chat.id
                          ? 'text-white bg-white/10'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {chat.title}
                      </button>
                      <button
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 hover:bg-red-500/10 rounded-md text-white/30 hover:text-red-400 transition-all"
                        aria-label={`Delete ${chat.title}`}
                        title={`Delete ${chat.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="border-t border-white/5 p-3 bg-[#0a0a0a]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="User settings menu"
              title="User settings menu"
            >
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium text-white truncate">{userName}</div>
                <div className="text-xs text-white/40 truncate">{user?.email}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-white/30" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 bg-[#111] border border-white/10 mb-2">
            <DropdownMenuItem className="text-sm text-white/70 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="text-sm text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
