# CSV Check

## Problem

There is a large CSV (+10G) has format

    col1,col2,col3,col4,col5

and follows the rules

- has 5 cols each row
- each col1, col2 is `a-z0-9_` pattern
- col1 & col2 combination is unique

Also, there is a table in MySQL that has same schema with above CSV

Now, our task is read csv and insert all rows to MYSQL table, but first, we need to verify CSV format and return all number of not valid rows, also find all duplicate rows in CSV and db table.

## Sample CSV

To create a sample csv for test, just run this command

    node docs/problems/csv_check/gen.js

a 120 mil rows csv file (13.5G) will be generated

## Solve

I don't solve with full flow to MySQL, just do validate the CSV file itself

Read row by row, each row:

- Validate value format
- Index key and line number by btree, check exist key and return dup line

You can check file `check.js` to see how to implement by tfnp lib, and run this command to check

    node docs/problems/csv_check/check.js

The error csv will be output at `file/data_error.js`

## Test file

You can use `file/test.csv` and `file/test_error.csv` for test

## Sample output

    Process: 120000000 rows
    Btree size: 64564474
    Btree size max travel: 64
    last 1 mils process time (s) 13.253
    {
      rss: 2172.21875,
      heapTotal: 40.87109375,
      heapUsed: 8.365692138671875,
      external: 2275.598105430603,
      arrayBuffers: 2275.297414779663
    }

    {
      rss: 2172.23046875,
      heapTotal: 40.87109375,
      heapUsed: 8.403579711914062,
      external: 2275.598105430603,
      arrayBuffers: 2275.297414779663
    }
    Done
    ----gnu time report----

    real 1540.51 user 1528.76s sys 26.83s
    memory 2224596KB
    cpu 100%

[Detail here](./log_result.md)
