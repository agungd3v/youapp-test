import {type NextRequest} from "next/server";
import { validateTypeEmail } from "@/utils/globalFunction";
import myRequest from "@/utils/request";

const base = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const http = await myRequest({
      url: base + "/api/login",
      method: "POST",
      headers: request.headers,
      body: {
        username: !validateTypeEmail(data.email) ? data.email : "",
        email: validateTypeEmail(data.email) ? data.email : "",
        password: data.password
      }
    });

    if ([200, 201].includes(http.status)) {
      return new Response(JSON.stringify(http), {status: http.statusCode ?? http.status});
    }

    throw(http);
  } catch (error: any) {
    return new Response(JSON.stringify(error), {status: error.statusCode ?? 500});
  }
}