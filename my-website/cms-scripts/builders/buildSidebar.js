const fs = require('fs');
require('dotenv').config()

async function buildSidebar(sections) {
    let sidebar = buildSections(sections);

    const data =`    
    module.exports = {
        "documentationSidebar": 
            ${sidebar}
      };
      `
  fs.writeFileSync(`sidebars.js`, data)

    return console.log('Sidebar created.');
}

// 
function buildSections(response) {
    let sidebarItems = response.items.map(item => {
        let section = {
            label: item.title.value,
            codename: item.system.codename,
            type: "category",           
        }

        // pages dictate navigation via the subpages element in Kontent
        if (item.system.type == process.env.PAGE_CONTENT_TYPE) { 
            section.items=item.subpages.itemCodenames
        }
        // homepage uses the "content" element instead of "subpages"
        else {
            section.items=item.content.itemCodenames
        }
        
        return section
    }); 

    // handle nested pages
    let sidebarWithNesting = buildSubSections(sidebarItems)

    // 'docs' plugin requires JSON format in the sidebars.js file
    let sidebarJSON = JSON.stringify(sidebarWithNesting, null, 2)

    return sidebarJSON
}   

function buildSubSections(sidebarItems) {
    let sections = sidebarItems.map(section => section.codename)

    // array of nested pages to remove from root level of the sidebar
    let filters =[]

    let sidebarWithCodenames = sidebarItems.map(item => {
        for (section of sections) {
            // check to see if a page is nested
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