"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LiaEyeSlash } from "react-icons/lia";
import { LiaEye } from "react-icons/lia";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long!" })
      .max(20, { message: "Username must be at most 20 characters long!" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long!",
      }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    birthday: z
      .string()
      .min(1, { message: "Date of birth is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
    img: z
      .any()
      .refine((file) => file instanceof File, { message: "Image is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const TeacherForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: type === "update" ? data : {},
  });

  useEffect(() => {
    register("img", { required: "Image is required" });
  }, [register]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-md overflow-auto h-screen"
    >
      <h1 className="text-2xl font-semibold text-center mb-6">
        {type === "create" ? "Create a New Teacher" : "Update Teacher"}
      </h1>

      {/* Grid Layout for Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.firstName?.message && (
            <p className="text-red-500 text-xs">
              {errors.firstName.message.toString()}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.lastName?.message && (
            <p className="text-red-500 text-xs">
              {errors.lastName.message.toString()}
            </p>
          )}
        </div>
        {/* Sex */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            {...register("sex")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-red-500 text-xs">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        {/* Birthday */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("birthday")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.birthday?.message && (
            <p className="text-red-500 text-xs">
              {errors.birthday.message.toString()}
            </p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs">
              {errors.email.message.toString()}
            </p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            {...register("phone")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.phone?.message && (
            <p className="text-red-500 text-xs">
              {errors.phone.message.toString()}
            </p>
          )}
        </div>
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.address?.message && (
            <p className="text-red-500 text-xs">
              {errors.address.message.toString()}
            </p>
          )}
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setValue("img", file);
            }}
          />
          {errors.img?.message && (
            <p className="text-red-500 text-xs">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
        {/* Username */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="mt-1 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.username?.message && (
            <p className="text-red-500 text-xs">
              {errors.username.message.toString()}
            </p>
          )}
        </div>
        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type={showPassword ? "text" : "password"} {...register("password")} className="mt-1 w-full border border-gray-300 p-2 rounded-md" />
          <button type="button" className="absolute right-3 top-9" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <LiaEyeSlash className="w-6 h-6"/> : <LiaEye className="w-6 h-6"/>}
          </button>
          {errors.password?.message && <p className="text-red-500 text-xs">{errors.password.message.toString()}</p>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} className="mt-1 w-full border border-gray-300 p-2 rounded-md" />
          <button type="button" className="absolute right-3 top-9" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <LiaEyeSlash className="w-6 h-6"/> : <LiaEye className="w-6 h-6"/>}
          </button>
          {errors.confirmPassword?.message && <p className="text-red-500 text-xs">{errors.confirmPassword.message.toString()}</p>}
        </div>
      </div>
    
      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {type === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
