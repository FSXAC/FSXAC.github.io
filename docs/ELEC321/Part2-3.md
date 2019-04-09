---
title: Random Variable Generation
date: 2017-11-05
categories: ELEC 321
use_math: true
---

TODO: Fixed required

- toc
{:toc}

Given an *uniform random variable*, how do we generate random numbers with a specific probability distribution?

## Inverse Transform Algorithm

###Discrete Random Variables

To generate discrete random variables with distribution $\mathbb P(X=x_i)=p_i$, for $i=1,\dotsc,n$, we follow the following algorithm.

1. Generate continuous uniform random variable $Y\sim U(0,1)$
2. Set $X$ based on  where $Y$ is on the distribution:

$$
X=\begin{cases}
x_1& Y\in[0,p_1)\\
x_2 & Y\in[p_1, p_1+p_2)\\
x_3 & Y\in[p_1 + p_2, p_1 + p_2+p_3)\\
\vdots & \vdots\\
x_n & Y\in[\sum_{i=1}^{n-1}p_i,1)
\end{cases}
$$

#### Continuous Random Variables

To generate continuous random variables with distribution $F_X(x)$, follow these steps:

1. Generate continuous uniform random variable $Y\sim U(0,1)$
2. Find the inverse of the continuous distribution $F_X^{-1}(x)$ 
3. Set $X=F_X^{-1}(Y)$

"Pseudo" Proof: Suppose we have the uniform random variable $Y\sim U(0,1)$ and we use the inverse distribution function $F_X^{-1}$ to obtain random $X$. Note that the distribution function for $Y$ is, by definition, $P_Y(Y<y)=y$.
$$
\begin{align}
\mathbb P(X\leq x)&=\mathbb P(F_X^{-1}(Y)\leq x)\\
&=\mathbb P(Y\leq F_X(x))\\
&=F_X(x)
\end{align}
$$
Which is what we wanted.

> **Note**: This method does not work directly on Gaussian random variables, use [Polar Algorithm for Gaussian random variables](#polar-algorithm) instead.

## Polar Algorithm

As noted above, we can't use inverse transformation method for Gaussian random variables. In order to simulate continuous random variable to have the distribution $F_X(x)=N(0,1)$, we need to follow these steps:

1. Generate continuous uniform random variables $Y_1\sim U(0,1)$ and $Y_2\sim U(0, 1)$
2. Set $D=-2\ln(Y_1)$
3. Set $\Theta=2\pi Y_2$
4. Set $X=\sqrt{D}\cos(\Theta)$; $X$ is now a random variable with distribution $N(0,1)$
5. Set $Z=\sqrt{D}\sin(\Theta)$; $Z$ is now a random variable with distribution $N(0,1)$ that is also independent from $X$ 

To obtain a random variable with non-standard normal distribution $Z\sim N(\mu, \sigma^2)$, we use the *linear properties* of the Gaussian random variables.

1. Generate $X\sim N(0,1)$ using steps 1-4 above
2. Set $Z=\sigma X + \mu$; $Z$ is now a random variable with distribution $Z\sim N(\mu, \sigma^2)$ 

## Composition Method

Use this method if the distribution function $F_X$ is composed of a sum of other distribution functions $F_{X_i}$:
$$
F_X(x)=\sum_{i=1}^{n}p_i F_{X_i}(x)\qquad\sum_{i=1}^n p_i=1,\qquad p_i\geq 0
$$
Where $F_{X_i}$ are CDFs.

To get a random variable with distribution $F_X$, follow these steps:

1. Generate a random variable $I$ with discrete distribution $\mathbb P(I=i)=p_i$ for $i=1,2,\dotsc,n$ using the *Inverse Transform* method for discrete random variables
2. Generate a random variable $Y_I$ with distribution $F_{X_I}$ using the *Inverse Transform* method for continuous random variables
3. Set $X$=$Y_I$; $X$ is now a random variable with distribution $X\sim F_X(x)$

## Acceptance-Rejection Method

We can use this method if it's hard to use previous methods to generate a random variable $X$ with distribution $F_X$. 

So we find a *proposal distribution* $F_Y$ where it is easy to sample. Note that we must ensure the range of the density functions, $f_X$ and $f_Y$ are the same.

Next, we need to know the upper bound $a$, where $a\geq \frac{f_X(x)}{f_Y(x)}$.

With all that in mind, we may begin the algorithm:

1. Generate a random variable $Y$ from the distribution $F_Y$ using methods previously described
2. Generate a uniform random variable $Z\sim U(0,1)$
3. Check if $Z \leq \frac{f_X(Y)}{a f_Y(Y)}$
   - If true (accept), then set $X=Y$
   - Else (reject), go back to step 1 and try again

> **Note**: The probability of $Y$ being accepted is $\frac{1}{a}$, therefore we should always choose $a$ to be as small as possible given $a\geq 1$.

> **Example**: half normal distribution
>
> <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Half_normal_pdf.svg" height="240px">
>
> The half normal distribution function has the density $f_X=\frac{2}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$. The inverse CDF is very difficult to find, so we use the A-R method.
>
> The range of the density of this distribution spans $[0,\infty)$, so it would be appropriate to choose the exponential random variable distribution as our proposal distribution. The density of the proposal distribution is $f_Y(x)=e^{-x}$. 
>
> Thus
> $$
> \frac{f_X(x)}{f_Y(x)}=\frac{2}{\sqrt{2\pi}}e^{-\frac{x^2}{2}+x}
> $$
> Taking the derivative and the second derivative, we find the maximum is at $x=1$. Thus, our upper bound is
> $$
> \frac{f_X(1)}{f_Y(1)}=\frac{2}{\sqrt{2\pi}}e^\frac12\approx1.3=a
> $$
> Now we apply the A-R algorithm. First we generate an exponential random variable, $Y\sim f_Y$. 
>
> Next, we generate $Z\sim U(0,1)$.
>
> Lastly, we set $X=Y$ if $Z\leq \frac{\frac{2}{\sqrt{2\pi}}e^{y-\frac{y^2}{2}}}{1.3}$ 

## Vector Random Variables Generation

Suppose we have a vector consists of two random variables where $(x, y)\sim F_{X,Y}(x,y)$.

If $X$ and $Y$ are independent. Great! Then we can just generate each of them independently. 

If not, then the algorithm is as follows:

1. Express the joint PDF of the two random variables as a conditional PDF
   $$
   f_{X,Y}(x,y)=f_{y|x}(y|x)f_X(x)
   $$

2. For $i=1,2,\dotsc,n$ do:

   1. Generate $x_i\sim f_X(x)$
   2. Generate $y_i\sim f_{Y|X}(\left.\cdots\right|_{x=x_i})$

> **Example**:
>
> Suppose $f_{X,Y}(x,y)=x+y$ and $0\leq x,y \leq 1$, then the marginal PDF for $X$ is
> $$
> f_X(x)=\int_0^1 f_{X,Y}(x,y)\mathrm dy=x+\frac12
> $$
> Next, using the marginal PDF for $X$, we can find the conditional PDF:
> $$
> f_{Y|X}(y|x)=\frac{f_{X,Y}(x,y)}{f_X(x)}=\frac{x_i+y}{x_i+\frac{1}{2}}
> $$
> Following the rest of the algorithm, we sample $x_i\sim x+\frac12$ and sample $y_i\sim \frac{x_i + y}{x_i + \frac12}$ for all $i$'s.