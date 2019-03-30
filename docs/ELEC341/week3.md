---
author: Muchen He
date: 2017-10-10
categories: ELEC 341
title: Week 3 - Laplace Transform

layout: post

use_math: true
---

**Context**: when dealing with control systems, taking derivatives and integration is common, but is too error-prone, computation-intensive, and complicated. The Laplace transform of a function will allow us to deal with the system in **frequency domain**. As a result, derivation and integration turns into multiplication and division of $$s$$, the complex frequency.


## Definition

The definition of full Laplace transform is given as:
$$
\mathcal L:\int_{-\infty}^\infty f(t)e^{-st}\mathrm dt
$$
The function is integrated from time being $$-\infty$$ to $$\infty$$. However, we don't care about what happens the time far far before. We care about the system after time 0. Thus we have the *half* Laplace transform:
$$
\mathcal L:\int_{0^-}^\infty f(t)e^{-st}\mathrm dt
$$




## List of Laplace Transforms

**Integration**
$$
\mathcal L\left\{\int x \mathrm dx\right\}=\frac 1 s x
$$

**Derivation**
$$
\mathcal L \left\{\frac {\mathrm d}{\mathrm dt} x\right\}=sx
$$
**Delta Function**
$$
\mathcal L \left\{\delta (t)\right\}=\mathcal L \left\{\frac{\mathrm d u(t)}{\mathrm dt}\right\}=s\cdot \frac 1 s=1
$$
Where $$\delta(t)$$ is a "infinite spike" at $$t=0$$, and $$u(t)$$ is the unit step function.








