import { Card, CardContent, CardHeader } from "@/components/ui/card";

const GOOGLE_MAPS_API_KEY = "AIzaSyC8k7UCtleSbU0JHAVACuLUp-2rfMUHXsE";

export default function EmbeddedMap() {
  return (
    <Card className="mx-auto bg-surface">
      <CardHeader>
        <h2 className="text-2xl font-bold">Location</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-4 w-full">
          <input
            id="pac-input"
            type="text"
            placeholder="Search for a location"
          />
        </div>
        <section className="flex h-[calc(100svh-260px)] min-h-[480px] w-full flex-1 items-center justify-center">
          <iframe
            style={{
              border: 0,
              borderRadius: "0.5rem",
              width: "100%",
              height: "100%",
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}
             &q=Space+Needle,Seattle+WA`}
          ></iframe>
        </section>
      </CardContent>
    </Card>
  );
}
