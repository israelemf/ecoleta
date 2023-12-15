import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Index => Listagem
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);

// Show => Listar único registro
routes.get('/points/:id', pointsController.show)

// Create => Criar registro
routes.post('/points', pointsController.create)






// Update => Atualizar registro
// Delete => Excluir registro

export default routes;

