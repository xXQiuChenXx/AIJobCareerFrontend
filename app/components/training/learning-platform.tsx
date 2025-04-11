import { ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { platforms } from "@/sample-data/learning-platform";
import { NavLink } from "react-router";

export function LearningPlatforms() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {platforms.map((platform) => (
        <Card
          key={platform.name}
          className="flex flex-col h-full transition-all duration-200 hover:shadow-md"
        >
          <CardHeader className="pb-4">
            <div className="mb-4">
              <img
                src={platform.imageUrl || "/profile/company.png"}
                alt={`${platform.name} logo`}
                // width={80}
                height={80}
                className="h-16 object-contain"
              />
            </div>
            <CardTitle className="text-xl">{platform.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground text-sm">
              {platform.description}
            </p>
          </CardContent>
          <CardFooter className="pt-2">
            <Button asChild className="w-full">
              <NavLink
                to={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Visit Platform
                <ExternalLink className="h-4 w-4" />
              </NavLink>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
