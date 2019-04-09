---
title: Normal Distribution
date: 2017-10-11
categories: ELEC 321
use_math: true
---

TODO: Fixed required

- toc
{:toc}

## Standard Normal

*Standard Normal Random Variable* is denoted by $$Z$$. The notation $Z$ ~ $N(0,1)$ means that "$Z$ is a normal random variable mean of 0 and variance of 1". 

### Density Function

The standard normal density is given by
$$
\varphi(z)=\frac{1}{\sqrt{2\pi}}e^{-(\frac{z^2}{2})},\quad-\infty<z<\infty
$$

### Distribution Function

The standard normal distribution function is given by
$$
\Phi(z)=\int_{-\infty}^z\varphi(t)\mathrm dt
$$

> **Note**: $\Phi(z)$ cannot be calculated in close form

Therefore, it is usually better to use the *standard normal table* or the function `pnorm(z)`.

Due to the symmetry of the distribution function
$$
\boxed{\Phi(z)=1-\Phi(-z)}
$$

### Mean

The mean, or expected value is given by (as always):
$$
\mathbb E(Z)=\int_{-\infty}^\infty z\varphi(z)\mathrm dz=0
$$
Notice the expected value for standard normal is at 0 since the standard normal centers around 0.

### Variance

$$
\text{Var}(Z)=\int_{-\infty}^\infty z^2\varphi (z)\mathrm dz=1
$$

> **Example**: concrete mix
>
> A machine fills 10-pound bags of dry concrete mix. The actual weight of the mix put into the bag is a normal random variable with standard deviation $\sigma=0.1$ pound. The mean can be set by the machine operator
>
> **a**.  is the mean at which the machine should be set if at most 10% of the bags can be underweight?
>
> Let $X\sim \text{Norm}(\mu, \sigma^2)$ where $X$ is the actual weight. Thus we can express the following.
> $$
> \mathbb P(X<10)\leq 0.1
> $$
> Which means the probability of weight less than 10 pounds is 0.1. 
> $$
> \begin{align}
> \mathbb P(\frac{x-\mu}{\sigma}<\frac{10-\mu}{\sigma})&\leq0.1\\
> \mathbb P(z<\frac{10-\mu}{0.1})&\leq0.1\\
> \implies\Phi(\frac{10-\mu}{0.1})&\leq0.1\\
> \implies \frac{10-\mu}{0.1}&\leq \Phi^{-1}(0.1)\\
> \mu&\geq 10-0.1\Phi^{-1}(0.1)
> \end{align}
> $$
>
> $$
> \begin{align}
> \mathbb P(\frac{x-\mu}{\sigma}<\frac{10-\mu}{\sigma})&\leq0.1\\
> \mathbb P(z<\frac{10-\mu}{0.1})&\leq0.1\\
> \implies\Phi(\frac{10-\mu}{0.1})&\leq0.1\\
> \implies \frac{10-\mu}{0.1}&\leq \Phi^{-1}(0.1)\\
> \mu&\geq 10-0.1\Phi^{-1}(0.1)
> \end{align}
> $$
>

### Standard Deviation

Since the variance equals to 1, standard deviation also equals to 1: $\sigma=1$.



## Measurement Error Model

Suppose we have:

- Measurements $X_i$ ($X_1,X_2,\dotsc,X_n$)
- "True" value $\mu$
- "Inverse precision" of the measurements (variance) $\sigma$
- Measurement error in the *standard* scale $Z_i\sim \text{Norm}(0,1)$
- Measurement error in the original scale $\sigma Z_i$

Then we can model the errors as follows.
$$
\boxed{X_i=\mu+\sigma Z_i,\quad i=1,2,\dots,n}
$$
Using this equation, we can find the error of the individual measurement to be
$$
\boxed{Z_i=\frac{X_i - \mu}{\sigma},\quad i=1,2,\dotsc,n}
$$

## General Normal Random Variables

This applies to any normal random variables that aren't **standardized**. These random variables are denoted as $X\sim \text{Norm}(\mu,\sigma^2)$, which stands for "X is a normal random variable with a mean of $\mu$ and a variance of $\sigma^2$". 

Manipulating the mean ($\mu$) shifts the distribution left and right. Manipulating the variance ($\sigma^2$) changes the amplitude and thickness of the distribution.

###Mean and Variance

Recall that $X=\mu+\sigma Z$ and $Z\sim\text{Norm}(0,1)\iff Z=\frac{X-\mu}{\sigma}$ , we can substitute $Z$ into $X$ and find the *expected value* and *variance* functions.
$$
\begin{align}
\mathbb E(X)&=\mathbb E(\mu+\sigma Z)=\mu+\sigma\underbrace{\mathbb E(Z)}_0\\
\mathbb E(X)&=\boxed{\mu}
\end{align}
$$

$$
\text{Var}(X)=\text{Var}(\mu+\sigma Z)=\sigma^2\underbrace{\text{Var}(Z)}_1=\boxed{\sigma^2}
$$

### Distribution Function

