"use client";

import Link from "next/link";

import { useGeolocation } from "@uidotdev/usehooks";
import haversine from "haversine-distance";

import { CornerUpRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type locationProps = {
  title: string;
  address?: string;
  link?: string;
  lat?: number;
  lng?: number;
  className?: string;
};

export function StoreLocator({ locations }: { locations: locationProps[] }) {
  const state = useGeolocation({
    timeout: 999999,
    maximumAge: 999999,
    enableHighAccuracy: true,
  });

  if (state.error) {
    return null;
  }

  const sortedLocations = locations
    .map((location) => ({
      ...location,
      distance: (() => {
        if (!location.address) {
          return 99999 + 2;
        }
        if (!location.link) {
          return 99999 + 1;
        }
        if (
          !location.lat ||
          !location.lng ||
          !state.latitude ||
          !state.longitude
        ) {
          return 99999 + 0;
        }
        return (
          haversine(
            { latitude: location.lat, longitude: location.lng },
            { latitude: state.latitude, longitude: state.longitude },
          ) / 1000
        );
      })(),
    }))
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="mx-auto rounded-3xl bg-border bg-gradient-to-b from-primary to-background p-0.5 shadow-md">
      <div className="flex flex-wrap rounded-[calc(1.5rem-1px)] bg-background px-4 pb-4">
        {sortedLocations.map((location, index) => (
          <div className="w-full px-4 md:w-1/2 2xl:w-1/3" key={location.title}>
            <Location
              className="rounded-none border-0 border-b bg-transparent"
              title={location.title}
              address={location.address}
              link={location.link}
              distance={location.distance}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const Location = ({
  title,
  address,
  link,
  distance,
  className,
}: locationProps & { distance: number }) => (
  <Card className={className}>
    <CardHeader className="px-0 pb-2">
      <CardTitle className="text-xl text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex min-h-[72px] items-start justify-between gap-8 px-0">
      <p className="line-clamp-2 w-full max-w-full overflow-hidden overflow-ellipsis">
        {address || (
          <span className="text-muted-foreground/60">
            Alamat tidak tersedia.
          </span>
        )}
      </p>

      {link ? (
        <Link
          href={link}
          target="_blank"
          className="flex flex-col items-center gap-2.5"
        >
          <div className="rotate-45 rounded-sm bg-primary p-1">
            <CornerUpRightIcon className="h-4 w-4 -translate-y-[1px] -rotate-45 text-primary-foreground" />
          </div>
          <p className="text-xs font-semibold">{distance.toFixed(1)}Km</p>
        </Link>
      ) : (
        <div className="h-4 w-4" />
      )}
    </CardContent>
  </Card>
);
