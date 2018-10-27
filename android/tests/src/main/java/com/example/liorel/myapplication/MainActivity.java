package com.example.liorel.myapplication;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    ViewPager mViewPager;
    List<GameFragment> mGameFragmentsList = new ArrayList<>();
    GameViewPager mGameViewPager;
    LinearLayout mBackground;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        init();

    }

    private void init() {
        mViewPager =    findViewById(R.id.viewPager);
        mBackground = findViewById(R.id.background);


        mGameFragmentsList.add(GameFragment.newInstance(0));
        mGameFragmentsList.add(GameFragment.newInstance(1));
        mGameFragmentsList.add(GameFragment.newInstance(2));

        mGameViewPager = new GameViewPager(getSupportFragmentManager(),this,mGameFragmentsList);
        mViewPager.setAdapter(mGameViewPager);
        mViewPager.setCurrentItem(1);
        mViewPager.addOnPageChangeListener(changeListener);


    }

    ViewPager.OnPageChangeListener changeListener = new ViewPager.OnPageChangeListener() {
        @Override
        public void onPageScrolled(int i, float v, int i1) {
            Log.i("onPageScrolled",i + " " +v + " " + i1);
        }

        @Override
        public void onPageSelected(int i) {
            Log.i("onPageSelected" , i+"");
        }

        @Override
        public void onPageScrollStateChanged(int i) {
            Log.i("onPageScrollStateChanged" , i+"");
        }
    };
}
