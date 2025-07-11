const http = require('http');
const INFO = require("./info");
const { error } = require('console');

const PORT = 3000;

const server = http.createServer((req, res) => {
    
    const info = INFO();
    try 
    {
      if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`<h1>Sup, it's my first server!</h1>`);
      }
      else if(req.url === "/about")
      {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`<h1>Name: ${info.name}, age: ${info.age}</h1>`);
      }
      else if(req.url === "/skills")
      {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const skills = info.skills.map(s=>`<li>${s}</li>`).join('');
        res.write(`<h1>My skills:<ul>${skills}</ul></h1>`);
      }
      else if (req.url === "/error") {
        throw new Error("This is an Error Page");
      }
      else
      {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.statusCode = 404;
        res.write(`<h1>404 Not Found</h1>`);
      }
    } 
    catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(`<h1>Server Error: ${error.message}</h1>`);
    }
    
    res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`)
})
