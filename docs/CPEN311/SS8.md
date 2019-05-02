---
date: 2018-01-29
categories: CPEN 311
title: On-Chip In-System Debug
author: Muchen he
---



- toc
{:toc}


So far we've been using *ModelSim* to debug because we have access to view every signal in the system. However, there are some problems.

For large designs, the simulation can be a billion times slower than real chip execution. To give a sense of scale, if our design contains a processing which will run Windows, to boot windows, it would take 3000 years of simulation.

For some debugging tasks, we want to run at chip-speed.

One thing we could do is attach hardware and route it to external components such as LEDs (However, this implementation is still slow).

Another thing we could do is a synthesizable test-bench.

What we actually want is to **write values to memory**. The problem is there isn't enough memory is our clock is fast and our simulation time is long. Most likely we will run out of memory or values may be overwritten. In this case, the memory is acting as a buffer.

The missing piece of the puzzle is some kind of control to **start** the recording, and **stop** the recording.

## Trace Buffer

The trace buffer act exactly as described above. It is part of our synthesizable design (as longs as we have some space for it).
