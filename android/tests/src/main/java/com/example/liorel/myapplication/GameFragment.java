package com.example.liorel.myapplication;


import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


/**
 * A simple {@link Fragment} subclass.
 * Use the {@link GameFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class GameFragment extends Fragment {

    View mBackgroundView;
    int mPosition;
    public GameFragment() {
        // Required empty public constructor
    }


    public static GameFragment newInstance(int position) {
        GameFragment fragment = new GameFragment();
        fragment.mPosition = position;
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_game, container, false);
        mBackgroundView = view.findViewById(R.id.background);

        switch (mPosition)
        {
            case 0:mBackgroundView.setBackgroundColor(Color.RED);break;
            case 1:mBackgroundView.setBackgroundColor(Color.BLACK);break;
            case 2:mBackgroundView.setBackgroundColor(Color.GREEN);break;
        }

        return view;
    }

}
