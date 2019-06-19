---
author: Muchen He
title: Curses, Circle, and Golf
date: 2019-05-29
categories: projects
tag: [programming, project, python, curses, code golf]
---

A while ago I learned to draw circles using Bresenham's algorithm (thanks CPEN 311). I also stumbled upon Python's curses library which enables interactive GUI in the command line. So I decided to make an animated circle that runs in the command line. And then code golf it.

<!-- excerpt -->

## Curses

*Curses* is a built-in library to Python 3. In a nutshell, we can "draw" shapes and text on the command line/terminal window. I won't go too much detail into how to write program using *curses*.

There are multiple ways to instantiate the window object in *curses*. I will use the wrapper which handles the lifetime of the screen, and we will put everything we want to do in the `main` function:

```python
import curses

def main(screen):
	"""screen will be passed by the curses wrapper caller"""
    # do our stuff

# entry point
if __name__ == '__main__': curses.wrapper(main)
```

This is our bare minimum code. Here are some useful functions that I will use:

- To add text to the screen, use `screen.addstr(row, col, str)`. Note that we specify the coordinates with row (y coords) first.
- After all the `addstr` calls, we need to call `screen.refresh()` to apply and render it onto the terminal screen.
- To clear the screen, use `screen.clear()`.
- To get the key that the user is pressing, use `screen.getch()` and it will return the key code.
- By default, the program will always wait for user input before updating to the next frame. Use `screen.nodelay(True)` to tell it not to wait for user input.
- To get the terminal screen height and width, use `screen.getmaxyx()`. Also note that the values are ordered Y first, then X.
- Lastly, to hide the blinking cursor, use `curses.curs_set(0)`.

## Circle

