package studio.jlj.com.gameyesno;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class GameActivity extends AppCompatActivity {
    private ViewPager mViewPager;
    private YesNoViewPagerAdapter mYesNoViewPagerAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        init();
    }

    private void init() {
        mViewPager = findViewById(R.id.viewPager);
        mYesNoViewPagerAdapter = new YesNoViewPagerAdapter(this);
        mViewPager.setAdapter(mYesNoViewPagerAdapter);
        mViewPager.setCurrentItem(1);
    }
}
