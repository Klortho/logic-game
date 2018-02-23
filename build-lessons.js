const readline = require('readline');
const fs = require('fs');
const path = require('path');

var errors = false;

// Returns a Promise that resolves to an array of lines in the file.
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

// Count the number of occurrences of a character in a string
const charCounter = char => text => {
  const matches = text.match(new RegExp('\\' + char, 'g'));
  return matches === null ? 0 : matches.length;
};

// When extracting sections from the source code, we know we're done when
// all of the brackets of these types have been matched
const brackets = ['()', '{}'];

// An array of functions, each of which returns the net change in open/close
// brackets, for a particular bracket pair
const bracketCounters = brackets.map(b => {
  const openCount = charCounter(b[0]),
        closeCount = charCounter(b[1]);
  return text => openCount(text) - closeCount(text);
});

// This scans through the source lines of a file and extracts the section
// indicated by `hash`.
function extractSection(srcLines, hash) {
  const extracted = srcLines.reduce(
    (acc, line) => {
      const pushLine = line => {
        acc.lines.push(line.slice(acc.indent));
        bracketCounters.forEach((cntr, i) => {
          acc.netBrackets[i] += cntr(line);
        });
      };

      // Initial state, looking for the first line of the section
      if (acc.state === 0) {
        if (line.trim().startsWith(hash)) {
          acc.state = 1;
          acc.indent = line.match(/\S/).index;
          pushLine(line);
        }
      }

      // Inside a section; we're done when all brackets have been matched
      else if (acc.state === 1) {
        pushLine(line);
        if (acc.netBrackets.every(nb => nb === 0)) {
          acc.state = 2;
          acc.lines.push('```');
        }
      }

      return acc;
    },
    { state: 0,
      lines: ['```javascript'],
      netBrackets: Array(brackets.length).fill(0) }
  );

  const errResult = desc => [`*** ERROR: ${desc} for ${hash}! ***`];
  if (extracted.state !== 2) errors = true;
  return extracted.state === 0 ? errResult('no section found')
    : extracted.state === 1 ? errResult('incomplete section')
    : extracted.lines;
}

const packageDir = fs.readdirSync('.');

packageDir.filter(f => f.startsWith('lesson-')).forEach(lessonDir => {
  fileLines(path.join(lessonDir, '_README.md'))
    .then(readmeLines => {

      // first pass: scan the readme for all the needed source file pathnames
      const sources = Object.keys(
        readmeLines
          .filter(line => line.startsWith('>>>'))
          .reduce((acc, line) => {
            const pathname = line.slice(3, line.indexOf('#'));
            acc[pathname] = 1;
            return acc;
          }, {})
      );

      // second pass: read the source files
      const sourceLinesPromise = Promise.all(
        sources.map(source =>
          fileLines(path.join(lessonDir, source))
            .then(lines => ({ source, lines }))
        )
      );

      return sourceLinesPromise.then(allSourceLines => {
          const linesFor = allSourceLines.reduce((acc, cur) => {
            acc[cur.source] = cur.lines;
            return acc;
          }, {});

          // third pass: write the output
          const out = fs.createWriteStream(path.join(lessonDir, 'README.md'));
          readmeLines.forEach(readmeLine => {
            if (!readmeLine.startsWith('>>>')) {
              out.write(readmeLine + '\n');
            }
            else {
              const [source, hash] = readmeLine.slice(3).split('#');
              const sourceLines = linesFor[source];
              out.write(extractSection(sourceLines, hash).join('\n') + '\n');
            }
          });
          out.end();
          if (errors) {
            console.error('There were errors. See the output files.');
          }
        });
    })

    .catch(err => {
      console.error(err);
    });
});
