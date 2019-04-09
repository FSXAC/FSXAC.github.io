---
title: Conditional Probability
date: 2017-09-28
categories: ELEC 321
use_math: true
use_mermaid: true
---

- toc
{:toc}

## Conditional Probability

The outcome could be any element in the sample space $$\Omega$$, but the range of possibilities is restricted due to *partial information*.

**Partial Information**: Insufficient or fuzzy information about the output

> **Example**: examples of partial information
>
> - The roll of the dice is at least a 4
> - The final grade for ELEC 321 is at least 75%

**Conditioning Event**: The event $$B$$ that represents partial information. The *event of interest* is denoted by $$A$$

> **Example**: rolling a dice with conditional event and event of interest
>
> $$B=\{4,5,6\}=\{\text{rolls at least a 4}\}$$ (conditioning event)
>
> $$A=\{6\}=\{\text{rolls a 6}\}$$ (event of interest)

> **Example**: the final grade of ELEC 321
>
> $$B=[75,100]=\{\text{at least 75%}\}$$ (conditioning event)
>
> $$A=[90, 100]=\{\text{ace the course (get 90% to 100%)}\}$$ (event of interest)

### Definition of Conditional Probability

Suppose that the probability of $$B$$ is not 0: $$\mathbb P(B)\gt 0$$, then,

$$
\mathbb P(A\vert B)=\frac{\mathbb P(A\cap B)}{\mathbb P (B)}
$$

This reads "the **probability of $$A$$ given $$B$$** equals to the probability of $$A$$ and $$B$$ divided by the probability of $$B$$.

Rearrange and we get useful formulas:

$$
\mathbb P(A\cap B)=\mathbb P(B)\mathbb P (A\vert B)
$$

$$
\mathbb P(A\cap B)=\mathbb P(A)\mathbb P (B\vert A)
$$

### Conditional Probability and Probability Axioms

