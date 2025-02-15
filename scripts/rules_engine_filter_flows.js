
var fs = require('fs');

/**
 * Filter contact flows with the provided fix file
 */
function filterContactFlow(fixFile, fileName)
{
  try
  {
    var fixData = JSON.parse(fs.readFileSync(fixFile, 'UTF-8'));
    var rawContactFlow = fs.readFileSync(fileName, 'UTF-8');

    fixData.forEach(fix =>
    {
      while (rawContactFlow.includes(fix.original))
      {
        rawContactFlow = rawContactFlow.replace(fix.original, fix.replacement);
      }
    });

    if (rawContactFlow.includes('arn:'))
    {
      console.error(`Failed to template contact flow, found untemplated arn in: ${fileName}\n${rawContactFlow}`);
      throw new Error('Failed to template contact flow, found untemplated arn in: ' + fileName);

    }

    fs.writeFileSync(fileName, rawContactFlow);
  }
  catch (error)
  {
    console.log('[ERROR] failed process contact flow: ' + fileName, error);
    throw error;
  }
}

filterContactFlow(process.argv[2], process.argv[3]);
