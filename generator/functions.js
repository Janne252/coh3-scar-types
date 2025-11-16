window.keywords = ['nil', 'boolean', 'number', 'string', 'function', 'userdata', 'thread', 'table', 'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'goto', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while']
window.builtInTypes = ['any']
window.manuallyDefinedTypes = ['ResourceType', 'OwnerType', 'ANY', 'ALL']
window.predefinedTypes = {
    'Position':
`---@class Position
---@field x number
---@field y number
---@field z number
`,
    'TeamID': `
---Numeric team ID. Usually 0 or 1. Some custom maps may have more teams.
---@alias TeamID 0 | 1`,
    'SectorID': `---@alias SectorID number`
}

window.deprecations = {['UI_IsReplay']: 'Removed in version 1.9.0. Use UI_IsLiveOrRecordedReplay instead.'}
// -> .overrides.d.scar.functions -> `node generate-predefined-functions.mjs`
window.predefinedFunctions = ["import","UI_CreateDataContext","UI_CreateCommand","Team_GetEnemyTeam","UI_GetColourAsString","fatal","Player_GetMaxPopulation","Loc_ToAnsi","BP_GetSquadUIInfo","BP_GetEntityUIInfo","BP_GetAbilityUIInfo","BP_GetUpgradeUIInfo","World_GetRaceBlueprint","BP_GetRaceInfo","Entity_ExtensionExist","Cmd_Stop","BP_GetTechTreeBlueprintsByType","BP_GetTechTreeBPInfo","BP_GetEntityBlueprintsWithType_Internal","BP_GetSquadBlueprintsWithType_Internal","UI_CreateReticule","UI_CreateReticuleOnEntity","UI_CreateReticuleOnPosition","UI_CreateReticuleOnSquad","UI_DestroyReticule","UI_CreateTargetTrackingTag","Entity_CreateENV","Entity_CreateENVFacing","Entity_Create","Entity_CreateFacing","Entity_ConvertBlueprint","Entity_GetPosition","World_GetNumEntities","World_GetEntity","Loc_FormatText","Squad_CreateAndSpawnToward","HintPoint_Add","Modify_PlayerResourceRate","Modify_AbilityRechargeTime","Rule_AddGlobalEvent","Rule_AddPlayerEvent","BP_GetName","BP_AbilityExists","BP_UpgradeExists","Squad_GetAttachedWeapons","Squad_OverrideItemDropChance","Squad_SetTeamWeaponDestroyOnAbandonChance","Player_GetMapEntryPosition","EGroup_GetEntityAt","SGroup_GetSquadAt","Options_GetOption","Player_GetPopCapOverride","Modify_EntityBuildTime","Squad_ExtensionID","Entity_ExtensionID","Squad_ExtensionEnabled","Player_GetAbilityBPCost","Camera_Pop","Camera_Push","Camera_Fov","Camera_PushKeepState","Camera_GetDefaultPitch","Camera_SetPitch","Camera_SetPitchRelative","Camera_GetDefaultYaw","Camera_SetYaw","Camera_SetYawRelative","Camera_GetDefaultDistance","Camera_SetDistance","Camera_GetEyePositionFromTarget","Camera_InverseEuler","World_GetNumSquads","World_GetSquad","World_GetOffsetPosition","World_GetOffsetPositionRelativeToFacingTarget","World_GetOffsetVectorPosition","World_GetPlayerAt","World_GetPlayerCount","World_GetPlayerIndex","UI_CreatePositionKickerMessage","UI_CreateEntityKickerMessage","EGroup_CreateKickerMessage","UI_CreateSquadKickerMessage","UI_CreateSGroupKickerMessage","SGroup_CreateKickerMessage","Cmd_InstantUpgrade","UI_GetAllowLoadAndSave","BP_GetUpgradeBlueprintsWithType_Internal","UI_SetSilhouetteEnabled","Game_GetScenarioFileName","Player_GetActiveUpgrades","UI_CreateMinimapBlip","MapIcon_ClearFacing","MapIcon_CreateArrow","MapIcon_CreateEntity","MapIcon_CreatePosition","MapIcon_CreateSquad","MapIcon_Destroy","MapIcon_DestroyAll","MapIcon_SetFacingEntity","MapIcon_SetFacingPosition","MapIcon_SetFacingSquad","Core_CallDelegateFunctions","Player_SetAbilityAvailability","Player_SetSquadProductionAvailability","BP_GetEntityBPStrategicPointInfo","Cmd_Ability","Util_GetPosition","Entity_IsInInteractiveArea","Entity_GetRadius","Player_SetUpgradeAvailability","Entity_IsSpawner","BP_GetAbilityBlueprint","BP_GetAbilityBlueprintByPbgID","BP_GetEntityBlueprint","BP_GetEntityBlueprintByPbgID","BP_GetSquadBlueprint","BP_GetSquadBlueprintByPbgID","BP_GetUpgradeBlueprint","BP_GetUpgradeBlueprintByPbgID","Entity_Precache","Squad_Precache","Squad_GetActiveUpgrades","BP_GetEntityBlueprintsWithType","BP_GetSquadBlueprintsWithType","BP_GetUpgradesMatchingTypes","EGroup_EnableUIDecorator","Squad_GetVeterancyTable","UI_IsLiveOrRecordedReplay","UI_GetReplayOriginalLocalPlayer","UI_IsLiveOrRecordedReplayCasterModeWithSidesFlipped","Misc_SyncCheckVariable","TicketUI_SetVisibility","Marker_Create","Marker_CreateMarkerFromEntityMarker","Marker_Destroy","Marker_DoesNumberAttributeExist","Marker_DoesStringAttributeExist","Marker_Exists","Marker_FromName","Marker_GetDirection","Marker_GetName","Marker_GetNumberAttribute","Marker_GetPosition","Marker_GetProximityDimensionsOrDefault","Marker_GetProximityRadius","Marker_GetProximityRadiusOrDefault","Marker_GetStringAttribute","Marker_GetType","Marker_HasProximityRange","Marker_InProximity","Marker_SetProximityCircle","Marker_SetProximityPoint","Marker_SetProximityRectangle","Entity_SetAnimatorEvent","Entity_SetAnimatorEventEx","Entity_SetAnimatorState","Entity_SetAnimatorStateEx","Entity_SetAnimatorVariable","Entity_SetAnimatorVariableEx","Player_CompleteUpgrade","Player_CompleteUpgradeEx","Entity_CanProduceUpgrade","Player_CanAddUpgrade","Player_CanProduceUpgrade","Player_GetCompletedUpgrades","Player_GetPossibleUpgrades","Player_HasStateModelPBG","Squad_CanProduceUpgrade","UI_CreateCustomKickerMessage","Util_GetOffsetPosition","Player_GetStartingPosition","Cmd_ReinforceUnit","Squad_EntityAt","Objective_UpdateText","Objective_AddTimerBar","Cmd_Move","Player_GetID","Entity_GetPlayerOwner","Squad_GetPlayerOwner","Squad_GetPosition","Entity_GetHeading","Entity_GetHealth","Entity_GetHealthMax","Entity_GetHealthPercentage","Entity_GetID","Entity_GetInvulnerable","Entity_GetInvulnerableMinCap","Objective_AddUIElements","Camera_MoveTo","Core_GetPlayersTableEntry","UI_SetPlayerDataContext","Player_GetRace","Player_GetRaceName","Util_GetRandomPosition","Player_GetTeam","Obj_SetTitle","Territory_GetSectorCreatorEntity","Modifier_Remove"]
window.types = new Set()
window.generics = new Set()
window.normalizeType = (/**@type {string} */type) => {
    type = type.trim().replace(/[*&]$/, '') // trim * or & suffix (pointer-like)
    let normalized = type.toLowerCase()
    let result
    let isComplex = false
    const standardAliases = {
        ['Player']: ['Player', 'PlayerId'],
        ['Entity']: ['Entity', 'EntityID', 'ScarEntityPBG'],
        ['Squad']: ['Squad', 'SquadID', 'ScarSquadPBG'],
        ['Ability']: ['Ability', 'AbilityID', 'ScarAbilityPBG'],
        ['Upgrade']: ['Upgrade', 'UpgradeID', 'ScarUpgradePBG'],
        ['number']: ['number', 'real', 'integer'],
        ['function']: ['luaFUnction', 'function', 'StackVarFunction', 'ScarFn', 'ScoringFunction'],
        ['any']: ['StackVar', 'in', 'Any', 'Var', 'variable', 'Variable'],
        ['Position']: ['Position', 'ScarPos', 'ScarPosition', 'Pos'],
        ['boolean']: ['or'],
        ['unknown']: ['1'],
        ['Marker']: ['MarkerID', 'MarkerId', 'Marker'],
		['EGroup']: ['EGroupID'],
		['SGroup']: ['SGroupID'],
		['table']: ['Array', 'Vector', 'vector'],
		['PBG']: ['PropertyBagGroup'],
		['string']: ['Key'],
		['EntityPBG']: ['EBP'],
    }
    const aliased = Object.entries(standardAliases).find(([, variants]) => variants.some(v => v.toLowerCase() == normalized))
    const genericMatch = /(?<genericType>.*?)<(?<typeVar>.*?)>/
    if (genericMatch.test(type)) {
        const match = genericMatch.exec(type)
        const genericType = window.normalizeType(match.groups.genericType)
        const typeVar = window.normalizeType(match.groups.typeVar)
        isComplex = true
        result = `${genericType}<${typeVar}>`
    }else if (Array.isArray(aliased)) {
        result = aliased[0]
    } else if (type.includes('/')) {
        const subTypes = type.split('/').filter(t => t.trim().length > 0).map(t => window.normalizeType(t))
        result = subTypes.join(' | ')
        isComplex = true
    }
    else if (window.keywords.some(t => t == type.toLowerCase())) {
        result = type.toLowerCase()
    } else if (normalized == 'string list') {
        result = 'string[]'
        isComplex = true
    } else {
        result = type
    }
    if (!isComplex && !window.keywords.includes(result) && !window.builtInTypes.includes(result) && !(result in window.predefinedTypes) && !(window.manuallyDefinedTypes.includes(result))) {
        window.types.add(result)
    }

    return result
}

