package online.misterwhite.game;

import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    /**
     * Keeps the game clear of the status and navigation bars.
     *
     * Android 15 draws every app edge to edge whether it asks to or not, and
     * a WebView is told nothing about it: env(safe-area-inset-top) covers a
     * display cutout but not the clock sitting on top of it. Without this the
     * first line of every screen ran underneath the status bar.
     *
     * The listener goes on the activity's content root rather than on the
     * WebView: the view the bridge builds sits inside Capacitor's own layout,
     * and a parent there swallows the insets before the WebView ever sees
     * them. What shows behind the bars is the window background, which the
     * theme paints in the app's own black.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        View root = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(
            root,
            (view, windowInsets) -> {
                Insets bars = windowInsets.getInsets(
                    WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
                );
                view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                return WindowInsetsCompat.CONSUMED;
            }
        );
    }
}
