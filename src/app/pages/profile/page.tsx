"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface Profile {
  name: string;
  email: string;
}
const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>();
  const router = useRouter();

  const doLoggout = () => {
    localStorage.removeItem("token");
    router.push("/pages/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/pages/login");
          return;
        }

        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="card card-body m-5">
      <button className="btn btn-sm btn-danger" onClick={doLoggout}>
        Logout
      </button>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
