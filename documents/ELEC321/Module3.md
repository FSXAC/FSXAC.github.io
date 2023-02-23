---
title: Random Variables
date: 2017-10-19
categories: ELEC 321
use_math: true
---

- toc
{:toc}

**Random Variables** are used to represent numerical features of a random experiment.

It is a function with a mapping from the sample space to real numbers.

- Usually denoted by $$X,Y,T,V,Z$$
- Possible values of $$X,Y,T,V,Z$$ is denoted by $$x,y,t,v,z$$

## Definition & Notation

A random variable is a function defined on the *sample space*.

$$
X:\Omega\rightarrow R\\
X(\omega)=x
$$

> **Example**
>
> - Experiment: flipping a coin 10 times
> - Sample space $$\Omega$$: All possible sequence of ten
> - Random variable $$X$$: Number of heads
> - Random variable $$Y$$: Largest run of tails
>
> Suppose $$\omega=(\text{HTTHHTTTHT})$$
>
> Then $$X(\omega)=4$$ and $$Y(\omega)=3$$

The event "random variable $$X$$ takes the value of $$x$$" is mathematically represented as $$X=x$$. Which means $$\{\omega:X(\omega)=x\}$$.

## Range of Random Variable

Random variable could be **discrete**  or **continuous**.

> **Example**:
>
> *Discrete*:
>
> $$X=$$ number of defect items in a factor: $$\{0,1,2\dotsc,N\}$$
>
> *Continuous*:
>
> $$Y=$$ percentage yield of a chemical process: $$[0,100]$$

## Discrete Random Variables

### Bernoulli

