package studio.jlj.com.gameyesno;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    private String TAG = "MainActivity.class";
    Socket mSocket;
    APIInterface apiInterface;
    TextView mTextView,mTextViewGet,mTextViewTimer;
    long time ;
    EntityUser entityUser ;//= EntityUser.loadUser();
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//
//        init();
//
//        loadUser();

        entityUser = EntityUser.loadUser();
        entityUser.deviceId = "e17f844413cbeba947598f438dac57ffcff055b0";
        entityUser.agreementId = "1e860b2032029f4d05d5b434488338cba7a4bfc8";
        EntityUser.saveUser(entityUser);
        mTextView = findViewById(R.id.text);
        mTextViewGet =findViewById(R.id.textget);
        mTextViewTimer =findViewById(R.id.timer);
        mSocket = ((GameApp)getApplication()).getmSocket();

        mSocket.connect();

        if (mSocket.connected()){
            Toast.makeText(MainActivity.this, "Connected!!",Toast.LENGTH_SHORT).show();
        }
        else
        {
            Toast.makeText(MainActivity.this, "NOT Connected!!",Toast.LENGTH_SHORT).show();
        }

//        Socket socket = new Socket("http://10.0.2.2",3000);

        mSocket.on("clock-event", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                final String s = (String)args[0];
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                     //   mTextView.setText(s);
                    }
                });

//                Log.i("asdasdasdasd","a "+s);

//                Toast.makeText(MainActivity.this, "asd",Toast.LENGTH_SHORT).show();
            //    JSONObject data = (JSONObject)args[0];
//here the data is in JSON Format
                //Toast.makeText(MainActivity.this, data.toString(), Toast.LENGTH_SHORT).show();
            }
        });



        mSocket.on("set-"+entityUser.agreementId, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                time = System.currentTimeMillis();
                final String s = (String)args[0];
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mTextView.setText(s);
                    }
                });
            }
        });

        mSocket.on("get-"+entityUser.agreementId, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                final String s = (String)args[0];
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mTextViewGet.setText(s);
                        mTextViewTimer.setText((System.currentTimeMillis() - time)+"");
                    }
                });
            }
        });

        mSocket.on("error-"+entityUser.agreementId, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                final int s = (int)args[0];
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mTextViewGet.setText(s+"");
//                        mTextViewTimer.setText((System.currentTimeMillis() - time)+"");
                    }
                });
            }
        });



        View v = findViewById(R.id.createUser);
        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EntityQuestion question = new EntityQuestion();
                question.agreementId = entityUser.agreementId;
                question.deviceId = entityUser.deviceId;
                mSocket.emit("set",entityUser.agreementId,entityUser.deviceId);

//                createUser();
            }
        });


        View v1 = findViewById(R.id.loadUser);
        v1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mSocket.emit("get",entityUser.agreementId);

//                createUser();
            }
        });



////
    }


    private void init()
    {
        apiInterface = APIClient.getClient().create(APIInterface.class);
    }




    private void loadUser()
    {
        EntityUser entityUser = EntityUser.loadUser();
        if(entityUser !=null)
        {
            GameApp.setEntityUser(entityUser);
            Logger.Log(0,TAG,"EXIST "+ entityUser.toString());
            getAgreement();

        }
        else
        {

            Logger.Log(0,TAG,"NOT EXIST ");
            startActivity(new Intent(this,CreateUserActivity.class));
            finish();
        }

    }

    private void getAgreement() {
        apiInterface.getAgreemrntIdByDeviceId(GameApp.getEntityUser()).enqueue(new Callback<EntityUser>() {
            @Override
            public void onResponse(Call<EntityUser> call, Response<EntityUser> response) {
                if(response !=null && response.code()==200 && response.body().status.equals("ok")) {
                    startActivity(new Intent(MainActivity.this, MainMenuActivity.class));
                }
                else
                {

                    try {
                        EntityErrorResponse errorResponse = EntityErrorResponse.convertError(response.errorBody().string().toString());
                       if(errorResponse.messageCode==999)
                       {
                           EntityChangeDevice entityChangeDevice = new EntityChangeDevice(GameApp.getEntityUser().deviceId,0); //TODO encrypt by time
                           apiInterface.changeDevice(entityChangeDevice).enqueue(new Callback<EntityChangeDevice>() {
                               @Override
                               public void onResponse(Call<EntityChangeDevice> call, Response<EntityChangeDevice> response) {
                                   if(response !=null && response.code()==200  &&response.body().status.equals("ok"))
                                   {
                                       GameApp.getEntityUser().deviceId = response.body().deviceId;
                                       EntityUser.saveUser(GameApp.getEntityUser());
                                       startActivity(new Intent(MainActivity.this,MainMenuActivity.class));
                                       finish();
                                   }
                                   else
                                   {
                                       EntityErrorResponse entityErrorResponse= null;
                                       try {
                                           entityErrorResponse = EntityErrorResponse.convertError(response.errorBody().string().toString());
                                           Logger.Log(1,TAG,"ALERT " + entityErrorResponse.message);
                                       } catch (IOException e) {
                                           e.printStackTrace();
                                       }

                                   }
                               }

                               @Override
                               public void onFailure(Call<EntityChangeDevice> call, Throwable t) {

                               }
                           });
                       }
                       else if(errorResponse.messageCode==300) {
                            EntityUser.saveUser(null);
                            loadUser();

                       }
                       else
                       {
                           EntityErrorResponse entityErrorResponse= EntityErrorResponse.convertError(response.errorBody().string().toString());
                           Logger.Log(1,TAG,"ALERT " + entityErrorResponse.message);
                       }


                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<EntityUser> call, Throwable t) {
                Logger.Log(2,TAG,t.toString());
            }
        });


    }

}
