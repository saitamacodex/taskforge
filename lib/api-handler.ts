import { NextRequest, NextResponse } from "next/server";
import ApiError from "./apiError";

type Handler = (req: NextRequest, ctx?: unknown) => Promise<NextResponse>;

export function withErrorHandler(handler: Handler): Handler {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      // known API error
      if (error instanceof ApiError) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.statusCode },
        );
      }

      // unknown error - lot it and return 500
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
