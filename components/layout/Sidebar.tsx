"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserSearch,
  UserCheck,
  FolderKanban,
  FileText,
  CheckSquare2,
  BarChart3,
  Settings2,
  Zap,
  MoreVertical,
  ChevronRight,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// ── Types ──────────────────────────────────────────────────

interface SubItem {
  href:  string
  label: string
  icon:  React.ElementType
}

interface NavItem {
  href?:     string
  label:     string
  icon:      React.ElementType
  soon?:     boolean
  children?: SubItem[]   // ← sub-items make it collapsible
}

interface NavSection {
  label: string
  items: NavItem[]
}

// ── Nav config ─────────────────────────────────────────────

const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "CRM",
    items: [
      {
        label: "Contacts",
        icon: Users,
        children: [
          { href: "/contacts/leads",   label: "Leads",   icon: UserSearch },
          { href: "/contacts/clients", label: "Clients", icon: UserCheck  },
        ],
      },
    ],
  },
  {
    label: "Work",
    items: [
      { href: "/projects", label: "Projects", icon: FolderKanban               },
      { href: "/invoices", label: "Invoices", icon: FileText,     soon: true   },
      { href: "/tasks",    label: "Tasks",    icon: CheckSquare2, soon: true   },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/reports",  label: "Reports",  icon: BarChart3, soon: true },
      { href: "/settings", label: "Settings", icon: Settings2             },
    ],
  },
]

// ── Component ──────────────────────────────────────────────

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">

      {/* Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#5B2DFC]">
                  <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <span
                  className="text-base font-semibold"
                  style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                >
                  FreelanceOS
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent>
        {navSections.map((section) => (
          <SidebarGroup key={section.label}>

            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold uppercase tracking-widest">
              {section.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon

                  // ── Collapsible item (has children) ──
                  if (item.children) {
                    const isGroupActive = item.children.some(
                      (c) => pathname === c.href
                    )

                    return (
                      <Collapsible
                        key={item.label}
                        defaultOpen={isGroupActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.label}
                              isActive={isGroupActive}
                              className="text-[15px] font-medium"
                            >
                              <Icon
                                className="h-[18px] w-[18px]"
                                strokeWidth={isGroupActive ? 2.5 : 1.75}
                              />
                              <span>{item.label}</span>
                              <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((child) => {
                                const isActive = pathname === child.href
                                const ChildIcon = child.icon

                                return (
                                  <SidebarMenuSubItem key={child.href}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={isActive}
                                      className="text-[14px]"
                                    >
                                      <Link href={child.href}>
                                        <ChildIcon
                                          className="h-4 w-4"
                                          strokeWidth={isActive ? 2.5 : 1.75}
                                        />
                                        <span>{child.label}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  }

                  // ── Regular item ──
                  const isActive = pathname === item.href

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="text-[15px] font-medium"
                      >
                        <Link href={item.href!}>
                          <Icon
                            className="h-[18px] w-[18px]"
                            strokeWidth={isActive ? 2.5 : 1.75}
                          />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>

                      {item.soon && (
                        <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden text-[10px] text-muted-foreground border rounded px-1.5">
                          soon
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* User */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Rishi Haran">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5B2DFC] text-white text-xs font-semibold">
                RH
              </div>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-semibold">Rishi Haran</p>
                <p className="truncate text-xs text-muted-foreground">Freelancer</p>
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}