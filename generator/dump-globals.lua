print('Beginning to dump _G contents...')
local declarations = {}
local functionNames --[[@type string[] ]] = {}
local symbols --[[@type string[] ]] = {}
for key, value in pairs(_G) do
    local nativeType = type(value)
    local scarType = scartype(value)
	local scarTypeName = scartype_tostring(value)
    local declarationType = nativeType
    local declarationDocumentation = ''
    if scarType == ST_STRING or scarType == ST_NUMBER or scarType == ST_INTEGER or scarType == ST_BOOLEAN or scarType == ST_ENUM or scarType == ST_CONSTVALTABLE then
        local declarationValue
		local declarationValueUnescaped
        if scarType == ST_STRING then
            declarationValue = '\\"' .. value .. '\\"'
            declarationValueUnescaped = '"' .. value .. '"'
        elseif scarType == ST_ENUM then
            declarationValue = '{}'
            declarationValueUnescaped = '{}'
            declarationType = 'userdata'
            declarationDocumentation = string.format('%s', tostring(value))
        elseif scarType == ST_NUMBER or scarType == ST_INTEGER or scarType == ST_BOOLEAN then
            if value == math.huge or value == -math.huge then
                declarationValue = 'math.huge'
                declarationValueUnescaped = 'math.huge'
            else
                declarationValue = tostring(value)
                declarationValueUnescaped = tostring(value)
            end
        else
            error(string.format('Unsupported value type %s (%s)', scartype_tostring(value), nativeType))
        end
        table.insert(declarations, {
            name = key,
            content = string.format('{"name": "%s", "type": "%s", "value": "%s", "documentation": "%s"}', key, declarationType, declarationValue, declarationDocumentation),
        })
		table.insert(symbols, string.format('%s = %s %s (%s)', key, declarationValueUnescaped, declarationDocumentation, scarTypeName))
	elseif scarType == ST_FUNCTION then
		table.insert(functionNames, key)
    end
	print(key, value)
end
print('Sorting results...')
table.sort(functionNames, function(a, b) return a:upper() < b:upper() end)
table.sort(symbols, function(a, b) return a:upper() < b:upper() end)
table.sort(declarations, function(a, b) return a.name:upper() < b.name:upper() end)
local declarationsOutputFile = [[userdata:_G.json]]
local functionNamesOutputFile = [[userdata:_G.txt]]
Misc_WriteFile(declarationsOutputFile, '[\n')
local lastIndex = #declarations
for index, declaration in ipairs(declarations) do
    Misc_AppendToFile(declarationsOutputFile, declaration.content .. (index == lastIndex and '\n' or ',\n'))
end
Misc_AppendToFile(declarationsOutputFile, ']')
Misc_WriteFile(functionNamesOutputFile, table.concat(functionNames, '\n'))
Misc_AppendToFile(functionNamesOutputFile, table.concat(symbols, '\n'))
print(declarationsOutputFile .. ' created!')
print(functionNamesOutputFile .. ' created!')

-- Execute in the debug console (not SCAR console!) in -dev mode
-- Scar_DoString([[loadfile('D:\\dev\\coh3\\mods\\ccm\\assets\\scar\\types\\generator\\dump-globals.lua')()]])
