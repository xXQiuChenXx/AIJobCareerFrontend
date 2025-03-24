import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditProjectsForm } from "@/components/profile/edit-projects-form"
import { EditPublicationsForm } from "@/components/profile/edit-publications-form"

export function EditPortfolioForm() {
  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="publications">Publications</TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="pt-4">
        <EditProjectsForm />
      </TabsContent>

      <TabsContent value="publications" className="pt-4">
        <EditPublicationsForm />
      </TabsContent>
    </Tabs>
  )
}
