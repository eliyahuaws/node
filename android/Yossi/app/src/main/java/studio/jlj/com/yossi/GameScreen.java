package studio.jlj.com.yossi;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by lior on 11/3/18.
 */

public class GameScreen implements Serializable{
    public String masterId;
    public String id;
    public String name;
    public int fire;
    public int shild;
    public int life;
    public int position;

    ArrayList<GamePlayer> gamePlayers = new ArrayList<>();

    public GameScreen(){}

    public void addGamePlayers(GamePlayer gamePlayer)
    {
        this.gamePlayers.add(gamePlayer);
    }
}
