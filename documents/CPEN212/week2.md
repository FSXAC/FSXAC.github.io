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

#### How do we go back?

**Return addresses** is the where the program should go *after function finishes/returns*. In x86 systems, return addresses are located on stack and in ARM the address is stored in register `x30`.

Return values are put in `rax`, and `x0` and frame pointers are stored in registers `rap` (x86) and `x29` (ARM).

#### How do we pass arguments

In x86, we put the arguments in registers `rdi`, `rsi`, `rdx`, etc. ARM does it the same except registers are not named: `x0`, `x1`, `x2`, etc.

If there are more than 7 (x86) or 8 (ARM) arguments, then you can push it on the stack. Values can then be popped from the stack once we enter into the function.

#### Special Instructions

There are special instructions such as `call`, `ret` (x86) and `bl`, `ret` that help facilitate function calls. For example, calling `ret` in ARM is the same as `br x30` (branch to address stored in return address register).



### Calling A Function Inside A Function

What happens if I'm already inside a function and I call another function? Wouldn't the inner function overwrite critical registers (such as the return address register `x30`?).

Then the question becomes: *should registers values to be preserved across calls?* And there are two options:

- Caller saves the registers before calling a function.
  - Pros: Callee don't have to do extra work.
  - Cons: if we don't know which registers callee is using, then we have to save everything.
- Callee saves the register before executing its body.
  - Pros: callers don't have to do extra work
  - Cons: all registers are saved regardless if caller uses it or not.

In practice, typically *some* registers are saved by callee and anything else must be saved by the caller.



> **Example**: consider this following function that follows the callee-saved convenction in x86 assembly:
>
> ```assembly
> myfunction:
> 	push	rbp
> 	mov		rbp, rsp
> 	sub 	rsp, 48
> 	
> 	...
> 	
> 	mov 	rsp, rbp
> 	pop		rbp
> 	ret
> ```
>
> Upon entering the function, we push the base-pointer/frame pointer (`rbp`), then we put the return address on the stack.
>
> We also move the stack pointer by 48 bytes (or how ever much stack space we need inside this function).
>
> Then we can execute the body of the function.
>
> Once we're done, we just need to pop the stack by putting the frame pointer (`rbp`) onto the stack pointer and pop it.



Often in compiler generated code, the frame-pointer is often omitted for optimization reasons (saves one register). Since the compiler can keep track of how much offset to add/remove from the stack.

Despite the optimization, frame pointer is necessary if we don't know exactly how much we're putting on the stack in a function (e.g. dynamically-szied memory using `alloc()`) -- since compilers cannot know the stack offset during compile-time.



### Interrupts

When a user presses a key for example, it goes into an interrupt handler/service routine. In this case, should the interrupt handler use your memory?

<img src="assets/week2/2022-01-18 14-54-06.png" alt="2022-01-18 14-54-06" style="zoom:33%;" />

In practice, there is a **red zome** which is a fixed-size space below top-of-stack (TOS). This area is guaranteed to not be touched by interrupts.

This is nice because we don't need to update the stack pointer whenever interrupt happens.



### Other Considerations

- **Address alignment rules** - x86 requires stack ot be aligned at 16-byte boundaries
- **Exceptions** - if there is a control flow that isn't standard function calling, there needs to be *stack unwinding* to communicate this information for non-local control flow like exceptions (???)
- **Name mangling** - In C++ and Java there can be the functions of the same name in different classes or namespaces/packages. During runtime, how can we figure out which function to call?

> **TL;DR**: Calling conventions enables different part of the code to just work.

### Example

We want to write some code to print some strings to the screen. We write and utilize a function **print** which takes a pointer to ASCII string and prints it to *stdout*.

- The arguments are: `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9`, stack and return value goes in `rax`.

- Callee-saved registers are: `rbx`, `rbp`, `r12`-`r15`

So let's start with:

```assembly
section .text

global _start
_start:
    mov  rdi, hi
    call print
    mov  rdi, bye
    call print
    mov  rax, 60
    xor  rdi, rdi
    syscall
    
hi  db "hello, world!", 10, 0
bye db "goodbye, cruel world...", 10, 0
```

- We first move `hi` which contains the ASCII text "hello, world!" into `rdi` as the first-argument into the function. Note that 
- Then we call print function, which will get the ASCII text via register `rdi`.
- After printing both strings, we perform syscall to actually output it to the screen/stdout (see [Week 1](week1)).

The print function is:

```assembly
print:
    push rdi
    call len
    pop  rdi
    mov  rdx, rax
    mov  rsi, rdi
    mov  rax, 1
    mov  rdi, 1
    syscall
    ret
```

- We want to call a function `len` to figure out how long the string is to print.
- But before that we need to push `rdi` to the stack because it's not guranteed to be preserved and we might use it later. We could alternatively move it to a register that is saved or not overwritten (such as `rbx`)
- We move the return value from calling `len` (`rax`) to `rdx` as arguments to the syscall for output

Here is the len function:

```assembly
len:
    push rbx
    xor  rbx, rbx
len_loop:
    cmp  byte [rdi], 0
    je   len_end
    inc  rbx
    inc  rdi
    jmp  len_loop
len_end:
    mov  rax, rbx
    pop  rbx
    ret
```

- The first thing we do is to push `rbx`. We do this because `rbx` is callee-saved (as per calling convention mentioned). So if we want to use this register, we **must** push it to the stack and pop it once we're done.
- The body of the function basically computes number of characters (loop until it sees a null character (0)), and returns by putting the count into `rax`.

### Drawbacks

- Stacks are **sequential** / one-directional
  - What if we have two functions that grow the stack in two directions?
- Stack space is deallocated on return
  - What about first-class functions or closures?



