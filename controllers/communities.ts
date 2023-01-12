import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "../database/connection";
import { uploadImage } from "../helpers/cloudinary";
import CommunitySchema from "../models/community";

export async function createCommunity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, address, image } = req.body;
    if (name && address && image) {
      const uploadedImg = await uploadImage(image, "community-cover-photos");
      const community = await CommunitySchema.create({
        name,
        address,
        image: uploadedImg.secure_url,
      });
      return res.status(200).json(community);
    }
  } catch (error) {
    console.log(error, "Error in communities controller CREATE");
    res.status(500).json({ error });
  }
}

export async function getAllCommunities(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("IN THE CONTROLLER!!!");
    const communities = await CommunitySchema.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(communities);
  } catch (error) {
    console.log(error, "Error in communities controller GETALL");
    res.status(500).json({ error });
  }
}

export async function getCommunityById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const community = await sequelize.query(
      'SELECT * FROM "communities" WHERE "communityId" = (:id)',
      {
        replacements: { id },
        model: CommunitySchema,
      }
    );
    res.status(200).json(community);
  } catch (error) {
    console.log(error, "Error in communities controller GETBYID");
    res.status(500).json({ error });
  }
}
