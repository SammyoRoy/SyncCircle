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

class Handler implements URLHandler {

    public static void main(String[] args) {

    }
    public String handleRequest(URI url) throws IOException {
        GroupEvent nithinBirthday = new GroupEvent("Nithin Birthday");

        User sammyo = new User(nithinBirthday, "Sammyo");
        User daniela = new User(nithinBirthday, "Daniela");


        if (url.getPath().equals("/")) {
           return String.format("Default page");
        } else if (url.getPath().equals("/book")) {
           String[] parameters = url.getQuery().split("=");
           if (parameters[0].equals("q")) {
               String result = "";
               List<String> foundPaths = new ArrayList<>();
               for(File f: paths) {
                   if(FileHelpers.readFile(f).contains(parameters[1])) {
                       foundPaths.add(f.toString());
                   }
               }
               Collections.sort(foundPaths);
               result = String.join("\n", foundPaths);
               return String.format("Found %d paths:\n%s", foundPaths.size(), result);
            }
           else {
               return "Couldn't find query parameter q";
            }
       }
       else {
           return "Don't know how to handle that path!";
       }
    }
}

class BackEndHandler {
    public static void main(String[] args) throws IOException {
        if(args.length == 0){
            System.out.println("Missing port number! Try any number between 1024 to 49151");
            return;
        }

        int port = Integer.parseInt(args[0]);

        Server.start(port, new Handler("./written_2/"));
    }
}