package studio.jlj.com.yossi;

import android.app.Application;
import android.util.Log;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;

/**
 * Created by lior on 11/3/18.
 */

public class ColorApp extends Application {
    private static  Socket mSocket;

    public static boolean connectSocket()
    {
        try {
            //  mSocket = IO.socket("http://ec2-18-191-197-39.us-east-2.compute.amazonaws.com:8080");
            mSocket = IO.socket("http://192.168.1.15:3000");
            mSocket.connect();
            if (mSocket.connected()){

            }
            else
            {

            }
//            Log.i("lioreliyahu",mSocket.id().toString());
            return true;

        } catch (URISyntaxException e) {
            return false;
        }
    }

    public static Socket getSocket()
    {
        return mSocket;
    }

}
