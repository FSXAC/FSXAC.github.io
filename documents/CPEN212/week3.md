---
title: Week 3
date: 2022-01-25
---

## Hacks

Recall x86-64 calling conventions:

- We have registers `rax`, `rbx`, `rbx`,...
- When returning, we put the address on the top of stack (TOS)
- We put in arguments in `rdi`, `rsi`, `rdx`,...
- Return values are put in `rax`

In x86 (32-bit) the calling convention is almost the same:

- Have registers `eax`, `ebx`,...
- Return address also goes on TOS
- But all arguments also go on the stack (first argument is right below the return address)
- Return values are put in `eax`

### Buffer Overflow Hack

Knowing this, let's consider the hack. Let's make a victim program:

```c
int main(int argc, char **argv) {
  int ans = 42;
  char buf[16];
  gets(buf);
  printf("the answer is %d\n", ans);
  return 0;
}
```

If we run this code, we get an unsurprising output:

```
the answer is 42
```

However, there is one vulnerability: the `gets` function reads a line from standard input and puts it into the buffer (char array as arugment) until it finds a terminating character (`\0`) or new line (`\n`). Notice that it does not consider the size of the buffer.

**What it means that `gets()` might write past the size allocated (16).**

Now let's come up with our attack to change the answer. To do this  we need to reverse-engineer what this code compiles to -- to find out where all variables are in memory.

<img src="assets/week3/2022-01-25 14-46-42.png" alt="2022-01-25 14-46-42" style="zoom:33%;" />

In this case, the buffer fills up from bottom to top, so if we input more than 16 bytes we can overwrite the value for `ans`.

So now let's run the victim program again but we enter the following bytes as standard input:

```
FF FF FF FF FF FF FF FF
FF FF FF FF FF FF FF FF
39 05
```

Notice that we entered 16-bytes of garbage (who cares) and then two bytes of `0x3905` whch is the lowest two bytes of variable `ans`. When we run the program again the output is

```
the answer is 1337
```

---

Knowing this, we can see how this can be used as a typical attack pattern in real system:

- Find a program running as root with file/network inputs
- Scan the binary for insecure functions which might overflow the buffer such as `gets()`, `strcpy()`, etc.
- Then we craft an input to overflow the buffer and to delibrately do whatever we want
- If we can make it execute things like `system("/bin/sh")` then we basically got root-access to the machine. But wait, how do we make it execute something for us?

---

Lets consider the above victim code, but also consider there are some functions to do some system stuff:

```c
// runs a fortune program
int call_fort() { return system("fortune"); }

// calls any system program
int call_sys(const char *s) { return system(s); }
```

Recall the return address is also on the stack:

<img src="assets/week3/2022-01-25 15-01-08.png" alt="2022-01-25 15-01-08" style="zoom:33%;" />

So if we keep overflowing the buffer, eventually we can overwrite the return address to go to wherever we want.

Suppose we also looked at the binary and found the function `call_fort` to be located at `0x08049765` or `65 97 04 08` in little Endian.

Let's craft a malicious input byte stream:

```
FF FF FF FF FF FF FF FF <- pads buf
FF FF FF FF FF FF FF FF <- pads buf
FF FF FF FF FF FF FF FF <- overwrites ans and epb
65 97 04 08 <- address of the function for call_fort
```

The output if we run this is:

```
the answer is: -1
Q: Why did the tachyon cross the road?
A: Because it was on the other side.
[1] 631849 segmentation fault (core dumped)
```

**Note**: we successfully used buffer overflow to execute `call_fort` function for us.

**Also note**: there is segmentation fault because eventually `call_fort` ends and is expecting another return address on the stack but there is none.

---

Notice earlier we had the `call_sys` function. Ideally we want to pass in whatever argument we want. So how do we do that?

Recall our stack:

<img src="assets/week3/2022-01-25 15-01-08.png" alt="2022-01-25 15-01-08" style="zoom:33%;" />

What we actually can do is to use the buffer to store our arbitraty code, and overwrite the return address to jump to our abitrary code in the buffer, then put the argument somewhere in the stack:

<img src="assets/week3/2022-01-25 15-12-19.png" alt="2022-01-25 15-12-19" style="zoom:33%;" />

One last thing is that we need to figure out where `buf` is located in memory -- again, this can be done by looking at the binary of the program. 

Knowing the address of `buf` and the function we want to execute such as `call_sys`, we can use simple arithmetics to compute the addresses.

**Note**: practically stacks are often non-executable.