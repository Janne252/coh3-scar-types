# Workflow
! NOTE: `./data/scardocs` is currently based on Age of Empires IV.

### Functions
1. Update [`functions.js`](./functions.js) `window.predefinedFunctions` variable:
    1. run `node generate-predefined-functions.mjs`
    1. Assign [`functions.js`](./functions.js) `window.predefinedFunctions` to the text content of [`..overrides.d.scar.functions.json`](./.overrides.d.scar.functions.json) (JSON array)
1. Open [`data/scardocs/html/function_list.htm`](./data/scardocs/html/function_list.htm) in a web browser, e.g. Google Chrome
1. Open browser developer tools console
1. Paste in contents of [`./functions.js`](./functions.js)
1. Press Enter & Copy the text outputted to the console
    - There should be a `Copy` button below the output
1. Save the copied contents as [`functions.d.scar`](../functions.d.scar)

### Enums
1. Update [`./enums.js`](./enums.js) `window.dumpedConstants` variable:
    1. Launch CoH3 in `-dev` mode and load into a 2v2 Skirmish in standard Victory Point Control mode
    1. Pause the game after a few seconds
    1. Open the in-game console and run `Scar_DoString([[loadfile('D:\\dev\\coh3\\mods\\ccm\\assets\\scar\\types\\generator\\dump-globals.lua')()]])`
    1. Assign [`./enums.js`](./enums.js) `window.dumpedConstants` to the text content of `\Documents\My Games\Company of Heroes 3\_G.json` (JSON array)
1. Open [`data/scardocs/html/enum_list.htm`](./data/scardocs/html/enum_list.htm) in a web browser, e.g. Google Chrome
1. Open browser developer tools console
1. Paste in contents of [`./enums.js`](./enums.js)
1. Press Enter & Copy the text outputted to the console
    - There should be a `Copy` button below the output
1. Save the copied contents as [`enums.d.scar`](../enums.d.scar)
