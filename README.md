This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Step 1: Inicie o servidor

Primeiro inicie o servidor de acordo com as especificações.

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Instalar Aplicação

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

Você também deve:

- Criar um arquivo .env no root do projeto de acordo com o arquivo .env.example
- Criar/Atualizar o arquivo strings.xml em android/app/src/main/res/values/strings.xml para que ele tenha a linha:
  <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">SUA_CHAVE_DA_API_DE_GEOLOCALIZAÇÃO_DO GOOGLE</string>

## Step 3: Start your Application

Inicie a aplicação.

### For Android

```bash
# using npm
npx react-native run-android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
