window.enum_docs_header = `
---@meta enum-declarations

ALL = true
ANY = false
`

window.enums = [...document.querySelectorAll('td.tabletitle')]
.map(c => ({
    name: c.textContent, 
    values: [...c.parentElement.parentElement.querySelectorAll('td.tablesubtitle')].map(v => v.textContent)
}))

window.enum_docs = window.enums.map(e => `--- @class ${e.name}: userdata\n\n${e.values.map(v => `--- @type ${e.name}\n${v} = {}`).join('\n')}`).join('\n\n')

console.log(`${enum_docs_header}\n${window.enum_docs}`)