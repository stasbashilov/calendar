import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext, { UserContextType } from "../../../context/UserContext";
import { useContext, useState } from "react";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required"),
  })
  .required();

const SignIn = () => {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext) as UserContextType;
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const restoreUserFromLocalStorage = (
    enteredEmail: string,
    enteredPassword: string,
  ) => {
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      const existingUser = parsedUsers.find(
        (user: { email: string; password: string }) =>
          user.email === enteredEmail && user.password === enteredPassword,
      );

      if (existingUser) {
        saveUser(existingUser);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No users found");
    }
  };

  const onSubmit = (data: { email: string; password: string }) => {
    restoreUserFromLocalStorage(data.email, data.password);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        Sign In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        {error && (
          <Typography color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Don't have an account? <NavLink to="/sign-up">Sign up</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;