$$X$$ is said to be the *Bernoulli Random Variable* if its [probability mass function](#probability-mass-function) is given by:

$$
\mathbb P(X=0)=1-p\\
\mathbb P(X=1)=p
$$

Where $$p$$ is the probability that the trial is a success ($$0\leq p \leq 1$$).



## Expected Value

**Expected Value** is an *linear* operator used to summarize all the random variables and allows it to be operated mathematically. Consider a function $$g(X)$$, the operator *expected value* (denoted by $$\mathbb E$$) is defined as:

$$
\mathbb E[g(X)]=\sum_xg(x)f(x)
$$

Where $$f(x)$$ is the *PDF* given by $$f(x)=\mathbb P(X=x)$$. So since $$X$$ is random, $$g(X)$$ is a defined function (such as $$X^2$$) and is also random.

 The output of the *expected value* $$\mathbb E(g(X))$$ is given by $$\sum_x g(x)f(x)$$. (If $$g(x)=x$$, then the expected value is given as $$\sum_x xf(x)$$.

The expected value is a number that is the (duh) expected value of the random variable.

A good physical interpretation of the expected value would be the center of mass given a rod with different density throughout. The density would be the probability (hence the name *probability **density** function*). And the center of mass takes consideration of not only the density, but also **position**.

*Geometric Interpretation*: minimizing sum of square of distances.



> **Example**:
>
> There is 0.2 chance of getting 0, and 0.8 chance of getting 1.
>
> $$g(x)=X$$, and so $$\mathbb E(g(x)) = 0.8$$ which is misleading because the only two possible outcomes are 0 or 1.

### Random Variable as List

1. Find the mean (sum divided by number of elements in the list)
2. ???
3. profit

### Random Variable as "X"

If $$X$$ is the number of red balls drawn from a bucket of colored balls. Then use the following algorithm:

1. Identify possible output values for $$X$$
2. Compute the probability of getting each value of $$X$$
3. $$\mathbb E(g(X))=\sum_x g(x)f(x)=\sum_x x\cdot\mathbb P(X=x)$$ (Multiplying each value of $$X$$ by its corresponding probability)

## Probability Mass Function

**PMF**: Probability Mass Function (*A.K.K* Probability Mean Function, Probability Density Function) - denoted as $$f(x)=\mathbb P(X=x)​$$ because it act as weights.

The domain describes the possible values, and the range describes the probability of the possible values.

Properties of *PMF*:

1. $$0\leq f(x)\leq 1$$
2. $$\sum f(x) = 1$$
3. $$\mathbb P(X\in A)=\sum_{x\in A} f(x)$$

## Cumulative Distribution Function

**CDF**: Cumulative distribution function are denoted by upper case letters such as $$F, G, H$$. and they are defined as $$F(x)=\mathbb P(X\leq x)=\sum_{k\leq x}f(k)$$

Because of this we can also say: $$f(x)=F(x)-F(x-1)$$.

Properties of *CDF*:

1. $$0\leq F(x) \leq 1$$
2. $$F(x)$$ is non decreasing because it's accumulating
3. $$F(-\infty)=0, F(\infty)=1$$
4. $$\mathbb P(a\lt X \leq b) = F(b) - F(a)$$
5. $$f(k)=F(k)-F(k-1)$$

> **Example**:
>
> <img src="https://i.imgur.com/OBh4Jd9.png" height="300px">
>
> The random variable $$x$$ is quantified to probability as shown in $$f(x)$$. Also notice that the properties for *CDF* applies at the sum of the probability of *PMF* $$=1$$

> **Example**: sometimes the probability of random variables are not known completely
>
> | $$x$$   | $$f(x)$$    | $$F(x)$$    |
> | ----- | --------- | --------- |
> | **0** | $$(1-p)^2$$ | $$(1-p)^2$$ |
> | **1** | $$2p(1-p)$$ | $$1-p^2$$   |
> | **2** | $$p^2$$     | 1         |
>
> $$
> f(x)=\begin{cases}
> (1-p)^2 & x=0\\
> 2p(1-p)&x=1\\
> p^2 & x=2
> \end{cases}
> $$
>
> The **parameter** $$p$$ can be chosen to obtain a desired configuration of probabilities



## Law of Large Numbers

Suppose that $$X_1, X_2, X_3,\dotsc,X_n$$ are independent *measurement* of random variable $$X$$. Then it can be shown that as $$n\rightarrow \infty$$,

$$
\bar{X}=\frac1n(X_1+X_2+X_2+\dotsc+X_n)\rightarrow\mathbb E(X)\\
=\frac1n\sum_{i=1}^nx_i
$$

Mind that $$X_1,X_2,\dotsc,X_n$$ are measurements of random variable $$X$$, but once a measurement is made, *realization* occurs and they become $$x_1, x_2, \dotsc, x_n$$.

The **Law of Large Numbers** states that as the *sample average* ($$\bar{X}$$) will approach the *population average* ($$\mathbb E(x)$$). Using this, we can approximate $$f(x)$$ which is unknown in nature. More samples will yield more accurate approximation.

### Linearity

The operation $$\mathbb E$$ is a *linear operator*. Which means:

$$
\mathbb E[a+bg(X)]=\sum_x(a+bg(X))f(x)\\
=\sum_xaf(x)+\sum_xbg(X)f(x)\\
=a\sum_xf(x)+b\sum g(X)f(x)\\
=a+b\mathbb E[g(X)]
$$

## Moments

For any variable where $$g(x)=X^k, k=1,2,3\dots$$, the moment is given as

$$
\mu_k=\mathbb E(X^k)=\sum_xx^kf(x)
$$

The *moment generating function* is the *Laplace transform* of the *PMF*

$$
\mathbb M_X(t)=\mathbb E(e^{tX})=\sum_xe^{tx}f(x)
$$

By differentiating the *MGF*, we can get the first (first derivative), second (second derivative), and third moment and so on.

$$
\begin{align}
\frac{\mathrm d}{\mathrm dt}\mathbb M_X(t)\vert_{t=0}&=\mathbb M'_X(0)=\mu_1\\
\frac{\mathrm d^2}{\mathrm dt^2}\mathbb M_X(t)\vert_{t=0}&=\mathbb M''_X(0)=\mu_2\\
&\dots
\end{align}
$$

### Mean

The mean is the first moment ($$\mu_1$$) of the random variable.

$$
\mu=\mathbb E(X)=\sum xf(x)
$$

### Variance

The variance is the spread.

$$
\begin{align}
\sigma^2&=\text{Variance}(X)=\mathbb E[(X-\mu)^2]=\sum(x-\mu)^2f(x)\\
\sigma^2&=\mathbb E(X^2)-\mathbb E(X)^2\\
&=\mu_2-\mu^2
\end{align}
$$

### Standard Deviation

$$
\sigma=\text{Standard Deviation}(X)=+\sqrt{\sum(x-\mu)^2f(x)}
$$

When $$\sigma$$ is large, there is a large dispersion.

In practice, we do not know $$\sigma$$ because we are missing $$f(x)$$ so we will resort to measurements.

$$
\mathcal S^2=\frac1n\sum_{i=1}^n(x_i-\bar x)^2\rightarrow\sigma^2=\sum_x(x-\mu)^2f(x)
$$

Of course, $$\mathcal S^2$$ converges to $$\sigma^2$$ as more more data is collected through experiments.

> **Example**: there are $$n$$ chips:
>
> We are sampling without replacement, and $$k$$ is the number of chips drawn. We want to get the maximum out of the chips drawn.
>
> Suppose $$k=5$$, can the maximum be $$4$$? The answer is no. The minimum is $$5$$ at least (drawing $$1, 2,3,4,5$$).
>
> The possible values for the maximum = $$Y:\{k, k+1, k+2,\dotsc,n\}$$
>
> The distribution function $$F_Y(y)$$ is
>
> $$
> F(y)=\frac{y \choose k}{n \choose k}
> $$
>
> The numerator is $$y$$ choose $$k$$ because we are choosing any number that isn't larger than the maximum $$y$$. The denominator is the number of ways of choosing $$k$$ chips.
>
> Also
>
> $$
> f(y)=F(y)-F(y-1)
> $$
>
> Suppose $$n=20$$, $$k=5$$, we also probability want to calculate mean, variance, and standard deviation for $$Y$$.

### Properties

Let $$\mu_x=\mathbb E(X),\mu_y=\mathbb E(Y)$$, then

$$
\mathbb E(a+bX)=a+b \mathbb E(X)= a + b\mu_x
$$

The mean minimizes the *Mean Square Error*

$$
\mathbb S(t)=\mathbb E[(X-t)^2]\geq\mathbb E[(X-\mu)^2]=\text{Var}(X),\quad\text{for all } t
$$

The variance and mean have this property:

$$
\begin{align}
\text{Var}(a+bX)&=b^2\text{Var}(X)\\
\text{SD}(a+bX)&=\lvert b\rvert\text{SD}(X)
\end{align}
$$

## Binomial Random Variables

Consider

- $$n$$ independent trials
- Each trial has probability $$p$$ of "success", and probability $$1-p$$ of "fail"

$$X$$ is said to be the *Binomial Random variable* with parameters ($$n$$, $$p$$) if $$X$$ represents number of "successes" that occur in the $$n$$ trials.

The [PMF](#probability-mass-function) with parameter ($$n$$, $$p$$) is given by:

$$
f(x)=\mathbb P(X=x)={n\choose x}p^x(1-p)^{n-x}
$$

The $$p^x$$ (probability of getting $$x$$ "successes") multiplies with $$(1-p)^{n-x}$$ (probability of getting $$n-x$$ "fails") since each trial is independent. They're then multiplied with $$n \choose x$$ - total possible ways $$x$$ "successes" can happen given $$n$$ trials.

By *Binomial Theorem*, the probabilities sum to $$1$$:

$$
\sum_{i=1}^nf(i)=\sum_{i=1}^n{n\choose i}p^i(1-p)^{n-i}=(p+(1-n))^n=1
$$

> **Example**: coin toss
>
> 4 coins are flipped (independent). Find probability that 2 heads (H).
>
> ---
>
> Let $$X=\text{number of H}$$. $$X$$ is a binomial random variable with parameters ($$n=4$$, $$p=0.5$$).
>
> $$
> f(2)=\mathbb P(X=2)={4 \choose 2}(0.5)^2(1-0.5)^2\\
> =0.375
> $$
>

> **Example**: defective items
>
> Any item produced by a factory will be defective with probability 0.1 (items are independent). Find probability that in a sample of 3 items, at most 1 is defective.
>
> ---
>
> Let $$X=\text{number of defective items in a sample}$$, $$X$$ is a binomial random variable with parameters ($$3$$, $$0.1$$).
>
> $$
> f(0)+f(1)=\mathbb P(X=0)+\mathbb P(X=1)\\
> ={3\choose 0}(0.1)^0(1-0.1)^3+{3 \choose 1}(0.1)^1(1-0.1)^2\\
> =0.972
> $$
>

> **Example**: airplane engines
>
> - There are four-engine airplanes and two-engine airplanes
> - Probability of engine failing independently is $$1-p$$ (engine working has probability $$p$$)
> - Airplane makes a successful flight if at least 50% of the engine remains operative
>
> For what value of $$p$$ is a four-engine plane more preferable to a two-engine plane?
>
> ---
>
> Let $$X=\text{number of working engines}$$, and $$X$$ is a binomial random variable with two sets of parameters for the two type of planes: ($$4$$, $$p$$) for the four-engine airplane and ($$2$$, $$p$$)or the two-engine airplane.
>
> Now calculate the probability of four-engine airplane makes a successful flight ($$x$$ is at least 2):
>
> $$
> \begin{aligned}
> \mathbb P(\text{four-engine airplane success})&=f(2)+f(3)+f(4)\\
> &=\mathbb P(X=2)+\mathbb P(X=3)+\mathbb P(X=4)\\
> &={4\choose2}p^2(1-p)^2+{4\choose3}p^3(1-p)+{4\choose 4}p^4(1-p)^0\\
> &=6p^2(1-p)^2+4p^3(1-p)+p^4
> \end{aligned}
> $$
>
> Also calculate the probability of two-engine plane makes a successful flight ($$x$$ is at least 1):
>
> $$
> \begin{aligned}
> \mathbb P(\text{two-engined airplane success})&=f(1)+f(2)\\
> &=\mathbb P(X=1)+\mathbb P(X=2)\\
> &={2\choose 1}p^2(1-p)+{2\choose 2}p^2(1-p)^0\\
> &=2p(1-p)+p^2
> \end{aligned}
> $$
>
> The four-engine plane is safer if
>
> $$
> \begin{aligned}
> \mathbb P(\text{four-engine plane success})&\geq\mathbb P(\text{two-engine plane success})\\
> 6p^2(1-p)^2+4p^3(1-p)+p^4&\geq2p(1-p)+p^2\\
> 3p^3-8p^2+6p&\geq-x+2\\
> 3p^3-8p^2+7p-2&\geq0
> \end{aligned}
> $$
>
> Factoring the LHS of the inequality, we get
>
> $$
> (p-1)^2(3p-2)\geq0
> $$
>
> For the first term $$(p-1)^2\geq0$$, we get the trivial solution of $$p=1$$. So let's try the second term.
>
> For the second term $$(3p-2)\geq 0$$, we solve for $$p$$ and get $$p\geq\frac23$$.
>
> In conclusion, the four-engine airplane is safer to fly if the probability of engine working $$p$$ is greater than or equal to $$\frac 23$$

### Mean and Variance

The *MGF* of binomial random variable is

$$
\mathbb M(t)=(1-p+pe^t)^n
$$

The mean (first derivative) is

$$
\mu=\mathbb E(X)=np\\
\boxed{\mu=\mathbb M'(0)=np}
$$

And the variance is

$$
\boxed{\sigma^2=np(1-p)}
$$

The variance is maximized when $$p=0.5$$

> **Example**: urn of chips
>
> An urn contains $$n$$ chips numbered 1 through $$n$$. Draw $$k$$ chips without replacement and let $$Y$$ be the highest number among those drawn.
>
> - Range of $$Y$$:
>
>   Since we are drawing without replacement, the lower bound of $$Y$$ is $$k$$. The upper bound of $$Y$$ is $$n$$. Thus the range is $$Y\in\{k, k+1, \dotsc,n\}$$.
>
> - CDF $$F_Y(y)$$:
>
>   $$F_Y(y)=\mathbb P(Y\leq y)$$ so $$k$$ (number of chips drawn) takes a value less than or equal to $$y$$ (a particular maximum number on the chip). Thus there are $$\binom{y}{k}$$ possibilities.
>
>   There are $$n$$ total chips, so the total possibilities is expressed as $$\binom{n}{k}$$.
>
>   Thus $$F_Y(y)=\frac{\binom{y}{k}}{\binom{n}{k}}$$.
>
> - PMF $$f_Y(y)$$:
>
>   By the definition of CDF and PMF, $$f(y)=F(y)-F(y-1)$$, where $$y=k, k+1,\dotsc,n$$.
>
>   Also due to the range of $$Y$$ stated earlier, $$F(y)=0$$ for all $$y<k$$.
>
>   Thus we can say $$f(y)=F(y)$$.
>
> - If $$n=20, k=5$$, calculate *mean*, *variance*, and *standard deviation* for $$Y$$:
>
>   - Mean: $$\mu=\sum yf(y)$$
>   - Variance: $$\sigma^2=\sum(y-\mu)^2f(y)$$
>   - Standard deviation: $$\sigma=\sqrt{sigma^2}$$

> **Example**: oil corps
>
> Suppose finding oil when digging at certain locations has probability $$p=0.10$$
>
> - How many well should we dig to find oil with probability $$\geq 0.95$$
>
>   >Assume that each diggings are independent. Let $$X$$ be the binomial random variable for the number of successful wells. The binomial random variable has the parameters $$n, p=0.10$$
>   >
>   >First, we know the lower bound $$\mathbb P(X\gt 0) = 0.95$$ . We also need to find $$n$$.
>   >
>   >Using $$\mathbb P(X\gt 0)=1-\mathbb P(X=0)$$ where the probability of $$X=0$$ can be found using the binomial distribution formula.
>   >
>   >$$
>   >\mathbb P(X\gt0)=1-(1-0.10)^n=0.95
>   >$$
>   >
>   >Thus we can isolate the term with exponent $$n$$
>   >
>   >$$
>   >(1-0.10)^n=1-0.95
>   >$$
>   >
>   >and solve for $$n$$
>   >
>   >$$
>   >n=\frac{\ln(0.05)}{\ln{(0.90)}}=28.43
>   >$$
>   >
>   >Therefore, at least 29 wells should dug
>
> - How many wells should we dig to obtain at least 2 successful wells with probability $$\geq 0.95$$
>
>   > Assume that each diggings are independent. Let $$X$$ be the binomial random variable for the number of successful wells. The binomial random variable has the parameters $$n, p=0.10$$
>   >
>   > Let's start with the probability:
>   >
>   > $$
>   > \begin{align}
>   > \mathbb P(X\gt 1)&=1-(\mathbb P(X=0) + \mathbb P(X=1))\\
>   > &=1-((1-0.10)^n+n(0.10)(1-0.10)^{n-1})
>   > \end{align}
>   > $$
>   >
>   > We can then equate the RHS with our requirements
>   >
>   > $$
>   > 1-((1-0.10)^n+n(0.10)(1-0.10)^{n-1})\geq0.95\\
>   > 0.9^n+n(0.1)(0.9)^{n-1}\leq0.05
>   > $$
>   >
>   > And we can solve for $$n$$



## Poisson Random Variables

Suppose we wish to count number of occurrences of a certain event $$A$$ such as

$$
A=\{\text{Earthquakes over 5.0 magnitude in BC in one year}\}
$$

Then the **rate of occurrence** $$\lambda$$ is the rate in which the event of interest will occur in a time interval.

### Assumptions

The notation $$\mathbb P(k; t)$$ is the probability of $$k$$ occurrences of event of interest $$A$$ in the time interval $$[0, t]$$.

*Poisson* is appropriate when some of the assumptions are true.

1. Occurrences in **disjoint** time intervals are **independent**

2. The rate of occurrence is **proportional** to the length of time interval (The longer the time, the more occurrence)

   $$
   \mathbb P(1;t)=\lambda t+o(t),\quad\text{where }\lim_{t\rightarrow0}\frac{o(t)}{t}=0
   $$

3. There is at most 1 occurrence of $$A$$ in a small period of time (no two occurrences can happen at the exact same time)

   $$
   1-\mathbb P(0;t)-\mathbb P(1;t)=\sum_{k=2}^\infty\mathbb P(k;t)=o(t)
   $$







### Probability Mass Function

Let $$X$$ be the number of occurrences, the quantity of interest. The possible values of $$X$$ are $$0,1,2,3,\dotsc$$ in a time interval.

For $$x=0,1,2,\dotsc$$, The Poisson *PMF* is

$$
f(x)=\mathbb P(X=x)=\frac{e^{-\lambda}\lambda^x}{x!}
$$

### Mean and Variance

#### Moment Generating Function

$$
\mathbb M(t)=e^{\lambda(e^t-1)}
$$


#### Mean

$$
\mu=\mathbb E(X)=\lambda
$$

Derivation:

$$
\begin{align}
\mu&=\sum_{x=0}^\infty x f(x)\\
&=\sum_{x=0}^\infty x \frac{e^{-\lambda}\lambda^x}{x!}\\
&=\sum_{x=1}^\infty x \frac{e^{-\lambda}\lambda^x}{x!}\\
&=\lambda\times\sum_{x=1}^\infty  \frac{e^{-\lambda}\lambda^{x-1}}{(x-1)!}\\
&=\lambda\times\underbrace{\sum_{x'=0}^\infty  \frac{e^{-\lambda}\lambda^{x'}}{x'!}}_{1}\\
&=\lambda
\end{align}
$$

#### Variance

$$
\sigma^2=\text{Var}(X)=\lambda
$$

> **Example**: earthquakes
>
> Suppose $$Y$$ is number of earthquakes over 5.0 in some area. The Poisson random variable is $$Y$$~$\mathcal P(\lambda)$$ with $$\lambda=3.6/\text{year}$$. Since we are working in term of months, we need to convert the rate to the correct unit: $$\lambda=0.3/\text{month}$.
>
> 1. Probability of having at least two earthquakes over 5.0 in the next 6 months
>
>    The rate for this case is rate per month times the number of months.
>
>    Let $$X$$ be the number of earth quakes in the next 6 months ~ $$\mathcal P(0.3\times6)$$.
>
>    $$
>    \begin{align}
>    \mathbb P(X\geq 2)&=1-\mathbb P(X\lt 2)\\
>    &=1-\mathbb P(X=0)-\mathbb P(X=1)\\
>    &=0.537
>    \end{align}
>    $$
>
> 2. Probability of having 1 earth quake over 5.0 next month
>
>    Let $$X$$ be number of earthquakes in the next month ~$$\mathcal P(0.3)$$.
>
>    $$
>    \mathbb P(X=1)=0.222
>    $$
>
> 3. Probability of waiting more than 3 months for the next earthquake over 5.0
>
>    Waiting 3 months means that we expect 0 earthquakes in the next three months. So let $$X$$ be number of earthquakes in the next three months ~$$\mathcal P(0.9)$$.
>
>    $$
>    \mathbb P(X=0)=0.406
>    $$
>

## Continuous Random Variables

Unlike discrete, continuous random variables can take any value in the real domain.

### Probability Density Function

The *PDF* is similar to *PMF* but works on continuous scale.

**Properties**:

1. The density is non-negative: $$f(x)\geq 0$$
2. The density integrates to 1: $$\int_{-\infty}^{\infty}f(x)\mathrm dx=1$$
3. The density is used to compute probability (area under the curve is probability): $$\mathbb P(a\lt X \lt b)=\int_a^b f(x)\mathrm dx$$

### Continuous Distribution Function

Integrating the *PDF* yields the distribution function:

$$
F(x)=\mathbb(X\leq x)=\int_{-\infty}^xf(t)\mathrm dt
$$

Furthermore, the *CDF* can be used to compute probabilities:

$$
\begin{align}
\mathbb P(a\leq X\leq b)&=\int_a^bf(x)\mathrm dx\\
&=\int_{-\infty}^bf(x)\mathrm dx-\int_{-\infty}^a f(x)\mathrm dx\\
&=F(b)-F(a)
\end{align}
$$

> **Note 1**: Because $$X$$ is continuous, it is *impossible* for $$X$$ to be exactly $$a$$ given some number $$a$$:
>
> $$
> \forall a\in \mathbb R,\quad \mathbb P(X=a)=\int_a^af(x)dx=0
> $$
>
> **Note 2**: Sometimes $$f(a)>1$$, therefore
>
> $$
> f(a)\neq \mathbb P(X=a)
> $$
>
> **Note 3**: For some small time interval $$\delta\gt0$$,
>
> $$
> \begin{align}\mathbb P(x\lt X\lt (x+\delta))&=\int_x^{x+\delta}f(t)\mathrm d\\&\approx f(x)\delta\end{align}
> $$
>
> **Note 4**: Thanks to *FTC*, the derivative of the distribution function is the density function:
>
> $$
> F'(t)=\frac{\mathrm d}{\mathrm dx}\int_{-\infty}^x f(t)\mathrm dt=f(x)
> $$
>
> **Note 5**: Since $$\mathbb P(X=a)=\mathbb P(X=b)=0$$,
>
> $$
> \begin{align}
> \mathbb P(a\lt X\lt b)&=\mathbb (a\lt X\leq b)\\
> &=\mathbb P(a \leq X \lt b)\\
> &=\mathbb P(a \leq X \leq b)\\
> &=F(b)-F(a)
> \end{align}
> $$
>

### Mean, Variance, and Standard Deviation

Similar to the discrete counter parts, but replace the summation with integration.

#### Mean

$$
\mu=\int_{-\infty}^\infty xf(x)\mathrm dx
$$

#### Variance

$$
\sigma^2=\int_{-\infty}^{\infty}(x-\mu)^2f(x)\mathrm dx=\int_{-\infty}^\infty x^2 f(x)\mathrm dx-\mu^2=\mu_2-\mu^2
$$

#### Standard Deviation

$$
\sigma=\sqrt{\int_{-\infty}^\infty (x-\mu)^2f(x)\mathrm dx}
$$



## Uniformly Distributed Random Variables

*UDRV* are continuous and are denoted using notation $$X$$~$\text{Unif}(\alpha, \beta)$$. Which means $$X$ is a uniform distributed random variable with $$\alpha$$ as lower bound and $$\beta$$ upper bound.

### Uniform Density Function

The density function is mathematically represented as

$$
f(x)=\begin{cases}
0 &x\leq \alpha\\
\frac{1}{\beta-\alpha} & \alpha\lt x\lt \beta\\
0 & x \geq \beta
\end{cases}
$$

### Uniform Distribution Function

The distribution function is the integral of $$f(x)$$:

$$
F(x)=\begin{cases}
0 & x\leq\alpha\\
\frac{1}{\beta-\alpha}\int_\alpha^x \mathrm dt=\frac{x-\alpha}{\beta-\alpha} & \alpha \lt x \lt \beta\\
1 & x\geq \beta
\end{cases}
$$

We can write the short form if $$\alpha \lt x \lt \beta$$:

$$
F(x)=\frac{x-\alpha}{\beta-\alpha}
$$

And thus

$$
\mathbb P(a\lt X\lt b)=F(b)-F(a)=\frac{b-a}{\beta-\alpha}
$$

### Moments

**First Moment**

$$
\mu=\frac{1}{\beta-\alpha}\int_\alpha^\beta x\mathrm dx=\boxed{\frac{\alpha+\beta}{2}}
$$

**Second Moment**

$$
\mu^2=\frac{1}{\beta-\alpha}\int_\alpha^\beta x^2\mathrm dx=\frac{\beta^3-\alpha^3}{3(\beta-\alpha)}=\boxed{\frac{\beta^2+\alpha^2+\alpha\beta}{3}}
$$

**Variance**

$$
\sigma^2=\mu_2-\mu^2=\boxed{\frac{(\beta-\alpha)^2}{12}}
$$

> **Example**:
>
> Suppose $$X$$ ~ $$\text{Unif}(0,10)$$. Calculate $$\mathbb P(X\gt 3)$$ and $$\mathbb P(X\gt 5\vert X\gt 2)$$
>
> $$
> \mathbb P(X\gt 3)=1-F(3)=1-\frac3{10}=0.70
> $$
>
> $$
> \begin{align}
> \mathbb P(X>5 \vert X<2)&=\frac{\mathbb P(\{X>5\}\cap\{X>2\})}{\mathbb P(X>2)}\\
> &=\frac{\mathbb P(X>5)}{\mathbb P(X>2)}\\
> &=\frac{1-F(5)}{1-F(2)}\\
> &=\boxed{0.625}
> \end{align}
> $$
>

> **Example**: change of variable
>
> Suppose $$X$$ ~ $$\text{Unif}(0,1)$$
>
> That is $$f_X(x)=1$$ for $$0\leq x \leq 1$$ and $$F_X(x)=x$$ for $$0\leq x \leq 1$$.
>
> Derive the distribution function and density function for $$Y=-\ln(X)$$.
>
> First, notice the range of $$Y$$, which is $$(0,\infty)$$. Thus $$F_Y(y)=0$$ for $$y\lt 0$$.
>
> For $$y\gt 0$$, we substitute $$Y$$ for $$-\ln(X)$$:
>
> $$
> F_Y(y)=\mathbb P(Y\leq y)=\mathbb P(-\ln(X)\leq y)
> $$
>
> Rearrange the inequality on the inside and we get
>
> $$
> \mathbb P(X\geq e^{-y})
> $$
>
> So
>
> $$
> F_Y(y)=1-F_X(e^{-y})=1-e^{-y}
> $$
>
> Finally, to get the density, we differentiate $$F_Y$$:
>
> $$
> f_Y(y)=e^{-y}
> $$
>

## Exponential Random Variables

*ERV* is used to model the **waiting time** until the occurrence of a certain event such as

- Arrival of a customer
- Crash of a compute network

The random variable is denoted as $$X$$ ~ $$\text{Exp}(\lambda)$$.

The exponential density function has a single parameter $$\lambda$$ for $$\lambda>0$$. This is the **rate of occurrence** for the event.

### Exponential Density Function

$$
f(x)=\lambda e^{-\lambda x}, \quad x>0
$$

### Exponential Distribution Function

$$
F(x)=\int_0^x\lambda e^{-\lambda t}\mathrm dt=1-e^{-\lambda x},\quad x>0
$$

The general relation between the uniform and exponential random variable is

$$
-\frac{\ln(\text U(0,1))}{\lambda}=\text{Exp}(\lambda)
$$

### Mean and Variance

If the rate at which the event occurring $$\lambda$$ is known. The mean / expected wait time is given by

$$
\boxed{\mathbb E(X)=\frac{1}{\lambda}}
$$

That said, the variance is given by

$$
\boxed{\text{Var}(X)=\frac{1}{\lambda^2}}
$$

### Memoryless Property

Suppose that $$X$$ ~ $$\text{Exp}(\lambda)$$ and represents "time to system fail". For $$x_0>0$$ and $$h>0$$, compute the probability of $$X>h$$ and probability of $$X>(x_0+h)$$ given that $$X>x_0$$.

It is straight forward for $$X>h$$ (what is probability of system lasting longer than $$h$$):

$$
\mathbb P(X>h)=1-F(h)=e^{-\lambda h}
$$

Also for the second part (what is the probability of system lasting longer than $$h$$ given that the system is already running for $$x_0$$ time):

$$
\begin{align}
\mathbb P(X>(x_0+h)\vert X>x_0)&=\frac{\mathbb P((X>(x_0+h))\cap (X>x_0))}{\mathbb P(X>x_0)}\\
&=\frac{\mathbb P(X>(x_0 + h))}{\mathbb P(X>x_0)}\\
&=\frac{e^{-\lambda(x_0+h)}}{e^{-\lambda x_0}}\\
&=e^{-\lambda h}
\end{align}
$$

As we can see, the probability of surviving $$h$$ additional time at age $$x$$ is the same for all $$x$$. Which also means that the system doesn't wear out as time increases.

### Failure Rate

*Failure rate* is defined as

$$
\begin{align}
\lambda(x)&=\lim_{\delta\rightarrow 0}\frac{\mathbb P(X\leq (x+\delta)\vert X\gt x)}{\delta}\\
&=\lim_{\delta\rightarrow 0}\frac{\mathbb P(X\leq (x+\delta))}{\delta}\\
&=\frac{1}{\mathbb P(X>x)}\lim_{\delta\rightarrow 0}\frac{F(x+\delta)-F(x)}{\delta}
\end{align}
$$

Notice the limit is in the form of differentiation of $$F(x)$$.

$$
\begin{align}
\lambda(x)&=\frac{1}{1-F(x)}f(x)\\
&=\boxed{-\frac{\mathrm d}{\mathrm dx}\ln(1-F(x))}
\end{align}
$$

**Heuristic Interpretation**: $$\lambda(x)\delta\approx\mathbb P(X\leq (x+\delta)\vert X>x)$$ for small $$\delta$$.

Over time, there are three things that can happen to failure rate:

1. Constant (failure doesn't change with time)
2. Increasing (failure rate increases as system wears out with time)
3. Decreasing (failure rate decreases as system improves with time)

Thus, more generally, using the failure rate equation from above, our *distribution function* is expressed as

$$
F(x)=1-e^{-\int_0^x\lambda(t)\mathrm dt}
$$

#### Constant Failure Rate

$$
\lambda(x)=\gamma
$$

Plugging into to the equation we derived above, we see that

$$
F(x)=1-e^{-\gamma x}
$$

#### Increasing Failure Rate

$$
\lambda(x)=x
$$

Thus

$$
F(x)=1-e^{-\frac{x^2}{2}}
$$

This distribution is also known as **Weibull distribution**.

#### Decreasing Failure Rate

$$
\lambda(x)=\frac{1}{1+x}
$$

Naturally,

$$
F(x)=\frac{x}{1+x}
$$
