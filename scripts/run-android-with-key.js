const { exec } = require('child_process');
const prompt = require('prompt');

// Verifique se MAPS_API_KEY já está definida
if (process.env.MAPS_API_KEY) {
  console.log('MAPS_API_KEY já está definida:', process.env.MAPS_API_KEY);
  
  // Executa o comando npx react-native run-android
  exec('npx react-native run-android', { stdio: 'inherit' }, (error) => {
    if (error) {
      console.error(`Erro na execução: ${error}`);
    }
  });
} else {
  // Se MAPS_API_KEY não estiver definida, peça a chave
  prompt.start();

  const schema = {
    properties: {
      MAPS_API_KEY: {
        description: 'Enter your Google Maps API Key',
        required: true
      }
    }
  };

  prompt.get(schema, (err, result) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    // Executa os comandos juntos para manter o feedback
    const command = `set MAPS_API_KEY=${result.MAPS_API_KEY} && npx react-native run-android`;

    exec(command, { stdio: 'inherit' }, (error) => {
      if (error) {
        console.error(`Erro na execução: ${error}`);
      }
    });
  });
}