$$\mathbb P(A\vert B)$$ is a function of $$A$$ and for fixed $$B$$ (otherwise the axioms doesn't hold) satisfies all of the probability axioms listed in [module 1](/documents/ELEC331-Module1).

1. $$\mathbb P(\Omega\vert B)=\frac{\mathbb P(\Omega\cap B)}{\mathbb P(B)}=\frac{\mathbb P(B)}{\mathbb P(B)}=1$$

2. $$\mathbb P(A\vert B)\geq 0$$

3. If $$\{A_i\}$$ are disjoint for $$1\leq i\leq n$$ then:

   $$
   \mathbb P\left(\cup_{i=1}^nA_i\vert B\right)=\frac{\mathbb P\left[\left(\cup_{i=1}^nA_i\right)\cap B\right]}{\mathbb P(B)}\\
   =\frac{\mathbb P\left[\cup_{i=1}^n(A_i\vert B)\right]}{\mathbb P(B)}\\
   =\frac{\sum_{i=1}^n\mathbb P(A_i\cap B)}{\mathbb P(B)}\\
   =\sum_{i=1}^n\mathbb P(A_i\vert B)
   $$


---


> **Example**: dice roll from above (and assuming each side of the dice is equally likely)
> $$
> \mathbb P(\text{rolls at least 4 }\vert \text{ rolls a 6})=\frac{\mathbb P(\{6\})}{\mathbb P(\{4,5,6\})}=\frac {1/6}{3/6}=0.333\dots
> $$
>

> **Example**: ELEC 321 grades
>
> We suppose that $$\mathbb P(\text{grade is larger than } x) = \frac{100-x}{100}$$ (each percentage is equally likely).
>
> $$
> \mathbb P(\text{get 90-100% }\vert \text{ get at least 75%})=\frac {\mathbb P([90,100])}{\mathbb P ([75,100])}=\frac{100-90}{100-75}=\frac {10}{25}=0.4
> $$
>

## Screening Tests

Consider a screening test for defective iPhones, the screening test can either result in:

- Positive (iPhone has defect) 
- Negative (iPhone has no defect)

But screening test itself sometimes have two types of errors:

- False positive (test is defective, iPhone might not be defect)
- False negative (test is not defective, iPhone has defect)

Given these outcomes, there are total of 4 possible events for each event:

For iPhone status:

- $$D=\{\text{defective}\}$$
- $$D^c=\{\text{not defective}\}$$

For test result:

- $$B=\{\text{test is positive}\}$$
- $$B^c=\{\text{test is negative}\}$$

In this scenario, we will arbitrarily define the **sensitivity** (probability of test positive given that the iPhone is defective) of the test to be 0.95. Which also implies that the probability of test negative given a defective iPhone is $$\mathbb P(B^c\vert D)=1-0.95=0.05$$.

$$
\mathbb P(B\vert D)=0.95
$$

We will also arbitrarily define the **specificity** (probability of test negative given that the iPhone is not defective) of the test to be 0.99. Similarly, the probability that the test is positive if the device is not defective is $$\mathbb P(B\vert D^c)=1-0.99=0.01$$.

$$
\mathbb P(B^c\vert D^c)=0.99
$$

The proportion of the the defective items is also known.

$$
\mathbb P(D)=0.02
$$

Given the conditions, we can compute:

- Probability that a randomly chosen iPhone tests positive

  > $$
  > \mathbb P(B)=\mathbb P(B\cap D)+\mathbb P(B\cap D^c)\\
  > =\mathbb P(D)\mathbb P(B\vert D)+\mathbb P(D^c)\mathbb P(B\vert D^c)\\
  > =0.02\times0.95+(1-0.02)\times0.01\\
  > =0.0288
  > $$
  >

- Probability of defective given that the test resulted positive

  >$$
  >\mathbb P(D\vert B)=\frac{\mathbb P(D\cap B)}{\mathbb P(B)}\\
  >= \frac{\mathbb P(D)\mathbb P(B\vert D)}{\mathbb P(B)}\\
  >=\frac{0.02\times0.95}{0.0288}\\
  >=0.65972
  >$$
  >


- Probability of defective given that the test resulted negative

  > $$
  > \mathbb P(D\vert B^c)=\frac{\mathbb P(D\cap B^c)}{\mathbb P(B^c)}\\
  > =\frac{\mathbb P(D)\mathbb P(B^c\vert D)}{1-\mathbb P(B)}\\
  > =\frac{(0.02)(0.05)}{1-0.0288}\\
  > =0.01
  > $$
  >

- Probability of screening error

  > ​
  > $$
  > \mathbb P(\text{Error})=\mathbb P(D\cap B^c)+\mathbb P(D^c\cap B)\\
  > =\mathbb P(D)\mathbb P(B^c\vert D)+\mathbb P(D^c)\mathbb P(B\vert D^c)\\
  > =(0.02)(1-0.95)+(1-0.02)(0.01)\\
  > =0.0108
  > $$
  >


## Bayes' Theorem

Bayes' theorem is a formula that describes how to update the probability of hypothesis given some evidence. 

$$
\mathbb P(H\vert E)=\frac{\mathbb P(E\vert H)}{\mathbb P(E)}\mathbb P(H)
$$

Where $$H$$ is hypothesis, $$E$$ is the evidence.

- $$\mathbb P(H)$$ is the **Prior Probability**
- $$\mathbb P(H\vert E)$$ is the **Posterior Probability**
- $$\frac{\mathbb P(H)}{\mathbb P(H\vert E)}$$ is the **Likely Ratio**

The **simple form** of Bayes' formula is:

$$
\mathbb P(D\vert B)=\frac {\mathbb P(D\cap B)}{\mathbb P(B)}=\frac{\mathbb P(B\vert D)\mathbb P(D)}{\mathbb P(B\vert D)\mathbb P(D)+\mathbb P(B\vert D^c)\mathbb P(D^c)}
$$

How did we get to the expression on the right? $$\mathbb P(D\cap B)=\mathbb P(B\cap D)$$ which $$\implies\mathbb P(D\vert B)\mathbb P(B)=\mathbb P(B\vert D)\mathbb P(D)$$. The denominator $$\mathbb P(B)$$ can be broken down intuitively into $$\mathbb P(B\cap D)+\mathbb P(B\cap D^c)$$. And then we turn the intersections in the denominator into conditional probability form.

The **general form** of Bayes' formula is:

$$
\mathbb P(D_i\vert B)=\frac{\mathbb P(D_i\cap B)}{\mathbb P(B)}=\frac{\mathbb P(B\vert D_i)\mathbb P(D_i)}{\sum^k_{j=1}\mathbb P(B\vert D_j)\mathbb P(D_j)}
$$

This is identical to above except some conditions need to be satisfied:

$$
\quad\Omega=\bigcup_{j=1}^kD_j\qquad D_i\cap D_j = \emptyset, \text {for } i\neq j
$$


> **Example**: three prisoners
>
> **Scenario**: 
>
> - Prisoner A, B, and C are to be executed
> - One of the prisoners are randomly chosen by the governor to be pardoned
> - Warden knows who is pardoned, but can't disclose
> - Prisoner begs the warden to know *which one of the other prisoner is not pardoned*
> - If B is pardoned, C's name is given; if C is pardoned, B's name is given; if A is pardoned, B or C's name is given (chosen by a random coin flip)
> - Warden tells A: "*B is not pardoned*"
>
> **Result**: Given the information, C is now twice more likely to be pardoned than A, why?
>
> **Solution**:
>
> Let
> $$
> A=\{\text{A is pardoned}\}\\
> B=\{\text{B is pardoned}\}\\
> C=\{\text{C is pardoned}\}\\
> $$
> and let
> $$
> b=\{\text{The warden says "B is not pardoned"}\}
> $$
>
> so we can say that the probability of each prisoner pardoned is $$^1/_3$$. These are the **Prior Probability**. This also implies that $$A, B, C$$ are all disjoint, which satisfies the conditions for the general Bayes' formula. 
> $$
> \mathbb P(A)=\mathbb P(B)=\mathbb P(C)=\frac 1 3
> $$
> Since we safely assume that the warden never lies, we can list the conditional probability of $$b$$ given each of events $$A, B,C$$. The probability of $$b$$ given $$B$$ (probability of warden saying prisoner B is not pardoned while prisoner B is pardoned) is 0. Next, the probability of $$b$$ given prisoner A being pardoned is $$^1/_2$$ because of the random coin toss. Last, the probability of $$b$$ given prisoner C being pardoned is 1.
>
> $$
> \mathbb P(b\vert B)=0\\
> \mathbb P(b\vert A)=\frac 1 2\\
> \mathbb P(b\vert C)=1
> $$
>
> Now we may use Bayes' formula to compute $$\mathbb P(A\vert b)$$
>
> $$
> \mathbb P(A\vert b)=\frac{\mathbb P(b\vert A)\mathbb P(A)}{\mathbb P(b\vert A)\mathbb P(A)+\mathbb P(b\vert B)\mathbb P(B)+\mathbb P(b\vert C)\mathbb P(C)}\\
> =\frac{(^1/_2)(^1/_3)}{(^1/_2)(^1/_3)+(0)(^1/_3)+(1)(^1/_3)}\\
> =\frac13
> $$
>
> ... and $$\mathbb P(C\vert b)$$.
>
> $$
> \mathbb P(C\vert b)=1-\left[\mathbb P(A\vert b)+\mathbb P(B\vert b)\right]\\
> = 1-[\frac13+0]\\
> =\frac23
> $$
>
> The probability of C being pardoned, thus, is proved to be twice the probability of A pardoned.

> **Example**: Screening Example II
>
> Suppose
>
> - $$D_1=\{\text{Only component C1 is defective}\},\quad\mathbb P(D_1)=0.01$$
> - $$D_2=\{\text{Only component C2 is defective}\},\quad\mathbb P(D_2)=0.008$$
> - $$D_3=\{\text{Both components are defective}\},\quad\mathbb P(D_3)=0.002$$
> - $$D_4=\{\text{Both components are non-defective}\},\quad\mathbb P(D_4)=0.98$$
>
> Also let $$B=\{\text{Screening test is positive}\}$$, so suppose
>
> - $$\mathbb P(B\vert D_1)=0.95$$
> - $$\mathbb P(B\vert D_2)=0.96$$
> - $$\mathbb P(B\vert D_3)=0.99$$
> - $$\mathbb P(B\vert D_4)=0.01$$
>
> Given these information, we may ask:
>
> - Probability of positive test
> - Probability that $$C_i$$ ($$i=1,2$$) is defective when the test resulted positive
> - Probability both components are defective when the test resulted positive
> - Probability of testing error
>
> *Probability of positive test*:
>
> $$
> \mathbb P(B)=\mathbb P(B\cap D_1)+\mathbb P(B\cap D_2)+\mathbb P(B\cap D_3)+\mathbb P(B\cap D_4)\\
> = (0.01)(0.95)+(0.008)(0.96)+(0.002)(0.99)+(0.98)(0.01)\\
> =0.02896
> $$
>
> *Probability of defective*:
>
> $$
> \mathbb P(D)=\mathbb P(D_1\cup D_2 \cup D_3)\\
> =0.01 + 0.008 + 0.002\\
> = 0.02
> $$
>
> *Probability of positive test*:
>
> `see slides`

## Independence

Events $$A$$ and $$B$$ are independent if the probability of the intersection of $$A$$ and $$B$$ equals to the product of the probability of each.

$$
\mathbb P(A\cap B)=\mathbb P(A)\mathbb P(B)
$$

If $$A$$ and $$B$$ are independent, then

$$
\mathbb P(A\vert B)=\frac{\mathbb P(A\cap B)}{\mathbb P(B)}=\frac{\mathbb P(A)\mathbb P(B)}{\mathbb P(B)}=\mathbb P(A)
$$

$$
\mathbb P(B\vert A)=\mathbb P(B)
$$

If $$\mathbb P(A)=1$$, then $$A$$ is independent of all $$B$$.

$$
\mathbb P(A\cap B)=\mathbb P(A\cap B)+\mathbb P(A^c\cap B)\\
=\mathbb P(A)\mathbb P(B)\\
=\mathbb P(B)
$$

If $$A$$ and $$B$$ are non-trivial and mutually exclusive ($$A\cap B=\emptyset$$) then they cannot be independent.

$$
\mathbb P(A\vert B)=0\lt\mathbb P(A)
$$

If $$A\subset B$$ then they cannot be independent.

$$
\mathbb P(A\vert B)=\frac{\mathbb P(A\cap B)}{\mathbb P(B)}=\frac{\mathbb P(A)}{\mathbb P(B)}\gt\mathbb P(A)
$$

If $$A$$ and $$B$$ are dependent, the probability of $$A\cap B$$ can still be calculated.

$$
\mathbb P(A\cap B)=\mathbb P(A\cup B)-(\mathbb P(A \text{ only})+\mathbb P(B \text{ only}))
$$


## System of Independent Components

Consider a system in system and parallel.

In series:

<div class="mermaid">
graph LR
i((input))-->a
a-->b
b-->c
c-->o((output))
</div>

In parallel:

<div class="mermaid">
graph LR
s((input))-->a
s-->b
s-->c
a-->o((output))
b-->o
c-->o
</div>

The **reliability** of the system is the rate the of getting a correct output given an input.

Let

$$
A=\{a\text{ works}\}\\
B=\{b\text{ works}\}\\
C=\{c\text{ works}\}
$$

And we assume $$A$$, $$B$$, and $$C$$ are independent. so

$$
\mathbb P(A\cap B \cap C)=\mathbb P(A)\mathbb P(B)\mathbb P(C)\\
\dotsc
$$

> **Example**: consider that each of the component $$A$$, $$B$$, or $$C$$ have the reliability of $$\mathbb P(A)=\mathbb P(B)=\mathbb P(C)=0.95$$.
>
> In *series*, the reliability is:
>
> $$
> \mathbb P(\text{system works})=\mathbb P(A\cap B\cap C)\\
> =\mathbb P(A)\mathbb P(B)\mathbb P(C)\\
> =0.95^3=0.857
> $$
>
> In parallel, we compute the reliability by computing the contrary (when the system will fail):
>
> $$
> \mathbb P(\text{system works})=1-\mathbb P(\text{system fails})\\
> =1-\mathbb P(A^c\cap B^c\cap C^c)\\
> =1-\mathbb P(A^c)\mathbb P(B^c)\mathbb P(C^c)\\
> =1-(1-\mathbb P(C))(1-\mathbb P(B))(1-\mathbb P(C))\\
> =1-0.05^3=0.9999
> $$
>

## Conditional Independence

**Definition**:

$$T_1,T_2,\dotsc,T_n$$ are conditionally independent given the event $$B$$ if:

$$
\mathbb P(T_{i_1}\cap T_{i_2}\cap\dots\cap T_{ik}\vert B)=\mathbb P(T_{i_1}\vert B)\mathbb P(T_{i_2}\vert B)\dots\mathbb P(T_{i_k}\vert B)
$$

- Conditional independence does not imply unconditional independence (and vise versa)
- Conditional independence given $$B$$ does not imply conditional independence given $$B^c$$
- Both conditional independences are assumed together in applications `?`

## Sequential Bayes' Formula

Let $$S_i$$ be the outcome of $$i$$-th test:

$$
S_1=\{\text{1st test is positive}\}\\
S_2=\{\text{2nd test is negative}\}\\
S_3=\{\text{3rd test is negative}\}\\
\dots
$$

The outcome will evolve as we obtain more information. $$\pi_0$$ is evaluated with no historical information or it is given.

$$
\pi_0=\mathbb P(E)\\
\pi_1=\mathbb P(E\vert I_1)=\mathbb P(E\vert S_1)\\
\pi_2=\mathbb P(E\vert I_2)=\mathbb P(E\vert S_1\cap S_2)\\
\dots
$$

where $$S_i$$ are outcome as a sequence. and the 'data' at step $$k$$ is $$I_k=\bigcap_{i=1}^k S_i$$

So assume that $$S_i$$ are independent given some event $$E$$ and also given $$E^c$$, then for $$k=1,2,3,\dotsc,n$$:

$$
\pi_k=\frac{\mathbb P(S_k\vert E)\pi_{k-1}}{\mathbb P(S_k\vert E)\pi_{k-1}+\mathbb P(S_k\vert E^c)(1-\pi_{k-1})}
$$

This means that the new probability $$\pi_k$$ depends on $$\pi_{k-1}$$ which is the previous probability, and $$\mathbb P(S_k\vert E)$$. $$S_k$$ is the new piece of data. $$I_k$$ is the intersection of $$S_k$$ and all previous data ($$S_{k-1}, S_{k-2},\dotsc$$).

---

> **Example**: pseudo code
>
> **Input**
>
> Outcomes for the $$n$$ tests: $$(S_1,S_2,S_3,\dotsc,S_n)=(1,0,1,\dotsc,0)$$
>
> Probability of event of interest $$E$$: $$\pi=\mathbb P(E)$$
>
> Sensitivity of $$k^\text{th}$$ test: $$p_k=\mathbb P(S_k=1\vert E),\quad k=1,2,\dotsc n$$
>
> Specificity of $$k^{\text{th}}$$ test: $$q_k=\mathbb P(S_k=0\vert E),\quad k=1,2,\dotsc,n$$
>
> **Output**
>
> $$\pi_k=\mathbb P(E\vert S_1\cap S_2\vert cap\dots \cap S_k),\quad k=1,2,\dotsc,n$$

> **Example**: demine whether a component of a device is fault or not, base on $$n$$ experiments

> **Example**: whether if a patient has cancer or not

> **Example**: Spam e-mail detection

