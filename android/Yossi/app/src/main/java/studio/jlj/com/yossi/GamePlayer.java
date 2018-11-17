package studio.jlj.com.yossi;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by lior on 11/3/18.
 */

public class GamePlayer implements Parcelable{
    public String id;
    public String name;
    public String color;
    public int fire;
    public int shild;
    public int life;
    public int position;
    public GamePlayer(){}


    protected GamePlayer(Parcel in) {
        id = in.readString();
        name = in.readString();
        color = in.readString();
        fire = in.readInt();
        shild = in.readInt();
        life = in.readInt();
        position = in.readInt();
    }

    public static final Creator<GamePlayer> CREATOR = new Creator<GamePlayer>() {
        @Override
        public GamePlayer createFromParcel(Parcel in) {
            return new GamePlayer(in);
        }

        @Override
        public GamePlayer[] newArray(int size) {
            return new GamePlayer[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(id);
        dest.writeString(name);
        dest.writeString(color);
        dest.writeInt(fire);
        dest.writeInt(shild);
        dest.writeInt(life);
        dest.writeInt(position);
    }
}
