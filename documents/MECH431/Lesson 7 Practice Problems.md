---
title: Lesson 7 Practice Problems
date: 2018-06-10
author: Muchen He
categories: [MECH 431]
use_math: true
---



- toc
{:toc}

# Lesson 7 Practice Problems[^0]

## Problem 1

You work for a company that provides maintenance for marine diesel engines in large container ships.  The main product you sell is a five-year service contract for a specific type of engine. You charge $85,000 each year, payable at the end of the year.

One of your customers wants to pre-pay the entire five-year contract.  If your company’s interest rate is 12.5% compounded annually, how much should you charge them (to the nearest dollar)?

> **Answer:**
>
> We are interested in the present value of a uniform series for 5 years. Our known variables: $$A=85000$$, $$i=12.5\%$$, $$n=5$$.
>
> Apply *present worth factor* formula:
>
> $$
> \begin{aligned}
> P&=A\left(\frac{(1+i)^n-1}{i(1+i)^n}\right)\\
> &=85000\left(\frac{(1+0.125)^{5}-1}{0.125(1+0.125)^5}\right)\\
> &=302,648
> \end{aligned}
> $$
>



## Problem 2

With another customer, your company has included a riser to account for increasing costs over time.  The first-year payment is \$85,000, with the price increasing \$2,500 each year thereafter.  If the customer wanted to just pay a constant amount for the five years, how much should that be? Use the same 12.5% interest rate, round to the nearest dollar.

> **Answer:**
>
> This time, since the cost is increasing linearly each period, we have a arithmetic series. In this case, the arithmetic series follows $$P_i=A+nG$$,  where $$A=85000$$ and $$G=2500$$.
>
> We could get the arithmetic gradient uniform series factor, which gives us the equivalent $$A_{eq}$$ and thus we can solve this like a uniform series.
>
> $$
> \begin{aligned}
> A_{eq}&=G\left(\frac{1}{i}-\frac{n}{(1+i)^n-1}\right)\\
> &=2500\left(\frac{1}{0.125}-\frac{5}{(1+0.125)^5-1}\right)\\
> &=4415
> \end{aligned}
> $$
>
> $$4415 is the amount need to paid in addition to the \$$85000 base cost. Thus the equivalent total annuity is
>
> $$
> A=85,000 +4,415=89,415
> $$
>



## Problem 3

A third, and somewhat less helpful customer, has a seven-year contract.  The first-year payment was \$60,000, with a clause that payments would increase by 4% per year.  The contract has now just expired (the seven years are up), and they have not yet payed a single bill.  What amount should you claim is owing when you sue them?

>**Answer:**
>
>Since payments increase by 4% each year, this is an indication of geometric series. Assuming 12.5% interest rate still. Here are the givens: $$g=0.04$$, $$i=0.125$$, $$A_1=60,000$$, $$n=7$$.
>
>We are looking future values now, so we shall use the *compound amount factor* to compute $$F$$:
>
>$$
>\begin{aligned}
>F&=A_1\left(\frac{(1+i)^n-(1+g)^n}{i-g}\right)\\
>&=60000\left(\frac{(1+0.125)^7-(1+0.04)^7}{0.125-0.04}\right)\\
>&=681,011
>\end{aligned}
>$$
>



## Problem 4

For your fourth customer, you estimate the present value of the work to be done is $1.2 million over six years. To avoid another situation like customer three, you are making this customer pay in advance.  Still with 12.5% interest, what should their (uniform) annual payments be?

> **Answer:**
>
> We are back to working with uniform payments, and knowing present value $$P=1.2\text M$$, we shall work with the *capital recover factor* to solve for the annuity $$A$$ over the next $$n=6$$ years.
>
> Because we ask that they pay up front (annuity due), we append the $$1+i$$ term. Since this is capital recovery factor, it is inversed.
>
> $$
> \begin{aligned}
> A&=P\left(\frac{i(1+i)^n}{(1+i)^n-1}\right)(1+i)^{-1}\\
> &=1,200,000\left(\frac{0.125(1+0.125)^6}{(1+0.125)^6-1}\right)(1+0.125)^{-1}\\
> &=263,125
> \end{aligned}
> $$
>



## Problem 5

Your fifth customer is a government operator.  They expect to operate a fleet of five ships for a long time (assume forever), and want to capitalize the maintenance costs.  If the expected costs for the fleet are a total of $463,000 per year, how much should the government pay you now to contract you to maintain their ships for their lifetime?

> **Answer:**
>
> This is a perpetuity situation. Assuming interests are still 12.5% and the cost each period are uniform, then the annuity can be given simply:
>
> $$
> A=\frac{P}{i}=\frac{463,000}{0.125}=3,704,000
> $$
>



## Problem 6

Your sixth and final customer is a small shop. Their contract is only for four years, and is $20,000 per year.  You charge them 12.5% compounded annually, however, they want to make quarterly payments. How much should their payments be?

> **Answer:**
>
> This problem can be split into two parts:
>
> 1. Find the present worth of all the costs.
> 2. Use present worth find payment per adjusted quarterly period.
>
> The present worth of all costs:
>
> $$
> \begin{aligned}
> P&=A\left(\frac{(1+i)^n-1}{i(1+i)^n}\right)\\
> &=20000\left(\frac{(1+0.125)^{4}-1}{0.125(1+0.125)^4}\right)\\
> &=60,113
> \end{aligned}
> $$
>
> Now we find the equivalent interest rate because payment period is different than compounding period: (where $$c=1$$ is the number of compounding periods per year and $$p=4$$ is the number of payment periods per year)
>
> $$
> \begin{aligned}
> i_{eq}&=(1+i)^\frac{c}{p}-1\\
> &=(1+0.125)^\frac{1}{4}-1\\
> &=0.03
> \end{aligned}
> $$
>
> Applying *capital recovery factor*, we get the amount of payment per period, where $$n=4\times 4$$:
>
> $$
> \begin{aligned}
> A&=P\left(\frac{i_{eq}(1+i_{eq})^n}{(1+i_{eq})^n-1}\right)\\
> &=60,113\left(\frac{0.03(1+0.03)^{16}}{(1+0.03)^{16}-1}\right)\\
> &=4781
> \end{aligned}
> $$
>



[^0]: M. Hollett, MECH 431 001 Lesson 7 Practice Problems. Web. Accessed 2018-06-10.

