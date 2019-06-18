---
categories: APSC 160
title: Final Review
date: 2018-03-11
use_math: true
---

- toc
{:toc}

# APSC 160 Final Review

## Fundamentals

**Variable**: a name that stores a value

**Expression**: an operation on some variables

**Assignment**: giving a variable some values

**Program**: a collection of code that the computer executes

**Function**: reusable collection of code that can be called by some other code

**Parameter**: some data passed to the function

**Symbolic Constants**: constant, global values defined by `#define`

### Blank Program

All programs written in APSC 160 follows this structure. Note to follow good coding practices.

```c
/* Author:
 * Date:
 * Purpose: ...
 */

#include <stdio.h>		// for input/output
#include <stdlib.h>

int main(void) {
    // your code

    system("pause");	// 'press any key to continue' prompt
    return 0;
}
```

### Types

Types are used to describe what kind of data is being used in the program. Some of the commonly used types in APSC 160 is as follows but not limited to:

| Type     | Description                                                  | Format specifier |
| -------- | ------------------------------------------------------------ | ---------------- |
| `int`    | Integer (non fractional and signed)                          | `%d` or `%i`     |
| `double` | Fractional number (same as `float` but uses double the bits) | `%lf`            |
| `char`   | Character                                                    | `%c`             |

Some for special ones are:

| Type | Description | Format specifier |
| ---- | ----------- | ---------------- |
| `char[]` | Character array                                              | `%s`             |
| `FILE *` | File pointer |  |

**Important**: for character array / strings, use double quotes: `""`; for single characters, use single quotes: `''`.

### Math Expressions

| Expression  | Syntax  |
| ----------- | ------- |
| $$A+B$$       | `A + B` |
| $$A-B$$       | `A - B` |
| $$A\times B$$ | `A * B` |
| $$A\div B$$   | `A / B` |

#### Order of Operation

The order of operation follows standard math (BEDMAS / PEDMAS); the order of operation can be specified using parenthesis `()` just like in Math.

#### Integer Division

A common mistake is to take two integers and divide them. While this works with most integers, note that the numbers after the decimal points are **truncated** meaning that 0.32 ends up being 0.