window.functions = [...document.querySelectorAll('span.function')]
    .map(f => {
            const declaredParameterNames = new Set()
			const name = f.childNodes[1].textContent.trim().replace(/[\(\)]/g, '').trim()
            return {
			deprecation: window.deprecations[name],
            name: name,
            description: [...f.parentElement.parentElement.parentElement.querySelectorAll('p')].map(p => p.textContent.trim()).join('\n'),
            parameters: [...f.childNodes]
                .slice(2).map((e, i, a) => i % 2 == 0 ? [e, a[i + 1]] : undefined)
                .filter(e => e !== undefined)
                .map(([type, name], index) => {
                    type = window.normalizeType(type.textContent)
                    let parameterName = name.textContent.replace(/,\s$/, '').replace(/\s\)\s+$/, '').trim().replace(/[^a-zA-Z0-9_]/g, '_')
                    if (parameterName.startsWith('OPT_')) {
                        type = `${type} | nil`
                        const normalized = parameterName.replace(/^OPT_/, '')
                        parameterName = normalized.length > 0 ? normalized : parameterName
                    }
                    if (declaredParameterNames.has(parameterName)) {
                        parameterName = `${parameterName}_${index + 1}`
                    }
                    declaredParameterNames.add(parameterName)
                    return {
                        type: type,
                        // There's just one comma and one parameter with the ' )' remainder
                        name: parameterName,
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
            }
        })
    .filter(f => f.name !== '0')

window.renderFunction = (f) => {
    const description = [
		...f.description.split('\n'),
		...f.deprecation !== undefined ? [f.deprecation] : [],
	].map(r => `--- ${r}`).join('\n')
    const parameters = f.parameters.map(p => `---@param ${p.name} ${p.type}`).join('\n')
	const deprecation = f.deprecation !== undefined ? `---@deprecated\n` : ''
    return `${description}${description ? '\n' : ''}${deprecation}${parameters}${parameters ? '\n' : ''}---@return unknown\nfunction ${f.name}(${f.parameters.map(p => `${p.name}`).join(', ')}) end`
}
// Prevent reporting unnecessary errors for function stubs
window.function_docs_header = `
---@meta function-declarations
---@diagnostic disable: missing-return

`
window.function_docs = window.functions.filter((f) => !window.predefinedFunctions.includes(f.name)).map(window.renderFunction)

console.log(`${window.function_docs_header.trim()}\n\n${[...window.generics].map(g => `---@generic ${g}`).join('\n')}\n\n${Object.values(window.predefinedTypes).join('\n\n')}\n\n${[...window.types].map(t => `---@class ${t}\n${t} = {}`).join('\n')}\n\n${window.function_docs.join('\n\n')}`)
