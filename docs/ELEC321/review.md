---
title: Review Session
date: 2017-12-06
categories: ELEC 321
use_math: true
---

TODO: Fixed required

- toc
{:toc}

## Problems

### Problem 1

Suppose we have $Z_n=\frac{3}{4}Z_{n-1}+X_n$ with $Z_0=0$ where $X_n\sim \text{Bernoulli}$

We can start by finding the Fourier transform of $Z$:
$$
Z(f)=\frac{3}{4}Z(f)e^{-j2\pi f}+X(f)
$$
Now factor out $Z(f)$ and find the $H(f)$:
$$
H(f)=\frac{1}{1-\frac{3}{4}e^{-j2\pi f}}
$$
We recognize that the signal in time domain is
$$
h(n)=(\frac{3}{4})^n u(n)
$$
Thus we know that the output has $h(n)$ convolved with the input (product in frequency domain)
$$
Z_n=h_n*X_n=\sum_{m=-\infty}^\infty X_m h_{n-m}=\sum_{m=1}^n X_m (\frac{3}{4})^{n-m}\\
=X_1(\frac34)^{n-1}+X_2(\frac34)^{n-2}+\dots+X_n
$$
**What is the expected value of $Z_n$?**
$$
\mathbb E(Z_n)=\mathbb E(X_1(\frac34)^{n-1})+\mathbb E(\dots)+\dots\\
=\mathbb E(X_1)(\frac34)^{n-1}+\mathbb E(X_2)(\frac34)^{n-2}+\dots\\
$$
Since $\mathbb E(X_1)=\mathbb E(X_2)=\dots$, then
$$
=\mathbb E(X)[1+\frac34+(\frac34)^2+\dots]\\
=\mathbb E(X)\frac{1-(\frac34)^n}{1-\frac34}
$$
Since the second term is a geometric series.

We see that as time $n$ increases, the mean of $Z$ is changing, thus $Z$ is not a stationary process.



### Problem 2

Packets arrive at probability $a$; packets depart at probability $b$. The buffer can hold up to $N$ packets. Let $X_n$ be the number of packets in the buffer at time $n$.

**Show that the system can be modelled by Markov Chain:**

Since at any time $n$ we don't care about the number of packets in the buffer at time $n-2$ (history) if we already have all the information $n-1$. In particular,
$$
\mathbb P(X_{n+1}=x_{n+1}|X_n=x_n, X_{n-1}=x_{n-1\dots})
$$
The conditional stuff (after that $|$ symbol) in the probability is useless information as far as the buffer is concerned.

There are total of $N+1$ states in the Markov chain: state $\in\{0,1,\dots,n-1,n,n+1,\dots,N-1, N\}$

For state 0: there are two possible states to go to:

- There is a $1-a$ probability that we will stay in state 0
- probability $a$ to go to state 1

For state $N$: there are also only two possible states to go

- $1-b$ probability that we stay in state $N$
- $a$ is the probability that we go to state $N-1$

For any state in between (state 1 to state $N-1$) there are three possible outcomes:

- probability of $b(1-a)$ of going to a lower state; since we need one packet to be transmitted and no packets arrive. The probabilities are $b$ and $1-a$ respectively. Since packet being received by the buffer and transmitted by the buffer is independent, the probability that $X_n$ goes from some number $k$ to $k-1$ is $b(1-a)$.
- probability of $a(1-b)$ of going to a higher state (same argument from above applies)
- probability of $ab+(1-a)(1-b)$ of staying in the same state. This occurs when (no packets are received $\wedge$ no packets are transmitted) $\vee$ (packet arrives $\wedge$ packet transmitted).

Therefore, the transition matrix is:
$$
P=\begin{bmatrix}
1-a & a & 0  & 0 & \cdots &0&0\\
b(1-a) & ab+(1-a)(1-b) & a(1-b) & 0 & \cdots &0&0\\
\vdots	& \ddots && &&& \vdots\\
0 &0&0&0&\cdots&b&1-b
\end{bmatrix}
$$
To find the **stationary distribution**, we use the fact that 
$$
\pi=\pi P
$$
Do the matrix multiplication and we obtain $N$ equations for $N$ variables: $\pi_1,\pi_2\dots, \pi_N$.

The equations are:
$$
\begin{align}
\pi_0&=\pi_0(1-a)+\pi_1b(1-a)\\
\pi_1&=\pi_0(a)+\pi_1(ab+(1-a)(1-b))\dots\\
\vdots\\
\pi_N&=\dots
\end{align}
$$
Then we substitute every equation in terms of $\pi_0$, and for general $n$, we find the pattern: 
$$
\pi_n=\frac{a^n(1-b)}{b^n(1-a)^n}\pi_0
$$
Then find $\pi_0$ by setting an initial condition.



## Office Hour

The variance for two normal random variables added together is the sum of two variances. (Proof later)















