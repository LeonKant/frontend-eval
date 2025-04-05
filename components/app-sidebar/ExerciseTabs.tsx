import { exercises } from "@/lib/exercisesList";
import { ExercisesT } from "@/types/exercises";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function ExerciseTabs() {
  const tabs: { tabTitle: string; tabData: ExercisesT[] }[] = [
    { tabTitle: "Easy", tabData: exercises.easy },
    { tabTitle: "Medium", tabData: exercises.medium },
    { tabTitle: "Hard", tabData: exercises.hard },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarGroupLabel>Exercises</SidebarGroupLabel>
        <SidebarMenu>
          {tabs.map(({ tabTitle, tabData }, ind) => (
            <Collapsible
              key={`${tabTitle.toLowerCase()}-${ind}`}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild className="cursor-pointer">
                  <SidebarMenuButton>
                    {tabTitle}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {tabData.map(({ label, path }, tind) => (
                      <SidebarMenuSubItem key={`${path.toLowerCase()}-${ind}`}>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/${path}`}>
                            <span>{label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
