// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { userId, email, date } = await req.json();
  console.log(userId, email, "email  for getting the filessss");

  //all docs of craeted user where user is not the signer

  //all drafts  ->from users

  try {
    const document1 = await prisma.document.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            OR: [
              {
                Expiration: {
                  gt: new Date(),
                },
              },
              {
                Expiration: null,
              },
            ],
          },
          {
            Active: true,
          },
        ],
      },
    });

    //draft->can edit those docs  //pending->cant do anthying on these
    // dont want those in which he is a  signer

    //return docs with status pending and user is the recepient

    //get all doc that user has to sign

    // signer-> last user->completed

    return NextResponse.json({
      message: "Document",
      Document: document1,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
