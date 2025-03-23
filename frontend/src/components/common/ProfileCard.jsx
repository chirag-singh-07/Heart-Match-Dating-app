import {
  Heart,
  MessageSquare,
  Music,
  Gamepad,
  Plane,
  Book,
  Utensils,
  Dumbbell,
  Camera,
  Volleyball,
  Film,
  KeyboardMusic,
  Paintbrush,
  Monitor,
  Shirt,
  Leaf,
  Mountain,
  Ticket,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useProfileStore } from "@/store/userStore";
import { io } from "@/config/socket";
import { useMessageStore } from "@/store/messageStore";
import { showToast } from "@/config/toastUtils";

import { Textarea } from "../ui/textarea";
import { useSocketContext } from "@/contexts/SocketContext";

const interestIconMap = {
  Traveling: <Plane className="w-4 h-4 mr-1" />,
  Gaming: <Gamepad className="w-4 h-4 mr-1" />,
  Music: <Music className="w-4 h-4 mr-1" />,
  Reading: <Book className="w-4 h-4 mr-1" />,
  Cooking: <Utensils className="w-4 h-4 mr-1" />,
  Fitness: <Dumbbell className="w-4 h-4 mr-1" />,
  Photography: <Camera className="w-4 h-4 mr-1" />,
  Sports: <Volleyball className="w-4 h-4 mr-1" />,
  Movies: <Film className="w-4 h-4 mr-1" />,
  Dancing: <KeyboardMusic className="w-4 h-4 mr-1" />,
  Art: <Paintbrush className="w-4 h-4 mr-1" />,
  Technology: <Monitor className="w-4 h-4 mr-1" />,
  Fashion: <Shirt className="w-4 h-4 mr-1" />,
  Yoga: <Leaf className="w-4 h-4 mr-1" />,
  Outdoors: <Mountain className="w-4 h-4 mr-1" />,
  Theater: <Ticket className="w-4 h-4 mr-1" />,
  Meditation: <Sun className="w-4 h-4 mr-1" />,
};

const ProfileCard = ({
  name,
  age,
  location,
  image,
  showBadge,
  bio,
  gender,
  interest,
  likes,
  profileId,
}) => {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { likeUserProfile } = useProfileStore();
  const { sendMessage } = useMessageStore();
  const { socket } = useSocketContext();

  const handleLike = async () => {
    try {
      await likeUserProfile(profileId); // ✅ Send request to backend
      setLiked(true);

      // ✅ Emit event to backend using socket.io
      io.emit("like", {
        receiverId: profileId,
        sender: {
          name,
          profileImage: image,
        },
      });
    } catch (error) {
      console.error("Error liking profile:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(profileId, message, socket); // ✅ Send request to backend
      setMessage("");
      setMessageDialogOpen(false);
      showToast("message", "Message sent!");
    } catch (error) {
      console.error("Failed to send message", error);
      showToast("serverError", "Failed to send message");
    }
  };

  return (
    <>
      {/* Open Dialog on Click */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="relative w-full h-auto rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:scale-105 hover:shadow-rose-500/90 duration-300 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {/* Badge */}
            {showBadge && (
              <Badge className="absolute top-2 left-2 bg-rose-500 text-white shadow-md z-10">
                <Heart className="w-4 h-4 mr-1" fill="white" stroke="white" />
                Match
              </Badge>
            )}

            {/* Profile Image */}
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Black Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent"></div>

            {/* Profile Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center z-10">
              <h2 className="text-2xl font-bold text-white">
                {name}, {age}
              </h2>
              <p className="text-gray-300">{location}</p>
            </div>
          </div>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl border-t-4 border-rose-500">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Left Side - Profile Image */}
            <div className="w-full md:w-1/3">
              <img
                src={image}
                alt={name}
                className="w-full h-[300px] object-cover rounded-lg border-4 border-rose-500 shadow-lg"
              />
            </div>

            {/* Right Side - Profile Details */}
            <div className="w-full md:w-2/3 flex flex-col justify-between">
              {/* Profile Info */}
              <div>
                <h2 className="text-3xl font-extrabold text-gray-800">
                  {name}, {age}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">{location}</p>
                <p className="text-gray-700 mt-4 leading-relaxed">{bio}</p>

                {/* Gender */}
                <div className="mt-4">
                  <p className="text-gray-600 font-semibold">
                    Gender: {gender}
                  </p>
                </div>

                {/* Interests */}
                <div className="mt-4">
                  <p className="text-gray-600 font-semibold">Interests:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interest?.map((int, i) => (
                      <Badge
                        key={i}
                        className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full border border-pink-300 shadow-sm hover:bg-pink-200 transition"
                      >
                        {interestIconMap[int] || (
                          <Music className="w-4 h-4 mr-1" />
                        )}{" "}
                        {/* Default to Music */}
                        {int}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Likes */}
              <div className="flex items-center gap-2 mt-6">
                <Heart className="w-6 h-6 text-rose-500" fill="red" />
                <span className="text-gray-700 font-semibold">
                  {likes?.length} Likes
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                {/* Like Button */}
                <Button
                  onClick={handleLike}
                  className={`flex items-center px-5 py-2 ${
                    liked ? "bg-red-400" : "bg-pink-400"
                  } hover:bg-pink-500 transition rounded-full shadow-md`}
                >
                  <Heart
                    className="w-5 h-5 mr-2"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                  />
                  {liked ? "Liked" : "Like"}
                </Button>

                {/* Message Button */}
                <Button
                  className="flex items-center px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition shadow-md"
                  variant="outline"
                  onClick={() => setMessageDialogOpen(true)}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Send a message to {name}
          </h2>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="border-2 border-rose-400 focus:border-rose-500 min-h-[100px]"
          />
          <div className="flex justify-end mt-4 gap-2">
            <Button
              onClick={handleSendMessage}
              className="bg-rose-500 text-white hover:bg-rose-600"
            >
              Send
            </Button>
            <Button
              onClick={() => setMessageDialogOpen(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCard;
