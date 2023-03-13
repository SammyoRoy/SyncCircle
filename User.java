import java.util.UUID;
import java.util.ArrayList;

public class User {
    //Instance variables
    String uniqueID; 
    ArrayList<String> groupList;
    String name;
    int [][] availabilityArray;

    public User(ArrayList<String> groupList, String name) {
        uniqueID = UUID.randomUUID().toString();
        this.groupList = groupList;
        this.name = name;
        availabilityArray = new int[24][7];
    }

    public String getUniqueID() {
        return uniqueID;
    }

    public void setUniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
    }

    public ArrayList<String> getGroupList() {
        return groupList;
    }

    public void setGroupList(ArrayList<String> groupList) {
        this.groupList = groupList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int[][] getAvailabilityArray() {
        return availabilityArray;
    }

    public void setAvailabilityArray(int[][] availabilityArray) {
        this.availabilityArray = availabilityArray;
    }

}


