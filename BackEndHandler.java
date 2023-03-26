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
    public void groupCreate(String name){
        GroupEvent temp = new GroupEvent(name);
        globalGroups.put(temp.getUniqueId(),temp);
    }
    public void userCreate(String groupId, String name){
        GroupEvent group = globalGroups.get(groupId);
        User temp = new User(group, name);
        group.memberList.add(temp);
    }

    public String handleRequest(URI url) throws IOException {

        if (url.getPath().equals("/")) {
           return String.format("Easter Egg");
        } 
        else if (url.getPath().equals("/book")) {
           String[] parameters = url.getQuery().split("=");
           //https://localhost:4000/book?user=userid=row=col 
            if (parameters[0].equals("user")) {
                globalUsers.get(parameters[1]).addAvailability(parameters[2],parameters[3]);
            
                return globalUsers.get(parameters[1]).print();
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