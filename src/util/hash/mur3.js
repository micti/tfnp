// for bf

// wiki
// algorithm Murmur3_32 is
//     // Note: In this version, all arithmetic is performed with unsigned 32-bit integers.
//     //       In the case of overflow, the result is reduced modulo 232.
//     input: key, len, seed

//     c1 ← 0xcc9e2d51
//     c2 ← 0x1b873593
//     r1 ← 15
//     r2 ← 13
//     m ← 5
//     n ← 0xe6546b64

//     hash ← seed

//     for each fourByteChunk of key do
//         k ← fourByteChunk

//         k ← k × c1
//         k ← k ROL r1
//         k ← k × c2

//         hash ← hash XOR k
//         hash ← hash ROL r2
//         hash ← (hash × m) + n

//     with any remainingBytesInKey do
//         remainingBytes ← SwapToLittleEndian(remainingBytesInKey)
//         // Note: Endian swapping is only necessary on big-endian machines.
//         //       The purpose is to place the meaningful digits towards the low end of the value,
//         //       so that these digits have the greatest potential to affect the low range digits
//         //       in the subsequent multiplication.  Consider that locating the meaningful digits
//         //       in the high range would produce a greater effect upon the high digits of the
//         //       multiplication, and notably, that such high digits are likely to be discarded
//         //       by the modulo arithmetic under overflow.  We don't want that.

//         remainingBytes ← remainingBytes × c1
//         remainingBytes ← remainingBytes ROL r1
//         remainingBytes ← remainingBytes × c2

//         hash ← hash XOR remainingBytes

//     hash ← hash XOR len

//     hash ← hash XOR (hash >> 16)
//     hash ← hash × 0x85ebca6b
//     hash ← hash XOR (hash >> 13)
//     hash ← hash × 0xc2b2ae35
//     hash ← hash XOR (hash >> 16)
