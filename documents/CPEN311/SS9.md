---
date: 2018-02-01
categories: CPEN 311
title: Fractional Numbers
author: Muchen He
---



- toc
{:toc}


There are two ways to represent fractional numbers, **fixed-point** and **floating-point** representations.

In *Lab 3*, we will be dealing with non integer values.

## Fixed-Point

The bits are divided into two sections:  whole and fractional. The whole section represents the integer part of the number *before* the decimal number. The fractional is a sum of the fractional part (with negative exponents).

For example:

`1001.0110` is `1B3 + 0B2 + 0B1 + 1B0 + 0B-1 + 1B-1 + 1B-2 + 0B-3`, where `BN` denotes $$\times 2^N$$.

The fixed point representation has a predetermined location for the decimal, it is known as the **radix point**.

For a 8 bit register where the radix point is placed in the center, the precision is 0.0625 and the number can range between 0 and 15.9375. (`page 10`)

We can have more precision by moving the radix point to give more bits to the decimals, but the trade off is we lose the maximum range.

### Verilog

**How do we make fixed point in Verilog?**

We can declare it as `signed` or `unsigned`. With a length long enough for the integer and fractional parts:

```verilog
reg [15:0] position_z;
```

Then, when we need to use it, we just need to remember that `[15:8]` bits are for the integral part, and `[7:0]` are the fractional part.

### Assignment

To assign a value, we just need to split the number into integer and fractional part. For example, to store 2.5, we know the integer part is `10` and the fractional 0.5 part is `10`. Assuming our fixed point number is 8 bits long with radix point in the middle, the binary representation is `0010.1000`.

### Addition & Subtraction

To add the fixed point numbers, we just add the two together (treating them as integers). The overflow (carry-bit) is taken care of automatically.

```verilog
reg [15:0] position, velocity;
position <= position + velocity;
```

Subtraction is the same thing except negative.

### Multiplication

To multiply, we treat bits as integers and perform multiplication. But we need to shift the radix point and shift accordingly. For example, `000011.01` times `000110.10` gets `101010010`. Since the two multiplicand have two decimal places, we need to put 4 bits for the output of the fractional part: `10101.0010`. Then we need to fix the output back to the fixed radix by shifting the bits right by 2. Finally, our actual answer is `010101.00` .

> Note that we are **losing precision** when we performed the shift. This is a fundamental disadvantage of fixed-point numbers.

### Comparison

> *left as an exercise*

## Floating Point

If we care about the precision when the magnitude is small. but not so much when the magnitude is large, we could use floating point.

Consider the number 7241.0381 again. We can represent this as $$72410381\times 10^{-4}$$. Thus, the representation follows

$$
\text{significant}\times\text{base}^{\text{exponent}}
$$

The **exponent** and **significant**/**mantissa** are stored as bits.

**Single Precision (32-bit)** has 1 sign bit, 8 exponent bits, and the rest are mantissa bits.

**Double Precision (64-bit)** has 1 sign bit, `X` exponent bits, and the rest are mantissa bits

---

**Example**

50.5625 is `110010.1001` . To represent this in floating point, we need to first find the *normalized* scientific notion: $$5.05625\times 10^-1$$. Note that it is normalized and only has one digit before the decimal place. The binary is now `1.100101001B5` We don't need to represent the first bit before the decimal. So the reset of the decimals are stored in mantissa. The mantissa now is: `1001010010000000000000`.

The exponent is $$2^5$$, and 5 is expressed in binary as `101`. The exponent bits are signed, but we don't represent negative in two's compliment because comparison would be more difficult. The solution is to adding a **bias / offset** to put the exponent into unsigned range. The bias is a standard.

The **bias** for single-precision is 127, and 1023 for double precision. This is part of the standard.

So we take 5 (`101`) and we add 127 (`01111111`) and we get `10000100` for the exponent bits.

Since the number is positive, the sign bit is `0`.

Finally, the whole 32 bit number will look like `0 | 10000100 | 100101001000000000000`.

---

> Note that `real` keyword doesn't work on FPGAs and cannot be synthesized.

In modern FPGAs, there are floating point blocks that require special instructions to activate. There are **libraries** available for working with floating point format.

## Fixed Point vs. Floating Point

**Fixed Point**

- Simpler circuitry (few logic and routing resources)

**Floating point**

- More flexible
