const fs = require('fs');
const { fetchItems } = require('../api/fetchItems');

async function fileSystemSync(docsPath, contentType) {
    // calls to Headless CMS API for documentation content
    let response =  await fetchItems(contentType);// need to replace hard-coded content types

    // create array of codenames
    let cmsContent = response.map(item => item.system.codename)

    fs.readdir(docsPath, (err, files) => { 
        if (err) {
          console.log(err); 
        }
        else { 
          let docs = files.map(file => { 
            trimExt = file.replace(/\.[^/.]+$/, "")
            file ={
              codename: trimExt,
              filename: file,
              path: `${docsPath}\/${file}`
            }   

            return file
            }) 
        
            let filesToDelete = docs.filter(file => !cmsContent.includes(file.codename))

            if(filesToDelete){ 
                filesToDelete.forEach(file => {
                    fs.unlink(file.path, (err) => {
                        if (err)
                        console.log(err);
                        else
                        console.log(`${file.path} was deleted`);
                    });
                })
            }
            
            console.log('Content synchronized.')
        }
    }) 
  }

  exports.fileSystemSync = fileSystemSync;