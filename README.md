VehicleLookupApp é um aplicativo criado por mim, Luan Fabbri. Tem como objetivo servir como portfólio e exemplificar as seguintes capacidades:

- Capacidades de Login
- Formulários, bibliotecas como Yup e Formik, gerenciamento de sessões (login e logout).
- Componentização de um aplicativo.
- React-Navigation.
- Consumo de APIs (Axios).
- Criação e consumo de Backend.
- Estado global (Redux).
- Internacionalização: uso de i18n.
- Uso da API de geolocalização do Google e implementação de GoogleMaps.
- Layout com Flexbox.
- Estrutura de pastas.
- Git (controle de versão, branches, etc).
- Fontes (instalação e administração).
- Modo claro/escuro.
- AsyncStorage
- Jest
- Splash Screen

Obrigado por dedicar seu tempo para conhecer mais sobre este projeto. Se estiver interessado em discutir uma possível colaboração/contratação, sinta-se à vontade para entrar em contato comigo pelo meu [**LinkedIn**](https://www.linkedin.com/in/lpffabbri/).

O App se encontra na sua versão v1.2, e novas features de demonstração virão em breve.

Siga os passos a seguir pararealizar o build do App. Ele foi construído utilizando node v20.12.0. Tenha certeza de configurar seu ambiente, instalando Android Studio, etc.

_Importante! Esse app está configurado apenas para emular Android!_

## Step 1: Inicie o servidor

Primeiro inicie o servidor rodando o script:

```bash
# using npm
npm serve

# OR using Yarn
yarn serve
```

## Step 2: Instalar Aplicação

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

Você também deve:

- Criar um arquivo .env no root do projeto de acordo com o arquivo .env.example. Você precisará setar a chave de geolocalização da API do Google, e para isso existem instruções no .env.

## Step 3: Start your Application

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### For Android

```bash
# using npm
npx react-native run-android

# OR using Yarn
yarn android
```

Se tudo estiver configurado corretamente, você deve ver o aplicativo rodando em seu Emulador Android, desde que você tenha configurado seu emulador/simulador corretamente.
