import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.HashMap;

public class GroupEvent {
    // instance variables
    String uniqueId = UUID.randomUUID().toString();
    HashMap<String, User> memberList;
    ArrayList<String>[][] masterArray;
    String name;

    // constructor
    public GroupEvent(String name, int hours, int days) {
        this.name = name;
        this.memberList = new HashMap<>();
        this.masterArray = new ArrayList[hours][days];
        for (int i = 0; i < hours; i++) {
            for (int j = 0; j < days; j++) {
                this.masterArray[i][j] = new ArrayList<String>();
            }
        }
    }
    // add member to list method
    public void addMemberId(User member) {
        memberList.put(member.getUniqueID(), member);
    }

    // getter and setters
    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public HashMap getMemberList() {
        return memberList;
    }

    public void setMemberList(HashMap<String, User> memberList) {
        this.memberList = memberList;
    }

    public ArrayList[][] getMasterArray() {
        return masterArray;
    }

    public void setMasterArray(ArrayList<String>[][] masterArray) {
        this.masterArray = masterArray;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String print() {
        String s = "";
        s += (name + "\n");
        for (int i = 0; i < masterArray.length; i++) {
            for (int j = 0; j < masterArray[0].length; j++) {
                s += "[" + masterArray[i][j].toString() + "]";
            }
            s += "\n";
        }
        return s;
    }

    public void addGroupAvailability(String row, String col, String name) {
        // if (masterArray[Integer.parseInt(row)][Integer.parseInt(col)] <
        // memberList.size()){
        masterArray[Integer.parseInt(row)][Integer.parseInt(col)].add(name);
        // }
    }

    public void removeGroupAvailability(String row, String col, String name) {
        masterArray[Integer.parseInt(row)][Integer.parseInt(col)].remove(name);
    }

    public String displayMembers() {
        String m = "";
        for (Map.Entry<String, User> entry : memberList.entrySet()) {
            String key = entry.getKey();
            User value = entry.getValue();
            String name = value.getName();
            m += ("Name: " + name + "  " + key);
        }

        return m;
    }
}
