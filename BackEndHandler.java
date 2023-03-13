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
        sammyo = new User(nithinBirthday, "Sammyo");
        System.out.println(sammyo.getUniqueID());

        daniela = new User(nithinBirthday, "Daniela");

        nithinBirthday = new GroupEvent("Nithin Birthday");
        globalUsers = new HashMap<>();
        globalGroups = new HashMap<>();

        globalUsers.put(sammyo.getUniqueID(),sammyo);
        globalUsers.put(daniela.getUniqueID(),daniela);
        
        globalGroups.put(nithinBirthday.getUniqueId(), nithinBirthday);
    }

    public String handleRequest(URI url) throws IOException {

        if (url.getPath().equals("/")) {
           return String.format("Easter Egg");
        } else if (url.getPath().equals("/book")) {
           String[] parameters = url.getQuery().split("=");
           
            if (parameters[0].equals("user")) {
                globalUsers.get(parameters[1]).addAvailability(parameters[2],parameters[3]);
            
            return globalUsers.get(parameters[1]).print();
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
            }

           else {
               return "Couldn't find query parameter q";
            }
       } else if (url.getPath().equals("/displayMaster")){

       }

       else {
           return "Don't know how to handle that path!";
       }

       return "Ooops";
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