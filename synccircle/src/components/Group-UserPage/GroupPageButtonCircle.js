import React, { useContext, useState } from "react";
import GroupPage from "./GroupPage";
import GroupIcon from '@mui/icons-material/Group'
import { AppContext } from "../../context/AppContext";
import { IndexContext } from "../../context/IndexContext";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogTitle, DialogContent, Switch } from "@mui/material";
import { Close } from "@mui/icons-material";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { gapi } from 'gapi-script';

function GroupPageButtonCircle({ joined }) {
  const { groupId, userId } = useContext(AppContext);
  const { googleUser, setGoogleUser, token, setToken } = useContext(IndexContext);
  const [autofillAvailability, setAutofillAvailability] = useState(true);

  const [events, setEvents] = useState([]);

  const [open, setOpen] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setGoogleUser(user);
    }
    else {
      setGoogleUser(null);
    }
  });



  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setGoogleUser(result.user);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    setToken(credential.accessToken);
  }


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleImport = () => {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: "AIzaSyDFa4O21qp6TYOFKBRpDk9UP2EISCsoFrQ",
        clientId: "695221716118-48a0qqt7qo4j2uab6rkepg6nneelbjrn.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      });

      /**gapi.client.load('calendar', 'v3', () => {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items;
          setEvents(events);
          console.log(events);
        });
      }
      );**/
    });
    console.log(gapi.client);
  };

  return (
    <>
      {!joined && <div className="GPCircleContainer">
        <button className="GroupPageButtonCircle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasGroup" aria-controls="offcanvasGroup">
          <GroupIcon className="GroupPageButtonCircleIcon" fontSize="large" />
        </button>
        <GroupPage groupId={groupId} userId={userId} />
      </div>}
      {joined && <div className="GPCircleContainer">
        <button className="GroupPageButtonCircle" type="button" style={{ background: "#F7F7F7" }} onClick={handleLogin}>
          <FcGoogle className="GroupPageButtonCircleIcon" fontSize="large" />
        </button>
      </div>}
      {joined && googleUser && <div className="GPCircleContainer">
        <button className="GroupPageButtonCircle" type="button" style={{ background: "#5AD85F" }} onClick={handleOpen}>
          <CalendarTodayIcon className="GroupPageButtonCircleIcon" fontSize="large" />
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ backgroundColor: "#202124", color: "#F7F7F7", display: "flex", justifyContent: "Center", fontFamily: "Poppins, sans serif" }} >{"Import Google Calendar"}
            <button className="TutorialClose" onClick={handleClose} ><Close /></button>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#202124", color: "#F7F7F7", fontFamily: "Poppins, sans serif" }}>
            <div style={{ display: "flex", justifyContent: "Center", flexDirection: "column" }}>
              <p>Google Account</p>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginBottom: "5%" }}>
                <p style={{ margin: "0", marginLeft: "5%" }}>{googleUser.email}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", marginBottom: "5%" }}>
                <Switch
                  checked={autofillAvailability}
                  onChange={() => setAutofillAvailability(!autofillAvailability)}
                  color="success"
                  sx={{marginLeft: "-12px"}}
                />
                <p style={{ margin: "0" }}>Autofill availability with Calendar events</p>
              </div>
              <button className="CalendarImportButton" onClick={handleImport}>Import</button>

            </div>
          </DialogContent>
        </Dialog>
      </div>}
    </>
  );
}

export default GroupPageButtonCircle;

