import java.util.List;
import java.util.UUID;

public class GroupEvent {
    //instance variables
    String uniqueId = UUID.randomUUID().toString();
    List<User> memberList;
    int [][] masterArray;
    String name;
    //constructor
    public GroupEvent(String name) {
        this.uniqueId = UUID.randomUUID().toString();
        this.memberList = null;
        this.masterArray = new int[24][7];
        this.name = name;
    }
    //add member to list method
    public void addMemberId(User member){
        memberList.add(member);
    }
    //getter and setters
    public String getUniqueId() {
        return uniqueId;
    }
    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }
    public List<User> getMemberList() {
        return memberList;
    }
    public void setMemberList(List<User> memberList) {
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

    public void print(){
        for (int i = 0; i < masterArray.length; i++){
            for (int j = 0; j < masterArray[0].length; j++){
                System.out.println("[" + masterArray[i][j] + "]");
            }
        }
    }
}


