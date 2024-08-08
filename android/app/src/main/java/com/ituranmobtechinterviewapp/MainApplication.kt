package com.iturammobinterviewapp;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;
import androidx.annotation.NonNull;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // Carregar a chave da API do Google Maps do arquivo .env
    String mapsApiKey = BuildConfig.MAPS_API_KEY;

    // Substituir o placeholder no strings.xml com a chave da API
    replaceApiKeyInStringsXml(mapsApiKey);
  }

  private void replaceApiKeyInStringsXml(@NonNull String apiKey) {
    Resources res = getResources();
    int resId = res.getIdentifier("google_maps_key", "string", getPackageName());
    if (resId != 0) {
      res.getString(resId);
    }
  }
}
