"use client";

import { useState, useTransition } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

import type { StoreLocation } from "@/types";
import { updateStoreLocationAction } from "@/lib/actions";

import { toast } from "sonner";
import { Loader, SaveIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchAndPin } from "./search-and-pin";

const GOOGLE_MAPS_API_KEY = "AIzaSyC8k7UCtleSbU0JHAVACuLUp-2rfMUHXsE";

type Props = {
  slug: string;
  store: StoreLocation;
  isAdmin: boolean;
};

export function StoreManagementUI({
  slug,
  store: defaultStore,
  isAdmin,
}: Props) {
  // set all state in here
  const [store, setStore] = useState<StoreLocation>(defaultStore);
  const [linkInput, setLinkInput] = useState<string>(store.link || "");

  const [isSavingLocation, startSavingLocationTransition] = useTransition();

  /*
    const [isHandlingLink, startHandlingLinkTransition] = useTransition();
    const handleLinkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLinkInput(e.target.value);
    };
    const saveMapLink = async () => {
      try {
        const response = await fetch("/api/expand-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: linkInput }),
        });
        if (!response.ok) {
          throw new Error("Failed to expand URL");
        }
        const { lat, lng, expandedUrl } = await response.json();
        setLinkInput(expandedUrl);
        setStore((prev) => ({ address: "", link: expandedUrl, lat, lng }));
      } catch (error: any) {
        toast.error("Failed to search for location.");
      }
    };
  */

  const handleSaveLocation = async () => {
    const formData = new FormData();
    formData.append("address", store.address);
    formData.append("link", store.link);

    const res = await updateStoreLocationAction(
      slug,
      formData,
      store.lat,
      store.lng,
    );

    if (res.errors) {
      toast.error("Failed to save location.");
      return;
    }

    toast.success("Location saved successfully.");
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <Card className="mx-auto max-w-4xl bg-surface">
        <CardHeader>
          <h2 className="text-2xl font-bold">Location</h2>
        </CardHeader>
        <CardContent>
          <div className="flex h-[calc(100svh-204px)] flex-col gap-4">
            {/* todo */}
            {/* <div className="gap-2">
              <Input
                value={linkInput}
                onChange={handleLinkInputChange}
                placeholder="Google Maps Link"
                required
              />
              <Button
                onClick={() => startHandlingLinkTransition(saveMapLink)}
                disabled={isHandlingLink || !linkInput}
                variant="secondary"
                className="border"
              >
                {isHandlingLink ? (
                  <>
                    <Loader className="mr-2 h-4 animate-spin" /> Searching...
                  </>
                ) : (
                  "Upload link"
                )}
              </Button>
            </div> */}
            <div className="w-full flex-1 overflow-hidden rounded-lg">
              <Map
                mapTypeControl={false}
                defaultZoom={store.link || store.address ? 15 : 4}
                center={{ lat: store.lat, lng: store.lng }}
                mapId={"35fa1e946b8805a4"}
                gestureHandling={null}
              >
                <SearchAndPin store={store} setStore={setStore} />
              </Map>
            </div>
            {isAdmin && (
              <Button
                onClick={() =>
                  startSavingLocationTransition(handleSaveLocation)
                }
                disabled={isSavingLocation}
                className="mr-auto"
              >
                {isSavingLocation ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" /> Simpan Lokasi
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </APIProvider>
  );
}
