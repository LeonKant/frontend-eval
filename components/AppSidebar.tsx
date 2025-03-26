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
} from "@/components/ui/sidebar";
import Link from "next/link";

type ExercisesT = {
  label: string;
  path: string;
};

export function AppSidebar() {
  const exercises: ExercisesT[] = [
    {
      label: "FAQ component",
      path: "faq-component",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Exercises</SidebarGroupLabel>
            <SidebarMenu>
              {exercises.map((e, ind) => {
                return (
                  <SidebarMenuItem key={`${e.path}-${ind}`}>
                    <SidebarMenuButton asChild>
                      <Link href={`/${e.path}`}>
                        <span>{e.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
