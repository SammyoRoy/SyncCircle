import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.HashMap;

class Handler implements URLHandler {

    User sammyo;
    User daniela;
    GroupEvent nithinBirthday;

    HashMap<String, User> globalUsers;
    HashMap<String, GroupEvent> globalGroups;

    public void setup(){

        nithinBirthday = new GroupEvent("Nithin Birthday");
        sammyo = new User(nithinBirthday, "Sammyo");
        System.out.println(sammyo.getUniqueID());
        System.out.println(nithinBirthday.getUniqueId());
        daniela = new User(nithinBirthday, "Daniela");

        globalGroups = new HashMap<>();
        GroupEvent temp = new GroupEvent("Berlen");
        globalGroups.put(temp.getUniqueId(), temp);
        System.out.println(globalGroups.get(temp.getUniqueId()).getName());
        temp = new GroupEvent("Jesus");
        globalGroups.put(temp.getUniqueId(),temp);
        System.out.println(globalGroups.get(temp.getUniqueId()).getName());
        //globalUsers.put(sammyo.getUniqueID(),sammyo);
        //globalUsers.put(daniela.getUniqueID(),daniela);
        
        //globalGroups.put(nithinBirthday.getUniqueId(), nithinBirthday);
    }
    public String groupCreate(String name){
        GroupEvent temp = new GroupEvent(name);
        globalGroups.put(temp.getUniqueId(),temp);
        return temp.getUniqueId();
    }
    public String userCreate(String groupId, String name){
        GroupEvent group = globalGroups.get(groupId);
        User temp = new User(group, name);
        group.memberList.put(temp.getUniqueID(),temp);
        return temp.getUniqueID();
    }

    public String handleRequest(URI url) throws IOException {

        if (url.getPath().equals("/")) {
           return String.format("Easter Egg");
        } 
        else if (url.getPath().equals("/book")) {
           String[] parameters = url.getQuery().split("=");
           //https://localhost:4000/book?user=userid=group=groupId=row=col 
            if (parameters[0].equals("user")) {
                ((User) globalGroups.get(parameters[3]).getMemberList().get(parameters[1])).addAvailability(parameters[4],parameters[5]);
            
                return ((User)globalGroups.get(parameters[3]).getMemberList().get(parameters[1])).print();
           }
        }
        else if (url.getPath().equals("/display")){
            String[] parameters = url.getQuery().split("=");
            //https://localhost:4000/display?group=groupid
            if (parameters[0].equals("group")){
                return globalGroups.get(parameters[1]).print();
            }
        }
            /* 
            String result = "";
               List<String> foundPaths = new ArrayList<>();
               for(File f: paths) {
                   if(FileHelpers.readFile(f).contains(parameters[1])) {
                       foundPaths.add(f.toString());
                   }
               }
               Collections.sort(foundPaths);
               result = String.join("\n", foundPaths);
               return String.format("Found %d paths:\n%s", foundPaths.size(), result);*/
        else if (url.getPath().equals("/create")){
            String[] parameters = url.getQuery().split("=");
            if (parameters[0].equals("group")){
                String group = groupCreate(parameters[1]);
                return group;
            }
            else if (parameters[0].equals("user")){
                String user = userCreate(parameters[1],parameters[2]);
                return user;
            }
       }
        return "Couldn't find query parameter q";
    }
}
class BackEndHandler {
    public static void main(String[] args) throws IOException {
        Handler b1 = new Handler();
        b1.setup();
        System.out.println("Testing main");
        
        if(args.length == 0){
            System.out.println("Missing port number! Try any number between 1024 to 49151");
            return;
        }

        int port = Integer.parseInt(args[0]);

        Server.start(port, b1);
    }
}
