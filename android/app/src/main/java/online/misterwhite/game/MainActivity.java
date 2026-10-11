package online.misterwhite.game;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Locale;

public class MainActivity extends BridgeActivity {

    /** The last insets we were given, already written as the script that applies them. */
    private String applyInsets = "";

    /**
     * Tells the page how much room the system bars take.
     *
     * Android 15 draws every app edge to edge whether it asks to or not, and
     * a WebView learns nothing about it: env(safe-area-inset-top) covers a
     * display cutout but not the clock sitting on it, so the first line of
     * every screen ran underneath the status bar.
     *
     * The insets go in as CSS custom properties rather than as padding on the
     * view. Padding worked, but it left the strip behind each bar painted in
     * the window background, which is one fixed colour — black bands around a
     * light-themed game. This way the page itself covers the whole screen and
     * only its content is held clear, so the bars sit on whatever the chosen
     * theme is painting.
     *
     * They are re-applied on every page load. Insets arrive once, before the
     * first page is up, and a custom property set on a document dies with
     * that document — including when the app crosses from one language to
     * the other, which is a full page load.
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
                float density = getResources().getDisplayMetrics().density;
                applyInsets = String.format(
                    Locale.US,
                    "document.documentElement.style.setProperty('--sat','%.2fpx');" +
                    "document.documentElement.style.setProperty('--sar','%.2fpx');" +
                    "document.documentElement.style.setProperty('--sab','%.2fpx');" +
                    "document.documentElement.style.setProperty('--sal','%.2fpx');",
                    bars.top / density,
                    bars.right / density,
                    bars.bottom / density,
                    bars.left / density
                );
                sendInsets();
                return WindowInsetsCompat.CONSUMED;
            }
        );

        getBridge()
            .getWebView()
            .setWebViewClient(
                new BridgeWebViewClient(getBridge()) {
                    @Override
                    public void onPageFinished(WebView view, String url) {
                        super.onPageFinished(view, url);
                        sendInsets();
                    }
                }
            );
    }

    private void sendInsets() {
        if (applyInsets.isEmpty()) return;
        getBridge().getWebView().evaluateJavascript(applyInsets, null);
    }
}
