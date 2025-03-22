import { MapPin, BookOpen, ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { universities } from "@/sample-data/universities";
import { NavLink } from "react-router";
import { Button } from "../ui/button";

export function LocalUniversities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {universities.map((university) => (
        <Card
          key={university.name}
          className="flex flex-col h-full transition-all duration-200 hover:shadow-md gap-0"
        >
          <CardHeader>
            <div className="mb-3">
              <img
                src={university.imageUrl || "/placeholder.svg"}
                alt={`${university.name} logo`}
                width={80}
                height={80}
                className="h-16 object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{university.name}</CardTitle>
              <Badge variant="outline" className="text-xs font-medium">
                {university.shortName}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1.5 mt-1">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {university.location}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow space-y-4 pt-2">
            <p className="text-sm">{university.description}</p>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium">Notable Programs:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {university.notablePrograms.map((program) => (
                  <Badge key={program} variant="secondary" className="text-xs">
                    {program}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <NavLink
              className="ml-auto"
              to={university.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="cursor-pointer items-center">
                Visit Website
                <ExternalLink />
              </Button>
            </NavLink>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
