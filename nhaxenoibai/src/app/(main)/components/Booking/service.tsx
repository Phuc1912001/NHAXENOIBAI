import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchBox/v1/suggest";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");

  if (!searchText) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${BASE_URL}?q=${searchText}&language=en&limit=6&country=VN&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.statusText}` },
        { status: res.status }
      );
    }

    const searchResult = await res.json();
    return NextResponse.json({ data: searchResult });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
