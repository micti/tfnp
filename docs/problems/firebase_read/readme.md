# Firebase read

## Problem

There is json/csv file called "Firebase" data file. It is 15Gb text file, each line is JSON data

    { JSON_DATA_LINE_1 }
    { JSON_DATA_LINE_2 }
    { JSON_DATA_LINE_3 }

JSON data does not include newline characters, now our task is reading all JSON line in file, parse it for other purposes.

## Sample data file

To create a sample data for test, just run this command

    node doc/problems/firebase_read/gen.js

A data file, 17Gb, with 30 mill rows will be generated.

## Solve

This can be solved by

- Read line then parse JSON
- Or parse JSON until meet new line

You can check file `read.js` to see how to implement by tfnp lib `read line` and (combine) Javascript `JSON.parse`

    node doc/problems/firebase_read/read.js

With pure NodeJS, we can archive by Readline Stream + JSON.parse

## Sample output

    data.data -> ~17.3Gb

    node doc/problems/firebase_read/read.js

    Rows: 30000000
    Run in ms: 182283
    {
      rss: 56.125,
      heapTotal: 21.36328125,
      heapUsed: 7.250267028808594,
      external: 5.79123592376709,
      arrayBuffers: 5.490041732788086
    }
    Done
