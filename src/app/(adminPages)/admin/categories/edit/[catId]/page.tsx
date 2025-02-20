/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Link from "next/link";

import ClipLoader from 'react-spinners/ClipLoader';
import Image from "next/image";
const EditCategory = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [bg, setBg] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();
  const { catId } = useParams();
  const { data: session, status }: any = useSession();

  const adminEmail =process?.env?.NEXT_PUBLIC_ADMIN
  const userEmail = session?.user?.email;
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${catId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const {data} = await response.json();
        setTitle(data.title);
        setDesc(data.desc);
        setBg(data.bg);
        setIcon(data.icon);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchCategory();
  }, [catId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setImage(data.url); // Assuming the API returns the filename
        setSuccess("Image uploaded successfully!");
      } else {
        setError(data.message || "Error uploading image");
      }
    } catch (error) {
      setError("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/categories/${catId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          bg,
          icon,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();
      setSuccess("Category updated successfully!");
      router.push("/admin/categories");
    } catch (err) {
      setError((err as Error).message);
    }
  };
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#2563eb" size={60} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-red-600">You need to be authenticated to view this page.</p>
      </div>
    );
  }

  if (userEmail !== adminEmail) {
    return (
      <div className="flex mt-16 mb-6 flex-col justify-center items-center h-screen bg-gray-50 text-black">
        <div className="bg-red-400 p-6 rounded-md shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p>This page is a protected route for admin only. You cant access the features.</p>
        </div>

        <Link href={"/sign-up"}>
          <div className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
            Sign Up
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Background:</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, setBg)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
          {bg && (
            <div className="mt-2">
              <Image src={window.location.origin + "/images/" + bg} alt="Background" className="w-full h-auto" height={100} width={100} />
              <button
                type="button"
                onClick={() => setBg("")}
                className="mt-2 text-blue-500 underline"
              >
                Change Image
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Icon:</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, setIcon)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
          {icon && (
            <div className="mt-2">
              <Image height={40} width={40} src={window.location.origin + "/images/" + icon} alt="Icon" className="w-full h-auto" />
              <button
                type="button"
                onClick={() => setIcon("")}
                className="mt-2 text-blue-500 underline"
              >
                Change Image
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;