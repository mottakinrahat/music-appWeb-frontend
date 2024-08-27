import { z } from "zod";

// Define allowed MIME types for music files
const allowedMusicMimeTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];

// Define file schema to validate music files
const fileSchema = z.object({
  name: z.string(),
  type: z.string().refine((value) => allowedMusicMimeTypes.includes(value), {
    message: "Invalid file type. Only music files are allowed.",
  }),
  size: z.number().min(1, "File size must be greater than 0"), // Ensure file size is greater than 0
});

// Define the sign-up schema with music validation
const signUpCreatorSchema = z
  .object({
    firstName: z.string().nonempty("First name is required").min(2, "First name must be at least 2 characters long"),
    lastName: z.string().nonempty("Last name is required").min(2, "Last name must be at least 2 characters long"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    expertise: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .nonempty("Please select at least one area of specialty"), // Ensures at least one object in the array
    proficiency: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .nonempty("Please select at least one DAW software proficiency"), // Ensures at least one object in the array
    music: z.array(fileSchema).optional(),
    portfolio: z.string().url("Invalid URL format").optional(),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must be the same.",
    path: ["confirmPassword"],
  });

export default signUpCreatorSchema;
