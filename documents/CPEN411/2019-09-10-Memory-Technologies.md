---
title: Memory Technologies
date: 2019-09-10
updated: 2019-09-10
categories: CPEN 411
---

What is memory? Basically a collection of bits.

Selection of type and specifications of memory depends heavily on the architecture. Consider the following:

Suppose we have Memory A and Memory B:

|          | Latency | Density |
| -------- | ------- | ------- |
| Memory A | 10      | 10      |
| Memory B | 1       | 1       |

Then in a CPU, we want to use low-latency Memory B used closer to the core for high-speed applications such as caching. Memory A would be used outside the core, further away because they’re slower (even though they’re denser).

We place the different memories closer or farther away from the core to create a **hierarchy**. 

If we need some data to access quickly. Notice that because of the hierarchy the probability of some data being in the fast memory is low. To ensure the most-used data is in the fast memory, we need **caching** and **prefetching**.

## Cache

### Locality

It is very common that programs have localities that access data around the same area (e.g. a `for` loop that access each element in a list).

Caches are tend to be managed on the hardware level as they’re very small and not very dynamic.





----

TBL manages the virtual and physical mapping of memory.



## Ideal Main Memory :unicorn:

They don’t exist. But we want them.

- :money_with_wings: zero cost
- :bullettrain_front: zero latency
- :left_right_arrow: infinite bandwidth
- :crystal_ball: infinite capacity
- :heavy_check_mark: zero error rate

## Memory Addressing Patterns

`memory access pattern table`

If the access pattern is **random access** which uses *address* to obtain *data*, then we should use SRAM, RF, or DRAM. Example application include register file, direct-mapped caches, and main memory.

If the access pattern is **associative lookup** which is using some key to see if we have a match. We use the key as address to obtain the actual data. we should use CAM. Example applications include associative caches/TLBs, reservation stations, and load-store queue.

## RAM Addressing

RAM data is stored in a grid array. The vertical lines are “*bitlines*” because each line represent each bit of data.

The horizontal lines are “*wordlines*” and they’re used to access the data.

### Read Operation

The access address drives the word line (horizontal). The cell drives bit lines (if the bit is 1, then the bit line for that bit is driven to high). The cells are *preconditioned* because the cells are essentially capacitors that need to charge and discharge. Lastly, the bit lines read out are amplified.

## How do we Store a Bit?

- Capacitor: charged is 1, discharged is 0
- CMOS 8: we need 8 transistors (4 for each NAND)
- CMOS 4: we need 4 transistors (2 for each inverter)