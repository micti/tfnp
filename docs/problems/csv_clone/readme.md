# CSV Clone

## Problem

There is a CSV (example: 1 mil row) with col1 is integer number from 2 - 50

    col1,col2,col3,col4

Now, our task is clone it to other csv with condition: each row of origin file will be clone to n rows in new file where n = col1

## Example

    2,2,3,4,5
    3,1,1,2,2

clone to

    2,2,3,4,5
    2,2,3,4,5
    3,1,1,2,2
    3,1,1,2,2
    3,1,1,2,2

## Sample CSV

To create a sample csv for test, just run this command

    node doc/problems/csv_clone/gen.js

1 mill row CSV will be generated with first col has random value from 2-50

and after clone, there are around 20-30mils rows in the clone CSV file

## Solve

Step:

- Read row by row, each row
  - Get value of first col
  - Write row n times (n = value of first col) to new CSV

You can check file `clone.js` to see how to implement by tfnp lib, and run this command to check

    node doc/problems/csv_clone/clone.js

## Sample output

    data.csv -> ~90Mb
    data_clone.csv -> ~2.5Gb

    node doc/problem/csv_clone/clone.js

    New CSV: 25986593 rows
    Run in ms: 38657
    {
      rss: 63.93359375,
      heapTotal: 36.12109375,
      heapUsed: 11.986564636230469,
      external: 4.52561092376709,
      arrayBuffers: 4.224416732788086
    }
    Done
