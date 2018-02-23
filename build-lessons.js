const readline = require('readline');
const fs = require('fs');
const path = require('path');


const packageDir = fs.readdirSync('.');

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
    this.close = brackets[open];
    this.openCounter = charCounter(this.open);
    this.closeCounter = charCounter(this.close);
  }
  summer(text) {
    return this.openCounter(text) - this.closeCounter(text);
  }
}
const bracketMatcher = {
  '(': new BracketMatcher('('),
  '{': new BracketMatcher('{'),
};



function extractSection(srcLines, hash) {
  const agg = srcLines.reduce((acc, line) => {
    if (acc.state === 0) {
      if (line.trim().startsWith(hash)) {
        acc.state = 1;
        acc.lines = ['```javascript', line];
        const bracket = line.match(/\(|\{/)[0];
        acc.matcher = bracketMatcher[bracket];
        acc.bracketCount = acc.matcher.summer(line);
        acc.parenCount = bracketMatcher['('].summer(line);
        acc.curlyCount = bracketMatcher['{'].summer(line);
      }
    }
    else if (acc.state === 1) {
      acc.lines.push(line);
      acc.bracketCount += acc.matcher.summer(line);
      acc.parenCount += bracketMatcher['('].summer(line);
      acc.curlyCount += bracketMatcher['{'].summer(line);
      if (acc.bracketCount === 0 && acc.parenCount === 0 &&
          acc.curlyCount === 0)
      {
        acc.state = 2;
        acc.lines.push('```');
      }
    }
    return acc;
  }, {state: 0, lines: ['*** ERROR: no source section found for ' + hash + '! ***']});
  return agg.lines;
}

packageDir.filter(f => f.startsWith('lesson-')).forEach(lessonDir => {
  fileLines(path.join(lessonDir, '_README.md'))
  .then(readmeLines => {

    // first pass: scan the readme for all the needed source file names
    const sourceFiles = readmeLines.filter(line => line.startsWith('>>>'))
    .reduce((acc, line) => {
      const src = line.slice(3, line.indexOf('#'));
      acc[src] = 1;
      return acc;
    }, {});

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
      const linesForFile = sourceFilesLines.reduce((acc, cur) => {
        acc[cur.filename] = cur.lines;
        return acc;
      }, {});

      // third pass: write the output
      const out = fs.createWriteStream(path.join(lessonDir, 'README.md'));
      readmeLines.forEach(readmeLine => {
        if (!readmeLine.startsWith('>>>')) {
          out.write(readmeLine + '\n');
        }
        else {
          const [srcFile, hash] = readmeLine.slice(3).split('#');
          const srcLines = linesForFile[srcFile];
          out.write(extractSection(srcLines, hash).join('\n') + '\n');
        }
      });
      out.end();
    });
  })


  .catch(err => {
    console.error(err);
  });
});
