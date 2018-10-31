const rl = require('readline');
const rl_interface = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl_interface.question('primer número?', a => {
    rl_interface.question('segundo número?', b => {
        let c = parseInt(a) + parseInt(b);
        console.log(c);
        rl_interface.close();
    });
});