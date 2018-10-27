package studio.jlj.com.gameyesno;

import android.util.Log;

/**
 * Created by lior on 10/19/18.
 */

public class Logger {



    public static void Log(int type,String TAG,String Desc )
    {
        switch (type)
        {
            case 0:
                Log.i(TAG,Desc);break;
            case 1:
                Log.w(TAG,Desc);break;
            case 2:
                Log.e(TAG,Desc);break;
        }
    }




}
