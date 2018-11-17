package studio.jlj.com.yossi;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by lior on 11/3/18.
 */

public class GameScreen implements Parcelable{
    public String masterId;
    public String id;
    public String name;
    public String color;
    public int fire;
    public int shild;
    public int life;
    public int position;



    public GameScreen(){}


    protected GameScreen(Parcel in) {
        masterId = in.readString();
        id = in.readString();
        name = in.readString();
        color = in.readString();
        fire = in.readInt();
        shild = in.readInt();
        life = in.readInt();
        position = in.readInt();
    }

    public static final Creator<GameScreen> CREATOR = new Creator<GameScreen>() {
        @Override
        public GameScreen createFromParcel(Parcel in) {
            return new GameScreen(in);
        }

        @Override
        public GameScreen[] newArray(int size) {
            return new GameScreen[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(masterId);
        dest.writeString(id);
        dest.writeString(name);
        dest.writeString(color);
        dest.writeInt(fire);
        dest.writeInt(shild);
        dest.writeInt(life);
        dest.writeInt(position);
    }
}
