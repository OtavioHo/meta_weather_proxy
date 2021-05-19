import express from 'express';
import cors from 'cors';
import axios from 'axios'; 

const weatherApi = axios.create({baseURL: 'https://www.metaweather.com'});

const app = express();
app.use(cors());

app.get('/api/location/:woeid', async (req, res) => {
  try {
    const response = await weatherApi.get(`/api/location/${req.params.woeid}`);
    res.send(response.data);
  } catch (error){
    console.log(error)
    res.send(error)
  }
})

app.get('/static/img/weather/png/:icon', async (req, res) => {
  try {
    const response = await weatherApi.get(`/static/img/weather/png/${req.params.icon}`, {
      responseType: 'arraybuffer'
    })

    var data = Buffer.from(response.data, 'binary').toString('base64');
    const img = Buffer.from(data, 'base64')

   res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': img.length
   });
   res.end(img);
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.listen(3333);