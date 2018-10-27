package studio.jlj.com.gameyesno;

/**
 * Created by lior on 10/19/18.
 */

public enum EnviromentType {
    DEV_DEBUG(0),
    DEV_RELEASE(1),
    PROD_DEBUG(2),
    PROD_RELEASE(3);

    int value;

    private EnviromentType(){}

    private EnviromentType(int value){
        this.value = value;
    }

    public EnviromentType getEnviromentType()
    {
        switch (value)
        {
            case 0:return DEV_DEBUG;
            case 1: return DEV_RELEASE;
            case 2:return PROD_DEBUG;
            case 3:return PROD_RELEASE;
        }
        return null;
    }


}
