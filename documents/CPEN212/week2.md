---
title: Week 2
date: 2022-01-18
updated: 2022-01-18
---





## Calling Convention

We're familiar to definition and calling functions in higher level languages like Java and C and it just works:

```c
int secret_stuff(char *arg, int z) {
  ans = more_secret_stuff(x, y, z, arg);
}
```

But on a register level, how does function call actually work? Where does the arguments `x` go?

The **caller** and **callee** must agree on a few things:

- Passing arguments -- how do we pass arguments and inputs from one frunction to another? Which registers to use
- Reciving result -- how does the caller receive the output of the function
- Passing return addresses -- when we call a function, we're essentially handing control over to the function we're calling. But how do we make sure program comes back to us after the function is done?
- Storing local variables -- when we call a function, we must not let it override local variables in our own scope. How do we ensure this?

Note that this is not language-specific -- since it's possible for a Java function to call binaries in a different language.

All these agreements are esentailly add up to **calling convention**



### Call Frame

Call frame (or activation record) is a record for functions' local storage. It's allocated when a function is called and removed when a function returns. The call frame is often arranged as a **call stack**. 

In a call frame, there is a **frame pointer** that points to the beginning of the frame. This pointer is set when the function is invoked.

There is also a **stack pointer** that points to the top of the stack. The stack pointer may move since we may put things on the stack inside the function.

> **Example**:
>
> Suppose we're in some function and we call a function *foo()*, then we allocate the call frame for function *foo()*. Then the frame pointer will point at the beginning and the stack pointer points to the "top" of stack:
>
> <img src="assets/week2/2022-01-18 14-16-20.png" alt="2022-01-18 14-16-20" style="zoom:33%;" />
>
> If inside *foo()* we call another function *bar()*, then we allocate call frame for *bar()* and then we move the stack pointer. 
>
> <img src="assets/week2/2022-01-18 14-17-06.png" alt="2022-01-18 14-17-06" style="zoom:33%;" />
>
> When bar() returns, we remove the frame and return to *foo()*.
>
> <img src="assets/week2/2022-01-18 14-16-20.png" alt="2022-01-18 14-16-20" style="zoom:33%;" />



### Arguments and Return

Now knowing the frame and the stack, we can look at how argument and return values are passed around.

**How do we go back?**

**Return addresses** is the where the program should go *after function finishes/returns*. In x86 systems, return addresses are located on stack and in ARM the address is stored in register `x30`.

Return values are put in `rax`, and `x0` and frame pointers are stored in registers `rap` (x86) and `x29` (ARM).

**How do we pass arguments**

In x86, we put the arguments in registers `rdi`, `rsi`, `rdx`, etc. ARM does it the same except registers are not named: `x0`, `x1`, `x2`, etc.

If there are more than 7 (x86) or 8 (ARM) arguments, then you can push it on the stack. Values can then be popped from the stack once we enter into the function.

**Special Instructions**

There are special instructions such as `call`, `ret` (x86) and `bl`, `ret` that help facilitate function calls. For example, calling `ret` in ARM is the same as `br x30` (branch to address stored in return address register).