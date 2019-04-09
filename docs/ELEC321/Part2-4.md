---
title: Random Process
date: 2017-10-31
categories: ELEC 321
use_math: true
---

TODO: Fixed required

- toc
{:toc}

Also known as the *stochastic* processes. It is the outcome of the random experiment as a function of time or space, etc. They are random variables indexed by the time or space variable.

If the index is countable set, then the random process is **discrete-time**. Else if the index is continuous, then the random process is **continuous-time**.

## Characterization and Statistics

### Discrete-time (DT) Random Processes

**Definition**: A family of random variables $X(\omega, n)$, indexed by discrete time $n=1,2,\dots$ and outcomes $\omega\in\Omega$.

Each outcome $\omega$ in the sample space $\Omega$ yields a **sample path** $\{X(\omega, n\}$

- Fixing outcome $\omega$: yields a deterministic function of time
- Fixing time $n$: yields random variable
- Fixing both $\omega$ and $n$: yields a constant

We denote this random process as $X_n=X(\omega, n)$.

### Specifying DT Random Processes

We have PMF and CDF to describe random variables, but how do we describe random processes?

We characterize a DT random process by **joint probabilities** for vectors of samples of the process.

`equation on slide 5`
$$
F_{X_1,X_2,\dots,X_T}(x_1, x_2,\dots,x_T)=\mathbb P(X_1\leq x_1,\dots,X_T\leq x_T)\\
=\mathbb P(X_T\leq x_T|\underbrace{X_1\leq x_1,\dots,X_{T-1}\leq x_{T-1}}_{\text{history}(1:T-1)})\times\cdots\times\mathbb P(X_1\leq x_1)
$$


## Independent and Identically Distributed Processes

A DT random process is *IID* if the two properties hold:

1. Independent (no memory)
   $$
   \mathbb P(X_k=x_k|X_1,\dots X_{k-1})=\mathbb P(X_k=x_k)
   $$

2. Identically distributed (time-invariant distribution)
   $$
   \mathbb P(X_k=x_k)=f_{X_k}(x_k)\equiv f_X(x_k)
   $$


Because of the two properties, the joint PMF becomes the product:
$$
f_{X_1, X_2,\dots,X_T}(x_1, \dots,x_T)=f_X(x_1)f_X(x_2)\dots f_X(x_T)
$$

> **Example**: flipping a coin
>
> Flipping heads or tails follows the *Bernulli* random variable. 
>
> The joint probability of flipping the sequence {H, T, T, H} is:
> $$
> \mathbb P(X_1=1, X_2=0, X_3=0, X_4=1)\\
> =\mathbb P(X_1=1)\mathbb P(X_2=0)\mathbb P(X_3=0)\mathbb P(X_4=1)\\
> =p^2(1-p)^2
> $$
>

> **Example**: counting arrivals
>
> The random variable follows the *Poisson* distribution where $n=1,2,\dots$.
> $$
> X_n\sim\text{Poisson}(\lambda)=\frac{\lambda^2 e^{-\lambda}}{k!}
> $$
>

> **Example**: counting arrivals with time
>
> If random variable $X_n\sim \text{Poisson}(\lambda _n)$. In particular, for $n=1,2\dots$
> $$
> =\frac{\lambda^k_n e^{-k_n}}{k!}
> $$
> This would **not** be an IID process since the distribution changes with time, and thus not identical.
>
> The solution is that $p_{k+1}=\frac{\lambda}{k+1}p_k$  and $p_o=e^{-\lambda}$. 

### Non-IID DT Random Processes

- Many practical processes have memory, which make them non-IID
- Combinations of IID processes doesn't guarantee IID process (may contain memory properties)
  - An example would be the *moving average* where $Z_n=\frac12(X_n+X_{n-1})$

If two random variables are statistically independent, then it follows that they are uncorrelated. By the same logic, to show that if the random variables are dependent, we could show that the two random variables are correlated. 

An example of non-IID random process are **Markov Chains**. In a Markov chain, the current $X_n$ only depends on the one previous, $X_{n-1}$.
$$
\mathbb P(X_n=x_n|X_{n-1},X_{n-2})=\mathbb P(X_n=x_n|X_{n-1})
$$

### Statistics of Random Processes

Consider DT random process $X(\omega, n)\in{x_1,x_2,\dots,x_M}$.

#### Mean

The mean of a random process is a deterministic time-varying signal:
$$
\mu_X(n)=\mathbb E[X(\omega,n)]=\sum_{i=1}^M x_i f_{X_n}(x_i)
$$
For IID processes, $\mu(n)=\mu$.

#### Auto-Covariance

Deterministic signal in two variables
$$
C_X(n_1, n_2)=\mathbb E[(X(\omega, n_1)-\mu_X(n_1))(X(\omega, n_2)-\mu_X(n_2))]
$$
This is the similarity of a signal with itself at different points in time.

For IID processes:
$$
C_X(n_1,n_2)=\text{Var}(X)\delta(n_2-n_1)
$$
So if $n_2$ is the same as $n_1$ (same time), then the auto-covariance is the variance of $X$, which is constant (since its not changing in time as the distributions are identical). Otherwise, it is 0 since independent implies no correlation.

#### Cross-Covariance

$$
C_{XY}(n_1,n_2)=\mathbb E[(X(\omega, n_1)-\mu_X(n_1))(Y(\omega, n_2)-\mu_Y(n_2))]
$$

This is the similarity of a signal with another signal at a different time.

#### Auto-Correlation Function

ACF is a deterministic signal in two variables where
$$
\begin{align}
R_X(n_1, n_2)&=\mathbb E\{X(\omega, n_1)X(\omega, n_2)\}\quad\text{(discrete)}\\
R_X(t_1, t_2)&=\mathbb E\{X(\omega, t_1)X(\omega,t_2)\}\quad \text{(continuous)}
\end{align}
$$
If $n_1=n_2$ (or $t_1=t_2$ in continuous case), then $R_X$ is the average power output of the signal.

##### Discrete-Time Continuous Valued Process

$$
m_X(n)=\mathbb E[X(n)]=\int_{-\infty}^\infty x f_{X_n}(x)\mathrm dx
$$

`should be a summation???`

##### Continuous-Time Continuous Valued Process

$$
m_X(t)=\mathbb E[X(t)]=\int_{-\infty}^{\infty}xf_X(t)\mathrm dt
$$

$$
R_X(t_1,t_2)=\mathbb E[X(t_1), X(t_2)]\\
=\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}xyf_{X(t_1)X(t_2)}(x,y)\mathrm dx
$$

