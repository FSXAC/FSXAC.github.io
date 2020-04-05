---
date: 2020-01-20
categories: ELEC 341
title: Week 4 - System Responses
use_math: true
---

## Types of Responses

The response of a system ($Y(s)=G(s)U(s)$) depends on the input to the system, $U(s)$.

- **Natural/Impulse response**: is when the input is an impulse $U(t)=\delta(t)$.
- **Forced response**: is when the input is anything else, where the initial condition is 0.
  - **Step response**: when $U(t)=u(t)$
  - **Ramp response**: when $U(t)=tu(t)$

The **total reponse** of the system is the superposition of the *natural* and *forced* response.



## Final Value

The **final value** describes where the system response is heading to. The DC gain, $K_{DC}$, is $G(s)\vert_{s=0}$, which is the final value of the *step response*.

For example, the DC gain for the following transfer function is 3.
$$
\left.\frac{3}{s^2+2s+1}\right\vert_{s=0}=3
$$
This is a problem for any system with a pole at zero: since setting $s=0$ would imply an infinite DC gain. To find the final value, we must multiply the transfer function by $s$. So the definition is:
$$
\text {FV}=s(F(s))\vert_{s=0}
$$

### Final Value Theorem

*The final value exists if and only if that there exists no purely imaginary poles, no poles on the righthand plane, and the number of pole at the origin is less than or equal to 1.*

