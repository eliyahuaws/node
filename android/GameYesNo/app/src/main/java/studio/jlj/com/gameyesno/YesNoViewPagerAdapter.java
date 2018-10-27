package studio.jlj.com.gameyesno;

import android.content.Context;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * Created by lior on 10/20/18.
 */

public class YesNoViewPagerAdapter extends PagerAdapter {
    Context mContext;
    public YesNoViewPagerAdapter(Context context)
    {
        mContext = context;
    }

    @Override
    public int getCount() {
        return 3;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == object;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
      LayoutInflater mLayoutInflater  = LayoutInflater.from(mContext);
        View itemView = mLayoutInflater.inflate(R.layout.yes_no_layout, container, false);
        TextView tx = itemView.findViewById(R.id.yesNoText);
        tx.setVisibility(View.VISIBLE);
        Logger.Log(0,"viewpger",position+" shwo");
        if(position==0)
        {
            tx.setText("NO");
            Logger.Log(0,"viewpger",position+" shwo1");
        }
        if(position==1)
        {

            tx.setVisibility(View.GONE);
            Logger.Log(0,"viewpger",position+" shwo2");
        }
        if(position==2)
        {
            tx.setText("Yes"); Logger.Log(0,"viewpger",position+" shwo3");
        }
        container.addView(itemView);
        return itemView;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((LinearLayout)object);
    }
}
