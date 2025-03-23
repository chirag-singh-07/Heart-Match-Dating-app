import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    bio: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "other"],
      required: true,
    },
    preferredGender: {
      type: String,
      enum: ["men", "women", "Everyone", "any"],
      default: "any",
    },
    location: {
      type: String,
      default: "",
    },
    birthdate: {
      type: Date,
      required: true,
    },
    interests: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    notifications: [
      {
        type: { type: String },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// ✅ Pre-save hook to generate random interests
const randomInterests = [
  "Traveling",
  "Gaming",
  "Music",
  "Reading",
  "Cooking",
  "Fitness",
  "Photography",
  "Sports",
  "Movies",
  "Dancing",
  "Art",
  "Technology",
  "Fashion",
  "Yoga",
  "Outdoors",
  "Theater",
  "Meditation",
];

userSchema.pre("save", function (next) {
  if (!this.interests || this.interests.length === 0) {
    this.interests = randomInterests
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, Math.floor(Math.random() * 3) + 3); // Pick 3 to 5 random interests
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
