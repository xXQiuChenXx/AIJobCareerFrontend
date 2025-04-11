import { MapPin, Map } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconWorld,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router";
import { innovationHubs } from "@/sample-data/innovation-hubs";

export function InnovationHubs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {innovationHubs.map((hub) => (
        <Card className="overflow-hidden flex flex-col h-full pt-0" key={hub.division}>
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={hub.imageUrl || "/profile/company.png"}
              className="object-contain w-full h-full object-center"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{hub.division}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{hub.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <NavLink
                to={hub.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Map className="h-5 w-5" />
                View on Google Maps
              </NavLink>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 pt-4">
            <p className="text-sm font-medium">Visit on:</p>
            <div className="flex flex-wrap gap-3 gap-y-2">
              {hub.socialMedia.facebook && (
                <NavLink
                  to={hub.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <IconBrandFacebook className="h-5 w-5" />
                  <span className="text-sm">Facebook</span>
                </NavLink>
              )}
              {hub.socialMedia.instagram && (
                <NavLink
                  to={hub.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <IconBrandInstagram className="h-5 w-5" />
                  <span className="text-sm">Instagram</span>
                </NavLink>
              )}
              {hub.socialMedia.tiktok && (
                <NavLink
                  to={hub.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <IconBrandTiktok className="h-5 w-5" />
                  <span className="text-sm">TikTok</span>
                </NavLink>
              )}
              {hub.socialMedia.website && (
                <NavLink
                  to={hub.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <IconWorld className="h-5 w-5" />
                  <span className="text-sm">Website</span>
                </NavLink>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
