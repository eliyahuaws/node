package studio.jlj.com.gameyesno;

import com.google.gson.annotations.SerializedName;

/**
 * Created by lior on 10/19/18.
 */

public class EntityChangeDevice {
    @SerializedName("status")
    public String status;

    @SerializedName("deviceId")
    public String deviceId;

    @SerializedName("changeId")
    public String changeId;

    public EntityChangeDevice(String deviceId,int day)
    {
        this.deviceId = deviceId;
        createChange(day);
    }

    private void createChange(int day) {//TODO encrypt by time
        int[] value = new int[5];
        switch (day)
        {
            case 1:break;
            case 2:break;
            case 3:break;
            case 4:break;
            case 5:break;
            case 6:break;
            case 7:break;
            case 8:break;
            case 9:break;
            case 10:break;
            case 11:break;
            case 12:break;
            case 13:break;
            case 14:break;
            case 15:break;
            case 16:break;
            case 17:break;
            case 18:break;
            case 19:break;
            case 20:break;
            case 21:break;
            case 22:break;
            case 23:break;
            case 24:break;
            case 25:break;
            case 26:break;
            case 27:break;
            case 28:break;
            case 29:break;
            case 30:break;
            case 31:break;
        }
        value = new int[]{1,2,3,4,5};
        String changeIdText = "";
        for(int i :value)
        {
            changeIdText +=deviceId.charAt(i);
        }
        this.changeId = changeIdText;

    }


}
