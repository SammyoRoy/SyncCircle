import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Collections;
import java.util.*;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

class Handler implements URLHandler {
    HashMap<String, GroupEvent> globalGroups;
    String calander;
    LocalTime start;
    LocalTime end;

    public Handler(){
        globalGroups = new HashMap<>();
    }

    public void setup() {

        /*
         * nithinBirthday = new GroupEvent("Nithin Birthday");
         * sammyo = new User(nithinBirthday, "Sammyo");
         * System.out.println(sammyo.getUniqueID());
         * System.out.println(nithinBirthday.getUniqueId());
         * daniela = new User(nithinBirthday, "Daniela");
         */

        globalGroups = new HashMap<>();
        /*
         * GroupEvent temp = new GroupEvent("Berlen");
         * globalGroups.put(temp.getUniqueId(), temp);
         * System.out.println(globalGroups.get(temp.getUniqueId()).getName());
         * temp = new GroupEvent("Jesus");
         * globalGroups.put(temp.getUniqueId(),temp);
         * System.out.println(globalGroups.get(temp.getUniqueId()).getName());
         */
        // globalUsers.put(sammyo.getUniqueID(),sammyo);
        // globalUsers.put(daniela.getUniqueID(),daniela);

        // globalGroups.put(nithinBirthday.getUniqueId(), nithinBirthday);
    }

