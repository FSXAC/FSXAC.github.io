---
title: Replacement Analysis
date: 2018-08-08
author: Muchen He
categories: [MECH 431]
---



- toc
{:toc}

# Replacement Analysis

*When* should we replace something? At what point does the cost of the current equipment is higher than re-purchasing new tools?

Sometimes economic life is less than physical life (cost of operation is not worth even if something still not worn out). It is more economic to replace it with something else.

**Defender** is existing asset, **challenger** is the proposed replacement.



Issues to consider as our cost/benefits when doing replacement analysis:

- repairability and repair costs
- preventative maintenace
- is only one replacement allowed?
- is there more than one replacement unit available?
- do future replacement units differ overtime? (what technlogical improvements is considered (upgrades)?)
- are periodic operating and maintenance costs constant or variable over time



### Minimum Cost Life

We take the initial cost of the asset and the on-going cost, and we find the EUAC. The initial cost is spread over the life-time (reducing equivalent annual cost). The other hand is the increasing annual cost to maintain the asset.

So we're trying to figure out the time where the EUAC is minimum.

> **Example**:
>
> initial cost of \$15,000, annual costs \$1,000 first year with \$500 increase each year after.
>
> Annual initial cost is the inital cost divided by years. The operating costs increases each year. The sum of the two is the total annual costs. Find the year such that this is minimum.

The result is a "bathtub" curve; we want to replace asset when the cost is minimum:

<img src="assets/image-20180808204532891.png" width=40%>



### Decision Map

Strategy:

![image-20180808204650360](assets/image-20180808204650360.png)

![image-20180808204830977](assets/image-20180808204830977.png)

The **mariginal cost** is the cost to keeping an asset for one more year. It includes:

- capital recovery cost (loss in market value and loss in interest): it is the opportunity cost of keeping the asset. (i.e. we can sell it right now and take that money and put it elsewhere, perhaps collect interest from that money).
- yearly operating and maintainance cost
- yealry taxes and insurance



## Techniques

### 1

Assuming:

- best challneger will continue to be available in all later years
- the period of needed services is infinite

Defender marginal costs are increasing:

- Retain defending if marginal cost for next year is less than min. EACF of teh challenger
- Else, replace



### 2

Defender marginal costs are decreasing (early on in its useful life):

- retain if: marginal EACF of defender < minimum EACF of the challenger
- if defender is retained, replace it with the challenger when the marginal cost becomes > the min. EACF of the challenger



### 3

When we don't know the marginal cost of defender:

- compare EACF of the defender over its remaining useful life against hte minimum EACF of the challenger
- replace if defender EACF < challenger EACF



## Complications

**Salvage value**:

- consider from opportunity cost persepective. What's the loss of the salvage value when we keep operating, as well as the interests lost from that salvage value.



> **Example**:
>
> Period: 10 years, interest rate is 11% per year.
>
> ![image-20180808205723627](assets/image-20180808205723627.png)
>
>
