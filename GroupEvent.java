import java.util.List;
import java.util.UUID;

public class GroupEvent {
    String uniqueId = UUID.randomUUID().toString();
    List<String> memberList;
    int [][] masterArray;
    String name;
    public GroupEvent(String name) {
        this.uniqueId = UUID.randomUUID().toString();
        this.memberList = null;
        this.masterArray = new int[24][7];
        this.name = name;
    }
    public void addMemberId(String member){
        memberList.add(member);
    }
    public String getUniqueId() {
        return uniqueId;
    }
    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }
    public List<String> getMemberList() {
        return memberList;
    }
    public void setMemberId(List<String> memberId) {
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
}


