import java.util.UUID;
import java.util.ArrayList;

public class User {
    //Instance variables
    String uniqueID; 
    //ArrayList<String> groupList;
    GroupEvent groupID;
    String name;
    public int [][] availabilityArray;

    public User(GroupEvent groupID, String name) {
        uniqueID = UUID.randomUUID().toString();
        this.groupID = groupID;
        this.name = name;
        availabilityArray = new int[24][7];
    }

    public String getUniqueID() {
        return uniqueID;
    }

    public void setUniqueID(String uniqueID) {
        this.uniqueID = uniqueID;
    }

    public GroupEvent getGroupID(){
        return groupID;
    }

    public void setGroupID(GroupEvent groupID) {
        this.groupID = groupID;
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
    public void print(){
        for (int i = 0; i < availabilityArray.length; i++){
            for (int j = 0; j < availabilityArray[0].length; j++)
            {
                System.out.println("[" + availabilityArray[i][j] + "]");
            }
        }
    }
    public void addAvailability(String row, String col){
        availabilityArray[Integer.parseInt(row)][Integer.parseInt(col)]++;
    }

}


