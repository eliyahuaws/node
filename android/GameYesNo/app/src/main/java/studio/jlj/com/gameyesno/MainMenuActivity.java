package studio.jlj.com.gameyesno;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainMenuActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);
        View v = findViewById(R.id.deleteUser);
        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                deleteUser();
            }
        });

        View v1 = findViewById(R.id.startGame);
        v1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startGame();
            }
        });

    }

    private void startGame() {
        startActivity(new Intent(this,GameActivity.class));
    }

    private void deleteUser() {
        EntityUser.saveUser(null);

    }
}
