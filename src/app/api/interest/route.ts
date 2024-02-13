import {type NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "interest api"
    }),
    {
      status: 200
    }
  );
}

export async function POST(request: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "interest post"
    }),
    {
      status: 200
    }
  );
}