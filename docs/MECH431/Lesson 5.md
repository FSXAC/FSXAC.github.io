---
title: Time Value of Money
date: 2018-06-07
author: Muchen He
categories: [MECH 431]
use_math: true
---



- toc
{:toc}

# Lesson 5: Time Value of Money

Previously we've dealt economic problems assuming current costs and benefits (money doesn't change value over time). A more realistic / complex problem should account for how the value of money changes over time.

For example, generally it's better to have \$10,000 now rather than in the future. Given time, the money could be used to purchase assets or used in investment, which could worth more in the future.

## Time Value

**Importance of Time**

*Time is critical factor in most engineering studies*. It is generally more preferable to have money, goods or services sooner than later.

If the economic decision is short term, we may need to consider costs and benefits and taxes. But for longer term economic decisions, there exists *interests*, *inflation*, *depreciation*, *opportunity costs* and other costs that increase over time.

### Interest

Money has value. Valued entities can be leased or rented. The lease or rental payment is the interest to the money borrowed.

The **interest rate** is the rate of return *received by a lender* or *paid by a borrower*.

More details in the [Interest Rates](#interest-rates) section below.

### Inflation

**Inflation** is when the amount of goods or services purchasable by the same amount of money decreases over time. Which is equivalent to value of money decrease.

Thus it is reasonable to see that it's better to have the money now and than later as it could be used to purchase assets.

### Depreciation

Value in the form of assets such as equipment, real estate, raw materials, IPs, etc. depreciate over time (i.e. consumer electronics obsolescence). Therefore, people prefer to have money **now** than have assets that lose value over time.

### Taxes

One may be taxed for:

- holding money (amount of tax depends on the form of money held)
- spending money

Regardless, people prefer to have money and pay tax over not have money at all.



## Interest Rates

The interest rate is used to quantify how money is valued over time. It can be positive or negative. For *discrete cash flows* there are two types of interest: **simple** and **compound** interest.

**Definitions:**

$$
\begin{aligned}
P&: \text{present value}\\
F&:\text{future value}\\
i&:\text{interest rate per period}\\
n&:\text{number of periods}\\
I&:\text{interest  value}\\
I_n&:\text{interest value for single period }n
\end{aligned}
$$

### Simple

The interest is calculated once to the **original sum** and paid at the **maturity date**, the end of the term. The interest may have to be paid periodically, but is never recalculated and doesn't include previous interest.

$$
I=P\cdot i\cdot n
$$

> **Example**: fixed interest for 5 years
>
> We borrowed \$1,000 and we have 5% interest for the next 5 years. The total interest we have to pay is $$1000\times 0.05 \times 5=$$\$250.
>
> The amount of money due in total is $$F=P+P\cdot i\cdot n=$$\$1250.

### Compound

Interest is calculated periodically on the unpaid amount, thus accumulates based on the compounding periods (interest on top of interest).

| Period   | Value at start of period | Interest at end of period     | Future value at end of period    |
| -------- | ------------------------ | ----------------------------- | -------------------------------- |
| 1        | $$P$$                      | $$P\cdot i$$                    | $$P+P\cdot i$$                     |
| 2        | $$P+P\cdot i$$             | $$(P+P\cdot i)\cdot i$$         | $$P+P\cdot i+(P+P\cdot i)\cdot i$$ |
| $$\vdots$$ | $$\vdots$$                 | $$\vdots$$                      | $$\vdots$$                         |
| $$n$$      | $$\boxed{P(1+i)^{n-1}}$$   | $$\boxed{i\cdot P(1+i)^{n-1}}$$ | $$\boxed{P(1+i)^n}$$               |

Generalizes to **single payment compound amount**: $$F=P(1+i)<sup>n$$(single payment implies no payment is made during the periods and only paid at the very end). And interest at a particular period: $$I_n=i\cdot P(1+i)</sup>{n-1}$$.

#### Discount

Compounding is using compound interest rate to determine future value $$F​$$ given present value $$P​$$. **Discounting** is using the discount rate to determine present value $$P​$$ given future value $$F​$$.

- Used in discounted cash flow (DCF) analysis
- Discount rate is the interest rate used in DCF analysis
- Greater uncertainty implies higher discount rate

> **Example:** compound interest
>
> Given \$1000 today, put it in a saving's account with 2% interest. How much would it be in 10 years?
>
> Applying the compounding interest formula:
>
> $$
> \begin{aligned}
> F&=P(1+i)^n\\
> &=(1000)(1.02)^{10}\\
> &=1219
> \end{aligned}
> $$
>
> We earn extra \$219 in 10 years.

> **Example:** discount
>
> We want to have \$100,000 in our 5% savings account in 40 years. How much money should we put in now?
>
> Applying the inverse compounding interest formula to get discount formula:
>
> $$
> \begin{align}
> P&=F(1+i)^{-n}\\
> &=(100000)(1.05)^{-40}\\
> &=14205
> \end{align}
> $$
>
> We need to put in \$14,205 right now to get \$100,000 in 40 years.



### Nominal

**Nominal interest rate**, denoted by $$r$$ is the *annual* interest rate without considering any effect of any compounding.

> **Example**: 2% interest semiannually
>
> Then the nominal interest rate $$r$$ is $$2\times 2\%=4\%$$.

### Effective

**Effective interest rate** per year is denoted by $$i_a$$. This is the *annual* interest rate when accounting for compounding during the year.

> **Example:**
>
> Suppose we deposit \$100, and we still have 2% interest semiannually like the previous example.
>
> Then the value at the end of the first year is $$P(1+i)<sup>2=100(1+0.02)</sup>2=104.04$$. Effectively, the interest value is \$4.04. The effective interest rate, $$i_a$$ is thus $$4.04\div 100=4.04\%$$.

*Notice how the effective interest rate is slightly different from nominal interest rate.*

The **conversion** between effective and nominal interest rate is:

$$
\boxed{
\begin{aligned}
i_a&=\left(1+\frac rm\right)^m-1\\
&=\left(1+i\right)^m-1
\end{aligned}
}
$$

Where $$r$$ is the nominal interest rate, $$m$$ is the number of compounding sub-periods per time period, and $$i$$ is the effective interest per compounding period.



## Cashflow Equivalence

Money is values differently over time. Comparing the cash flow values in different time can determine when they are equivalent.

**Equivalence** implies different amount of money have the same value in different times with respect to an interest rate.

