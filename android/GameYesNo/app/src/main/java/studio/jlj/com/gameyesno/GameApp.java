package studio.jlj.com.gameyesno;

import android.app.Application;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;


/**
 * Created by lior on 10/17/18.
 */

public class GameApp extends Application {
    public static EntityUser sEntityUser = null;
    public static GameApp sGameApp = null;
    private String TAG = "GameApp.class";
    private Socket mSocket;
//    private static final String URL = "http://10.0.2.2:8080";
  private static final String URL = "http://10.71.7.139:8080";
//      private static final String URL = "http://ec2-18-191-197-39.us-east-2.compute.amazonaws.com:8080";

    private static EnviromentType SEnviromentType;
    @Override
    public void onCreate() {
        initGame();
        super.onCreate();
        try {
            mSocket = IO.socket(URL);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public Socket getmSocket(){
        return mSocket;
    }


    private void initGame()
    {

        sGameApp = this;
        Logger.Log(0,TAG,"INIT GAME");
        Config.setEnviromentType(EnviromentType.PROD_DEBUG);
    }

    public static GameApp getInstance()
    {

        return  sGameApp;
    }

    public static void setEntityUser(EntityUser entityUser)
    {
        sEntityUser = entityUser;
    }

    public static EntityUser getEntityUser()
    {
        return sEntityUser;
    }

}
