const https = require('https');
const express = require('express');
const app = express();
const port = 3000;

app.get('/pokemon', (req, res) => {

  https.get('https://pokeapi.co/api/v2/pokemon/1', (pokeApiResponse) => {
    let data = '';

  
    pokeApiResponse.on('data', (chunk) => {
      data += chunk;
    });


    pokeApiResponse.on('end', () => {
      try {
        const pokemonData = JSON.parse(data);

        const abilitiesSum = pokemonData.abilities.length;

    
        const responseObject = {
          'abilities': abilitiesSum,
          'name': pokemonData.name,
          'back_default': pokemonData.sprites.back_default,
        };

        res.json(responseObject);
      } catch (error) {
     
        console.error('Erro ao processar os dados da API:', error);
        res.status(500).send('Erro interno do servidor');
      }
    });
  }).on('error', (error) => {
 
    console.error('Erro ao conectar à API:', error);
    res.status(500).send('Erro interno do servidor');
  });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo em http://localhost:${port}`);
});