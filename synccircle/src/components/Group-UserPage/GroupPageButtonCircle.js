import React, { useContext } from "react";
import GroupPage from "./GroupPage";
import GroupIcon from '@mui/icons-material/Group'
import { AppContext } from "../../context/AppContext";
import { IndexContext } from "../../context/IndexContext";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { FcGoogle } from "react-icons/fc";
import { auth, provider} from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function GroupPageButtonCircle({ joined }) {
  const { groupId, userId } = useContext(AppContext);
  const { googleUser, setGoogleUser } = useContext(IndexContext);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setGoogleUser(result.user);
  }

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
        <button className="GroupPageButtonCircle" type="button" style={{ background: "#5AD85F" }}>
          <CalendarTodayIcon className="GroupPageButtonCircleIcon" fontSize="large" />
        </button>
      </div>}
    </>
  );
}

export default GroupPageButtonCircle;

