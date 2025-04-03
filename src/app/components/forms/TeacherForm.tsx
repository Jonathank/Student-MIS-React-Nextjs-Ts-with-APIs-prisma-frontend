"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LiaEyeSlash } from "react-icons/lia";
import { LiaEye } from "react-icons/lia";
import InputField from "../InputField";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long!")
      .max(20, "Username must be at most 20 characters long!"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long!"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    birthday: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
    img: z.instanceof(File,{message:"Image is required"}),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error will appear under confirmPassword field
      });
    }
  });



type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: type === "update" ? data : {},
  });

  const passwordValue = watch("password"); // Watch password field

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
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Sex"
          type="select"
          name="sex"
          register={register}
          error={errors.sex}
          options={["Male", "Female"]}
        />
        <InputField
          label="Date of Birth"
          type="date"
          name="birthday"
          register={register}
          error={errors.birthday}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="Phone"
          type="text"
          name="phone"
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          type="text"
          name="address"
          register={register}
          error={errors.address}
        />
        <InputField
          label="Profile Image"
          type="file"
          name="img"
          register={register}
          error={errors.img}
        />
        <InputField
          label="Username"
          type="text"
          name="username"
          register={register}
          error={errors.username}
        />

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          register={register}
          error={errors.password}
          toggle={() => setShowPassword(!showPassword)}
          showToggleIcon={true}
          icon={
            showPassword ? (
              <LiaEyeSlash className="w-6 h-6" />
            ) : (
              <LiaEye className="w-6 h-6" />
            )
          }
        />

        <InputField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          toggle={() => setShowConfirmPassword(!showConfirmPassword)}
          showToggleIcon={true}
          icon={
            showConfirmPassword ? (
              <LiaEyeSlash className="w-6 h-6" />
            ) : (
              <LiaEye className="w-6 h-6" />
            )
          }
        />
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