I won't go over specifics of how to draw a circle using Bresenham's algorithm but you can find it [here on GeeksforGeeks](https://www.geeksforgeeks.org/bresenhams-circle-drawing-algorithm/). A simple implementation of the algorithm, in combination of the curses functions would be like this:

```python
def circle(screen, x_center, y_center, radius):
    def draw_piece(screen, x_center, y_center, x, y):
        x, y = int(x), int(y)
		screen.addstr(y_center + y, x_center + x, '*')
		screen.addstr(y_center + y, x_center - x, '*')
		screen.addstr(y_center - y, x_center + x, '*')
		screen.addstr(y_center - y, x_center - x, '*')
		screen.addstr(y_center + x, x_center + y, '*')
		screen.addstr(y_center + x, x_center - y, '*')
		screen.addstr(y_center - x, x_center + y, '*')
		screen.addstr(y_center - x, x_center - y, '*')
	
	x = 0
	y = radius
	d = 3 - 2 * radius

	draw_piece(screen, x, y)
	while y >= x:
		x += 1
		if d > 0:
			y -= 1
			d += 4 * (x - y) + 10
		else:
			d += 4 * x + 6
		draw_piece(screen, x, y)

	screen.refresh()
```

Cool, now let's use the `circle()` function in `main()` and animate it by looping:

```python
def main(screen):
    frame_count = 0
    
    # set up curses
    curses.curs_set(0)
    screen.nodelay(True)
    
    # infinite loop
    while True:
        # get user key input
        key == screen.getch()
        
        # if q is pressed, quit
        if key == ord('q'):
            break
        
        # clear
        screen.clear()
        
        # get geometry and draw circle at the center of the screen
        # the radius of the circle is sinusoidal based on frame count
        height, width = screen.getmaxyx()
        radius = 10 * (math.sin(frame_count * 0.05) + 1) + 5
     	circle(screen, width // 2, height // 2, radius)
        
        # increment frame count
        frame_count += 1
```

When we run this in Python, we get:

![animated circle](/assets/blog/circle_animated.gif)

To quit, simply press `q`.

## Golf

[Code golf](https://en.wikipedia.org/wiki/Code_golf) is a silly thing where we want to make the shortest possible code at the cost of readability and efficiency. Note that I'm by no means good at code golf (probably because I suck at programming in general) so feedback is welcome.

Let's first look at the function `circle` and `draw_piece`. There is a lot of repetitive code, so let's turn the permutations of different coordinates into a list. Then iterate through the list and call `addstr` into a loop. 

```python
def draw_piece(screen, x, y):
	x, y = int(x), int(y)
	a, b = [y, y, -y, -y, x, x, -x, -x], [x, -x, x, -x, y, -y, y, -y]
	for p in zip(a, b):
		screen.addstr(y_center + p[0], x_center + p[1])
```

Since the lists `a` and `b` are only used once, there is no need to put them in a variable.

```diff
def draw_piece(screen, x, y):
	x, y = int(x), int(y)
-	a, b = [y, y, -y, -y, x, x, -x, -x], [x, -x, x, -x, y, -y, y, -y]
+	for p in zip([y, y, -y, -y, x, x, -x, -x], [x, -x, x, -x, y, -y, y, -y]):
		screen.addstr(y_center + p[0], x_center + p[1])
```

Let's also remove all the white space, and use one character for variable and function names.

```diff
-def draw_piece(screen, x, y):
+def d(s, x, y):
	x, y = int(x), int(y)
	for p in zip([y, y, -y, -y, x, x, -x, -x], [x, -x, x, -x, y, -y, y, -y]):
-		screen.addstr(y_center + p[0], x_center + p[1])
+		s.addstr(u + p[0], v + p[1])
```

Remove all whitespace and use a single space for indentation to use less characters.

```python
def d(s,x,y):
 x,y=int(x),int(y)
 for p in zip([y,y,-y,-y,x,x,-x,-x],[x,-x,x,-x,y,-y,y,-y]):s.addstr(u+p[0],v+p[1])
```

The variables `y_center` and `x_center` are located in the outer scope. We can move the `getmaxyx()` call from `main` to here so that we're not passing the values all the way down. But this means we are calling `getmaxyx()` eight times per frame. Oh well, speed is not the objective here. It will make the `d()` function longer, but it will make the overall code smaller.

```python
# note that we're not passing center x and y to c() anymore
def c(s,r):
 h,w=s.getmaxyx()
 def d(s,x,y):
  x,y=int(x),int(y)
  for p in zip([y,y,-y,-y,x,x,-x,-x],[x,-x,x,-x,y,-y,y,-y]): s.addstr(h//2+p[0],w//2+p[1])
 # ...
```

Removing white space in the `c()`:

```diff
def c(s,r):
	# ...
	
-	x = 0
-	y = radius
-	d = 3 - 2 * radius
+	x,r,d=0,r,3-2*r
	h,w=s.getmaxyx()

-	draw_piece(screen, x, y)
+	d(s,x,y)

	while y >= x:

		x += 1
		if d > 0:
-			y -= 1
-			d += 4 * (x - y) + 10
+			y,d=y-1,d+4*(x-y)+10

		else:
			d += 4 * x + 6

-		draw_piece(screen, x, y)
+		d(s,x,y)

-	screen.refresh()
+	s.refresh()
```

Now we remove whitespace and use single character indentation, and we finally get:

```python
def c(s,r):
 # ...
 x,r,d,h,w=0,r,3-2*r,*s.getmaxyx() # using '*' to unroll
 d(s,x,y)
 while y>=x:
  x+=1
  if d>0:y,d=y-1,d+4*(x-y)+10
  else:d+=4*x+6
  d(s,x,y)
 s.refresh()
```

It turns out that it makes no difference if we use `y>x` and discard the first `d(s,x,y)` call, so let's remove those. That means we are only calling the function `d()` once, so let's just get rid of the function. The result is:

```python
def c(s,r):
 s.clear()
 x,y,d,h,w=0,r,3-2*r,*s.getmaxyx()
 while x<y:
  a,b,x=int(x),int(y),x+1
  for p in zip([b,b,-b,-b,a,a,-a,-a],[a,-a,a,-a,b,-b,b,-b]):s.addstr(h//2+p[0],w//2+p[1],'*')
  if d>0:y,d=y-1,d+4*(x-y)+10
  else:d+=4*x+6
 s.refresh()
```

Now let's optimize the main function:

```python
# BEFORE
def main(screen):
	frameCount = 0

	curses.curs_set(0)
	screen.nodelay(True)

	while True:
		key = screen.getch()
		if key == ord('q'):
			break
            
        screen.clear()

		height, width = screen.getmaxyx()

		radius = 10 * (math.sin(frameCount * 0.05) + 1) + 5
		circle(screen, width // 2, height // 2, radius)

		frameCount += 1
```

```python
# AFTER
def m(s):
 s.nodelay(1)
 i=1
 while 1:
  if s.getch()==49:break
  c(s,9*math.sin(i)+15)
  i+=.1
```

Changes:

- Function and variable names reduces to one character.
- Removed whitespace and used a single space character for indentation.
- Using `1` instead of `True` to save 3 characters.
- Removed `curs_set` because cursor is not that big of a deal.
- Removed extra math done on `frameCount`.
- Reduced maximum radius from 10 to 9 to save a single character.
- Using integer key code instead of calling `ord()`. But now it means we press `1` to quit instead of `q`.
- Removed `getmaxyx` call because that's done in the circle function already.

Finally, we need to make sure:

- No empty lines at the end of the file.
- The file is saved with LF line ending instead CRLF. This will save one character per line of code.

### Result

Here is the final code:

```python
import curses,math
def c(s,r):
 s.clear()
 x,y,d,h,w=0,r,3-2*r,*s.getmaxyx()
 while x<y:
  a,b,x=int(x),int(y),x+1
  for p in zip([b,b,-b,-b,a,a,-a,-a],[a,-a,a,-a,b,-b,b,-b]):s.addstr(h//2+p[0],w//2+p[1],'*')
  if d>0:y,d=y-1,d+4*(x-y)+10
  else:d+=4*x+6
 s.refresh()
def m(s):
 s.nodelay(1)
 i=1
 while 1:
  if s.getch()==49:break
  c(s,9*math.sin(i)+15)
  i+=.1
curses.wrapper(m)
```

Total size: **381 bytes**. Link to the code can be found [here](https://github.com/FSXAC/Golf).