First, start with the definition of distribution function.
$$
F(x)=\mathbb P(X\leq x)
$$
Next, we subtract $\mu$ and divide $\sigma$ on both sides of the inner inequality.
$$
=\mathbb P\left(\frac{X-\mu}{\sigma}\leq\frac{x-\mu}{\sigma}\right)
$$
Recall that $Z=\frac{X-\mu}{\sigma}$, we plug it in.
$$
=\mathbb P\left(Z\leq \frac{x-\mu}{\sigma}\right)
$$
Notice that this is the standard normal distribution function. Thus,
$$
\boxed{F(x)=\Phi\left(\frac{x-\mu}{\sigma}\right)}
$$


### Density Function

Recall that $F'(X)=f(x)$and $\Phi'(z)=\varphi(z)=\frac{1}{\sqrt{2\pi}}e^{-\frac12z^2}$, the density function is simply as follows.
$$
\begin{align}
f(x)=F'(x)&=\frac{1}{\sigma}\varphi\left(\frac{x-\mu}{\sigma}\right)\\
f(x)&=\boxed{\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac12\left(\frac{x-\mu}{\sigma}\right)^2}}
\end{align}
$$

> **Example**:
>
> Let $Z\sim\text{Norm}(0,1)$, calculate:
>
> - $\mathbb P(0.1\leq Z\leq 0.35)$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(0.10\leq Z\leq 0.35)&=\Phi(0.35)-\Phi(0.10)\\
>   > &=\boxed{0.0970}
>   > \end{align}
>   > $$
>   >
>   > **Note** that $\Phi(x)$ can be calculated in *R* using the `pnorm(x)` function.
>
> - $\mathbb P(Z\gt 1.25)$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(Z>1.25)&=1-\mathbb P(Z\leq 1.25)\\
>   > &=1-\Phi(1.25)\\
>   > &=\boxed{0.1056}
>   > \end{align}
>   > $$
>   >
>
>
> - $\mathbb P (Z\gt -1.20)$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(Z>-1.20)&=1-\mathbb P(Z\leq -1.20)\\
>   > &=1-\Phi(-1.20)\\
>   > &=1-(1-\Phi(1.20))\\
>   > &=\Phi(1.2)\\
>   > &=\boxed{0.8849}
>   > \end{align}
>   > $$
>   >
>
> - Find such that $\mathbb P(Z\gt c)=0.05$
>
>   > $$
>   > \begin{align}
>   > 1-\Phi(c)&=0.05\\
>   > \Phi(c)&=0.95\\
>   > c&=\boxed{\Phi^{-1}(0.95)}
>   > \end{align}
>   > $$
>   >
>   > **Note** that the inverse of standard normal *CDF* function can be calculated in *R* using `qnorm(0.95)`
>
> - Find $c$ such that $\mathbb P(|Z|<c)=0.95$ 
>
>   > $$
>   > \begin{align}
>   > \mathbb P(|Z|>c)&=\mathbb P(-c<Z<c)\\
>   > &=\Phi(c)-\Phi(-c)\\
>   > &=\Phi(c)-(1-\Phi(c))\\
>   > 0.95&=2\Phi(c)-1
>   > \end{align}
>   > $$
>   >
>   > Rearrange the terms we can find $\Phi(c)$. Once again, we can use the `qnorm(c)` function in *R* to find $c$. 
>   > $$
>   > \begin{align}
>   > \Phi(c)&=\frac{1.95}{2}=0.975\\
>   > &=\Phi^{-1}(0.975)\\
>   > &=\boxed{1.96}
>   > \end{align}
>   > $$
>   >

> **Example**:
>
> Let $X\sim \text{Norm}(3, 25)$, calculate:
>
> - $\mathbb P(X>4)$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(X>4)&=1-\mathbb P(X<4)\\
>   > &=1-\Phi\left(\frac{4-3}{5}\right)\\
>   > &=1-\Phi(0.2)\\
>   > &-\boxed{0.421}
>   > \end{align}
>   > $$
>   >
>
> - $\mathbb P(2<X<4)$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(2<X<4)&=F(4)-F(2)\\
>   > &=\Phi\left(\frac{4-3}{5}\right)-\Phi\left(\frac{2-3}{5}\right)\\
>   > &=\Phi(0.20)-\Phi(-0.20)\\
>   > &=2\Phi(0.20)-1\\
>   > &=\boxed{0.159}
>   > \end{align}
>   > $$
>   >
>
> - $\mathbb P(X<1)$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(X<1)&=F(1)\\
>   > &=\Phi\left(\frac{1-3}{5}\right)\\
>   > &=\Phi(-0.40)\\
>   > &=1-\Phi(0.40)\\
>   > &=\boxed{0.345}
>   > \end{align}
>   > $$
>   >
>
> - $c$ such that $\mathbb P(X>c)=0.10$
>
>   > $$
>   > \begin{align}
>   > \mathbb P(X>c)&=0.10\\
>   > 1-F(c)&=0.10\\
>   > 1-\Phi\left(\frac{c-3}{5}\right)&=0.10\\
>   > \Phi\left(\frac{c-3}{5}\right)&=0.90\\
>   > \frac{c-3}{5}&=\Phi^{-1}(0.90)\\
>   > c&=\Phi^{-1}(0.90)\times5+3
>   > \end{align}
>   > $$
>   >

