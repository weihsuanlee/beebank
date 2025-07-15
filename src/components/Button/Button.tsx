import { default as MuiButton, ButtonProps } from "@mui/material/Button";

const Button = (props: ButtonProps) => {
  return <MuiButton sx={{ boxShadow: "none", borderRadius: "3rem" }} disableElevation disableRipple {...props} />;
};

export default Button;
