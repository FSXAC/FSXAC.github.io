---
title: Continous Random Vectors
date: 2017-12-04
categories: ELEC 321
use_math: true
---

- toc
{:toc}

## Continuous Random Vectors

- All the entries are *continuous* random vectors
- The joint behavior are determined by the *continuous joint density function* $$f(\vec x)$$
- $$f(\vec x)$$ is a function that maps $$\mathbb R^m\rightarrow \mathbb R$$ where $$m$$ is the number of items in the vector
- $$f(\vec x)$$ satisfies the following:
  1. $$f(x_1, x_2,\dotsc, x_m)\geq 0$$ for all $$\vec x=(x_1, x_2,\dotsc, x_m)\in \mathbb R^m$$
  2. $$\int_{\infty}^\infty\cdots\int_{\infty}^\infty f(x_1,\dotsc,x_m)\mathrm dx_1\dotsc\mathrm dx_m=1$$

Take $$m=2$$ for instance, the corresponding joint distribution function is a multivariable function given by $$F(x_1, x_2)$$.

$$
\begin{align}F(x_1,x_2)&=\mathbb P(X_1\leq x_1, X_2\leq x_2)\\
&=\int_{-\infty}^{x_2} \int_{-\infty}^{x_1}f(t_1, t_2)\mathrm dt_1\mathrm dt_2
\end{align}
$$

By the *FTC*, we obtain the joint density function:

$$
f(x_1,x_2)=\frac{\partial^2}{\partial x_2\partial x_2}F(x_1, x_2)
$$

### Bivariate Normal (More in module 6)

The main model is given by:

$$
f(x_1,x_2)=\frac{(1-\rho^2)^{-\frac12}}{2\pi\sigma_1\sigma_2}\exp\left(-\frac{\frac{(x_1-\mu_1)^2}{\sigma_1^2}+\frac{(x_2-\mu_2)^2}{\sigma_2^2}-\frac{2\rho(x_1-\mu_1)(x_2-\mu_2)}{\sigma_1\sigma_2}}{2(1-\rho^2)}\right)
$$

### Marginal Density Function

Suppose we have the joint density function, $$f(x_1, x_2)$$, for random variables $$X_1, X_2$$.

Similar to discrete random variables, the marginal density function of one random variable is obtained by integrating the other random variables out.

$$
f_1(x_1)=\int_{-\infty}^\infty f(x_1, x_2)\mathrm dx_2
$$

### Conditional Density Function

The conditional densities work identical to the discrete version:

$$
f(x_2\vert x_1)=\frac{f(x_1, x_2)}{f_1(x_1)}
$$

Where $$f(x_1, x_2)$$ is the joint density and $$f_1(x_1)$$ is the marginal density.

It follows that given conditional and joint densities, we can obtain the joint density:

$$
f(x_1, x_2)=f(x_2\vert x_1)f_1(x_1)=f(x_1\vert x_2)f_2(x_2)
$$

### Conditional Mean

Let $$\mu_{y\vert x}$$ denote the mean of $$Y$$ given some realization of $$X$$. It is defined as

$$
\mu_{y\vert x}=\mathbb E(Y\vert X=x)=\int_{-\infty}^\infty y\cdot f(y\vert x)\mathrm dy
$$

### Conditional Variance

The variance of $$Y$$ given some $$X=x$$ is defined as

$$
\sigma_{y\vert x}^2=\text{Var}(Y\vert X=x)=\int_{-\infty}^{\infty}(y-\mu_{y\vert x})^2f(y\vert x)\mathrm dy
$$

### Independence

If the continuous random variables in the random vector are independent, then the joint density is all the marginal densities multiplied together.

$$
f(x_1,x_2,\dots,x_m)=f_1(x_1)f_2(x_2)\cdots f_m(x_m)
$$

Thus, any conditional density is zero.

Furthermore, given its covariance matrix, all non-diagonal elements is 0. In particular, $$\sigma_{ij}=0$$ for $$i\neq j$$.

> **Example**:
>
> Suppose $$X\sim \text{Unif}(0,10)$$ and that $$Y\vert X=x \sim\text{Exp}(\frac{1}{x})$$. What is the mean and variance of $$Y$$? What fractional of the total variance is explained by $$X$$?
>
> Recall exponential random variables: the expected value is $$1/\lambda$$ and variance is $$1/\lambda^2$$. Since $$Y\vert X=x\sim\text{Exp} (\frac{1}{x})$$, then the expected value of $$Y\vert X$$, an exponential random variable is
>
> $$
> \mathbb E(Y\vert X)=X
> $$
>
> Recall uniform random variables: the expected value is $$\frac{(a+b)}{2}$$ and the variance is $$\frac{(b-a)^2}{12}$$. Plugging $$a=0, b=10$$, we get $$\mathbb E(X)=5$$ and $$\text{Var}(X)=\frac{100}{12}$$.
>
> Putting everything together, we get
>
> $$
> \mathbb E(Y)=\mathbb\{\mathbb E(Y\vert X\}=\mathbb E\{X\}=5\\
> $$
>
> We compute the *total variance*:
>
> $$
> \begin{align}
> \text{Var}(Y)&=\mathbb E\{\text{Var}(Y\vert X)\}+\text{Var}\{\mathbb E(Y\vert X)\}\\
> &=\mathbb E\{X^2\}+\text{Var}\{X\}\\
> &=\text{Var}(X)+[\mathbb E(X)]^2+\text{Var}(X)\\
> &=\frac{200}{12}+25\\
> &=41.7
> \end{align}
> $$
>
> To compute the percentage of explained variance, we look at the explained variance, which is $$\text{Var}(\mathbb E(Y\vert X))$$, and divide it by the total variance, which gives
>
> $$
> \frac{\text{Var}\{\mathbb E(Y\vert X)\}}{\text{Var}(Y)}=\frac{100/12}{41.7}=0.20
> $$
>

## Functions of Continuous Random Vectors

Suppose we have a function $$\mathbf h$$ that is bijective, then for some random vectors $$\mathbf x$$ and $$\mathbf y$$,

$$
\mathbf y=\mathbf h(\mathbf x)\\
\mathbf x=\mathbf h^{-1}(\mathbf y)
$$

If given the density $$f_{\mathbf X}$$, then the density for $$\mathbf y$$ is

$$
f_{\mathbf Y(\mathbf y)}=f_{\mathbf X}(\mathbf h^{-1}(\mathbf y))\cdot \underbrace{\left\vert \det\left(\frac{\partial x_i}{\partial y_j}\right)\right\vert }_{J(\mathbf y)}
$$

Where $$J(\mathbf y)$$ is the **Jacobian** which is used for transformations.

### Linear Transformations

Suppose we have random vector $$\mathbf Y=\mathbf A\mathbf X + \mathbf b$$, where $$\mathbf Y$$ and $$\mathbf X$$ is a $$n$$-dimensional random vector, $$\mathbf A$$ is an $$n\times n$$ matrix, and $$\mathbf b$$ is an $$n$$-dimensional vector.

Then the expected value and covariance is transformed as follows:

$$
\boldsymbol\mu_{\mathbf Y}=\mathbb E\{\mathbf Y\}=\boxed{\mathbf{A}\boldsymbol \mu_{\mathbf X}+\mathbf b}\\
\text{Cov}(\mathbf Y)=\boxed{\mathbf A \text{Cov}(\mathbf X) \mathbf A^T}
$$