##### Correlation Coefficient

$$
\rho_X(t_1, t_2)=\frac{C_X(t_1,t_2)}{\sqrt{C_X(t_1,t_1)C_X(t_2, t_2)}}
$$

`photo on Poisson process`

> **Random Process** an example of continuous time random processes based on IID processes
>
> 

## Stationary and Ergodic Processes

`notes from slides`



**Example 1**

Let $X_n$ be an IID process, and let $S_n=X_1+X_2+\dots +X_n$, is $S_n$ stationary?

Note that IID processes are **strict-sense stationary**. Because of central limit theorem, as we have more  random variables ($n$ increases), $S_n$ will have a normal distribution, and the parameters for normal distribution are mean and variance. Observe the mean:
$$
\mu_s(n)=\mathbb E(S_n)=\mathbb E(\sum_{i=1}^n X_i)=\sum_{i=1}^n \mathbb E(X_i)\\
=\sum_{i=1}^n \mu_x\\
=n\mu_x
$$
We see that the mean increases as the we add more $X_i$, thus $S_n$ is not wide-sense stationary. Thus it is also not strict-sense stationary.

**Example 2**

Let $X_n$ consist of two interleaved sequences of independent random variables.
$$
\begin{cases}
n\text{ is even} & \mathbb P(X_n=1)=\mathbb P_r(X_n-1)=\frac12\\
n\text{ is odd} & \mathbb P(X_n=\frac13)=\frac9{10},\quad\mathbb P(X_n=-3)=\frac{1}{10}
\end{cases}
$$
This is not strict-sense stationary.

