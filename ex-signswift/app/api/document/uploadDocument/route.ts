// We impot our prisma client
import prisma from "../../../../lib/prisma";
import NextCors from "nextjs-cors";
// Prisma will help handle and catch errors

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  // console.log("ipvms", req);
  var { userId, ShareLink, title } = await req.json();
  if (!title) {
    title = "";
  }
  console.log(userId, ShareLink);
  try {
    const user = await prisma.document.create({
      data: { userId: userId, ShareLink: ShareLink, title: title },
    });
    console.log("document is", user);
    return NextResponse.json({
      message: "Document Created",
      document: user,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Method Not Allowed",
      status: 405,
    });
  }

  // console.log(userId, ShareLink);
  // if (req.method === "POST") {
  //   // create user
  //   console.log("post");
  //   console.log("document creation process");
  //   console.log("user id is", userId);
  //
  //
  // } else {
  //   return NextResponse.json({
  //     message: "Method Not Allowed",

  //     status: 405,
  //   });
  // }
}
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
