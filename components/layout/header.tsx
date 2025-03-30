"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BreadcrumbItemType, Breadcrumbs } from "@/components/layout/breadcrumbs"
import ThemeToggle from "@/components/theme/theme-toggle"

interface HeaderProps {
  breadcrumbItems?: BreadcrumbItemType[]
  children?: React.ReactNode
}

export function Header({ breadcrumbItems = [], children }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1.5" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumbItems.length > 0 && <Breadcrumbs items={breadcrumbItems} />}
        {children}
      </div>

      <div className="ml-auto flex items-center gap-2 mr-5">
        <ThemeToggle />
      </div>
    </header>
  )
}
