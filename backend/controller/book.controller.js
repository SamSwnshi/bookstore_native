import cloudinary from "../db/cloudinary.js";
import Book from "../models/book.js";
export const getAllBook = async (req, res) => {};
export const createBook = async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!image || !title || !caption || !rating) {
      return res.status(400).json({ message: "Please Provide all the field" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save()

    res.status(201).json(newBook)
  } catch (error) {
    console.log("Error Creating a Book",error)
    res.status(500).json({message: error.message})
  }
};
