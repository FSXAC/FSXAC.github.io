---
title: Information Theory
date: 2017-10-31
categories: ELEC 321
use_math: true
---


- toc
{:toc}

## Information Measure

How much information is required to to represent some outcome. If the outcome is either true or false, then only 1 bit is required to store the information with no loss.

Information measure should take into account the probabilities of outcomes to minimize the "footprint" of the information stored.

Suppose there are $$M$$ symbols: $$x_i, i\in\{1,2,\dots,M\}$$. Then the information in each symbol is measured as

$$
\boxed{I(x_i)=\log_n\left(\frac{1}{p_i}\right)}
$$

If the symbols are bits in a computer, then $$n=2$$ and $$I(x_i)$$ is number of bits.

**Requirements**

1. If $$p_i<p_j$$ then $$I(x_i)>I(x_j)$$
   - This implications states that if the probability of an event is greater, then less there is less information regarding that event. (Raining in November vs. snowing in July)
2. If $$p_i\rightarrow 1$$ then $$I(x_i)\rightarrow 1$$
   - If some event is going to occur *always* (i.e. there is someone on Earth that will alive tomorrow), then it holds no information
   - Similar argument for $$p_i\rightarrow 0$$ since it's just the compliment of that (i.e. no one will be alive on Earth tomorrow)
3. $$I(x_i)\geq 0$$
   - Information cannot have negative size (honestly WTF would negative information even mean?)
4. If $$x_i, x_j$$ are independent then $$I(x_i, x_j)=I(x_i)+I(x_j)$$

> **Example**:
>
> You got admitted to Stanford university (4.8% admission rate), then the chance is about 1 in 21. It follows that the information measured is $$\log_2(21)\approx 4.4$$ bits.
>
> However, it was all a dream; you did not get into Stanford. Then you're part of the 95.2% that was rejected, or 20 in 21, or 0.952. Thus, the information measured is $$\log_2(1.05)\approx 0.071$$ bits.

### Shannon Entropy

The total information in a message with $$N$$ symbols and an alphabet size of $$M$$ is given by

$$
-N\sum_{i=1}^M p_i\log_2(p_i)
$$

The average information is the entropy, which is

$$
\boxed{H(X)=-\sum_{i=1}^M p_i\log_2(p_i)}
$$

Notice that it can be also expressed as $$-\mathbb E\{\log_2(p_i)\}$$.

### Source Coding Theorem

The entropy tells us the **minimum** number of bits required to represent each symbol. Any less then we have a lossy encoding / compression.

According to *law of large numbers*, on average, any symbol $$x_i$$ will appear $$N\times p_i$$ times. Where $$N$$ is the length in number of bits, and $$p_i$$ is the probability of occurrence. This approximation is only accurate as $$N\rightarrow \infty$$.

#### Typical Sequences

In a stream of information that has $$N$$ bits, number of typical sequences are

$$
2^{N\cdot H(X)}
$$

It follows that we need $$N\cdot H(X)$$ bits to represent a typical sequence.

Assuming that each typical sequence is equally likely, then the probability of a typical sequence is

$$
\frac{1}{2^{N\cdot H(X)}}
$$

## Huffman Coding

It is a method of encoding symbols with codewords. The idea centers around **prefix-free code**: meaning that the codeword is never a prefix to other symbols' codewords.

Huffman coding allows the symbol that appears the most use codewords that have the least length. Therefore number of bits that is required to be transmitted is minimized.

### Algorithm

1. Create a binary tree where the leaf nodes is sorted
   - The leaf nodes represent the symbol and its probability
2. Join two leaf nodes that has the least probabilities into a parent node
   - The parent node holds the sum of the probability of its children nodes
   - Repeat this until the parent node is a root node.
3. Starting from the root node, find the path it takes to get to a leaf node (the symbol)
   - If the path to a symbol is {left, left, right}, one could encode this symbol 001 or 110.

