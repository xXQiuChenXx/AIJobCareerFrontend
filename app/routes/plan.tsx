import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, pricingPlans } from "@/sample-data/pricing";
import type { Route } from "./+types/plan";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Job Career | Subscription" },
    { name: "description", content: "Welcome to AI Job Career!" },
  ];
}

const PlanPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the perfect plan to accelerate your AI career journey. All
          plans include our core features.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mt-8 space-x-3">
          <span
            className={`text-sm ${
              !isAnnual ? "font-medium" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle annual billing"
          />
          <span
            className={`text-sm ${
              isAnnual ? "font-medium" : "text-muted-foreground"
            }`}
          >
            Annual{" "}
            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs px-2 py-0.5 rounded-full ml-1">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 my-16">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.popular ? "border-primary shadow-lg relative" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  RM{isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-muted-foreground ml-2">
                  {plan.price.monthly === 0
                    ? "forever"
                    : isAnnual
                    ? "/year"
                    : "/month"}
                </span>
                {isAnnual && plan.price.monthly > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    RM{plan.price.monthly}/mo when billed monthly
                  </p>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.popular ? "bg-primary hover:bg-primary/90" : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="my-24">
        <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6 font-medium">Features</th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    className="text-center py-4 px-6 font-medium"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-6 flex items-center">
                  AI Job Applications
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64">
                          Number of job applications you can submit with AI
                          optimization per month
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="text-center py-4 px-6">5 / month</td>
                <td className="text-center py-4 px-6">Unlimited</td>
                <td className="text-center py-4 px-6">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Resume Analysis</td>
                <td className="text-center py-4 px-6">Basic</td>
                <td className="text-center py-4 px-6">Advanced</td>
                <td className="text-center py-4 px-6">Advanced</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Job Recommendations</td>
                <td className="text-center py-4 px-6">Limited</td>
                <td className="text-center py-4 px-6">Personalized</td>
                <td className="text-center py-4 px-6">Custom</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Interview Preparation</td>
                <td className="text-center py-4 px-6">—</td>
                <td className="text-center py-4 px-6">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">API Access</td>
                <td className="text-center py-4 px-6">—</td>
                <td className="text-center py-4 px-6">—</td>
                <td className="text-center py-4 px-6">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6">Support</td>
                <td className="text-center py-4 px-6">Email</td>
                <td className="text-center py-4 px-6">Priority Email</td>
                <td className="text-center py-4 px-6">24/7 Phone & Email</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-16 mt-32">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PlanPage;
