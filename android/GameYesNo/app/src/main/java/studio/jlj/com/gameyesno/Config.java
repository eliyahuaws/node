package studio.jlj.com.gameyesno;

/**
 * Created by lior on 10/19/18.
 */

public class Config {
    private static EnviromentType sEnviromentType;

    public static void setEnviromentType(EnviromentType enviromentType)
    {
        sEnviromentType = enviromentType;
    }

    public static String getNetworkUrl()
    {
        switch (sEnviromentType)
        {
            case DEV_DEBUG:
            case DEV_RELEASE:
                return "http://10.0.2.2:3000";
            case PROD_DEBUG:
            case PROD_RELEASE:
                return "http://10.71.7.139:3000";
        }

        return null;
    }



}
