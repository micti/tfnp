# TFNP - Tools for Nhật Prolems

![a](https://github.com/micti/tfnp/actions/workflows/node.js.yml/badge.svg)

A collection of data tools (in NodeJS) for solve the data probems that are from my colleague, named Nhật. He solved the problem by Python first, almost cases he used Pandas, then I will use TFNP to resolve in NodeJS.

And now, not only Nhật prolems, but more from other colleagues, more prolems, with fun and passion (Many solutions by Python, Rust, Go, NodeJS).

API & Concept are still in development, but ready for test.....

Docs will update later. There are many examples at [/docs/examples](/docs/examples).

This project can be POC for NodeJS can handle small CSV (~2 mil rows) in acceptable time and memory.

## Core

- CSV read/write: Read csv input and write csv output
- CSV generator: Make sample csv input

## Install

Currently, there is no published package. So the only way to install is `git`, you can clone it and run directly.

    git clone git@github.com:micti/tfnp.git

No dependency is required. If you want to run benchmark or test, please install all dev dependencies

    npm ci

## Problems

- [CSV check](docs/problems/csv_check/)
- [CSV clone](docs/problems/csv_clone/)
- [Firebase read](docs/problems/firebase_read/)
