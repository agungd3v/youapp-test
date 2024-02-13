import {type NextRequest} from "next/server";
import myRequest from "@/utils/request";

const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const http = await myRequest({
      url: base + "/api/register",
      method: "POST",
      headers: request.headers,
      body: data
    });

    if ([200, 201].includes(http.status)) {
      return new Response(JSON.stringify(http), {status: http.statusCode ?? http.status});
    }

    throw(http);
  } catch (error: any) {
    return new Response(JSON.stringify(error), {status: error.statusCode ?? 500});
  }
}