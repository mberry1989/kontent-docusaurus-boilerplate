const fs = require('fs');

async function buildSidebar(sections) {
    let sidebarSections = buildSections(sections);

    const data =`    
    module.exports = {
        "documentationSidebar": 
            ${sidebarSections}
      };
      `
  fs.writeFileSync(`sidebars.js`, data)

    return console.log('Sidebar created.');
}

function buildSections(response) {
    var sidebarItems = response.items.map(item => {
        var section = {
            label: item.title.value,
            codename: item.system.codename,
            type: "category",           
        }
        if (item.system.type == 'page') { 
            section.items=item.subpages.itemCodenames
        }
        else {
            // homepage uses "content" element instead of "subpages"
            section.items=item.content.itemCodenames
        }
        
        return section
    }); 

    var newSidebar = buildSubSections(sidebarItems)
    var sidebarItemsJSON = JSON.stringify(newSidebar, null, 2)

    return sidebarItemsJSON
}   

function buildSubSections(sidebarItems) {
    var sections = sidebarItems.map(section => section.codename)

    // array of subsections to remove from root level of the sidebar
    var filters =[]

    var sidebarWithCodenames = sidebarItems.map(item => {
        for (section of sections) {
            if(item.items.indexOf(section) != -1) {
                // find the codename in the parent section items array
                let itemToReplace = item.items.find(x => x == section)
                
                // find the subsection object in the entire sidebar array
                let replacementSource = sidebarItems.find(y => y.codename == section)

                // shallow copy of the original item to allow filtering of the original item from the sidebar later
                let replacement = {...replacementSource}

                // remove codename for valid sidebars object
                delete replacement.codename

                // sections to be removed from sidebar
                filters.push(section)

                // replace the parent section array item with a copy of the subsection object
               item.items[item.items.indexOf(itemToReplace)] = replacement
            }
        }

        return item
    })

    // remove nested section from level 0 of sidebar
    sidebarWithCodenames = sidebarWithCodenames.filter(item => !filters.includes(item.codename))

    // delete codenames from objects -- codenames are necessry for mapping, but not allowed by 'docs' plugin
    const sidebar = sidebarWithCodenames.map(({codename, ...keepAttrs}) => keepAttrs)

    return sidebar
}

exports.buildSidebar = buildSidebar;