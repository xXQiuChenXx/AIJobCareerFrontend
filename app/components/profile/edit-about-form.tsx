import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const aboutFormSchema = z.object({
    location: z.string().min(2, { message: "Location must be at least 2 characters." }),
    company: z.string().min(2, { message: "Company must be at least 2 characters." }),
    about: z.string().min(10, { message: "About must be at least 10 characters." }),
})

type AboutFormValues = z.infer<typeof aboutFormSchema>

// This would typically come from a database or API
const defaultValues: Partial<AboutFormValues> = {
    location: "San Francisco, CA",
    company: "TechAI Solutions",
    about:
        "Experienced AI Engineer with 7+ years specializing in machine learning models and natural language processing. Passionate about developing AI solutions that solve real-world problems and improve user experiences. Currently focused on large language models and their applications in career development.",
}

export function EditAboutForm() {
    const form = useForm<AboutFormValues>({
        resolver: zodResolver(aboutFormSchema),
        defaultValues,
        mode: "onChange",
    })

    return (
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Company</FormLabel>
                            <FormControl>
                                <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About Me</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a short bio about yourself" className="min-h-32 resize-none" {...field} />
                            </FormControl>
                            <FormDescription>Briefly describe your professional background and interests.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

