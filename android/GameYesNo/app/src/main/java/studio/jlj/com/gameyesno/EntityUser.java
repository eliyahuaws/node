package studio.jlj.com.gameyesno;

import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;

import static android.content.Context.MODE_PRIVATE;

/**
 * Created by lior on 10/19/18.
 */

public class EntityUser {
    @SerializedName("status")
    public String status;

    @SerializedName("deviceId")
    public String deviceId;

    @SerializedName("agreementId")
    public String agreementId;

    @SerializedName("questionStage")
    public String questionStage;

    @SerializedName("languageId")
    public String languageId;

    @SerializedName("nickName")
    public String nickName;


    public static EntityUser loadUser()
    {

        SharedPreferences mPrefs =GameApp.getInstance().getApplicationContext().  getSharedPreferences("GameApp",MODE_PRIVATE);
        String connectionsJSONString = mPrefs.getString("USER", null);
        if(connectionsJSONString==null )
        {
            return null;
        }

        Type type = new TypeToken<EntityUser>() {}.getType();
        EntityUser entityUser = new Gson().fromJson(connectionsJSONString, type);
        return entityUser;
    }

    public static boolean saveUser(EntityUser entityUser)
    {
        try {
            SharedPreferences mPrefs = GameApp.getInstance().getApplicationContext().getSharedPreferences("GameApp", MODE_PRIVATE);
            String userJson = new Gson().toJson(entityUser);
            SharedPreferences.Editor editor = mPrefs.edit();
            editor.putString("USER", userJson);
            editor.commit();
            return  true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }


}
