---
title: Discrete Random Vectors
date: 2017-11-30
categories: ELEC 321
use_math: true
---

- toc
{:toc}

We are interested in joint behavior of multiple random variables. An example of random vector would be rolling two dies and we are looking at the joint behavior of two random variables.

$$
\mathbf x=\left(\begin{array}{c}X_1\\X_2\end{array}\right)=\left(\begin{array}{c}\text{sum of points}\\\text{difference of points}\end{array}\right)
$$

There are **continuous** and **discrete** random variables.

## Discrete Random Vectors

### Joint Probability Mass Function

The probability for a realization of all considered random variables.

$$
f(x_1x_2,\dotsc,x_m)=\mathbb P(X_1=x_1,X_2=x_2,\dots,X_m=x_m)\\
$$

> **Example**: consider the random vector from above (rolling two dies)
>
> Out of all possibilities, *sum of points* being 6 has 6 possible outcomes: (1, 5), (2, 4), (3, 3), (4, 2), (1, 6). Thus the probability of $$X_1=6$$ is $$\frac{5}{36}$$. Then out of those possibilities, only (3, 3) has the absolute difference 0, so $$\mathbb P(X_2=0\vert X_1=6)=\frac{1}{5}$$.
>
> Therefore the joint probabilities is $$\mathbb P(X_1=6, X_2=0)=\frac{1}{36}$$

### Marginal Densities

PMF that only takes interest in a single random variable in a random variable.

For instance if the random vector has 2 elements, then $$f(x_1, x_2)$$ is the discrete joint PMF function.

Then the marginal densities is the PMF with the other variables (not of interest) summed up.

$$
f_1(x_1)=\sum_{x_2}f(x_1,x_2)
$$

$$
f_2(x_2)=\sum_{x_1}f(x_1,x_2)
$$

### Mean of Random Vector

The mean/expected value of a random vector just applies to each individual random variables.

$$
\mathbb E(\mathbf X)=\mathbb E\left(\begin{array}{c}X_1\\\vdots\\X_m\end{array}\right)=\mathbb E\left(\begin{array}{c}\mathbb E(X_1)\\\vdots\\\mathbb E(X_m)\end{array}\right)=\vec \mu
$$

### Covariance

The variance of the random vector can be described as covariance, in a covariance matrix.

$$
\text {Cov}(\mathbf X)=\mathbb E[(\mathbf X-\mu)(\mathbf X-\mu)^T]
$$

Where $$\mathbf X-\mu$$ the random vector subtracting the mean of the random vector, and $$(\mathbf X-\mu)^T$$ is the transpose. This results in a matrix multiplication that returns a matrix:

$$
\text{Cov}(\mathbf X)=\left[
\begin{matrix}
\boldsymbol\sigma_{11} & \sigma_{12} & \sigma_{13} & \cdots & \sigma_{1m}\\
\sigma_{21} & \boldsymbol\sigma_{22} & \sigma_{23} & \cdots & \sigma_{2m}\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
\sigma_{m1} & \sigma_{m2} & \sigma_{m3} & \cdots & \boldsymbol\sigma_{mm}
\end{matrix}
\right]
$$

Where for any $$i​$$,

$$
\sigma_{ii}=\mathbb E[(X_i-\mu_i)^2]=\text{Var}(X_i)
$$

And for any $$i$$ and $$j$$,

$$
\sigma_{ij}=\mathbb E[(X_i-\mu_i)(X_j-\mu_j)]=\text{Cov}(X_i, X_j)
$$

The covariance of the two individual random variable is

$$
\text{Cov}(X_i, X_j)=\mathbb E[(X_i-\mu_i)(X_j-\mu_j)]=\mathbb E[(X_i-\mu_i)]\mathbb E[(X_j-\mu_j)]
$$

#### Computing Covariance

$$
\begin{align}
\sigma_{ij}&=\mathbb E[(X_i-\mu_i)(X_j-\mu_j)]\\
&=\mathbb E[X_i X_j]-\mathbb E[X_i]\mu_j -\mathbb E[X_j]\mu_i+\mu_i \mu_j\\
&=\mathbb E[X_i X_j]-\mu_i \mu_j -\mu_i \mu_j+\mu_i \mu_j\\
&=\boxed{\mathbb E[X_i X_j]-\mu_i \mu_j}
\end{align}
$$

### Correlation Coefficient

It describes how correlated two random variables are. It is defined as follows.

$$
\rho_{ij}=\frac{\sigma_{ij}}{\sqrt{\sigma_{ii}\sigma_{jj}}}=\frac{\text{Cov}(X_i, X_y)}{\text {SD}(X_i)\text{SD}(X_j)}
$$

Where $$\rho \in [-1, 1]$$.

### Independent Random Variables

The random variables $$X_1, X_2, \dotsc, X_m$$ are independent from each other if and only if

$$
f(x_1,x_2,\dotsc,x_m)=f_1(x_1)f_2(x_2)\dotsc f_m(x_m)
$$

