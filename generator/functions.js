window.normalizetype = (/**@type {string} */type) => {
    type = type.trim()
    const baseTypes = ['nil', 'boolean', 'number', 'string', 'function', 'userdata', 'thread', 'table']
    if (baseTypes.some(t => t == type.toLowerCase())) {
        return type.toLowerCase()
    }
    if (['number', 'real', 'integer'].includes(type.toLowerCase())) {
        return 'number'
    }
    if (['luafunction', 'function'].includes(type.toLowerCase())) {
        return 'function'
    }
    return type
}

window.functions = [...document.querySelectorAll('span.function')]
    .map(f => ({ 
        name: f.childNodes[01].textContent.trim().replace(/[\(\)]/g, '').trim(), 
        description: [...f.parentElement.parentElement.parentElement.querySelectorAll('p')].map(p => p.textContent.trim()).join('\n'), 
        parameters: [...f.childNodes]
            .slice(2).map((e, i, a) => i % 2 == 0 ? [e, a[i + 1]] : undefined)
            .filter(e => e !== undefined)
            .map(([type, name]) => ({
                type: window.normalizetype(type.textContent), 
                // There's just one comma and one parameter with the ' )' remainder
                name: name.textContent.replace(/,\s$/, '').replace(/\s\)\s+$/, '').trim().replace(/[^a-zA-Z0-9_]/g, '_'),
                rawName: name.textContent,
            }))
            .map((param) => {
                let name = param.name
                let type = param.type
                // vararg
                if (['argument-list', 'argument list'].includes(name)) {
                    name = '...'
                }
                // Reserved keywords https://www.lua.org/manual/5.4/manual.html#2
                if (['and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while',].includes(name)) {
                    name = `_${name}`
                }
                return {...param, type, name}
            })
        }))
    .filter(f => f.name !== '0')

window.renderFunction = (f) => {
    const description = f.description.split('\n').map(r => `--- ${r}`).join('\n')
    const parameters = f.parameters.map(p => `--- @param ${p.name} ${p.type}`).join('\n')
    return `${description}${description ? '\n' : ''}${parameters}${parameters ? '\n' : ''}--- @return unknown\nfunction ${f.name}(${f.parameters.map(p => `${p.name}`).join(', ')}) end`
}
window.function_docs = window.functions.map(window.renderFunction)

console.log(window.function_docs.join('\n\n'))