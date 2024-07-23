# lips-repl-server

LIPS scheme repl server

## Usage

- Start the repl server:

```
node repl_server.js
```

- Open the `example.html` in the browser, you should see "Connected to the server" in the console
- In emacs, connect to the repl server with geiser using `geiser-connect`, then `localhost` and `1337`. If you're using SSH tunneling change these values
- Eval and expression using `C-x C-e`, it should work. Try something javascript specific like `document` or `(document.createElement "span")`. 
