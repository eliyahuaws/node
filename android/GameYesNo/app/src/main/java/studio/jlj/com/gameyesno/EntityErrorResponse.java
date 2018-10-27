package studio.jlj.com.gameyesno;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;

/**
 * Created by lior on 10/19/18.
 */

public class EntityErrorResponse {
    @SerializedName("status")
    public String status;

    @SerializedName("message")
    public String message;

    @SerializedName("messageCode")
    public int messageCode;

    public static EntityErrorResponse convertError(String connectionsJSONString)
    {
        Type type = new TypeToken<EntityErrorResponse>() {}.getType();
        EntityErrorResponse a = new Gson().fromJson(connectionsJSONString, type);
       return  a;
    }


}
