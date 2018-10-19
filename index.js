const { server } = require('./server.js');

///// ---------- CRUD ENDPOINTS ----------

// READ: Sanity Check 
server.get('/', (request, response) => {
  response.status(200).send('Great job!')
})


const port = process.env.PORT || 3400;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
