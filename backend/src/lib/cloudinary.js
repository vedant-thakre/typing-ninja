import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  console.log(localFilePath);
  try {
    if (!localFilePath) return null;

    //upload to cloudinary if localFilePath exists
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folder,
    });

    // console.log("file uploaded to cloudinary", result.url);

    fs.unlinkSync(localFilePath); //remove file from localFilePath after uploading to cloudinary
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return error;
  }
};

const deleteOnCloudinary = async (public_id, resource_type = "image") => {
  try {
    if (!public_id) return null;

    //delete file from cloudinary
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: `${resource_type}`,
    });
  } catch (error) {
    return error;
    console.log("delete on cloudinary failed", error);
  }
};

// Fetch all avatars from Cloudinary
const getAvatarsFromCloudinary = async (folder) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 500, // Adjust this number if needed
    });

    if (!result.resources || result.resources.length === 0) {
      throw new Error("No avatars found");
    }

    const avatars = result.resources.map((resource) => ({
      public_id: resource.public_id,
      url: resource.secure_url,
    }));

    return avatars;
  } catch (error) {
    console.error("Error fetching avatars from Cloudinary:", error);
    return error;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary, getAvatarsFromCloudinary };
