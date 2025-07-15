import Avatar from "@mui/material/Avatar";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  let initials = "";
  if (parts.length === 1) {
    initials = parts[0][0]?.toUpperCase() ?? "";
  } else if (parts.length >= 2) {
    initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

interface LetterAvatarProps {
  name?: string;
  alt?: string;
}

export default function LetterAvatar({ name, alt }: LetterAvatarProps) {
  const { sx, children } = stringAvatar(name || "User");

  return (
    <Avatar sx={sx} alt={alt}>
      {children}
    </Avatar>
  );
}
