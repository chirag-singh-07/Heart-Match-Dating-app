import ProfileCard from "@/components/common/ProfileCard";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/userStore";
import { Ban, Heart, Home, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const calculateAge = (dob) => {
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

const ExplorePage = () => {
  const { allProfiles, fetchProfiles } = useProfileStore();
  const { user } = useAuthStore();
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filters, setFilters] = useState({
    age: false,
    location: false,
    interest: false,
    random: false,
    men: false, // ✅ lowercase "men"
    women: false, // ✅ lowercase "women"
  });

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // console.log("allProfiles", allProfiles);

  useEffect(() => {
    let profiles = allProfiles;

    // Apply filters
    if (filters.age) {
      profiles = profiles.filter(
        (profile) =>
          calculateAge(new Date(profile.birthdate)) ===
          calculateAge(new Date(user?.birthdate))
      );
    }

    if (filters.location) {
      profiles = profiles.filter(
        (profile) =>
          profile.location.toLowerCase() === user?.location.toLowerCase()
      );
    }

    if (filters.interest) {
      profiles = profiles.filter((profile) =>
        profile.interests?.some((interest) =>
          user?.interests?.includes(interest)
        )
      );
    }

    // ✅ Fix gender filter by using lowercase keys
    if (filters.men || filters.women) {
      profiles = profiles.filter((profile) => {
        if (filters.men && profile.gender === "male") return true;
        if (filters.women && profile.gender === "female") return true;
        return false;
      });
    }

    if (filters.random) {
      profiles = profiles.sort(() => Math.random() - 0.5);
    }

    setFilteredProfiles(profiles);
  }, [
    allProfiles,
    filters,
    user?.location,
    user?.birthdate,
    user?.interests,
    user?.gender,
    user?.preferredGender,
  ]);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const resetFilters = () => {
    setFilters({
      age: false,
      location: false,
      interest: false,
      random: false,
      Men: false,
      Women: false,
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white p-6 border-r border-gray-200 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Matches</h2>
        <ul className="space-y-4 font-bold">
          <li className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-rose-500 transition">
            <Home className="w-5 h-5" />
            <span>All Matches</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-rose-500 transition">
            <Heart className="w-5 h-5" />
            <span>New Matches</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-rose-500 transition">
            <MessageCircle className="w-5 h-5" />
            <span>Favorites</span>
          </li>
          <li className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-rose-500 transition">
            <Ban className="w-5 h-5" />
            <span>Blocked</span>
          </li>
        </ul>

        {/* Filters */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-rose-600">Filters</h3>
          <div className="space-y-3">
            {[
              { name: "age", label: "Age" },
              { name: "location", label: "Location" },
              { name: "interest", label: "Interest" },
              { name: "random", label: "Random Order" },
              { name: "women", label: "Women" },
              { name: "men", label: "Men" },
            ].map((filter) => (
              <label
                key={filter.name}
                className="flex items-center gap-3 cursor-pointer hover:text-rose-500 transition"
              >
                <input
                  type="checkbox"
                  name={filter.name}
                  checked={filters[filter.name]}
                  onChange={handleFilterChange}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 flex items-center justify-center border-2 rounded-md ${
                    filters[filter.name]
                      ? "border-rose-500 bg-rose-500"
                      : "border-gray-400"
                  }`}
                >
                  {filters[filter.name] && (
                    <svg
                      className="w-4 h-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20.707 5.293a1 1 0 00-1.414 0L9 15.586 4.707 11.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                {filter.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Matches Grid */}
      {/* Matches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((match, i) => (
            <div key={i} className="w-full">
              <ProfileCard
                name={match?.name}
                age={calculateAge(new Date(match?.birthdate))}
                location={match?.location}
                image={match.profileImage}
                showBadge={false}
                bio={match.bio}
                gender={match.gender}
                interest={match.interests}
                likes={match.likes}
                profileId={match._id}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 animate-fade-in">
            {/* Heart SVG Icon */}
            <div className="w-16 h-16 flex items-center justify-center bg-rose-100 rounded-full shadow-md animate-bounce">
              <svg
                className="w-10 h-10 text-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Message */}
            <p className="text-xl font-semibold text-gray-800 mt-4">
              No Matches Found 😔
            </p>
            <p className="text-gray-500 mt-2 text-center">
              Try adjusting your filters or come back later. Love is waiting! 💖
            </p>

            {/* CTA Button */}
            <button
              onClick={resetFilters}
              className="mt-6 bg-rose-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-rose-600 transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
