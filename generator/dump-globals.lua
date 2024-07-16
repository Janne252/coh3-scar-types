local declarations = {}
for key, value in pairs(_G) do
    local nativeType = type(value)
    local scarType = scartype(value)
    local declarationType = nativeType
    local declarationDocumentation = ''
    if scarType == ST_STRING or scarType == ST_NUMBER or scarType == ST_INTEGER or scarType == ST_BOOLEAN or scarType == ST_ENUM then
        local declarationValue
        if scarType == ST_STRING then
            declarationValue = '\\"' .. value .. '\\"'
        elseif scarType == ST_ENUM then
            declarationValue = '{}'
            declarationType = 'userdata'
            declarationDocumentation = string.format('%s', tostring(value))
        elseif scarType == ST_NUMBER or scarType == ST_INTEGER or scarType == ST_BOOLEAN then
            if value == math.huge or value == -math.huge then
                declarationValue = 'math.huge'
            else
                declarationValue = tostring(value)
            end
        else
            error(string.format('Unsupported value type %s (%s)', scartype_tostring(value), nativeType))
        end
        table.insert(declarations, {
            name = key,
            content = string.format('{"name": "%s", "type": "%s", "value": "%s", "documentation": "%s"}', key, declarationType, declarationValue, declarationDocumentation),
        })
    end
end
table.sort(declarations, function(a, b) return a.name:upper() < b.name:upper() end)
local outputFilename = [[userdata:.dumped-globals.json]]
Misc_WriteFile(outputFilename, '[\n')
local lastIndex = #declarations
for index, declaration in ipairs(declarations) do
    Misc_AppendToFile(outputFilename, declaration.content .. (index == lastIndex and '\n' or ',\n'))
end
Misc_AppendToFile(outputFilename, ']')


-- loadfile([[J:\dev\coh3\mods\game_modes_plus\assets\scar\types\generator\dump-globals.lua]])()