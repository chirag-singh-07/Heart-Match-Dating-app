// import { toast } from "sonner";

// let triggerConfettiFn = null; // Confetti function reference

// export const setTriggerConfetti = (fn) => {
//   triggerConfettiFn = fn;
// };

// export const showToast = (type) => {
//   if (type === "match" && triggerConfettiFn) {
//     triggerConfettiFn(); // 🎉 Confetti when there's a match!
//   }

//   switch (type) {
//     case "login":
//       toast.success("💕 Welcome back! Love is in the air! 💌", {
//         icon: "😍",
//         style: { backgroundColor: "#ff4d6d", color: "#fff" }, // 🌹 Romantic Rose Red
//       });
//       break;
//     case "register":
//       toast.success("🎉 You're in! Get ready to find your perfect match.", {
//         icon: "💘",
//         style: { backgroundColor: "#7b2cbf", color: "#fff" }, // 💜 Exciting Purple
//       });
//       break;
//     case "profile":
//       toast("🔍 Profile Updated! Let the matches roll in! 💑", {
//         icon: "📸",
//         style: { backgroundColor: "#0077b6", color: "#fff" }, // 💙 Reliable Blue
//       });
//       break;
//     case "match":
//       toast("🔥 It's a Match! Say hello and spark a connection. 💞", {
//         icon: "❤️",
//         style: { backgroundColor: "#e63946", color: "#fff" }, // ❤️ Passionate Red
//         action: {
//           label: "Chat Now 💬",
//           onClick: () => console.log("Go to Chat"),
//         },
//       });
//       break;
//     case "like":
//       toast("💓 Someone liked you! Check your notifications. 😘", {
//         icon: "💌",
//         style: { backgroundColor: "#f72585", color: "#fff" }, // 💖 Cute Pink
//       });
//       break;
//     case "superlike":
//       toast("💖 You got a Super Like! They REALLY like you! 🌟", {
//         icon: "⭐",
//         style: { backgroundColor: "#ffcc00", color: "#fff" }, // 🌟 Attention Yellow
//       });
//       break;
//     case "message":
//       toast("📩 New message received! Don’t keep them waiting. 💬", {
//         icon: "💌",
//         style: { backgroundColor: "#fb8500", color: "#fff" }, // 🧡 Warm Orange
//       });
//       break;
//     case "serverError":
//       toast.error("💔 Oops! Something went wrong. Try again later. 😭", {
//         icon: "🚨",
//         style: { backgroundColor: "#343a40", color: "#fff" }, // ⚫ Serious Dark Gray
//       });
//       break;
//     case "networkError":
//       toast.error("⚠️ Connection lost! Your match is waiting. 📶", {
//         icon: "🔌",
//         style: { backgroundColor: "#d00000", color: "#fff" }, // 🔥 Alert Red
//       });
//       break;
//     case "subscription":
//       toast.success("💎 Premium unlocked! Enjoy unlimited swipes. 🚀", {
//         icon: "💰",
//         style: { backgroundColor: "#1d3557", color: "#fff" }, // 🔵 Premium Blue
//         action: {
//           label: "Explore Features",
//           onClick: () => console.log("Go to Premium"),
//         },
//       });
//       break;
//     default:
//       toast("❓ Something happened, but we’re not sure what. 🤔", {
//         style: { backgroundColor: "#6c757d", color: "#fff" }, // Gray fallback
//       });
//   }
// };

import { toast } from "sonner";

let triggerConfettiFn = null; // Confetti function reference

export const setTriggerConfetti = (fn) => {
  triggerConfettiFn = fn;
};

export const showToast = (type, message = null) => {
  if (type === "match" && triggerConfettiFn) {
    triggerConfettiFn(); // 🎉 Confetti when there's a match!
  }

  const messages = {
    login: "💕 Welcome back! Love is in the air! 💌",
    register: "🎉 You're in! Get ready to find your perfect match.",
    profile: "🔍 Profile Updated! Let the matches roll in! 💑",
    match: "🔥 It's a Match! Say hello and spark a connection. 💞",
    like: "💓 Someone liked you! Check your notifications. 😘",
    superlike: "💖 You got a Super Like! They REALLY like you! 🌟",
    message: "📩 New message received! Don’t keep them waiting. 💬",
    serverError: "💔 Oops! Something went wrong. Try again later. 😭",
    networkError: "⚠️ Connection lost! Your match is waiting. 📶",
    subscription: "💎 Premium unlocked! Enjoy unlimited swipes. 🚀",
    default: "❓ Something happened, but we’re not sure what. 🤔",
  };

  const styles = {
    login: { backgroundColor: "#ff4d6d", color: "#fff" }, // 🌹 Romantic Rose Red
    register: { backgroundColor: "#7b2cbf", color: "#fff" }, // 💜 Exciting Purple
    profile: { backgroundColor: "#0077b6", color: "#fff" }, // 💙 Reliable Blue
    match: { backgroundColor: "#e63946", color: "#fff" }, // ❤️ Passionate Red
    like: { backgroundColor: "#f72585", color: "#fff" }, // 💖 Cute Pink
    superlike: { backgroundColor: "#ffcc00", color: "#fff" }, // 🌟 Attention Yellow
    message: { backgroundColor: "#fb8500", color: "#fff" }, // 🧡 Warm Orange
    serverError: { backgroundColor: "#343a40", color: "#fff" }, // ⚫ Serious Dark Gray
    networkError: { backgroundColor: "#d00000", color: "#fff" }, // 🔥 Alert Red
    subscription: { backgroundColor: "#1d3557", color: "#fff" }, // 🔵 Premium Blue
    default: { backgroundColor: "#6c757d", color: "#fff" }, // Gray fallback
  };

  const icons = {
    login: "😍",
    register: "💘",
    profile: "📸",
    match: "❤️",
    like: "💌",
    superlike: "⭐",
    message: "💌",
    serverError: "🚨",
    networkError: "🔌",
    subscription: "💰",
    default: "❓",
  };

  const toastMessage = message || messages[type] || messages.default;
  const toastStyle = styles[type] || styles.default;
  const toastIcon = icons[type] || icons.default;

  toast(toastMessage, {
    icon: toastIcon,
    style: toastStyle,
    action:
      type === "match"
        ? { label: "Chat Now 💬", onClick: () => console.log("Go to Chat") }
        : type === "subscription"
        ? {
            label: "Explore Features",
            onClick: () => console.log("Go to Premium"),
          }
        : undefined,
  });
};
