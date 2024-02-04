import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import Chat from "./Chat";

const Chats = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Group 1", members: 10 },
    { id: 2, name: "Group 2", members: 8 },
    { id: 3, name: "Group 3", members: 12 },
  ]);

  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [chatSectionOpen, setChatSectionOpen] = useState(false)
  // Add more state variables as needed for friends list, etc.

  const handleCreateGroup = () => {
    // Add logic to create a new group and close the dialog
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      members: 0, // You can set an initial member count
    };
    setGroups([...groups, newGroup]);
    setCreateGroupDialogOpen(false);
    // Add any additional logic for handling friends list, etc.
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Box width="100%">
        
          <Button
            sx={{ float: "right", marginTop:'20px' }}
            variant="contained"
            color="primary"
            onClick={() => setCreateGroupDialogOpen(true)}
          >
            ADD NEW FRIEND
          </Button>
        </Box>
        <Box display="flex" flexDirection={"row"} >
          <Box width={"30%"} marginLeft={"10px"}marginTop={"20px"} sx={{border:'2px solid rgb(25 118 210)', borderRadius:"20px", padding:"10px"}}>
            <List marginTop={"20px"} sx={{overflow:"scroll",overflowX: "hidden", height:'600px', }} >
              {groups.map((group) => (
                <React.Fragment key={group.id}>
                  <ListItem alignItems="flex-start" onClick={()=>{setChatSectionOpen(true)}}>
                    <ListItemAvatar>
                      <Avatar>{group.members}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={group.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {`${group.members} members`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>
          {chatSectionOpen&&<Box width="70%">
            <Chat />
          </Box>}
        </Box>
      </Box>
      <Dialog
        open={isCreateGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
      >
        <DialogTitle color="primary">Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Group Description"
            type="text"
            fullWidth
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          {/* Add additional fields for friends list, etc. */}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => setCreateGroupDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chats;
