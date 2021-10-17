# SpectreAssistant

## Add to your code
```js
const SpectreAssistant = require("spectreassistant");

// Creating an instance of Spectre Assistant
client.Spectre = new SpectreAssistant({ host: 'localhost', password: '' }); 
// ...
// Validating your action
message.channel.send("Hey!").then(m => client.Spectre.validate(m, "messageCreate"));

// Or
// Creating an instance of Spectre Assistant
const Spectre = new SpectreAssistant({ host: 'localhost', password: '' });
// ...
// Validating your action
message.channel.send("Hey!").then(m => Spectre.validate(m, "messageCreate"));
```

### [Spectre on Github](https://github.com/LordAlex2015/Spectre)
