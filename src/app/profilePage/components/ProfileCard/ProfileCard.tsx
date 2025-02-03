import {Box, IconButton, Paper, Typography} from "@mui/material";
import CustomWidthTooltip from "../../../components/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import {useContext} from "react";
import UserContext, {UserContextType} from "../../../context/UserContext.tsx";

type ProfileCardProps = {
  onCancelEdit: () => void;
}

const ProfileCard = ({ onCancelEdit }: ProfileCardProps) => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: "400px",
          textAlign: "left",
          boxShadow: 3,
          borderRadius: 2,
          position: "relative",
        }}
      >
        <CustomWidthTooltip maxWidth={100} title={"Edit profile"}>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "gray",
              "&:hover": {
                color: "black",
              },
            }}
            onClick={onCancelEdit}
          >
            <EditIcon />
          </IconButton>
        </CustomWidthTooltip>
        <Box>
          <Typography variant="h5" gutterBottom>
            User Profile
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {user?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Password:</strong> ******
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default ProfileCard;