import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.HashMap;

public class GroupEvent {
    //instance variables
    String uniqueId = UUID.randomUUID().toString();
    HashMap<String,User> memberList;
    int [][] masterArray;
    String name;

    //constructor
    public GroupEvent(String name, int hours, int days) {
        this.uniqueId = UUID.randomUUID().toString();
        this.memberList = new HashMap<>();
        this.masterArray = new int[hours][days];
        this.name = name;
    }
    //add member to list method
    public void addMemberId(User member){
        memberList.put(member.getUniqueID(),member);
    }
    //getter and setters
    public String getUniqueId() {
        return uniqueId;
    }
    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }
    public HashMap getMemberList() {
        return memberList;
    }
    public void setMemberList(HashMap<String,User> memberList) {
        this.memberList = memberList;
    }
    public int[][] getMasterArray() {
        return masterArray;
    }
    public void setMasterArray(int[][] masterArray) {
        this.masterArray = masterArray;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String print(){
        String s = "";
        s += (name+"\n");
        for (int i = 0; i < masterArray.length; i++){
            for (int j = 0; j < masterArray[0].length; j++){
                s += "[" + masterArray[i][j] + "]";
            }
            s += "\n";
        }
        return s;
    }

    public void addGroupAvailability(String row, String col){
        //if (masterArray[Integer.parseInt(row)][Integer.parseInt(col)] < memberList.size()){
            masterArray[Integer.parseInt(row)][Integer.parseInt(col)]++;
        //}
    }

    public String displayMembers(){
        String m="";
        for (Map.Entry<String,User> entry : memberList.entrySet()) {
            String key = entry.getKey();
            User value = entry.getValue();
            String name = value.getName();
            m += ("Name: " + name + "  " + key);
        }

        return m;
    }
}


