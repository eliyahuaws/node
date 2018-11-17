package studio.jlj.com.yossi;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.LinearLayout;

import java.util.ArrayList;

public class GameActivity extends AppCompatActivity {

    LinearLayout backbround ;
    GameScreen gameScreen;
    ArrayList<GamePlayer> players;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        loadExtraData();
        init();


    }

    private void loadExtraData() {
        gameScreen = getIntent().getParcelableExtra("game");
        players = (ArrayList<GamePlayer>)getIntent().getSerializableExtra("gameList");
        int i =0;
    }

    private void init() {
        backbround = findViewById(R.id.background);
        backbround.setBackgroundColor(Color.parseColor(gameScreen.color));
    }
}
