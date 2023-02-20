window.keywords = ['nil', 'boolean', 'number', 'string', 'function', 'userdata', 'thread', 'table', 'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while']
window.builtInTypes = ['any']
window.predefinedTypes = {
    'Position': 
`---@class Position
---@field x number
---@field y number
---@field z number
`
}
window.types = new Set()
window.generics = new Set()
window.normalizetype = (/**@type {string} */type) => {
    type = type.trim().replace(/[*&]$/, '') // trim * or & suffix (pointer-like)
    let normalized = type.toLowerCase()
    let result
    let isComplex = false
    const standardAliases = {
        ['Player']: ['Player', 'PlayerId'],
        ['Entity']: ['Entity', 'EntityID'],
        ['Squad']: ['Squad', 'SquadID'],
        ['Ability']: ['Ability', 'AbilityID'],
        ['Upgrade']: ['Upgrade', 'UpgradeID'],
        ['number']: ['number', 'real', 'integer'],
        ['function']: ['luaFUnction', 'function', 'StackVarFunction'],
        ['any']: ['StackVar'],
        ['Position']: ['Position', 'ScarPos', 'ScarPosition'],
    }
    const aliased = Object.entries(standardAliases).find(([, variants]) => variants.some(v => v.toLowerCase() == normalized))
    const genericMatch = /(?<genericType>.*?)<(?<typeVar>.*?)>/
    if (genericMatch.test(type)) {
        const match = genericMatch.exec(type)
        const genericType = window.normalizetype(match.groups.genericType)
        const typeVar = window.normalizetype(match.groups.typeVar)
        isComplex = true
        result = `${genericType}<${typeVar}>`
    }else if (Array.isArray(aliased)) {
        result = aliased[0]
    } else if (type.includes('/')) {
        const subTypes = type.split('/').filter(t => t.trim().length > 0).map(t => window.normalizetype(t))
        result = subTypes.join(' | ')
        isComplex = true
    }
    else if (window.keywords.some(t => t == type.toLowerCase())) {
        result = type.toLowerCase()
    } else if (normalized == 'string list') {
        result = 'string[]'
        isComplex = true
    }else if (normalized === '1') {
        return 'unknown_1'
    } else {
        result = type
    }
    if (!isComplex && !window.keywords.includes(result) && !window.builtInTypes.includes(result) && !(result in window.predefinedTypes)) {
        window.types.add(result)
    }

    return result
}

window.functions = [...document.querySelectorAll('span.function')]
    .map(f => ({ 
        name: f.childNodes[01].textContent.trim().replace(/[\(\)]/g, '').trim(), 
        description: [...f.parentElement.parentElement.parentElement.querySelectorAll('p')].map(p => p.textContent.trim()).join('\n'), 
        parameters: [...f.childNodes]
            .slice(2).map((e, i, a) => i % 2 == 0 ? [e, a[i + 1]] : undefined)
            .filter(e => e !== undefined)
            .map(([type, name]) => {
                type = window.normalizetype(type.textContent)
                return {
                    type: type, 
                    // There's just one comma and one parameter with the ' )' remainder
                    name: name.textContent.replace(/,\s$/, '').replace(/\s\)\s+$/, '').trim().replace(/[^a-zA-Z0-9_]/g, '_'),
                    rawName: name.textContent,
                }
            })
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

console.log(`${[...window.generics].map(g => `---@generic ${g}`).join('\n')}\n\n${Object.values(window.predefinedTypes).join('\n\n')}\n\n${[...window.types].map(t => `---@class ${t}\n${t} = {}`).join('\n')}\n\n${window.function_docs.join('\n\n')}`)