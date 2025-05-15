import cloudinary from "../db/cloudinary.js";
import Book from "../models/book.js";

export const getAllBook = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit; 
    const books = await Book.find().sort({createdAt: -1}).skin(skip).limit(limit).populate("user","username profileImage");

    const totolBooks = await Book.countDocuments()
    res.send({
      books,currentPage: page,totolBooks ,totalPages: Math.ceil(totolBooks/limit )
    })
  } catch (error) {
    console.log("Error in getting all books",error);
    res.status(500).json({message: "Internal Server Error"})
  }
};
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
export const deleteBook = async(req,res) =>{
  try {
    const book = await Book.findById(req.params.id);
    if(!book){
      return res.status(404).json({message: "Book not Found!"})
    }

    if(book.user.toString() !== req.user._id.toString()){
      return res.status(401).json({message: "Unauthorized"})
    }

    if(book.image && book.image.includes("cloudinary")){
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId)
      } catch (deleteError) {
        console.log("Error deleting image from cloudinary",deleteError)
      }
    }

    await book.deleteOne()

    res.json({message: "Book Deleted Successfully!"})
  } catch (error) {
    console.log("Error deleting Book",error);
    res.status(500).json({message: "Internal Server Error"})
  }
}
