import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactElement, useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext, { UserContextType } from "../../../context/UserContext.tsx";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  oldPassword: yup
    .string()
    .required("Old password is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type ProfileEditProps = {
  onEdit: () => void;
};

type ProfileEditData = {
  oldPassword: string;
  password: string;
  name: string;
  email: string;
};

const ProfileEdit = ({ onEdit }: ProfileEditProps): ReactElement => {
  const { user, editUser } = useContext(UserContext) as UserContextType;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchOldPassword = watch("oldPassword");
  const watchPassword = watch("password");
  const isFormValid = !errors.oldPassword && !errors.password

  useEffect(() => {
    if (watchOldPassword !== user?.password) {
      setError("oldPassword", { type: "manual", message: "Old password does not match." });
    } else {
      clearErrors("oldPassword");
    }

    if (watchPassword === user?.password) {
      setError("password", { type: "manual", message: "New password cannot be the same as the old password." });
    } else {
      clearErrors("password");
    }
  }, [watchOldPassword, watchPassword, user?.password, setError, clearErrors]);

  const onSubmit = (data: ProfileEditData) => {
    if (isFormValid && user) {
      const payload = {
        id: user.id,
        name: data?.name,
        email: data?.email,
        password: data?.password,
      };
      editUser(payload);
      onEdit();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <TextField
        label="Full Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
        label="Old Password"
        type={showOldPassword ? "text" : "password"}
        {...register("oldPassword")}
        error={!!errors.oldPassword}
        helperText={errors.oldPassword?.message}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Button type="button" variant="outlined" color="error" onClick={onEdit}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
