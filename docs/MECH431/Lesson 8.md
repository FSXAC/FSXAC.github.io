---
title: Present Worth Analysis
date: 2018-06-17
author: Muchen He
categories: [MECH 431]
---



- toc
{:toc}

# Present Worth Analysis

## Assumptions

**End-of-Year Convention**
All cash flow are calculated as amounts at the end of each period

**Viewpoint of Economic Analysis Studies**
Viewpoints of the study must be carefully considered as a narrow viewpoint could lead to suboptimal decisions.

**Sunk Costs**
Prior costs that lead up to now are not considered; only the current situation and the potential future is considered.

**Borrowed Money Viewpoint**
*Financing* is the obtaining of money and *investment* is the spending of money. The money required to finance alternatives/solutions is considered to be obtained at interest rate $$i$$.

**Effect of Inflation and Deflation**
For now, we assume there is *no* inflation or deflation. (They will play a big role later; scary).

**Income Taxes**
Also not considered for now (prevalent later; scary).



## Economic Criteria

Outcomes of feasible solutions must be judged for **economic efficiency**, so depending on the situation the criterion will be:

| Situation              | Criterion                            |
| ---------------------- | ------------------------------------ |
| Input nor output fixed | Maximize difference (output - input) |
| Fixed input            | Maximize output                      |
| Fixed output           | Minimize input                       |

> **Example**:
>
> | Situation              | Situation example                                 | Criterion                                  |
> | ---------------------- | ------------------------------------------------- | ------------------------------------------ |
> | Input nor output fixed | No limit on capital and at least 50 cars produced | Maximize the output per invested capital   |
> | Fixed input            | Given \$10M to make drones                        | Maximize output / revenue given the money. |
> | Fixed output           | Required to make 500 smartwatches                 | Minimize the cost of production            |



## Present Worth Techniques

Present worth techniques resolves consequences / benefits of alternatives to the present time. We must consider the time period covered by the analysis, AKA **analysis period**, **planning horizon**, or **project life**.

The analysis period differs in industries. Volatile, tech industries have short period. Industries with more stable tech have longer periods (10-20 years). Government analysis periods can be up to 50 years.

There are three analysis-period cases:

1. The useful life of each alternative equals to the analysis period.
2. The alternatives have useful lives different from the analysis period.
3. There is an infinite analysis period ($$n=\infty$$).

> **Note**:
>
> Present worth (PW), present value (PV), net present worth (NPW), and net present value (NPV) are synonymous. Where 'net' implies inclusion of both costs and benefits.

---



### Useful Lives == Analysis Period

First we identify the economic scenario such that we can pick the right criterion. In cases when input and output are not fixed, we use NPV criterion, which is:

$$
\text{NPW}=\text{benefits PW}-\text{cost PW}
$$

> **Example**: textbook example 5-1
>
> Two mechanical devices; both has 5 year lifespan. Device A costs \$1,000 and results in \$300 saving annually. Device B costs \$1,350 and results in \$300 saving the first year with \$50 increase each year. Interest is 7%.
>
> We consider the present worth of both device A and B:
>
> $$
> \begin{aligned}
> \text{PW}_A&=300(P/A, 7\%, 5)-1000=\$230\\
> \text{PW}_B&=300(P/A, 7\%, 5)+50(P/G, 7\%, 5)-1350=\$262
> \end{aligned}
> $$
>
> In this case we should go with B because it has more present worth.

---



### Useful Lives ~= Analysis Period

It is not fair to compare something that lasts 5 years vs. something that last 10 years long. One method is to select a period that is the **least common multiple** of the alternatives' useful lives.

For alternatives that don't reach the analysis period, we will just replace / renew the unit as if we are buying a new one.

> **Example**: textbook example 5-3 (modified)
>
> We want to buy some :joy: machines. :a: sells for \$1,500 and has a useful life of 5 years; its end-of-useful-life salvage value is \$200. :b: sells it for \$1,600, has useful life of 10 years; its end-of-useful-life salvage value is \$325.
>
> First let's look at :b:'s :joy: machine. The present worth of costs (including salvage value using *capital recovery factor*) is:
>
> $$
> \text{PW}_B=1600-325(P/F, 7\%, 10)=\$1435
> $$
>
> For :a:'s machine, since the analysis period is 10 years and their :joy: machine only lasts 5 year, we will need to buy a second :joy: machine after the first 5 years.
>
> Ergo, the present worth of its costs is:
>
> $$
> \text{PW}_A=1500+\underbrace{(1500-200)(P/F, 7\%,5)}_{\text{buying the 2nd unit}}-\underbrace{200(P/F, 7\%, 10)}_{\text{salvage of the 2nd unit}}=\$2325
> $$
>
> It is evident that :a:'s :joy: machine has lower costs, and thus is the preferred option.

For scenarios where the LCM period is very large or we know the **needed** useful life period, then there is no need to have the analysis period = LCM.

---



### Infinite Analysis Period

There are cases where certain cases must be maintained for an infinite period (i.e. infrastructure). In these situations, the present worth of cost analysis would have an infinite period. We need **capitalized cost**, the present sum of money such that we can use it to indefinitely.

Recall *perpetuity*:

$$
\text{Capitalized cost } P=\frac A i
$$

> **Example**: modified textbook example 5-6
>
> \$5 for Spotify subscription forever, assuming interest rate of 3%
>
> The capitalized cost is $$\frac{5}{0.03}$$ which is  \$167.

> **Example**: textbook example 5-7
>
> We have pipeline that needs repair. After fix the pipeline needs another repair every 70 years. Each time costs \$8M. Interest is 7%.
>
> First we need to find the annuity. This can be done using *sinking funds formula* (A/F, n, i):
>
> $$
> A=8\,000\,000(A/F, 70, 0.07)=\$4\,960
> $$
>
> Now we can find the capitalized cost:
>
> $$
> P=\frac{4960}{0.07}=\$71\,000
> $$
>
> Note that we also have the initial repair of \$8M so the actual total capitalized cost is \$8.071M.

---



### Multiple Alternatives

For more than two alternatives, there are various ways of approach. Common approaches include computing the present worth of cost of each alternatives.

Note that the evaluation of each alternative must have a **common analysis period**. Same as unequal useful lives as outlined before, we can LCM or explicit period as analysis period and assume that alternatives can be repeated purchased.

****

> **Example**: textbook example 5-8
>
> Want to build some pipes to carry some dank liquid. Expected operating period 5 years. 2000 hours operation per year. Lowest interest rate at which the contractor is willing to invest is 7% (7% is the MARR).
>
> > **Recall** minimum attractive rate of return (MARR) is the minimum required rate for invested money.
>
> There are four pipe size options; costs are as follows:
>
> | Pipe size             | 2 in.    | 3 in.    | 4 in.    | 6 in.    |
> | --------------------- | -------- | -------- | -------- | -------- |
> | **Installation cost** | \$22,000 | \$23,000 | \$25,000 | \$30,000 |
> | **Cost per hour**     | \$1.20   | \$0.65   | \$0.50   | \$0.40   |
>
> From here we can compute the *present worth cost* for each option for its operation in entirety (5 years).
>
> The cost for any options is given as $$x\times2000\times (P/A,7\%, 5)+y$$, where $$x$$ is the cost per hour, and $$y$$ is the installation cost.
>
> It turns out that 3 in. size option has the lowest present worth cost and thus is the preferred option.

