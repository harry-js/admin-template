"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavItem } from "@/components/sidebar/app-sidebar"

export function NavMain({ items, setOpen }: { items: NavItem[]; setOpen?: Dispatch<SetStateAction<boolean>> }) {
  const path = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  // 초기에 현재 경로에 해당하는 메뉴 항목을 펼치기
  useEffect(() => {
    const initialOpenState: Record<string, boolean> = {}
    const findParentMenu = (menuItems: NavItem[], currentPath: string): boolean => {
      return menuItems.some((item) => {
        if (item.items?.some((child) => child.url === currentPath)) {
          initialOpenState[item.title] = true
          return true
        }
        return false
      })
    }

    findParentMenu(items, path)
    setOpenItems(initialOpenState)
  }, [items, path])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openItems[item.title]
          const hasChildren = item.items && item.items.length > 0

          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={(open) => {
                setOpenItems((prev) => ({ ...prev, [item.title]: open }))
              }}
              className="group/collapsible"
            >
              {item.items ? (
                <SidebarMenuItem>
                  {hasChildren && (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setOpen?.(true)
                            setOpenItems((prev) => ({
                              ...prev,
                              [item.title]: !prev[item.title],
                            }))
                          }}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight
                            className={cn("ml-auto transition-transform duration-200", isOpen && "rotate-90")}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setOpen?.(false)
                                }}
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  )}
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
