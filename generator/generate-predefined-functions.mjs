import fs from 'fs'

fs.readFile('../overrides.d.scar', { encoding: 'utf-8' }, (_, overridesDScarContent) => {
    const pattern = /^function\W+(?<functionName>.*?)\W*\((?<functionParameters>.*?)\)/gm

    const declaredFunctionNames = []
    let matches 
    while ((matches = pattern.exec(overridesDScarContent)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (matches.index === pattern.lastIndex) {
            pattern.lastIndex++
        }
        
        declaredFunctionNames.push(matches.groups.functionName)
    }

    fs.writeFileSync('./.overrides.d.scar.functions.json', JSON.stringify(declaredFunctionNames));
});
