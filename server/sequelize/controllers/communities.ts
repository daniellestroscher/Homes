import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma"; // prisma client
// import { UUID } from "sequelize";
// import { sequelize } from "../sequelize/database/connection";
import { uploadImage } from "../../../helpers/cloudinary";
import { NextRequest, NextResponse } from "next/server";
//import CommunitySchema from "../sequelize/models/community";

export async function createCommunity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, address, image } = req.body;
    if (name && address && image) {
      const uploadedImg = await uploadImage(image, "community-cover-photos");
      const community = await prisma.community.create({
        data: {
          name: name,
          address: address,
          image: uploadedImg.secure_url,
        },
      });
      console.log(community, "IN CONTROLLER");
      //const newCommunity = res.json(community)
      return NextResponse.json(community);
      //return res.status(200).json(community);
    }
  } catch (error) {
    console.log(error, "Error in communities controller CREATE");
    return NextResponse.json({ error });
    //res.status(500).json({ error });
  }
}

export async function getAllCommunities(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const communities = await prisma.community.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ communities });
    // res.status(200).json(communities);
  } catch (error) {
    console.log(error, "Error in communities controller GETALL");
    return NextResponse.json({ error });
    // res.status(500).json({ error });
  }
}

export async function getCommunityById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (id) {
      const community = await prisma.community.findUnique({
        where: { communityId: `${id}` },
      });
      return res.status(200).json(community);
    }
  } catch (error) {
    console.log(error, "Error in communities controller GETBYID");
    return res.status(500).json({ error });
  }
}
