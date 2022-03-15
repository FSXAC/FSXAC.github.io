---
title: Week 9
date: 2022-03-15
---

Original slides and lecture by Mieszko Lis.

- toc
{:toc}
# Files

We have used them. They're everywhere. But what are they? 

## Definition

On a very simple defiition: it's a collection of data that we can open, view, write, and modify. However for unix, the defition is a lot more abstract, that:

- a file is just a **sequence of bytes** -- where it's stored is not specified
- **everything** is a file; obviously everything on disk (text files, movies, etc.) are files, but so are directories (folders), disks, terminals, interface to peripheral devices (e.g TTY), and processes.

So what isn't a file (in unix)? Files *might* be on disk, but it could live on RAM or nowhere at all. Files might have a path and names, but they might not.

For example, when we "pipe" the output of one program to another (e.g. grep), both programs treat the input/output as a file, but this "file" doesn't exist anywhere.

```shell
cat /etc/passwd | grep hello
```

At an OS level -- outside of the file abstraction -- files are structured and formatted data since they could take form of different **type** of files (e.g. indicated by extensions mp4, pdf, etc.). They're outside of the file abstraction and the OS simply just treats it differently by application. Key is: only the OS-level application (Finder, Explorer, etc.) knows the difference between files.

Filename extensions has no effect on the files themselves, but is just a convention for human or OS to recognize the files.

At a low level, the file abstraction is also encoding-agnostic. Only the program reading such file should care if the file is encoded in binary, ASCII, or Unicode, etc.

> **Example**
>
> ```shell
> cat 1337.txt
> ph33r m3 n00bz
> ```

> **Example**: directories are special files
>
> ```shell
> ls /tmp
> ```

> **Example**: processes and their executables in the memory space (and only exist in memory) can be examined as a file
>
> ```
> xxd -p /proc/self/exe
> ```
> 

> **Example**: use a hardware random number generator and read it like a file
>
> ```shell
> xxd -p -l 10 /dev/random
> ```

> **Example**: we can write / dump something to a "file" that act as void
>
> ```shell
> echo "Something important" > /dev/null
> ```

> **Example**: the command `tty` tells us what terminal we are currently looing at. When we write to a terminal, it will appear on the screen.
>
> For example, suppose we found our "device file" for our terminal:
>
> ```shell
> ❯ tty
> /dev/pts/3
> ```
>
> Then writing to that "file" prints to the screen
>
> ```shell
> ❯ echo "hello" > /dev/pts/3
> hello
> ```

> **Example**: Disks and partitions are special files. We can read and write to it (but it will obviously brick your computer lol).
>
> ```shell
> df /dev/sda1
> ```
>
> The above command shows free space on partition `sda1`.

> **Example**: we can also talk to the kernel; here we can read about list of CPU information
>
> ```shell
> cat /proc/cpuinfo
> ```
>
> The reverse is also true: we can write to the kernel.
>
> ```shell
> echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
> ```
>
> This command sends a ICMP packet and ignore it.

> **Example**: PIPE (as seen above)
>
> ```shell
> cat /etc/passwd | grep hello
> ```



## File Operations & Interfaces

### `syscall` Interface

The syscall interface is an OS-level specifical. This means it's **not portable** since it depends on which OS you're on. There exists standards like POSIX that enable interchangeability.

Let's assume we have a file that is abstracted as a sequence of bytes.

Files have **file descriptors** -- a set of small bytes that identify open files.

Possible operations are:

- `open`/`close`: opening and closing files
- `read`/`write`: reading from and writing to files
- `lseek`: go back and forth to an index in the file. 
- `fsync`: buffer sync
- `ioctl`: if we have a remote terminal device, configure some device parameters that is not related to the file data.

The OS only cares about **bytes** and not even semantically -- it doesn't know about line feeds, escape characters, etc. This makes it safe for syscall handlers.

Every file interaction has to interact with kernel. If we have a higher-level interface (e.g. a web browser that loads a file), under the hood it would still have to ask the kernel.

### `libc` Interface

This is a step higher than syscall interface, and is implemented on top of the syscall interface. This is nice because we can write code using *libc* and it's portable across systems.

Instead of having file descriptors, instead of have **file pointers** and **streams** to identify open files.

As it implements on top of syscall, we have functions that facilitate similar tasks:

```c
int fclose(FILE *stream);
int fclose(FILE *fp);
int fputs (const char *string, FILE *fp);
int fseek(FILE *fp, long int offset, int whence);
int fflush(FILE *fp);
/* more ... */
```

It's generally unsafe for syscall handlers. And the changes are **buffered** in a separate buffer structure. The buffer is only *flushed* to the actual file when the buffer is full (or when flush is called).

**Q**: why do we buffer things? See [File Buffering](#file-buffering)



### `libc` ↔ `syscall` interaction

`insert diagram`

Suppose our code uses the *libc* library, then when we use `fgetc()` function to read from file. The function actually performs a *syscall* to the kernel to read the file into the buffer.



## File Buffering

**Analogy**: suppose an delivery airplane can hold 10,000 packages, it takes an hour each to prepare the plane for loading and deloading. But once it is prepared, it only takes 1 second to load/unload each package.

So back to our file example, having a buffer allows us to **amortize** the latency to write to a file. We can fill a buffer and write *once* (in a *flush* call), instead of having our disk (e.g. spin up/down for a hard drive -- which takes a long time) for every write call.

Buffer is not exclusive to files, it's actually used everywhere -- in the kernel, on the disks.

Buffers are typically **transparent** in theory, as in, the user/applications doesn't know that buffers exist.

**Problem**: It gets complicated if we want guarantee about when I/O actually happens. What if we try to write data to disk, but suddenly the disk loses power out while data is still in the buffer? Furthermore if the disk fails, the write's error is delayed while data is sitting in the buffer.







