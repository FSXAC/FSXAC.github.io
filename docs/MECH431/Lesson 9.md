---
title: Equivalent Annual Cashflow Analysis
date: 2018-06-18
author: Muchen He
categories: [MECH 431]
use_math: true
---



- toc
{:toc}

# Equivalent Annual Cashflow Analysis

> Note: I've used the terms EACF (equivalent annual cashflow) and EUAC / EUAB / EUAW interchangeably throughout this set of notes. But they're similar in concept with EACF being the superset of the others.

The goal is to convert money into equivalent annual cashflow. The simplest form is to convert $$P$$ to $$A$$ in *capital recover factor* calculation.

Essential points for cash flow calculations:

1. There exists direct relationship between present worth of cost and equivalent annual cost:

   $$
   \text{EUAC}=P(A/P,i,n)
   $$

   The EACF is the annuity payment that gives the **net present value** when discounted by the required rate of return.

2. Expense increase EUAC, receiving/salvaging decrease EUAC.

3. If there are irregular cash flow over the analysis period, one way is to find present worth first, then find equivalent annual cashflow.

4. If there is an arithmetic gradient, EUAC can be found faster using *arithmetic gradient uniform series factor* $$(A/G, i, n)$$.

> **Example**: arithmetic gradient series
>
> Given that uniform cashflow $$A$$ superposed with gradient $$G$$, along with interest rate $$i$$ for $$n$$ periods, then the EUAC is simply:
>
> $$
> \text{EUAC}=A+G(A/G,i, n)
> $$
>



**Formulas**

$$
\boxed{\begin{aligned}
\text{EUAC}&=P(A/P, i, n)-S(A/F, i, n)\\
\text{EUAC}&=(P-S)(A/F,i,n)+Pi\\
\text{EUAC}&=(P-S)(A/P,i,n)+Si\\
\end{aligned}}
$$

## Annual Cash Flow Analysis

### Economic Criteria

| I/O            | Situation                                           | Criterion                                                |
| -------------- | --------------------------------------------------- | -------------------------------------------------------- |
| Both non-fixed | General situation                                   | Maximize net equivalent uniform annual worth (EUAB-EUAC) |
| Fixed input    | Amount of resource or money is fixed                | Maximize equivalent uniform benefit (EUAB)               |
| Fixed output   | There is a fixed benefit or output that is required | Minimize equivalent uniform cost (EUAC)                  |

> **Example**: textbook example 6-6
>
> There are three plans (with null plan) with costs and benefits as follows with interest at 8% for 10 years:
>
> |                | Plan A | Plan B | Plan C | Plan D (Do nothing) |
> | -------------- | ------ | ------ | ------ | ------------------- |
> | Initial cost   | 15k    | 25k    | 33k    | 0                   |
> | Annual benefit | 14k    | 9k     | 14k    | 0                   |
> | Annual expense | 8k     | 6k     | 6k     | 0                   |
> | Salvage value  | 1.5k   | 2.5k   | 3.3k   | 0                   |
>
> Since input nor output is fixed, we should consider the EUAW.
>
> We will compute EUAB and EUAC independently. The EUAB involves the annual benefit and the salvage value (future value). Since the annual benefit is already annual, we just need to calculate the equivalent annual benefit of the salvage value - using *sinking funds factor* $$(A/F, 8\%, 10)$$.
>
> Same story with cost. We find the equivalent annual cost of the initial cost using *capital recovery factor* $$(A/P, 8\%, 10)$$ and add it with the annual benefit to obtain EUAC.
>
> Lastly, compare EUAB-EUAC of each option and pick the biggest.



## Analysis Period

Similar compared to present worth analysis. If **analysis period equal to alternative lives**, then the economic study continues based on the analysis period.

If **analysis period differs from alternative lives** then we can use the LCM as the analysis period. Only under the condition that all alternatives have the same analysis period that we can evaluate validly.

### Continuing Requirement

If we are considering the alternative for a longer period such that we will just buy a new one at the end of a lifetime. We can make the best decision based on minimizing EUAC and maximizing EUAB. Later we will make replacements to the units

> **Example:** textbook example 6-8
>
> Two pumps with 7% interest:
>
> |               | A    | B    |
> | ------------- | ---- | ---- |
> | Initial cost  | 7k   | 5k   |
> | Salvage value | 1.5k | 1k   |
> | Lifetime      | 12   | 9    |
>
> We can assume that we need A or B for some continuing period. Then it is ok to compare the alternatives with unequal lifetimes.
>
> EUAC for pump A is $$(7000-1500)(A/P, 7\%, 12)+1500(0.07)=\$$797$$ while the EUAC for pump B is $$(5000-1000)(A/P, 7\%, 9)+1000(0.07)=684$. (Using formulas from above). So we should go with pump B.

The continuing requirement may be described as an *indefinitely long horizon*.



### Infinite Analysis Period

Since the equivalent annual cost accounts for all costs and splits them evenly. By intuition, EUAC for infinite lifetime is given as:

$$
\text{EUAC}_{\infty}=\text{EUAC}=Pi+\{\text{any other annual costs}\}
$$
