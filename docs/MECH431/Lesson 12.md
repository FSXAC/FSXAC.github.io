---
title: Future Value Analysis & Benefit Cost Ratio
date: 2018-07-19
author: Muchen He
categories: [MECH 431]
---



- toc
{:toc}

# Future Value Analysis & Benefit Cost Ratio



## Future Value Analysis

- One might want to look at the worth at some point in the future.
- Future worth analysis is identical to [present worth analysis](documents/MECH431/l8), except the the analysis is in the future.
- Analysis period for the alternatives must be the same (same as PWA). Extend analysis period to least common multiple (LCM) of all alternatives' useful life time.

---



*Recall the definitions:*

**Net Present Value (NPV)**: equivalent value of discounted project cashflow to present time (often time zero).

**Net Future Value (NFV):** equivalent value of compounded project cashflow to a desinated future point in ime. It is the accumulation of unrecoverd capital and required returns throughout the project.

- If NFV > 0, then the net cashflow at the end is profit, so one should **accept** the project.
- If NFV < 0, then the net cashflow at the end is loss, so one should **reject** the project.
- If NFV is 0, then *marginally* accept. (Perhaps one should consider additional factors that may influencce the projection).
- If **all alternatives** have NFV < 0, don't forget the *do nothing* option.

---



Recall the *economic criterion* based on fixed input/output:

|                   | Situation                              | Criterion                                                    |
| ----------------- | -------------------------------------- | ------------------------------------------------------------ |
| **Fixed input**   | Amount of capital is fixed             | Maximize future value of benefits                            |
| **Fixed output**  | Amount of benefit is fixed             | Minimize the future value of costs                           |
| **Unconstrained** | Neither capital nor benefits are fixed | Maximize NFV (maximize future value of benefits and minimize future value of costs) |

> **Example**: lecture slide example
>
> |                | A      | B      | C                                   |
> | -------------- | ------ | ------ | ----------------------------------- |
> | Investment     | \$2.5k | \$3.5k | \$5.0k                              |
> | Annual cost    | \$900  | \$700  | \$1000 with \$100 increase each year |
> | Salvage value  | \$200  | \$350  | \$600                               |
> | Life           | 5      | 5      | 5                                   |
> | Annual revenue | \$1.8k | \$1.9k | \$2.1k with 15% growth rate         |
> | MARR           | 10%    | 10%    | 10%                                 |
>
> We compute the NFV:
>
> $$
> \text{NFV}_A=(-2500)(F/P, 10\%,5)+(1800-900)(F/A, 10\%, 5)+200\\
> \text{NFV}_B=(-3500)(F/P, 10\%, 5)+(1900-700)(F/A, 10\%, 5)+350\\
> \text{NFV}_C=(-5000)(F/P, 10\%, 5)+(2100)(F/g, g=15\%, 10\%, 5)\\+(-1000)(P/A, 10\%, 5)+(-100)(F/G, 10\%, 5)+600
> $$
>
> Once computed, NFV for option C is highest. Therefore, this should be the option that should be taken.



## Benefit to Cost Ratio Analysis

In simple terms, it is the ratio of the benefit over costs:

$$
\text{Ratio}=\frac{\text{PW of benefit}}{\text{PW of costs}}=\frac{\text{FW of benefit}}{\text{FW of costs}}=\frac{\text{EUAB}}{\text{EUAC}}
$$

For a sensible decision, the benefit to cost ratio should be $$\geq 1$$.
