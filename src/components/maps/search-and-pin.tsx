"use client";

import React, { useState, useEffect } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";

import type { StoreLocation, LatLng } from "@/types";

import { cn } from "@/lib/utils";

interface SearchAndPinProps {
  store: StoreLocation;
  setStore: React.Dispatch<React.SetStateAction<StoreLocation>>;
}

export function SearchAndPin({ store, setStore }: SearchAndPinProps) {
  const map = useMap();
  const [searchQuery, setSearchQuery] = useState<string>(store.address);

  useEffect(() => {
    if (!map) return;
    const searchBox = new google.maps.places.SearchBox(
      document.getElementById("pac-input") as HTMLInputElement,
    );
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById("pac-input") as HTMLInputElement,
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places?.length === 0) return;
      const place = places?.[0];
      if (!place?.geometry || !place.geometry.location) return;
      map.setCenter(place.geometry.location);

      setSearchQuery((prev) => place.formatted_address || prev);
      setStore((prev) => ({
        ...prev,
        link: place.url || "",
        address: place.formatted_address || "",
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      }));
    });
  }, [map, setStore]);

  const handleMarkerDrag = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setStore((prev) => ({ ...prev, lat, lng }));
    }
  };

  return (
    <>
      <div className="w-full bg-red-200 px-20">
        <input
          id="pac-input"
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className={cn(
            "flex h-10 w-full overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "rounded-[2px] border-none bg-white py-[17px] text-lg text-black shadow-[rgba(0,0,0,0.3)_0px_1px_4px_-1px]",
            "mt-[10px] w-[calc(100%-72px)] -translate-x-[calc(50%+28px)]",
          )}
        />
      </div>
      {store.lat && store.lng && (
        <AdvancedMarker
          position={{ lat: store.lat, lng: store.lng }}
          draggable={false}
          onDragEnd={handleMarkerDrag}
          onClick={() => {
            window.open(store.link, "_blank");
          }}
        >
          <Pin
            background={"#FF0000"}
            borderColor={"#FFFFFF"}
            glyphColor={"#FFFFFF"}
          />
        </AdvancedMarker>
      )}
    </>
  );
}
