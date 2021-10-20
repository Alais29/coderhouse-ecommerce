import Config from 'config';
import Server from 'services/server';

const PORT = Config.PORT || 8080;

Server.listen(PORT, () => {
  console.log(`Servidor inicializado en http://localhost:${PORT}`);
});
Server.on('error', error => console.log(`Error en el servidor: ${error}`));
