import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import GroupSlot from "./GroupSlot";
import TimeLabel from "./TimeLabel";
import { AppContext } from "../../context/AppContext";
import io from 'socket.io-client';
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { IndexContext } from "../../context/IndexContext";
import { useCookies } from "react-cookie";

function GroupCalendar({ setPopupMatrixKey, setPopupColor, setGroupSlotClicked }) {
  const { groupId, userId, userSlot, startColumn, MAX_COLUMNS_DISPLAYED, setLoading, userName} = useContext(AppContext);
  const {leaveMessage, setLeaveMessage} = useContext(IndexContext);
  const [days, setDays] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [masterArray, setMasterArray] = useState(null);
  const [numAvailArr, setNumAvailArr] = useState(null);
  const [timeZone, setTimeZone] = useState("");

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([`username_${groupId}`]);


  const [groupSocket, setGroupSocket] = useState(null);
  //const [modifiedKey, setModifiedKey] = useState(0);
  const [modifiedRow, setModifiedRow] = useState(0);
  const [modifiedCol, setModifiedCol] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [addedNewMember, setAddedNewMember] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const socket = io(`${API_URL}`, { transports: ['websocket'] });
    setGroupSocket(socket);

  }, []);

  useEffect(() => {
    // Combine fetching of days, start, and end into a single function
    async function fetchData() {
      const URL = window.location.href.split("/");
      const response = await axios.get(`${API_URL}/groups/${URL[URL.length - 1]}`);
      setDays(response.data.days);
      setStart(response.data.start_time);
      setEnd(response.data.end_time);
      setMasterArray(response.data.master_array);
      setTimeZone(response.data.time_zone);
      setAddedNewMember(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (masterArray) {
      const lengthsArray = masterArray.map(innerArray =>
        // Map through each sub-array in the inner array
        innerArray.map(subArray => subArray.length)
      );

      setNumAvailArr(lengthsArray);
      setLoading(false);
      //console.log("Num avail :" + numAvailArr);
    }
  }, [masterArray]);

  useEffect(() => {
    if (groupId !== "") {
      async function fetchData() {
        const response = await axios.get(
          `${API_URL}/groups/nummem/${groupId}`
        );
        const totalMembersValue = parseInt(response.data);
        setTotalMembers(totalMembersValue);
        setAddedNewMember(true);
      }
      fetchData();
     // console.log("Getting total mems");
    }
  }, [addedNewMember]);

  useEffect(() => {
    function convertTimeToIndex(time) {
      const [hourMinute, period] = time.split(' ');
      const [hour] = hourMinute.split(':');
      let parsedHour = parseInt(hour, 10);

      if (period === "PM" && parsedHour < 12) {
        parsedHour += 12;
      }

      if (period === "AM" && parsedHour === 12) {
        parsedHour = 0;
      }

      const timeOptions = [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM'
      ];

      // Find the index of the parsed time in the timeOptions array
      const index = timeOptions.findIndex(option => option === time);

      return index;
    }
    if (timeZone !== "" && timeZone !== undefined) {

      const startTimeIndex = convertTimeToIndex(start);
      const endTimeIndex = convertTimeToIndex(end);
      const timeIndex = convertTimeToIndex(start);
      const now = new moment();
      const groupTimeZoneOffset = now.tz(timeZone).utcOffset();
      //const userTimeZoneOffset = now.tz("Asia/Kolkata").utcOffset();
      const userTimeZoneOffset = now.tz(moment.tz.guess()).utcOffset();
      let timeZoneOffset = groupTimeZoneOffset - userTimeZoneOffset;
      timeZoneOffset = timeZoneOffset / 60;
      const adjustedStartIndex = (startTimeIndex - Math.round(timeZoneOffset) + 24) % 24;
      const adjustedEndIndex = (endTimeIndex - Math.round(timeZoneOffset) + 24) % 24;

      setStartIndex(adjustedStartIndex);
      setEndIndex(adjustedEndIndex);
    }
    else{
      const startTimeIndex = convertTimeToIndex(start);
      const endTimeIndex = convertTimeToIndex(end);
      const timeIndex = convertTimeToIndex(start);
      setStartIndex(startTimeIndex);
      setEndIndex(endTimeIndex);
    }

  }, [start, end, timeZone]);

  useEffect(() => {
    if (groupSocket) { // Check if groupSocket is not null

      groupSocket.on('new user', (signalGroupId) => {
        if (groupId == signalGroupId) {
          setAddedNewMember(false);
        }
      });

      groupSocket.on('unbooked', (row, col, signalGroupId) => {
        if (groupId == signalGroupId) {
          setModifiedRow(row);
          //(row+","+col);
          setModifiedCol(col);
          setIsBooked(false);
          setNumAvailArr((prevArr) => {
            const newArr = [...prevArr];
            newArr[row][col] -= 1;
            return newArr;
          });
        }
      });

      groupSocket.on('booked', (row, col, signalGroupId) => {
        if (groupId == signalGroupId) {
          setModifiedRow(row);
          setModifiedCol(col);
          //console.log(row+","+col);
          setIsBooked(true);
          setNumAvailArr((prevArr) => {
            const newArr = [...prevArr];
            newArr[row][col] += 1;
            return newArr;
          });
        }
      });

      groupSocket.on('kicked user' , (signalUserName, signalGroupId) => {
        if (groupId == signalGroupId && userName == signalUserName) {
          setLeaveMessage('You have been removed from the group');
          removeCookie(`username_${groupId}`, { path: '/' });
          navigate('/');
        }
        else if (groupId == signalGroupId) {
          axios.get(`${API_URL}/groups/${groupId}`)
            .then((response) => {
              const masterArray = response.data.master_array;
              setNumAvailArr((prevArr) => {
                const newArr = [...prevArr];
                for (let i = 0; i < newArr.length; i++) {
                  for (let j = 0; j < newArr[i].length; j++) {
                    newArr[i][j] = masterArray[i][j].length;
                  }
                }
                return newArr;
              });
              setTotalMembers((prevTotal) => prevTotal - 1);
            })
            .catch((error) => {
              // handle the error
              console.error(error);
            });
        }

        groupSocket.on('change name', (signalGroupId) => {
          if (groupId == signalGroupId) {
            window.location.reload();
          }
        });
      });

      groupSocket.on('delete group', (signalGroupId) => {
        if (groupId == signalGroupId) {
          setLeaveMessage('The group you were in has been deleted');
          
          navigate('/');
        }
      });
    }
  }, [groupSocket]); // Add groupSocket as a dependency

  function getNumAvail(row, col) {
    if (numAvailArr === null) {
      return;
    }
    const num = numAvailArr[row][col];
    return num;
  }

  const numRows = endIndex >= startIndex
    ? endIndex - startIndex
    : endIndex + 24 - startIndex;

    const columnsDisplayed = Math.min(days.length, MAX_COLUMNS_DISPLAYED);
    const gridTemplateColumns = `76px repeat(${columnsDisplayed}, 1fr)`;
    const gridTemplateRows = `repeat(${numRows}, 1fr)`
    
    const totalCells = (columnsDisplayed + 1) * (numRows);

  return (
    <div className="CalenderContainer">
      <div className="CalendarGrid" style={{ gridTemplateColumns, gridTemplateRows }}>
        {/* Generate and render grid items */}

        {Array.from({ length: totalCells }, (_, index) => {
          const row = Math.floor(index / (columnsDisplayed + 1));
          const col = index % (columnsDisplayed + 1) - 1 + startColumn;
          let cellValue = 0;

          /*const cellValue = masterArray && row >= 0 && row < masterArray.length && col >= 0 && col < masterArray[row].length
            ? masterArray[row][col]
            : 0;*/


          if ((index % (columnsDisplayed + 1)) !== 0) {
            //const slotIndex = row*(days.length) + col;
            cellValue = getNumAvail(row, col);
          }

          return index % (columnsDisplayed + 1) === 0 ? (
            <TimeLabel
              key={index}
              currTimeIndex={(startIndex + row) % 24}
            />
          ) : (<GroupSlot
            key={index}
            matrixKey={index}
            days={days}
            groupId={groupId}
            userId={userId}
            setPopupMatrixKey={setPopupMatrixKey}
            setPopupColor={setPopupColor}
            setGroupSlotClicked={setGroupSlotClicked}
            cellValue={cellValue}
            totalMembers={totalMembers}
            modifiedRow={modifiedRow}
            modifiedCol={modifiedCol}
            isBooked={isBooked}
            numAvailArr={numAvailArr}
          />
          );
        })}

      </div>
    </div>
  );
}

export default GroupCalendar;