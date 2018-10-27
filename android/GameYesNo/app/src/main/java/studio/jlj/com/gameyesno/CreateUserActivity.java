package studio.jlj.com.gameyesno;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CreateUserActivity extends AppCompatActivity {
    private String TAG = getClass().getSimpleName();;
    APIInterface apiInterface;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
        setContentView(R.layout.activity_create_user);

                View v = findViewById(R.id.createUser);
        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createUser();
            }
        });

    }

    private void init()
    {
        apiInterface = APIClient.getClient().create(APIInterface.class);
    }

    private void createUser()
    {
        EntityUser entityUser = new EntityUser();
        entityUser.nickName = ((EditText)findViewById(R.id.nickName)).getText().toString();
        entityUser.languageId = "2";
        entityUser.questionStage = "1";
        apiInterface.createUser(entityUser).enqueue(new Callback<EntityUser>() {
            @Override
            public void onResponse(Call<EntityUser> call, Response<EntityUser> response) {
                Logger.Log(0,TAG,call.toString());
                EntityUser.saveUser(response.body());
                startActivity(new Intent(CreateUserActivity.this,MainMenuActivity.class));
                finish();
            }

            @Override
            public void onFailure(Call<EntityUser> call, Throwable t) {
                Logger.Log(1,TAG,t.toString());
            }
        });
    }

}
