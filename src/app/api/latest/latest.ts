import Course from "../../../models/courses";
import Blogs from "../../../models/blogs";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blogs.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select({ title: 1, _id: 1 });
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select({ title: 1, _id: 1 });
    return NextResponse.json({ blogs, courses });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}