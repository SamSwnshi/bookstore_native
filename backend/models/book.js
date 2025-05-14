import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    caption: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    rating: {
      required: true,
      type: String,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
