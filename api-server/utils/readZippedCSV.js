const iconv = require('iconv-lite');
const chardet = require('chardet');
const { Readable } = require('stream');
const unzipper = require('unzipper');
const csv = require('csv-parser');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

async function readZippedCSV(fileBuffer) {
  // Create a Readable stream from the file buffer
  const bufferStream = new Readable();
  bufferStream.push(fileBuffer);
  bufferStream.push(null);

  const chunks = [];

  // Create a pipeline to unzip the file and collect the unzipped chunks
  await pipeline(
    bufferStream,
    unzipper.ParseOne(),
    new stream.Writable({
      write(chunk, encoding, callback) {
        chunks.push(chunk);  // Save each unzipped chunk in the 'chunks' array
        callback();
      },
    })
  );

  const unzippedData = Buffer.concat(chunks);  // Combine the unzipped chunks into a single buffer
  const detectedEncoding = chardet.detect(unzippedData); // Detect the character encoding 

  const addresses = [];
  const decodedStream = iconv.decodeStream(detectedEncoding); 
  const unzippedReadable = new Readable();
  unzippedReadable.push(unzippedData);
  unzippedReadable.push(null);

  // Create a pipeline to process the unzipped data:
  // - Decode the data using the detected encoding
  // - Parse the CSV data (assuming no headers)
  // - Extract the address from each row and store it in the 'addresses' array
  await pipeline(
    unzippedReadable,
    decodedStream,
    csv({ headers: false }),
    new stream.Writable({
      objectMode: true,
      write(data, encoding, callback) {
        addresses.push(data[0]);  // Save the address from the first column of each row
        callback();
      },
    })
  );

  return addresses;
}
  
module.exports = {
  readZippedCSV
}