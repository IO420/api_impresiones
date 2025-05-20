const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/student');
const impressionsRoutes = require('./routes/impressions');
const loginRoutes = require('./routes/login');
const receiptRoutes = require('./routes/receipt');
const tokenRoutes = require('./routes/token')
const envConfig = require('./envConfigurations/EnvConfigurations');

const PORT = envConfig.port;

app.use(cors());
app.use(express.json());

app.use('/student', studentRoutes);
app.use('/impressions', impressionsRoutes);
app.use('/login', loginRoutes);
app.use('/receipt', receiptRoutes);
app.use('/validate-token', tokenRoutes);

app.listen(PORT, () => {
    console.log(`Servidor al escucha en el puerto ${PORT}`);
});
