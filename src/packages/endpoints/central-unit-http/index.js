const http = require('http');

class HttpServer {

  constructor(director) {
    this.director = director;
    this.hostname = '127.0.0.1';
    this.port = 3000;  
  }

  init() {
    const server = http.createServer(async (request, response) => {

      const phrase = {
        provider: this.getProviderName(request.url),
        action: this.getAction(request.method),
        parameters: null,
      };

      if (this.isABodyMethod(request.method)) {
        phrase.parameters = await this.getBodyParameters(request);
      } else {
        phrase.parameters = this.getUrlParameters(request.url)
      }

      try {
        this.director.conduct(phrase);
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/plain')
        response.end()
      } catch (e) {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/plain')
        response.end(e)
      }
    })

    server.listen(this.port, this.hostname, () => {
      console.log(`Server running at http://${this.hostname}:${this.port}`)
    })
  }

  getUrlParameters(url) {
    const raw = url.split('?')[1];
    return raw.split('&');
  }

  isABodyMethod(method) {
    return method == 'POST' || method == 'PUT' || method == 'PATCH'
  }

  getProviderName(url) {
    return url.split('/')[1]
  }

  getAction(method) {
    const actions = {
      'POST': 'create'
    };

    return actions[method];
  }

  async getBodyParameters(request) {
    return new Promise((resolve) => {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject('Not a JSON');
        }
      });
    });
  }
}

module.exports = (director) => {
  const server = new HttpServer(director);
  server.init();
}
