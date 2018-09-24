const fs = require('fs')

const main = (callback) => {
  const targetDir = './tests/'
  var count = 0

  // Make sure the targetDir variable ends with a /
  if (! targetDir.endsWith('/')) { targetDir = targetDir + '/' }

  // Read profanity list
  const profanity = require(targetDir + '.profanity.json')

  // For each file in target directory
  fs.readdir(targetDir, (err, files) => {
    files.forEach(file => {
      if (file == '.profanity.json') { return } // Skip config file
      fs.readFile(targetDir + file, 'utf8', (err, data) => {

        // v Logging v
        console.log('\n_--' + file + '--_') // Print filename
        // if (err) { console.log('\n' + err) }
        // if (data) { console.log('\n' + data) }
        // ^ Logging ^

        // Skip if requested
        if (data.match('// profanity-allow-all')){
          return
        }

        // Split file into list of lines
        var fileLines = data.split('\n')

        fileLines.forEach((line) => {
          profanity.forEach((prof) => {
            if (line.match(prof)) {
              // TODO use RegEx to allow multiple disables per line
              // TODO use RegEx to make sure disable is in comment
              if (line.match('profanity-allow "' + prof + '"')) { // Enable disabling of profanity
                return
              }
              console.log('!!Profanity found!! Line: ' + (fileLines.indexOf(line) + 1).toString() + ' Profanity: ' + prof)
            }
          })
        })
      })
    })
  })

  callback(null, count)
}

// TODO Implement promise based system to resolve output ONLY when count is finished
main((err, count) => {
  console.log('=====')
  console.log(count)
  console.log('=====')
})
