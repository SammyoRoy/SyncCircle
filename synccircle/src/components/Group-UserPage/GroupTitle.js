import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group'

function GroupTitle() {
    const { groupId, first, groupAdminClicked, setGroupAdminClicked } = useContext(AppContext);
    const [eventName, setEventName] = useState("");

    useEffect(() => {
        const URL = window.location.href.split("/");
        axios.get(`https://backend.synccircle.net/groups/${URL[URL.length - 1]}`)
            .then((response) => {
                // navigate to /group pages
                setEventName(response.data.group_name);

            })
            .catch((error) => {
                // handle the error
                console.error(error);
            });
    }, [groupId]);


    return (
        <div className="groupTitleContainer">
            {first && (!groupAdminClicked ? <IconButton className="editButton" color="#FF9999" onClick={() => setGroupAdminClicked(!groupAdminClicked)}><EditOutlinedIcon fontSize="small" /></IconButton>
                : <IconButton className="editButton" sx={{
                    backgroundColor: "#7D83FF", color: "#fff", '&:hover': {
                        backgroundColor: "#5f65d4"
                    }
                }} onClick={() => setGroupAdminClicked(!groupAdminClicked)}><GroupIcon fontSize="small" /></IconButton>)}
            <h2 className={eventName.length > 20 ? "GroupTitle GroupTitleSmall" : "GroupTitle"}>
                {eventName}
            </h2>
        </div>
    )
}

export default GroupTitle;