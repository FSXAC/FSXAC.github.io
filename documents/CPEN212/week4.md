---
title: Week 4
date: 2022-02-01
---

What happens in memory when we run a program and where does the varaibles and data go? 



For each program, there is the same address range in the address space. and layout for each program -- this is possible using *virtual memory* (later in course).

We already knows about stack, and we know stack grows down (in memory addresses in the address space). The stack holds the call frames and its local variables.

<img src="assets/week4/CleanShot 2022-02-01 at 14.18.54@2x.png" alt="CleanShot 2022-02-01 at 14.18.54@2x" style="zoom:25%;" />

But there are some more initialization stuff at the end of the address space. When a program gets loaded from disk, this is what is allocated.

For other storage, they're placed on the **heap**, which starts at the end (before .bss) and it grows back up.

<img src="assets/week4/CleanShot 2022-02-01 at 14.19.44@2x.png" alt="CleanShot 2022-02-01 at 14.19.44@2x" style="zoom:25%;" />

Typically the address space is large enough such that the heap and the stack don't collide. There are other protections to keep it from happening -- such as a stack allocation limit.

---

Unlike stacks, things allocated on the heap survives function calls, but things allocated on the heap must be allocated and managed more deliberately.

### Managing Allocation

- **Manual** allocation: using `malloc()` and `free()` function in C, and `new` and `delete` in C++. These allocation and deallocation operations must be done in pairs or there might be memory leaks.

  This is straight-forward but is hard and buggy to use -- e.g. how do we know if something is safe to be deallocated?

- **Automatic** allocation: just allocate and forget it. Then there is some mechanism like *garbage collection* and *referencing counting* to keep track of what to deallocate. E.g. Java uses garbage collection so things that programmers don't need to worry about allocated objects.

  Implementation is complex but is very easy to use by the programmer.