To fix this, use [casting](#casting) and evaluate the expression into another type such as `double`.

#### Casting

Put `(double)` in front of an expression or variable to evaluate that expression or variable as a `double` type. Of course, you could also use other types.

> **Example**:
>
> Code version 1 (incorrect):
>
> ```c
> int x = 5;
> int y = 7;
> double z = (double) (5 / 7); // !!! 5/7 is integer division - which happened first
> ```
>
> Code version 2 (corrected):
>
> ```c
> int x = 5;
> int y = 7;
> double z = (double) x / 7;
> ```

### Input / Output

For input from user and output to the screen we use `printf` and `scanf` functions. For file IO, refer to [File IO](#File-IO).

Because of some reasons in Visual Studio, it is required to prepend `#define _CRT_SECURE_NO_WARNINGS` at the beginning of all the program in order to use `scanf`. But this is not necessary on an exam.

#### Output

Use `printf()` to output lines onto the screen. The `printf` function takes **a string** as the first parameter. This string needs to include what to display, and [format specifiers](#types). The rest of the parameters "fills-in" for the format specifier.

> **Example**:
>
> ```c
> printf("Hello %s, the temperature is %d%c with %f percent chance of rain", "Muchen", 13, 'C', 30.5);
> ```
>
> Output:
>
> ```
> Hello Muchen, the temperature is 13C with 30.5 percent chance of rain
> ```

##### More Specific Format Specifier

Usually, the function call `printf("%f", 3.5)` will output `3.500000` all with the character `3` starting from the left.

| Specifier | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `%.3f`    | Round to 3 decimal places                                    |
| `%7.3f`   | Use total of 7 field widths and round to 3 decimal places    |
| `%+f`     | Show sign in front of the number, regardless of negative or positive |
| `%-f`     | Left align the number                                        |

#### Input

Use `scanf()` to take user input. The format specifier has the same usage as `printf`. The parameter format is identical to `printf` **except** that a `&` is required in front of every variable.

> **Example**:
>
> ```c
> int age;
> scanf('Enter your age: %d', &age);
> ```



## Control

### Logical Expressions

| Expression |Meaning| Syntax |
| ---------- |----| ------ |
| A and B | A and B both must be true for the outcome to be true | `A && B` |
| A or B | either A or B can be true for the outcome to be true | `A || B` |
| not A | A must be false for the outcome to be true | `!A` |

### Branch

To have conditional part of the program execute, we need *branching*. This can be done using `if/else`.

Note that `if`/`else if`/`else` statements only execute the line of code following it unless braces `{}` are in place.

> **Example**:
>
> ```c
> if (x > 10) {
>     printf("Yes");
> } else if (x < -10) {
>     printf("No");
> } else {
>     printf("Meh");
> }
> ```
>
> The first `if` tests if the condition specified is true. If so, it will execute `printf("yes");` and the rest of the code is ignored.
>
> If it is not true, the `else if` statement checks if the condition specified for that is true. If true, `printf("no")` is executed and the rest is ignored.
>
> If all conditions is false, whatever that follows `else` is executed.

### Loop

#### While Loop

A while loop should be used when we want to loop based on a **condition**.

> **Example**
>
> ```c
> while (x > 5) {
>     // do something here
>     x--;
> }
> ```
>
> The code inside the while loop will keep executing as long as `x > 5`. So it is important to make sure we don't end up with an infinite loop.

**Note:** `break` can be used inside the loop anywhere to terminate the innermost loop.

#### Do While Loop

This is very similar to the [while loop](#While-Loop) except that it will execute the code that's inside the loop first before deciding whether or not to loop. The syntax is as follows.

> **Example**:
>
> ```c
> do {
>     // some code
>     x--;
> } (while x > 5)
> ```

Note that the output for this example would be different from previous example.

The do-while loop can sometimes come in handy.

#### For Loop

Use this if the number of iteration is known. For-loops are generally useful when dealing with [arrays](#Array).

>**Example**:
>
>```c
>int apples = 10;
>for (int i = 0; i < 10; i++) {
>    // do something here
>}
>```
>
>Note that we don't need to have an explicit increment/decrement commands inside the loop.

## File IO

This is the same as regular IO, except dealing with files.

A standard program with File IO might look like this:

```c
#include <stdio.h>

#define FILE_NAME "somefile.txt"

int main(void) {
    FILE* file;

    file = fopen(FILE_NAME, "r");

    if (file == NULL) {
        // error
    } else {
        // do some file stuff
        fclose(file)
    }
}
```

There are several things to point out:

- `#include <stdio.h>` must be included
- Filename is a string and can be set as a symbolic constant using `#define` directive
- The file pointer variable is defined using type  `FILE*`
- The file is opened by calling the function `fopen`, the first parameter is the file name and the second parameter specifies whether we want to **read** or **write**:
  - **Read**: use `"r"`
  - **Write**: use `"w"`
- Check that the file is open correctly using `if (file == NULL)`; do something appropriate about it
  - This can happen when the program can't find the file specified or the program doesn't have permission to access the file
- After we're done everything, call `fclose()` to close the file. **Important** to note that the parameter is the file pointer variable, **not** the file name.

### File Output

File output uses the function `fprintf` and it is very straightforward. It is the exact same as `printf` *except* with an extra parameter at the beginning that takes in the file pointer.

### File Input

Use `fscanf` to read from file. The syntax is the same as `scanf` *except* that there is an extra parameter at the beginning that takes the file pointer.

> **Example**:
>
> ```c
> // assume file opened with file pointer 'file'
> int sum = 0;
> while (fscanf(file, "%d", &number) == 1) {
>     sum += number;
> }
> ```
>
> This code snippet would go into the `do some file stuff` stuff from previous example.
>
> Function `fscanf` returns the number of elements read. If it returns 0 when we expect something, then either the format specifier is wrong, the file has wrong data, or we have reached the end of the file. Hence the `while` loop.

## Functions

## Arrays

## Others

### Random

