---
title: Week 7
date: 2022-03-03
updated: 2022-02-03
---

# Processes

Let's take a look at a typical output of the command `top` which outputs a list of processes on a computer.

![CleanShot 2022-03-03 at 14.42.47@2x](assets/week7/CleanShot 2022-03-03 at 14.42.47@2x.png)

- PID is the process ID -- as long as this is unique we don't care about it
- User is who owns the process
- *PR* and *NI* is the priority of the process -- the lower the priority number, the higher priority it is
- The next three column is the memory footprint:
  - VIRT: is the total memory food print
  - RES (resident): the actual mapped memory footprint
  - SHR (shared): shared memory foot print (e.g. sharaed libraries, where the same copy of the library is being shared)
- S is the run-status: `I` is idle, `R` is running
- The next two columns shows percentage of CPU and memory
- TIME column shows the total CPU time used on this process
- The last column shows the command to the process

🤔 **Question**: How can we have so many processes running at the same time?



## Process Abstraction

*Abstraction* here implies that the process is "pretending"/virtualizing that it has the whole system to itself. The result is that each process *appears* to be running as if it's the only process on the computer.

Let's consider an example where we are playing CSGO:

`insert library API interaction`

Notice that both our program (CSGO) and library (e.g. libc) interact with the CPU and memory.

But actually, the processes don't have direct access to hardware -- because every process will try to compete with eacher. **We need some mediator between the program/library and hardware**. This is the **OS/Kernel** -- which elevates calls to be ran on the hardware.

The OS/Kernel can pass *hardware command* to the computer hardware that may also interact with CPU and memory.



## Hardware Interaction with Software

We're playing CSGO and we're moving the mouse and the keyboard. How does the hardware pass our interaction to the OS/kernel, and ultimately to our CSGO game (program and libraries)?

**Naive** solution: we could map an address in memory to the state of a hardware/mouse. The problem is that we have to constantly run some code (polling) to get state regardless if we changed the mouse state or not.

What we want is **interrupt**: whenever some external event (such as a click) happens, we want to *interrupt* the current process and run some interrupt service routine (ISR). 

`insert interrupt and signal slide`

The kernel is capable of accepting interrupts, and the kernel can propagate a *signal* back to the application layer.

