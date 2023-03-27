---
title: Introduction
date: 2017-10-24
---

- toc
{:toc}

> Note: readers are assumed to have basic C programming knowledge (e.g., from APSC 160).

### Compiler

- converts high level progamming code to executable (to binary via assembly)

### Pointers
- A reference to a memory address (a single byte)

```c
int * a; // a pointer to integer (4 bytes / 32 bits)
char * b; // a pointer to char (1 byte / 8 bits)
```

### Generic Pointer

Generic pointer just points to a location in memory, but it does not know how long the memory to read, so they need to be casted before they can be dereferenced

```c
int x = 10;
char ch = 'A';
void * generic_pointer; // cannot use this without casting

// retrieve content of pointer
gp = &x;
printf("integer value: %d":, (int*)gp); // casting when using

/* if the pointer is casted wrong, it will read incorrect length of memory
 * ex. a pointer for integer casted as char will only read the first byte
 */
```

### Pointer to another pointer

```c
int x = 5;
int *p = &x;

*p = 6;
int ** q = &p;
int *** r = &q;

printf("%d\n", *p); // >>> 6
printf("%d\n", *q); // >>> 0x000aef4 (memory address)
printf("%d\n", **q); // >>> 6

printf("%d\n", **q); // >>> memory address of 'p'
```

### Stack - Pointers in Parameters

#### Passing by value
subject function is abstracted - we only care about the input and output. A "copy" of the original parameter is created

```c
void foo(int a) {
  // parameter 'a' gets new allocated memory, value is copied to new memory
  // actions performed on the new instance of memory
  a++;
}

void main() {
  // allocate new memory for 'a'
  int a = 5;
  foo(a);
}
```
Computers usually assign a "stack" of memory for the function to use *temporarily*. The computer will try its best to grow as function requires more memory. If the stack can't grow any further: stack overflow

####Passing by Reference
```c
void foo(int* a) {
  /* new memory allocated for the POINTER for 'a', makes the memory usage
   * much smaller as pointers only use up 1 byte computer to 4 bytes for
   * integers
   */

  // incrementing the actual memory (initiated back in 'main()')
  a++;
}

void main() {
  // new memory created for 'a'
  int a = 10;
  foo(&a);
}
```

**CAUTION!**

The stack is cleared when the function ends, so the pointer in "main()" that points to the variable in the foo function will get garbage value

```c
int foo(int* a) {
  int b = a++;
  return &b; // <---- this will not work (unsafe)
}

void main() {
  int a = 10;
  int* c = foo(&a);
  printf("%d", *c) // <---- this will not work (unsafe)
}
```

### Heap - Dynamic Memory Allocation

When we don't know how big the memory should be to account for the required data. (ex. unknown size of an array)

## Memory Management

- Memory are allocated and freed automatically
- But programmers need to tell it what to allocate and what to free

### Stack

```c
int square(int x) {
  return x*x;

  // these x in the stack of memory is cleared off when the function is finished
}

int squareOfSum(int x, int y) {
  return square(x+y);
}

int main() {
  int a = 4;
  int b = 8;
  int total = squareOfSum(a, b);
  printf("%d", total);

  // the whole program will be cleared off memory after program is done
}
```

So in the stack we have:

| Stack      |
| ---------- |
| `int x`    |
| `int x, y` |
| `int a, b` |

### Dynamic Memory Allocation

- Use function `malloc` returns a ponter to a memory block of at least specified bytes

```c
ptr = (<cast-type>*)malloc(<byte-size>)
```

- Use function `free` and pass in the pointer returns the memory block and the pointer to the memory heap


```c
free(ptr)
```
- Use `calloc` - more expensive - for cleared memory allocation (it resets all allocated area to binary zeros)

```c
ptr = (<cast-type>*)calloc(<byte-size>)
```



#### Heap Example

Instead of passing random size, we can use `sizeof` to specify the actual need size of the memory pointer

```c
int main() {
  // goes on stack
  int a;

  // goes in the heap
  int* p = (int*)malloc(sizeof(int))
}
```

If there is no memory left on the heap, `malloc` will return a `null pointer`

```c
int main() {
  // multiple the malloc param to access more memory (for arrays)
  int n =  100;
  int* p (int*)malloc(n*sizeof(int))
}
```

### Pointer Arithmetic

```c
// when we reference 'A', we get address to the beginning
// of the memory block that stores 'A'
int A[5];
A = {3, 5, 8, 13, 21};

// this is a pointer that points to the beginning of the
// memory block for 'A' as well
int* q = &A[0];
printf("%d\n", *q); // >>> 3 (first element in the array)

// (q+1) asks for the next integer (or any type)
printf("%d\n", *(q+1)); // >>> 5 (second element in the array)
```

### Addresses and Call by Reference

- We always assume array to be passed-by-reference
- We don't need to provide `&` when specifiying the address of the whoel array
- To specify *address* of an individual element int he array, use `&` (`&array[4]`)

## Memory and Pointer Mistakes

### Memory Leak

- An area in the memory that is useless but not freed by program

- Continuous use will eat up remaining free memory, and might cause malfunction

### Dangling Pointer

- Unchanged pointer after deleted object
- Pointer referencing deallocated memory - such memory may even be allocated elsewhere
- So whenever `free` is called, reset pointers that points to those areas of memory to `NULL`

### Segment Faults

- Do not try to dereference a dangling pointer
- Do not re-access freed memory
- Do not access outside of allocated memory
