import { overpassType } from "@/types";
import { locationType } from "@/types";

// export const coffeeStores = async () => {
//   const response = await fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/coffe.json`
//   );
//   return await response.json();
// }



const transformCoffeeData = (result: overpassType, imgUrl: CoffeeImage)=>{
return{
    id: result.id,
    name: result.tags.name,
    address: `${result.tags["addr:housenumber"] || ""} ${result.tags["addr:street"] || ""}`.trim(),
    city: result.tags["addr:city"] || "",
    imgUrl: imgUrl.url,
    imgId: imgUrl.id
}
}

export const fetchCoffeeStores = async (location: locationType, limit?: number) => {
const lati = location.lati;
// 43.718122800745334;
//  const limit:number = 6;
const long = location.long;
//  -79.3945523808999;
  
const overpassQuery = `
[out:json];
node
  ["amenity"="cafe"]
  (around:3000,${lati},${long});
out ${limit};
`;
try {
const response = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: overpassQuery, // ✅ body goes here
});

// Check status
if (!response.ok) {
  const text = await response.text(); // HTML/XML
  console.error("Overpass returned error:");
  return [];
}

// Check content type
const contentType = response.headers.get("content-type") || "";
if (!contentType.includes("application/json")) {
  const text = await response.text();
  console.error("Overpass returned non-JSON:", text);
  return [];
}

const data  = await response.json();
if(!data){
  console.log("No data from overpass");
  return
}

const imgUrls = await fetchCoffeeImages(
  "coffee shop",
  data.elements.length
);
  // console.log("stores:", data.elements);
return Promise.all(
  data.elements.map(async (result: overpassType, idx: number) => {
    return transformCoffeeData(
      result,
      imgUrls[idx] ?? {
        url: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a",
        id: "no-image",
      }
    );
  })
);

} catch (error) {
  console.error("Error fetching coffee stores:", error);
}
}



export const fetchCoffeeStore = async (id:string, imgId?:string) => {
const lati = 43.718122800745334;
const long = -79.3945523808999;
  
const overpassQuery = `
[out:json];
node(${id});
out;
`;
try {
const response = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: overpassQuery, // ✅ body goes here
});
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Overpass returned non-JSON:", text);
      //  await response.text();
       return [];
    }

const data  = await response.json();

const imgurl = "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a";

const imageUrl  = await fetchCoffeeImage(imgId || "");
return data.elements.map((result:overpassType) => transformCoffeeData(result, imageUrl?? {url: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a", id: 'no image'}

 ))[0];

} catch (error) {
  console.error("Error fetching coffee stores:", error);
}
}

interface CoffeeImage {
  url: string;
  id: string;
}


const fetchCoffeeImages = async (
  query: string,
  count: number
): Promise<CoffeeImage[]> => {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  if (!UNSPLASH_ACCESS_KEY) {
    console.error("Missing Unsplash API key");
    return [];
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await res.json();

  if (!data?.results || !Array.isArray(data.results)) {
    console.error("Invalid Unsplash response:", data);
    return [];
  }

  return data.results.map((result: any) => ({
    url: result.urls.small,
    id: result.id,
  }));
};



const fetchCoffeeImage = async (imgId: string): Promise<CoffeeImage> => {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/photos/${imgId}`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await res.json();

  return {
    id: data?.id,
    url: data?.urls?.small,
  };
};