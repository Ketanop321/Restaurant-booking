//app.js me express application hoga jisme server ka logic hoga 
//or usme routes define honge
//or usme middleware configuration v hoga ,app.js me server ka logic setup hoga
//this code starts the experss server......
import app from './app.js'

const PORT = process.env.PORT||5000;

app.listen(PORT, () => {
  console.log( `SERVER HAS STARTED AT PORT ${PORT}`)
})