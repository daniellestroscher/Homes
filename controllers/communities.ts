import { NextApiRequest, NextApiResponse } from "next";
import { uploadImage } from "../helpers/cloudinary";
import fs from "fs-extra";
import CommunityModel from "../models/community";

import { ICommunity } from "../types/interfaces";

export async function createCommunity(
  req: NextApiRequest,
  res: NextApiResponse //<ICommunity | { error: unknown }>
) {
  try {
    const { name, address, image } = req.body;
    if (name && address && image) {
      const uploadedImg = await uploadImage(image, "community-cover-photos");
      const community = await CommunityModel.create({
        name,
        address,
        image: uploadedImg.secure_url,
      });
      await fs.unlink(image.path);
      return res.status(200).json(community);
    }
  } catch (error) {
    console.log(error, 'Error in communities controller');
    res.status(500).json({ error });
  }
}
