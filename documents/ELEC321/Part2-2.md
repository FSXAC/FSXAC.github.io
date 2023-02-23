---
title: Three Important Distributions
date: 2017-10-31
categories: ELEC 321
use_math: true
---


- toc
{:toc}

## Uniform

If random variable $$X\sim\text{Uniform}(a, b)$$ if and only if the PMF

$$
f(x)=\begin{cases}
\frac{1}{b-a} & \text {if }a<x<b\\
0&\text{otherwise}
\end{cases}
$$

The distribution function is just the sum of the PMF from 0 to the value of interest.

The corresponding **mean** and **variance** is:

$$
\mu=\frac{b+a}{2}\\
\sigma^2=\frac{1}{12}(b-a)^2
$$

> **Example**: application of the uniform distribution include the noise generated from a quantizer

## Exponential

Exponential random variables has the distribution function

$$
F(x)=1-e^{-\lambda x}
$$

The PMF is the derivative.

$$
f(x)=\lambda e^{-\lambda x}
$$

The distribution takes one parameter $$\lambda$$, which is the rate of occurrence. $$\lambda >0$$.

The associated **mean** and **variance** can be calculated as follows.

$$
\mu=\frac{1}{\lambda}\\
\sigma^2=\frac{1}{\lambda^2}
$$

The exponential random variables holds the the **memoryless property**: which states

$$
F(x+h)=F(h)
$$

## Gaussian / Normal

If random variable $$X$$ follows a normal distribution, $$X\sim\text{N}(\mu, \sigma^2)$$, its density function and distribution is as follows.

$$
f(x)=\frac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

$$
\Phi(x)=\frac{1}{2\pi}\int_{-\infty}^xe^{-\frac{s^2}{2}}\mathrm ds
$$



