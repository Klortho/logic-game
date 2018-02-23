const readline = require('readline');
const fs = require('fs');
const path = require('path');


const packageDir = fs.readdirSync('.');
for (let f of packageDir) {
  console.log('file: ' + f);
}

function fileLines(pathname) {
  return new Promise((resolve, reject) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(pathname),
    });
    const lines = [];
    lineReader.on('line', line => {
      lines.push(line);
    });
    lineReader.on('close', () => resolve(lines));
  });
}


const charCounter = char => text => {
  const matches = text.match(new RegExp('\\' + char, 'g'));
  return matches === null ? 0 : matches.length;
};
const brackets = {
  '(': ')',
  '{': '}',
};
class BracketMatcher {
  constructor(open) {
    this.open = open;
    this.close = bracket[openBracket];
    this.openCounter = charCounter(this.open);
    this.closeCounter = charCounter(this.close);
  }
  summer(text) {
    return this.openCounter(text) - this.closeCounter(text);
  }
}
const bracketMatcher = {
  '(': new BracketMatcher('('),
  '}': new BracketMatcher('{'),
};



function extractSection(srcLines, hash) {
  return srcLines.reduce((acc, line) => {
    if (acc.state === 0) {
      if (line.trim().startsWith(hash)) {
        const bracket = line.match(/\(|\{/)[0];
        const matcher = bracketMatcher[bracket];
        return {
          state: 1,
          lines: [line],
          matcher,
          bracketCount: matcher(line),
        };
      }
      else return acc;
    }
    else if (acc.state === 1) {
      return acc;
    }
  }, {state: 0});
}

packageDir.filter(f => f.startsWith('lesson-')).forEach(lessonDir => {
  fileLines(path.join(lessonDir, '_README.md'))
  .then(readmeLines => {
    console.log('lines: ' + readmeLines.length);
    console.log('first: ' + readmeLines[0]);

    // first pass: scan the readme for all the needed source file names
    const sourceFiles = readmeLines.filter(line => line.startsWith('>>>'))
    .reduce((acc, line) => {
      const src = line.slice(3, line.indexOf('#'));
      acc[src] = 1;
      return acc;
    }, {});
    console.log('source files: ', sourceFiles);

    // second pass: read the source files
    return Promise.all(
      Object.keys(sourceFiles)
        .map(src =>
          fileLines(path.join(lessonDir, src))
          .then(lines => ({
            filename: src,
            lines: lines,
          }))
        )
    )
    .then(sourceFilesLines => {
      console.log('sourceFilesLines: ', sourceFilesLines);

      // third pass: write the output
      const out = fs.createWriteStream(path.join(lessonDir, 'README.md'));
      readmeLines.forEach(readmeLine => {
        if (!readmeLine.startsWith('>>>')) {
          out.write(readmeLine + '\n');
        }
        else {
          const [srcFile, hash] = readmeLine.slice(3).split('#');
          out.write(extractSection(sourceFilesLines[srcFile], hash).join('\n') + '\n');
        }
      });
      out.end();
    });
  })


  .catch(err => {
    console.error(err);
  });
});
