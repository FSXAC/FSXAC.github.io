---
title: MATLAB Tutorial Session
date: 2017-10-13
categories: ELEC 341, ELEC 391
---

- toc
{:toc}
*Code and tutorial provided by [Madhi Yousefi](https://blogs.ubc.ca/mahdiyousefi/)*

## Commands

Every command will have a default return printed onto the screen. Prepending a `;` character at the end of the command will disable output, but the command is still executed. (eg. `a1 = 4;`)

### Useful Commands

```matlab
clear all		   % clears all variables from workspace
clc				  % clears command window

save('MyVar.mat');      % Save all Workspace variable into MyVar.mat
save('MyVar1.mat','r9') % Save only r9 into MyVar1.mat
load('MyVar.mat');      % Load MyVar.mat

delete('MyVar1.mat')    % Delete MyVar1.mat
```

### Environment

```matlab
mkdir ../example; 	% makes a directory
addpath ../exaple;	% add a defined path to current directory
cd ../example; 	    % changes directory
```

### Instance

Variables can be assigned, we don't need to worry about the type of variable.

```matlab
C = 'g';	% character
I = 123;	% integer
F = 3.14;	% float
```

### Basic Math Operators

```matlab
a1 = 2;
a2 = 5.3;
a3 = 1.2e2;     % 120
a4 = 12e-3;     % 0.012
r1 = a1+a2;     % summation
r2 = a1-a2;     % subtraction
r3 = a1 * a2;   % multiplication
r4 = a1 / a2;   % division
r5 = a2 ^ a1;   % power
```

### Complex Variables

```matlab
c1 = 10+12j;
c2 = 12+10i;
r1 = abs(c1);   % absolute value
r2 = imag(c1);  % imagibary part
r3 = real(c1);  % real part
```

> **Note** that when using `i` and `j`, there is no multiplication sign. `5*j` is different from `5j`.

### Vectors and Matrices

```matlab
v1 = [2 3 4 5]; 	% 1 by 4 row vector
v2 = [2 3 4 5]'; 	% 4 by 1 column vector
v3 = [2; 3; 4]; 	% 3 by 1 column vector, semicolon (;) seperates columns
v4 = 0:.1:10;   	% a vetor starting form 0 incrementing by .1 upto 10.

% 2 by 3 matrix, semicolon (;) seperates columns, the matirx must be properly defined
m1 = [1 2 3; 3 4 2];

m2 = zeros(3,4);     % 3 by 4 zero matrix
m3 = ones(2,3);      % 2 by 3 matrix with all elements equal to 1;
m4 = eye(2,2);       % 2 by 2 identity matrix
m5 = magic(2);
```

#### Accessing Elements

```matlab
v2(3) = dummy1;     % or v2(3,1) = dummy1;
m2(2,1) = dummy2;
```

#### Matrix Operations

```matlab
r1 = m1 + m3;       % summation
r2 = m1 - m3;       % subtraction
r3 = m4 * m1;       % multiplication
r4 = m4 ^ 2;        % power, r4 = m4 * m4
r5 = inv(4);        % inverse
m5 = m1';           % Transpose
```

#### Matrix Element-Wise Operations

If the operations needs to be done with individual corresponding elements, use element-wise operations.

```matlab
r6 = m1 .* 2;       % multiplying all elements of m1 by 2
r7 = m1 .* m3;      % elementwise multiplication of m1 and m3
r8 = m1 ./ 2;       % deviding all elements of m1 by 2
r9 = m1 .^3;        % elementwise power
```

## Control

### Loops

#### For Loop

The following example will loop from `i=1` to `i=10` at a step of `2`.

```matlab
for i = 1:2: 0;
    dummy = i^2;
    disp(dummy);
end
```

#### While Loop

```matlab
m = 0;
while m <= 10;
    m = m + 1;
    disp(m);
end
```

### Conditional

```matlab
m = 1;
if m == 0
	disp('m is zero.');
elseif m < 0
	disp('m is negative.')
else
	disp('m is positive.')
end
```

## Functions

Here is a function defined by the name of `foobar` that takes in parameters `input1` and `input2` and spits outputs `output1` and `output2`.

```matlab
function [output1, output2] = foobar(input1, input2)
	output1 = input1 + input2;
	output2 = input1 - input2;
end
```

## Plotting

In order to plot anything, we first need to specify the signal / data we want to plot. In this case, we are plotting a `sin` and `cos` wave.

```matlab
x = 0:.1:2*pi;
y1 = sin(x);
y2 = cos(x);
```

### Simple Plot

First we open the plot and pass it the signals desired.

```matlab
figure(1)               % open a new fiqure
plot(x,y1,'Color','red', 'LineStyle' , ':','LineWidth', 4);
```

#### Axis Font

```matlab
set(gca,'FontName','Times');
set(gca,'FontSize',14);
```

#### Axis Tick-marks

```matlab
set(gca,'XTick',[0 pi/2 pi 3*pi/2 2*pi]);
set(gca,'XTickLabel',{'0', 'pi/2', 'pi', '3pi/2', '2pi'});
```

#### Axis Limits

```matlab
xlim([0 2*pi]);         % or ax.XLim = [0 2*pi]
ylim([-1.5 1.5]);       % or ax.YLim = [-1.5 1.5]
```

#### Grid

```matlab
grid on;
```

If we want to specify the vertical or horizontal grids, then:

```matlab
ax.XGrid = 'on';
ax.YGrid = 'on';
```

#### Labels

```matlab
xlabel('x');            % or ax.XLabel.String = 'x'
ylabel('y_1');          % or ax.YLabel.String = 'y_1'
```

#### Title

```matlab
title('sine wave');
```

### More Variables In the Same Plot

To plot two functions in the same plot, we could use the `hold` commands and do something like:

```matlab
figure;
h1 = plot(x,y1,'Color','blue', 'LineStyle' , '--','LineWidth', 4);
hold on
h2 = plot(x,y2,'Color','red', 'LineStyle' , ':','LineWidth', 4);
hold off
```

Alternatively, we could also use the simplified version (although I think it's less easy to customize):

```matlab
plot(x,y1,x,y2)
```

#### Legends

```matlab
legend([h1,h2],{'sin','cos'}, 'FontName','Times','FontSize',16)
```

## Transfer Functions

Suppose we have a transfer function $$G(s)$$ we want to use in MATLAB. The transfer function is given as follows.

$$
G(s)=\frac{s}{s^2+3s+2}
$$

To create the transfer function, we use these commands:

```matlab
num = [1 0];     % numerator of G
den = [1 3 2];   % denumerator of G
G = tf(num,den); % define G, tf(num,den)
```

*Alternatively*, you could also do (I like this one)

```matlab
s = tf('s');
G = s / (s^2 + 3*s + 2)
```

If we want it in *zero-pole-gain* representation, we use this command.

```matlab
G1 = zpk(G);
```

### Plotting Responses

```matlab
pzmap(G);       % zero pole plot
impulse(G)      % impulse response
step(G);        % step response
bode(G);        % bode plot
rlocus(G);      % root locus plot
nyquist(G);     % nyquist plot
```

### Transfer Function Connections

```matlab
H = tf([1 1],[1 2]);
F = feedback(G,H);  % feedback connection
S = series(G,H);    % or P = G*H, series connection
P = parallel(G,H);  % or P = G+H, parallel connection
Gd = c2d(G,1);      % discretize G, c2d(tf,sampleTime)
Gc = d2c(Gd);       % Convert a discrete model to a continuous model
```

### Model Simulation

To simulate a model, let us first define the time interval / vector:

```matlab
t = 0:1:20;	% 0, 1, 2,..., 19, 20
```

Then we need to define the input:

```matlab
u = 5*sin(t);
```

Last we can use `lsim` to simulate. Then we can plot as usual.

```matlab
y = lsim(G,u,t);

figure;
subplot(2,1,1)
plot(t,y);      % plot input
ylabel('y');
xlabel('t');
subplot(2,1,2)
plot(t,u);      % plot output
ylabel('u');
xlabel('t');
```