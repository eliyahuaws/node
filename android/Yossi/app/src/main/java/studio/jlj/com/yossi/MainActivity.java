package studio.jlj.com.yossi;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;


import com.github.nkzawa.emitter.Emitter;


import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    final MediaPlayer mp = new MediaPlayer();
    TextView local,server;
    TextToSpeech textToSpeech;
    EditText name;
    Button generateQrCode,scanQrCode,startGame;
    String playerName;
    boolean master = false;
//    private static final String URL = "http://192.168.1.15:3000";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        setContentView(R.layout.activity_main);
        ColorApp.connectSocket();
        init();






        findViewById(R.id.createMaster).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                playerName = name.getText().toString();
                ColorApp.getSocket().emit("createMaster",ColorApp.getSocket().id().toString(),playerName);


            }
        });

        ColorApp.getSocket().on("you-are-the-master",new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                master = true;
            }
        });

        ColorApp.getSocket().on("command",new Emitter.Listener() {


            @Override
            public void call(final Object... args) {

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        textToSpeech.speak((String)args[0],TextToSpeech.QUEUE_ADD, null);

                    }
                });

            }
        });

        ColorApp.getSocket().on("startGame",new Emitter.Listener() {


            @Override
            public void call(final Object... args) {
                final ArrayList<GamePlayer> players = new ArrayList<>();
                final GameScreen gameScreen = new GameScreen();
                for(int i = 0; i<((JSONArray) args[0]).length(); i++)
                {
                    GamePlayer gamePlayer = new GamePlayer();
                    try {

                        String id = ((JSONArray) args[0]).getJSONObject(i).getString("id");;
                        if(!id.equals(ColorApp.getSocket().id()))
                        {
                            gamePlayer.id = ((JSONArray) args[0]).getJSONObject(i).getString("id");
                            gamePlayer.name = ((JSONArray) args[0]).getJSONObject(i).getString("name");
                            gamePlayer.fire = ((JSONArray) args[0]).getJSONObject(i).getInt("fire");
                            gamePlayer.color = ((JSONArray) args[0]).getJSONObject(i).getString("color");
                            gamePlayer.shild = ((JSONArray) args[0]).getJSONObject(i).getInt("shild");
                            gamePlayer.life = ((JSONArray) args[0]).getJSONObject(i).getInt("life");
                            gamePlayer.position = ((JSONArray) args[0]).getJSONObject(i).getInt("position");
                            players.add(gamePlayer);
                        }
                        else
                        {

                            gameScreen.id = ((JSONArray) args[0]).getJSONObject(i).getString("id");
                            gameScreen.masterId = ((JSONArray) args[0]).getJSONObject(i).getString("masterId");
                            gameScreen.name = ((JSONArray) args[0]).getJSONObject(i).getString("name");
                            gameScreen.color = ((JSONArray) args[0]).getJSONObject(i).getString("color");
                            gameScreen.fire = ((JSONArray) args[0]).getJSONObject(i).getInt("fire");
                            gameScreen.shild = ((JSONArray) args[0]).getJSONObject(i).getInt("shild");
                            gameScreen.life = ((JSONArray) args[0]).getJSONObject(i).getInt("life");
                            gameScreen.position = ((JSONArray) args[0]).getJSONObject(i).getInt("position");
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }


                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Intent intent = new Intent(MainActivity.this,GameActivity.class);
                        intent.putExtra("game",gameScreen);
                        intent.putExtra("gameList",players);
                      startActivity(intent);
                    }
                });

            }
        });


        generateQrCode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startGenarateCodeActivity();
            }
        });

        scanQrCode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startQrCode();
            }
        });
        startGame.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ColorApp.getSocket().emit("startGame",ColorApp.getSocket().id().toString());
            }
        });

    }

    private void startGenarateCodeActivity() {
        Intent intent = new Intent(this,QrActivity.class);
        intent.putExtra("socketId",ColorApp.getSocket().id().toString());
        startActivity(intent);
    }

    private void startQrCode() {
        Intent intent = new Intent(this,ScanActivity.class);
        startActivityForResult(intent,0);
    }

    private void init() {
        startGame = findViewById(R.id.startGame);
        scanQrCode = findViewById(R.id.scanQrCode);
        generateQrCode = findViewById(R.id.generateQrCode);
        name = findViewById(R.id.name);
        local = findViewById(R.id.local);
        server = findViewById(R.id.server);
        textToSpeech = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    textToSpeech.setLanguage(Locale.UK);
//                    textToSpeech.setSpeechRate(0.99f);
                }
            }
        });
    }




    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
                if (resultCode == Activity.RESULT_OK) {
                    // TODO Extract the data returned from the child Activity.
                    String socketId = data.getStringExtra("socketId");
                    connectToMaster(socketId);

                }



    }

    private void connectToMaster(String socketId) {
        Log.i("lioreliyahu",socketId);
        playerName = name.getText().toString();
        ColorApp.getSocket().emit("connectToMaster",socketId,ColorApp.getSocket().id().toString(),playerName);
    }
}
