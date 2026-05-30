import { NextRequest, NextResponse } from "next/server";
import ApiError from "./apiError";

type RouteContext = {
  params: Promise<Record<string, string>>;
};

type Handler = (req: NextRequest, ctx?: RouteContext) => Promise<NextResponse>;

export function withErrorHandler(handler: Handler): Handler {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      // known API error
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            errors: error.error,
          },
          { status: error.statusCode },
        );
      }

      // unknown error
      console.error("Unexpected error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  };
}
