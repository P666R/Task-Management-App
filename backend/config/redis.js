import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

client.on('connect', () => {
  console.log('Redis Client Connected');
});

client.connect();

export default client;