    public String groupCreate(String name, String startTime, String endTime, String[] days) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mm a");
        LocalTime s = LocalTime.parse(startTime, formatter);
        LocalTime e = LocalTime.parse(endTime, formatter);
        int hours = Math.abs(e.getHour() - s.getHour());
        if (e.getHour() < s.getHour()) {
            hours = 24 - hours;
        }
        start = s;
        end = e;
        calander = "";
        for (int i = 0; i < days.length; i++) {
            calander += days[i];
            if (i != days.length - 1) {
                calander += ",";
            }
        }
        GroupEvent temp = new GroupEvent(name, hours, days.length);
        globalGroups.put(temp.getUniqueId(), temp);
        return temp.getUniqueId();
    }

    public String userCreate(String groupId, String name) {
        GroupEvent group = globalGroups.get(groupId);
        User temp = new User(group, name);
        group.memberList.put(temp.getUniqueID(), temp);
        group.userNameList.put(name, temp.getUniqueID());
        return temp.getUniqueID();
    }

    public String handleRequest(URI url) throws IOException {

        if (url.getPath().equals("/")) {
            return String.format("Easter Egg");
        } else if (url.getPath().equals("/book")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/book?user=userid=group=groupId=row=col
            if (parameters[0].equals("user")) {
                Object temp = globalGroups.get(parameters[3]).getMemberList().get(parameters[1]);
                ((User) temp).addAvailability(parameters[4], parameters[5], ((User) temp).getName());

                return ((User) temp).print();
            }
        }

        else if (url.getPath().equals("/unbook")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/unbook?user=userid=group=groupId=row=col
            if (parameters[0].equals("user")) {
                Object temp = globalGroups.get(parameters[3]).getMemberList().get(parameters[1]);
                ((User) temp).removeAvailability(parameters[4], parameters[5], ((User) temp).getName());
                return ((User) temp).print();
            }
        } else if (url.getPath().equals("/display")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/display?group=groupid
            if (parameters[0].equals("group")) {
                // return ((GroupEvent)globalGroups.get(parameters[1])).getName();
                return globalGroups.get(parameters[1]).print();
            }

            // http://localhost:4000/display?user=groupId=userId
            else if (parameters[0].equals("user")) {
                return ((User) globalGroups.get(parameters[1]).getMemberList().get(parameters[2])).getName();
            }

            // http://localhost:4000/display?memlist=groupId
            else if (parameters[0].equals("memlist")) {
                return (globalGroups.get(parameters[1]).displayMembers());
            }
            // http://localhost:4000/display?slot=group=groupid=row=col
            else if (parameters[0].equals("slot")) {
                ArrayList<String> avail = globalGroups.get(parameters[2]).getMasterArray()[Integer
                        .parseInt(parameters[3])][Integer.parseInt(parameters[4])];
                return avail.toString();
            }

        }

        else if (url.getPath().equals("/slot")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/slot?group=groupid=row=col
            ArrayList<String> avail = globalGroups.get(parameters[1]).getMasterArray()[Integer
                    .parseInt(parameters[2])][Integer.parseInt(parameters[3])];
            return String.valueOf(avail.size());
        }

        else if (url.getPath().equals("/numMem")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/numMem?group=groupid
            int totalMembers = globalGroups.get(parameters[1]).getMemberList().size();
            return String.valueOf(totalMembers);
        }

        else if (url.getPath().equals("/allMem")) {
            // http://localhost:4000/allMem?group=groupid
            String[] parameters = url.getQuery().split("=");
            HashMap<String, User> memList = globalGroups.get(parameters[1]).getMemberList();
            Set<String> keySet = memList.keySet();
            ArrayList<String> allMembers = new ArrayList<>();
            for (String key : keySet) {
                allMembers.add(memList.get(key).getName());
            }
            return allMembers.toString();
        }

        else if (url.getPath().equals("/findMem")) {
            // http://localhost:4000/findMem?group=groupid=name;
            String[] parameters = url.getQuery().split("=");
            String userName = parameters[2];
            HashMap<String, String> allMem = globalGroups.get(parameters[1]).getUserNameList();
            Set<String> nameList = allMem.keySet();
            if (nameList.contains(userName)) {
                return allMem.get(userName); // Corresponding UserID
            } else {
                return "False";
            }

        }

        else if (url.getPath().equals("/days")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/days?group=groupid
            if (parameters[0].equals("group")) {
                return calander;
            }
        } else if (url.getPath().equals("/shours")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/shours?group=groupid
            if (parameters[0].equals("group")) {
                return start.toString();
            }
        } else if (url.getPath().equals("/ehours")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/ehours?group=groupid
            if (parameters[0].equals("group")) {
                return end.toString();
            }
        }

        else if (url.getPath().equals("/name")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/name?group=groupid
            if (parameters[0].equals("group")) {
                return globalGroups.get(parameters[1]).getName();
            }
        }

        else if (url.getPath().equals("/initializeSlot")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/initializeSlot?group=groupid=userID=row=col

            int avail = ((User) globalGroups.get(parameters[1]).getMemberList().get(parameters[2])).getAvailabilityArray()[
                Integer.parseInt(parameters[3])][Integer.parseInt(parameters[4])];
            return Integer.toString(avail);
        }
        /*
         * String result = "";
         * List<String> foundPaths = new ArrayList<>();
         * for(File f: paths) {
         * if(FileHelpers.readFile(f).contains(parameters[1])) {
         * foundPaths.add(f.toString());
         * }
         * }
         * Collections.sort(foundPaths);
         * result = String.join("\n", foundPaths);
         * return String.format("Found %d paths:\n%s", foundPaths.size(), result);
         */
        else if (url.getPath().equals("/create")) {
            String[] parameters = url.getQuery().split("=");
            // http://localhost:4000/create?group=name=5:00 AM=9:00
            // PM=Monday,Tuesday,Wednesday,Saturday
            if (parameters[0].equals("group")) {
                String group = groupCreate(parameters[1], parameters[2], parameters[3], parameters[4].split(","));
                return group;
            }
            // http://localhost:4000/create?user=groupId=Sammyo
            else if (parameters[0].equals("user")) {
                String user = userCreate(parameters[1], parameters[2]);
                return user;
            }
        }
        return "Couldn't find query parameter q";
    }

    public int[][] displayUserArray(String userId, String groupId, URI url) {
        if (url.getPath().equals("/display")) {
            String[] parameters = url.getQuery().split("=");
            // https://localhost:4000/display?group=groupid
            if (parameters[0].equals("user")) {
                return ((User) globalGroups.get(groupId).getMemberList().get(userId)).getAvailabilityArray();
            }
        }
        return null;
    }

    /*
     * public String getGroupName(String groupId, URI url){
     * if (url.getPath().equals("/display")){
     * String[] parameters = url.getQuery().split("=");
     * //https://localhost:4000/display?group=groupid
     * if (parameters[0].equals("user")){
     * return globalGroups.get(groupId).getName();
     * }
     * }
     * return null;
     * }
     */

}

/*class BackEndHandler {
    public static void main(String[] args) throws IOException {
        Handler b1 = new Handler();
        b1.setup();
        System.out.println("Testing main");

        if (args.length == 0) {
            System.out.println("Missing port number! Try any number between 1024 to 49151");
            return;
        }

        int port = Integer.parseInt(args[0]);

        Server.start(port, b1);
    }
}*/