Consider random variables $$X$$ and $$Y$$, if they are independent then,

$$
\mathbb E(X_iX_j)=\mathbb E(X_i)\mathbb E(X_j)
$$

Covariance is 0 if they are independent.

$$
\sigma_{XY}=\mathbb E(XY)-\mathbb E(X)\mathbb E(Y)=0
$$

> **Note** that independence of $$X$$ and $$Y$$ $$\Rightarrow\sigma_{XY}=0$$, but $$\sigma_{XY}\nRightarrow$$ that $$X$ and $$Y$$ are independent.

### Conditional PMF

Consider two random variables $$X_1$$ and $$X_2$$. Then the conditional PMF is:

$$
f(x_2\vert x_1)=\frac{f(x_1, x_2)}{f_1(x_1)}
$$

Thus, it's clear to see that

$$
\begin{align}
f(x_1,x_2)&=f_1(x_1)f(x_2\vert x_1)\\
f(x_1, x_2)&=f_2(x_2)f(x_1\vert x_2)
\end{align}
$$

#### Independence

If $$X_1$$ and $$X_2$$ are **independent**, then

$$
f(x_1, x_2)=f_1(x_1)f_2(x_2)
$$

It follows that

$$
f(x_2\vert x_1)=f_2(x_2)
$$

and similarly

$$
f(x_1\vert x_2)=f_1(x_1)
$$

### Conditional Mean and Variance

**Conditional Mean** is the expected value of one random variable given the realization of another random variable.

$$
\mu_{y\vert x}=\mathbb E(Y\vert X=x)=\boxed{\sum_y yf(y\vert x)}
$$

**Conditional Variance**:

$$
\sigma_{y\vert x}^2=\text{Var}(Y\vert X=x)=\sum_y(y-\mu_{y\vert x})^2f(y\vert x)=\boxed{\mathbb E(Y^2\vert X=x)-\mu^2_{y\vert x}}
$$

#### Independence

If events $$X$$ and $$Y$$ are independent, then:

- Conditional PMF $$\equiv$$ marginal PMF
  - Since $$f(y\vert x)=f_Y(y)$$ and $$f(x\vert y)=f_X(x)$$
- Conditional means and variances $$\equiv$$ marginal means and variances
  - $$\mathbb E(Y\vert X=x)=\mathbb E(Y)$$ and $$\text{Var}(Y\vert X=x)=\text{Var}(Y)$$
  - $$\mathbb E(X\vert Y=y)=\mathbb E(X)$$ and $$\text{Var}(X\vert Y=y)=\text{Var}(X)$$
- $$\mathbb E(g(X, Y)\vert X=x)=\mathbb E(g(x, Y))$$
  - An example would be $$\mathbb E(e^{X+Y}\vert X=x)=e^x\mathbb E(e^Y)$$


### Conditional Mean As A Function

Generally the conditional mean is expressed as $$\mathbb E(Y\vert X=x)$$, which is a function of $$x$$. Thus, we can express that as:

$$
h(x)=\mathbb E(Y\vert X=x)
$$

Since $$x$$ is only a realization of a random variable, we can consider $$h(x)$$ as a random function as:

$$
h(X)=\mathbb E(Y\vert X)
$$


### Two Step Average

We may find the conditional mean of a random variable in two steps.

$$
\mathbb E(Y)=\mathbb E(\mathbb E(Y\vert X))
$$

Where $$\mathbb E[Y]=\mathbb E[g(X, Y)]$$ and $$\mathbb E[\mathbb E[Y\vert X]]=\mathbb E[\mathbb E[g(X, Y)\vert X]]$$. It follows that

$$
=\sum_x\left(\sum_y g(x,y)f(y\vert x)\right)f_X(x)
$$

### Total Variance

Consider the following plot of two random variables $$X$$ and $$Y$$. Where the red circles represent $$\mathbb E(Y\vert X=x)$$ and the red whiskers represents the variance $$\text{Var}(Y\vert X=x)$$. Then the blue circle is the overall mean $$\mathbb E(Y)$$ and the blue whisker is the overall variance $$\text{Var}(Y)$$.

<img src="/assets/img/placement-e.jpeg" height="300px">

In this case, the **Total Variance** is given by

$$
\begin{align}
\text{Var}(Y)&=\text{Unexplained variance}+\text{Explained variance}\\
&=\mathbb E[\text{Var}(Y\vert X)]+\text{Var}[\mathbb E(Y\vert X)]
\end{align}
$$

In the example above, the unexplained variance is the inner variance (red whiskers). The explained variance is the variance due to the red dots increasing.

The **Percentage of Explained Variance** is given by:

$$
\frac{\text{Explained variance}}{\text{Total variance}}\times100\%
$$

This gives an idea of how good a prediction is. If the percentage of explained variance is closer to 1, then one could use it for a good prediction. On the other hand, a percentage of near 0 is useless.

For the **best prediction**, use $$g(x)=\mathbb E(Y\vert X=x)$$.
