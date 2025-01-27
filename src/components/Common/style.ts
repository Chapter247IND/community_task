import { styled } from "@mui/system";
import { Box } from "@mui/material";

interface CustomTheme {
  theme: {
    breakpoints: {
      down: (key: string) => string;
    };
  };
}

export const PostTopics = styled(Box)(() => ({
  marginBlockStart: "-2rem",
  position: "relative",
  width: "fit-content",
  padding: "0.2rem 0.6rem",
  borderRadius: "0.2rem",
  fontSize: "25px",
  marginBottom: "0.8rem",
  background: "#1976d2",
}));

export const SideBarWrapper = styled("div")({
  zIndex: 1000,
  position: "relative",
});

export const SideBar = styled("div")(({ theme }: CustomTheme) => ({
  display: "flex",
  flexFlow: "column",
  height: "100%",
  position: "fixed",
  top: "65px",
  backgroundColor: "#fff",
  padding: 8,
  borderRight: "1px solid #ccc",
  [`${theme.breakpoints.down("sm")}`]: {
    top: "50px",
  },
}));

export const ContentWrapper = styled("div")({
  padding: "80px 30px 30px 0",
});

export const FileUploaderInput = styled("label")({
  width: "auto",
  minHeight: "100px",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  display: "flex",
  justifyContent: " center",
  alignItems: "center",
  cursor: "pointer",
});
