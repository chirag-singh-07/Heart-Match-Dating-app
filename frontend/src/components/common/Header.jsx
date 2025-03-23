import { Bell, Heart, Inbox, LogOut, Menu, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { useProfileStore } from "@/store/userStore";
import { showToast } from "@/config/toastUtils";
import { Button } from "../ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { isLoggedIn, user, logoutUser } = useAuthStore();
  const { fetchNotifications, notifications, connectSocket } =
    useProfileStore();
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const navigate = useNavigate();

  // Fetch Notifications
  useEffect(() => {
    if (isLoggedIn && user?._id) {
      connectSocket(user._id);
      fetchNotifications();
    }
  }, [isLoggedIn, user?._id, connectSocket, fetchNotifications]);

  // Handle New Notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const sortedNotifications = [...notifications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setHasNewNotification(true);
      showToast("like", sortedNotifications[0].message);
    }
  }, [notifications]);

  // Remove Notification Dot When Opened
  const handleOpenNotifications = (open) => {
    setNotificationOpen(open);
    if (open) {
      setHasNewNotification(false);
    }
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setOpen(false);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">HeartMatch</span>
        </div>

        {/* ✅ Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link to={"/"} className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link
                to={"/explore"}
                className="text-sm font-medium hover:text-primary"
              >
                Explore
              </Link>
              <Link
                to={"/matches"}
                className="text-sm font-medium hover:text-primary"
              >
                Matches
              </Link>
              <Link
                to={"/messages"}
                className="text-sm font-medium hover:text-primary"
              >
                Messages
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={(e) => handleScroll(e, "features")}
                className="text-sm font-medium hover:text-primary"
              >
                Features
              </Link>
              <Link
                onClick={(e) => handleScroll(e, "how-it-works")}
                className="text-sm font-medium hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                onClick={(e) => handleScroll(e, "success-stories")}
                className="text-sm font-medium hover:text-primary"
              >
                Success Stories
              </Link>
              <Link
                onClick={(e) => handleScroll(e, "pricing")}
                className="text-sm font-medium hover:text-primary"
              >
                Pricing
              </Link>
            </>
          )}
        </nav>

        {/* ✅ Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Notification Icon */}
              <Sheet
                open={notificationOpen}
                onOpenChange={handleOpenNotifications}
              >
                <SheetTrigger asChild>
                  <div className="relative">
                    <Bell className="h-6 w-6 text-rose-500 cursor-pointer" />
                    {hasNewNotification && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetDescription>
                    <h2 className="text-xl font-bold mb-4">Notifications</h2>
                  </SheetDescription>
                  <div className="flex flex-col gap-4 border-t">
                    {" "}
                    {notifications.length > 0 ? (
                      notifications
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        ) // Sort by latest
                        .map((notification) => (
                          <div
                            key={notification._id}
                            className="flex items-center gap-4  pb-3 rounded-lg p-3 hover:bg-gray-100 transition duration-200"
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage
                                  src={notification?.sender?.profileImage}
                                />
                                <AvatarFallback>
                                  {notification?.sender?.name
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {/* ✅ Heart Icon at the Bottom */}
                              <Heart
                                fill="red"
                                className="absolute bottom-[-5px] right-[-5px] h-4 w-4 text-rose-500 bg-white rounded-full shadow"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">
                                {notification?.sender?.name}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {notification?.message}
                              </p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10">
                        <Inbox className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">
                          No new notifications! Come back later.
                        </p>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Profile Link */}
              <Link to={"/profile"}>
                <UserCog className="h-6 w-6 text-rose-500" />
              </Link>

              {/* Logout */}
              <LogOut
                className="cursor-pointer h-6 w-6 text-rose-500"
                onClick={() => logoutUser(navigate)}
              />

              {/* Avatar */}
              <Avatar>
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback>
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Link to={"/login"} className="text-sm font-medium">
                Login
              </Link>
              <Link to={"/register"} className="text-sm font-medium">
                <Button className="bg-rose-600 w-full hover:bg-pink-600 transition">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* ✅ Mobile Navbar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Menu className="h-6 w-6 text-rose-500 cursor-pointer md:hidden" />
          </SheetTrigger>
          <SheetContent side="right">
            {/* {isLoggedIn ? (
              <>
              
                <Avatar>
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Link to={"/"}>Home</Link>
                <Link to={"/explore"}>Explore</Link>
                <Link to={"/matches"}>Matches</Link>
                <Link to={"/messages"}>Messages</Link>
                <LogOut onClick={() => logoutUser(navigate)}>Logout</LogOut>
              </>
            ) : (
              <>
                <Link onClick={(e) => handleScroll(e, "features")}>
                  Features
                </Link>
                <Link onClick={(e) => handleScroll(e, "how-it-works")}>
                  How It Works
                </Link>
                <Link onClick={(e) => handleScroll(e, "success-stories")}>
                  Success Stories
                </Link>
                <Link onClick={(e) => handleScroll(e, "pricing")}>Pricing</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Sign Up</Link>
              </>
            )} */}
            <nav className="md:hidden flex flex-col items-center gap-6 text-start w-full">
              <div className="flex items-center gap-2 cursor-pointer">
                <Heart className="h-6 w-6 text-rose-500" />
                <span className="text-xl font-bold">HeartMatch</span>
              </div>
              {isLoggedIn ? (
                <>
                  <Link
                    to={"/"}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/explore"}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Explore
                  </Link>
                  <Link
                    to={"/matches"}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Matches
                  </Link>
                  <Link
                    to={"/messages"}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Messages
                  </Link>
                  <Link
                    to={"/profile"}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Profile
                  </Link>
                  <Button className="bg-rose-600 w-full hover:bg-pink-600 transition">
                    <LogOut />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    onClick={(e) => handleScroll(e, "features")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Features
                  </Link>
                  <Link
                    onClick={(e) => handleScroll(e, "how-it-works")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    How It Works
                  </Link>
                  <Link
                    onClick={(e) => handleScroll(e, "success-stories")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Success Stories
                  </Link>
                  <Link
                    onClick={(e) => handleScroll(e, "pricing")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    Pricing
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="md:hidden flex items-center gap-4">
          {/* ✅ Mobile Notification Icon with Dot */}
          <Sheet open={notificationOpen} onOpenChange={handleOpenNotifications}>
            {" "}
            <SheetTrigger asChild>
              <div className="relative">
                <Bell className="h-6 w-6 text-rose-500 cursor-pointer" />{" "}
                {hasNewNotification && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
