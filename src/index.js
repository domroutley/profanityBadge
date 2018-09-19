const fs = require('fs')
const os = require('os')

const main = (callback) => {
  const targetDir = './tests/'
  var count = 0

  // Make sure the targetDir variable ends with a /
  if (! targetDir.endsWith('/')) { targetDir = targetDir + '/' }

  // Read profanity list
  const profanity = require(targetDir + '.profanity.json')

  // Create regex list
  var regexProfanityList = profanity.map((item) => {
    return new RegExp(item, 'g')
  })

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

        for (reg in regexProfanityList) {
          console.log((data.match(reg) || []).length)
          console.log(regexProfanityList[reg])
        }
      })
    })
  })

  callback(null, count)
}

main((err, count) => {
  console.log('=====')
  console.log(count)
  console.log('=====')
})
