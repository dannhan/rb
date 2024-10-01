"use client";

import Link from "next/link";
import * as React from "react";

import type { StoreLocation } from "@/types";

import { useGeolocation } from "@uidotdev/usehooks";
import haversine from "haversine-distance";

import { CornerUpRightIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function StoreLocator({
  locations,
}: {
  locations: ( { title: string } & StoreLocation )[];
}) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [geoError, setGeoError] =
    React.useState<GeolocationPositionError | null>(null);

  const { latitude, longitude, error } = useGeolocation({
    enableHighAccuracy: true,
  });

  React.useEffect(() => {
    if (error) {
      setGeoError(error);
      setIsDialogOpen(true);
    } else {
      setGeoError(null);
    }
  }, [error]);

  const handleAllowLocation = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          window.location.reload();
        } else {
          setIsDialogOpen(true);
        }
      });
    } else {
      // Fallback for browsers that don't support the Permissions API
      navigator.geolocation.getCurrentPosition(() => setIsDialogOpen(true));
    }
  };

  const sortedLocations = React.useMemo(() => {
    return locations
      .map((location) => ({
        ...location,
        distance: (() => {
          if (location.lat && location.lng && latitude && longitude) {
            return (
              haversine(
                { latitude: location.lat, longitude: location.lng },
                { latitude, longitude },
              ) / 1000
            );
          }
          return null;
        })(),
      }))
      .sort((a, b) => {
        if (a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        } else if (a.distance !== null) {
          return -1;
        } else if (b.distance !== null) {
          return 1;
        } else if (a.address && b.address) {
          return a.address.localeCompare(b.address);
        } else if (a.address) {
          return -1;
        } else if (b.address) {
          return 1;
        }
        return 0;
      });
  }, [locations, latitude, longitude]);

  if (geoError) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader className="pt-4">
            <DialogTitle className="flex items-center justify-center text-center text-primary">
              <MapPinIcon className="h-12 w-12" />
            </DialogTitle>
            <DialogDescription className="text-center text-base text-foreground">
              Please allow location permission to access this feature
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleAllowLocation} className="w-full">
              Allow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="mx-auto rounded-3xl bg-border bg-gradient-to-b from-primary to-background p-0.5 shadow-md">
      <div className="flex flex-wrap rounded-[calc(1.5rem-1px)] bg-background px-4 pb-4">
        {sortedLocations.map((location) => (
          <div className="w-full px-4 md:w-1/2 2xl:w-1/3" key={location.title}>
            <Card className="rounded-none border-0 border-b bg-transparent shadow-none">
              <CardHeader className="px-0 pb-2">
                <CardTitle className="text-xl text-primary">
                  {location.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-[72px] items-start justify-between gap-8 px-0">
                <p className="line-clamp-2 w-full max-w-full overflow-hidden overflow-ellipsis">
                  {location.address || (
                    <span className="text-muted-foreground/60">
                      Alamat tidak tersedia.
                    </span>
                  )}
                </p>

                {location.link ? (
                  <Link
                    href={location.link}
                    target="_blank"
                    className="flex flex-col items-center gap-2.5"
                  >
                    <div className="rotate-45 rounded-sm bg-primary p-1">
                      <CornerUpRightIcon className="h-4 w-4 -translate-y-[1px] -rotate-45 text-primary-foreground" />
                    </div>
                    <p className="text-xs font-semibold">
                      {location.distance !== null
                        ? `${location.distance.toFixed(1)}Km`
                        : "N/A"}
                    </p>
                  </Link>
                ) : (
                  <div className="h-4 w-4" />
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
