---
title: Multivariate Normal
date: 2017-12-07
categories: ELEC 321
use_math: true
---

- toc
{:toc}

## Standard Multivariate Normal

Recall that a standard normal random variable has a expected value / mean of 0 and a variance of 1. Then  a random vector of standard normal is denoted as $$\mathbf Z \sim N(\mathbf 0, I)$$. Where $$Z$$ is the random vector with a size of $$N$$, $$\mathbf 0$$ is a vector of zeroes, and $$I$$ is a $$N\times N$$ identity matrix.

### Density

Suppose there are *independent* standard normal random variables $$Z_1, Z_2, \dots, Z_n$$ then their joint density is the product:

$$
f(z_1, z_2,\dots,z_N)=\prod_{i=1}^N\varphi(z_i)
$$

Recall that

$$
\varphi (z)= \frac{1}{\sqrt{2\pi}}e^{-\frac{1}{2}z^2}
$$

Then the joint density can be simplified to

$$
f(\mathbf z)=\frac{1}{(\sqrt{2\pi})^N}e^{-\frac{1}{2}\mathbf{z'z}}
$$

Where $$\mathbf z$$ is a vector that contains $$z_1,\dots,z_N$$, and $$\mathbf {z'z}$$ is the dot product of itself.

### Mean

The expected value of the random vector composed of standard multivariate normal is a vector of zeroes:

$$
\boldsymbol \mu= \mathbb E\{\mathbf Z\}=\mathbf 0
$$

### Covariance

For $$N$$ random variables, the covariance matrix is an $$N\times N$$ identity matrix.



## General Multivariate Normal

Given that $$\mathbf Z$$ is the random vector of standard multivariate normal; any multivariate normal random vector can take the form:

$$
\mathbf X=A\mathbf Z + \mathbf b
$$

Where $$\mathbf X$$ is the random vector comprised of random variables with general normal distribution; vector $$\mathbf X$$ has a length of $$N$$ . $$A$$ is an $$N\times N$$ *invertible* matrix. And $$\mathbf b$$ is a vector of constants.

Because $$A$$ is invertible, then

$$
\mathbf Z=A^{-1}(\mathbf X-\mathbf b)
$$

### Mean

The mean of a generate multivariate normal is $$\mathbf b$$ since the mean for the standard multivariate normal is $$\mathbf 0$$:

$$
\boldsymbol \mu = \mathbb E\{\mathbf X\}=\mathbb E\{A\mathbf Z+\mathbf b\}=\mathbf b
$$

### Covariance

The covariance is $$AA'$$ where $$A'$$ is the transpose of $$A$$:

$$
\Sigma=\text{Cov}(\mathbf X)=\text{Cov}(A\mathbf Z+\mathbf b)=\text{Cov}(A\mathbf Z)=A\text{Cov}(\mathbf Z)A'=AA'
$$

### Jacobian

Notice that $$\mathbf X=A\mathbf Z + \mathbf b$$ is in fact a transformation, therefore its corresponding Jacobian is simply

$$
J=\vert \det(A^{-1})\vert =\frac{1}{\vert \det(A)\vert }
$$

### Density

Now that we know the Jacobian, it follows that the density is given by

$$
f_\mathbf X(\mathbf x)=\frac{1}{\vert \det(A)\vert }f_{\mathbf Z}(A^{-1}(\mathbf x-\mathbf b))
$$

Plugging in $$f(\mathbf z)=\frac{1}{(\sqrt{2\pi})^N}e^{-\frac{1}{2}\mathbf{z'z}}$$, and we obtain

$$
\frac{1}{\vert \det(A)\vert }
\frac{1}{(\sqrt{2\pi})^N}e^{-\frac{1}{2}\mathbf{(A^{-1}(\mathbf x-\mathbf b))'(A^{-1}(\mathbf x-\mathbf b))}}
$$

Note that the covariance matrix $$\Sigma=AA'$$, which also implies $$\Sigma^{-1}=(A^{-1})'A^{-1}$$.

Also note that the determinant of the covariance matrix is $$\det(\Sigma)=\det(AA')$$, working it out we see that $$\sqrt{\det(\Sigma)}=\vert \det(A)\vert $$.

Plugging these equations in, the above density simplify down to

$$
f_\mathbf X(\mathbf x)=\frac{1}{\sqrt{(2\pi)^N\Sigma}}e^{-\frac{1}{2}(\mathbf x-\mathbf b)'\Sigma^{-1}(\mathbf x-\mathbf b)}
$$

## Properties of Multivariate Normal

**1. Linear transformation of normal vectors results in normal vectors**

Suppose we have a vector $$\mathbf X\sim N(\boldsymbol \mu, \Sigma)$$, and a matrix $$C$$ is full rank. then let $$\mathbf Y=C\mathbf X+\mathbf d$$. The mean of $$\mathbf Y$$ is $$C\boldsymbol \mu+\mathbf d$$; the variance is $$C\Sigma C'$$.

**2. Marginal distributions are normal**

Suppose we have a random vector that has size 2:

$$
\mathbf X=\begin{bmatrix}
X_1\\
X_2\\
\end{bmatrix}
\sim
N\left(
\begin{bmatrix}
\mu_1\\
\mu_2\\
\end{bmatrix}
,
\begin{bmatrix}
\Sigma_{11} & \Sigma_{12}\\
\Sigma_{21} & \Sigma_{22}\\
\end{bmatrix}
\right)
$$

Then we get

$$
X_1\sim N(\mu_1,\Sigma_{11}),\qquad X_2\sim N(\mu_2,\Sigma_{22})
$$

**3. Conditional distributions are normal**

Using the previous case, suppose we have $$x_2$$ as a realization for $$X_2$$, then the conditional on $$X_1$$ is

$$
X_1\vert (X_2=x_2)\sim N(\mu_{1\vert 2}, \Sigma_{1\vert 2})
$$

Where $$\mu_{1\vert 2}=\mu_1+\frac{\Sigma_{12}}{\Sigma_{22}}(x_2-\mu_2)$$ and $$\Sigma_{1\vert 2}=\Sigma_{11}-\frac{\Sigma_{12}\Sigma_{21}}{\Sigma_{22}}$$.
















