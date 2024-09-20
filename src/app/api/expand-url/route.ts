// todo: proper error handling, this always return error if the link is not valid
export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    const expandedUrl = response.url;

    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = expandedUrl.match(regex);

    if (match !== null) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      return Response.json({ lat, lng, expandedUrl });
    } else {
      // If regex fails, use the Geocoding API
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: expandedUrl }, (results, status) => {
        if (status === "OK" && results?.[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          return Response.json({ lat: location.lat(), lng: location.lng() });
        } else {
          throw new Error(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      });
    }
  } catch (error) {
    return new Response("Failed to expand URL", {
      status: 500,
      statusText: "Failed to expand the URL",
    });
  }
}
