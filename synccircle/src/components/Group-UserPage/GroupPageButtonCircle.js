import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";

function GroupPageButtonCircle({ joined }) {
  const { groupId, userId } = useContext(AppContext);
  const { googleUser, setGoogleUser, token, setToken } = useContext(IndexContext);
  const [autofillAvailability, setAutofillAvailability] = useState(true);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);


  const API_URL = process.env.REACT_APP_API_URL;

  const [events, setEvents] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (groupId !== null || groupId !== undefined) {
      axios.get(`${API_URL}/groups/${groupId}`)
        .then((response) => {
          const dayStart = response.data.days[0];
          const dayEnd = response.data.days[response.data.days.length - 1];
          const currentYear = new Date().getFullYear();
          const fullDateStart = `${dayStart} ${currentYear}`;
          const fullDateEnd = `${dayEnd} ${currentYear}`;
          const startDate = new Date(fullDateStart);
          const endDate = new Date(fullDateEnd);
          if (endDate < startDate) {
            endDate.setMonth(endDate.getMonth() + 12);
          }
          setStartDate(startDate);
          setEndDate(endDate);
          setStartTime(response.data.startTime);
          setEndTime(response.data.endTime);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [API_URL, groupId]);

  useEffect(() => {
    if (googleUser) {
      axios.get(`${API_URL}/authUsers/${googleUser.email}`)
        .then((response) => {
          if (response.status === 404) {
            axios.post(`${API_URL}/authUsers`, { email: googleUser.email, photoUrl: googleUser.photoURL, login_type: "google" });
            groupId !== null || groupId !== undefined && axios.put(`${API_URL}/authUsers/groups/${googleUser.email}`, { group: groupId });
          }
          else {
            axios.get(`${API_URL}/authUsers/groups/${googleUser.email}`)
              .then((response) => {
                const groups = response.data;
                if (!groups.includes(groupId) && groupId !== null && groupId !== undefined && groupId !== "") {
                  axios.put(`${API_URL}/authUsers/groups/${googleUser.email}`, { group: groupId });
                }
              });

          }
        })
        .catch ((error) => {
          axios.post(`${API_URL}/authUsers`, { email: googleUser.email, photoUrl: googleUser.photoURL, login_type: "google" });
          groupId !== null || groupId !== undefined && axios.put(`${API_URL}/authUsers/groups/${googleUser.email}`, { group: groupId });
        });
    }
  }, [googleUser]);


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
    if (googleUser && token) {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: "AIzaSyDFa4O21qp6TYOFKBRpDk9UP2EISCsoFrQ",
          clientId: "695221716118-48a0qqt7qo4j2uab6rkepg6nneelbjrn.apps.googleusercontent.com",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar.readonly",
        }).then(() => {
          // Check if the user is already signed in
          gapi.auth.setToken({ access_token: token });
          listAllCalendars();
          setOpen(false);
        }, error => {
          console.error("Error during gapi.client.init:", error);
        });
      });
    };
  }

  const listAllCalendars = () => {
    gapi.client.calendar.calendarList.list().then(response => {
      const calendars = response.result.items;
      calendars.forEach(calendar => {
        listCalendarEvents(calendar.id);
      });
    }).catch(error => {
      console.error("Error fetching calendars:", error);
    });
  };

  const listCalendarEvents = (calendarId) => {
    gapi.client.calendar.events.list({
      'calendarId': calendarId,
      'timeMin': (startDate).toISOString(),
      'timeMax': (endDate).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      const events = response.result.items;
      console.log(`Events from calendar ${calendarId}:`, events);
    }).catch(error => {
      console.error("Error fetching calendar events:", error);
    });
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
        <button className="GroupPageButtonCircle" type="button" style={{ background: "#2ea75e", }} onClick={handleOpen}>
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
                  sx={{ marginLeft: "-12px" }}
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

