package com.example.liorel.myapplication;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.security.AccessControlException;
import java.util.List;

public class GameViewPager extends FragmentPagerAdapter {

    private  Context mContext;
    private List<GameFragment> mFragmentList;



    public GameViewPager(FragmentManager fragmentManager, Context context, List<GameFragment> fragmentList)
    {
        super(fragmentManager);
        mContext = context;
        mFragmentList = fragmentList;
    }

    @Override
    public Fragment getItem(int i) {
        return mFragmentList.get(i);
    }

    @Override
    public int getCount() {
        return mFragmentList.size();
    }
}
