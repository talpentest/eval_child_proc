const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;

app.get('/:command', (req, res) => {
    const userInput = req.params.command;

    try {
        // Be extremely careful with eval!
        eval(`exec('${userInput}', (err, stdout, stderr) => {
            if (err) {
                res.send(\`Error: \${stderr}\`);
                return;
            }
            res.send(\`Output: \${stdout}\`);
        })`);
    } catch (error) {
        res.send(`Error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