But it is wide-sense stationary, since $\mu_x(n)=0$. Since the random variables are independent, the covariance is $C_X(i, j)=\sigma(i-j)$, and Kronecker delta function is time invariant.



If a process is stationary, it may further be Ergodic. 

### Ergodicity

**Example 1**
$$
X_n=X_{n-1},\quad X_0=...
$$


## Spectral Density

`Frequency Response`

**Example 1**: white process

Consider random process $X$ where its ACF is $R_X(n)=\sigma_x^2\delta(n)$ (scaled delta function). 

Taking the Fourier transform of the ACF, we get $S_X(f)=\sigma_x^2,\forall f\in[-\frac12,\frac12]$, since the Fourier Transform of the Kronecker delta function is 1. The ACF in frequency domain is a constant (spectrally white - all frequency contributes the same power). 

$X$ is a white process.

**Example 2**

If the random process $X$ has Gaussian distribution: $X\sim N(0, \sigma_x^2)$, then is a white Gaussian process.

## Processes and Linear Time-invariant Systems

White process, after LTI sys, $S_Y(f)=|H(f)|^2S_X(f)=|H(f)|^2\sigma_x^2$. The $|H(f)|^2$ is referred to as "Coloring"

Back to time domain, $R_Y(f)=\sigma_x^2 \Phi_n(n)$. 

## Application: MMSE Linear Approximation

**Preliminaries**: estimate a random variable $X$ based on observation of $Y$ such that the mean-square error (MSE) is minimized.
$$
x-g(y)=x-\hat x
$$
where $g(y)$ is the prediction of actual $x$. We want the mean squared error to be minimum:
$$
\mathbb E[X-g(Y)|^2]=\mathbb E[(X-g(Y))^2]
$$

1. Given no observation, then the argument $a*$ that will minimize the error is given as
   $$
   a^*=\text{argmin}_a\mathbb E[(X-a)^2]
   $$

   $$
   \text{MSE}=\mathbb E[(X-a)^2]=\mathbb E(X^2)-2a\mathbb E(X)+a^2\\
   $$

   Do the derivative to find the minimum
   $$
   \frac{\mathrm d\text{MSE}}{\mathrm da}=-2\mathbb E(X)+2a=0\\
   a^*=\mathbb E(X)
   $$

2. Linear estimator $\hat X=a Y+b$ (we have a scale $a$ and a shift $b$)

   So we need to minimize using the argument $a^*$ and $b^*$:
   $$
   (a^*,b^*)=\text{argmin}_{a,b}\mathbb E[(X-\hat x)^2]
   $$

   $$
   b^*=\mathbb E[(X-aY)]=\mathbb E(X)-a\mathbb E(Y)\\
   a^*=\text{argmin}_a\underbrace{\mathbb E[(X-aY-(\mathbb E(X)-a\mathbb E(Y))^2)]}_{\mathbb E_L}
   $$

   Again, take derivative to find minimum:
   $$
   \frac{\mathrm d\mathbb E[\mathbb E_L^2]}{\mathrm da}=\mathbb E[2\mathbb E_L\frac{\mathrm d\mathbb E_L}{\mathrm da}]\\
   =\boxed{\mathbb E[-2\mathbb E_L(Y-\mathbb E(Y))]=0}
   $$
   Turns out,
   $$
   a^*=\frac{\text{Cov(X,Y)}}{\text{Var}(Y)}=f_{x,y}\frac{\partial X}{\partial Y}
   $$
   ​

   `WIP`

   ​

   ​

   ​

   ​

   ​

