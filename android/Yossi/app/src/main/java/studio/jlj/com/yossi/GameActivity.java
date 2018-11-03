package studio.jlj.com.yossi;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.util.ArrayList;

public class GameActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);


        GameScreen gameScreen = getIntent().getParcelableExtra("gameList");
        ArrayList<GamePlayer> players = (ArrayList<GamePlayer>)getIntent().getSerializableExtra("game");
        int i =0;
    }
}
