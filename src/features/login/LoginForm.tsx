"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TextField, Box, Alert, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthProvider/useAuth";
import Paper from "@/components/Paper/Paper";
import IconButton from "@/components/IconButton/IconButton";
import Button from "@/components/Button/Button";

import classNames from "classnames/bind";
import style from "./LoginForm.module.scss";
const cx = classNames.bind(style);

type LoginFormInputs = {
  identifier: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setError(null);
    setSuccess(false);

    try {
      await login(data.identifier, data.password);

      setSuccess(true);
      reset();

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <Paper className={cx("paper")}>
      <div className={cx("welcome-text")}>
        <div className={cx("icon")}>🐝</div>
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Login successful! Redirecting...
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          {...register("identifier", {
            required: "Email or username is required",
            minLength: { value: 3, message: "Minimum 3 characters required" },
          })}
          margin="normal"
          fullWidth
          label="Email or Username"
          autoComplete="username"
          autoFocus
          error={!!errors.identifier}
          helperText={errors.identifier?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          margin="normal"
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          variant="contained"
          disabled={isSubmitting}
          sx={{ mt: 3, mb: 2, py: 1.5, position: "relative" }}
        >
          Sign In
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
