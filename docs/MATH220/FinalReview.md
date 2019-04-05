---
date: 2017-12-127
categories: MATH 220
title: Final Review
use_math: true
---

- toc
{:toc}

## Chapter 1

### Set

- Denoted by $$\{\}$$
- Element in the set: $$1\in \{1, 2\}$$
- Subset: $$\{1\}\subset \{1,2\}$$

### Power Set

Suppose $$A=\{1, 2\}$$ then its **power set** is a set of all subsets of $$A$$: $$\mathcal P(A)=\{\emptyset, \{1\}, \{2\}, \{1, 2\}\}$$

### Set Operations

Suppose sets $$A=\{1,2,3\}, B=\{3, 4, 5\}$$

#### Union

If $$x\in A$$ or $$x\in B$$ then $$x\in A \cup B$$

#### Intersection

If $$x\in A$$ and $$x\in B$$ then $$x \in A\cap B$$

#### Difference

If $$x\in A$$ and $$x\notin B$$ then $$x\in A-B$$

#### Compliment

If $$x\in A$$ then $$x\notin \bar A$$

### Direct Product

**Direct product** of two sets is $$A\times B$$ that outputs an *ordered set* $$(a, b)$$ such that $$a\in A, b\in B$$.

### Indexed Sets Operations 

#### Union

$$
\bigcup_{i=1}^{n}A_i=A_1\cup A_2\cup A_3\cup \dots
$$

#### Intersection

$$
\bigcap_{i=1}^{n}A_i=A_1\cap A_2\cap A_3\cap \dots
$$



## Chapter 2

### Statement

A statement is a claim. A statement can be **true** or **false**. 

### Logical Operations

#### Conjunction

Binary operator also known as **and**. Denoted by $$\wedge$$. Suppose $$A$$ and $$B$$ are statements $$A\wedge B$$ is true if and only if $$A$$ and $$B$$ are both true.

#### Disjunction

Binary operator also known as **or**. Denoted by $$\vee$$. $$A\vee B$$ is true if $$A$$ is true, $$B$$ is true, or both is true.

#### Negation

Denoted by $$\neg$$. If $$A=\neg B$$, then $$A$$ is true if and only if $$B$$ is false.

### Open Sentence

A statement that can't be determined to be true or false unless a *quantifier* is given. An example would be:

- $$x$$ is an even number.

### Logical Equivalences

#### DeMorgan

$$
\neg (A\cap B)=\neg A\cup \neg B
$$

#### Distributive 

$$
A\cap(B\cup C)=(A\cap B)\cup(A\cap C)
$$

### Implications

**Implication**: $$P\implies Q$$

**Converse**: $$Q\implies P$$

**Contrapositive**: $$\neg Q \implies \neg P$$

**Negation**: $$\neg (P\implies Q)\equiv \neg P \wedge Q$$  

### Biconditional Implications

Also referred to as "if and only if"
$$
P\iff Q\equiv (P\implies Q)\wedge(Q\implies P)
$$

### Quantifier

An example of quantifiers to the open sentence example (above) would be:

- $$\forall x\in \mathbb N$$ (this would make the statement false)
- $$\exists x\in \mathbb N$$ (this would make the statement true)

#### Negation

$$
\neg \forall \equiv \exists,\quad \neg \exists \equiv \forall
$$

## Chapter 4-10

### Direct Proof

To prove $$P\implies Q$$, the structure is:

$$
\begin{align}
&\text{Assume P is true}\\
&\vdots\\
&\text{Therefore Q is true}
\end{align}
$$

### Proof By Cases

Usually use when there there is a disjunction in the proof. 

### Proof By Contrapositive

To prove $$P\implies Q$$, the structure is:

$$
\begin{align}
&\text{Assume Q is false}\\
&\vdots\\
&\text{Therefore P is false}
\end{align}
$$

### Proof By Contradiction

To prove $$P\implies Q$$, the structure is:

$$
\text{Assume the hypothesis is negated}: \neg Q \wedge P,\\
\vdots\\
\text{finds contradiction}\\
\text{Therefore the negated statement is false (original hypothesis is true)}
$$

### Existence Proof

To prove $$\exists x, R(x)$$, where $$R(x)$$ is the statement. Just provide an example.

#### Uniqueness Proof

To prove $$\exists x, R(x)$$, $$x$$ is unique, provide an example $$x=d$$ for which $$R(d)$$ is true (existence proof) and show that $$d$$ is the only unique example.

#### Constructive Proof

Gives an explicit example that proves and existence proof.

#### Non-Constructive Proof

Proves an example exists without actually providing it.

### Mathematical Induction

#### Proof By Induction

To prove the statements $$S_1, S_2, S_2\dots$$ are all true, the structure is:

$$
\begin{align}
&\textbf{(basis step)}\text{ Prove }S_1\text{ is true}\\
&\textbf{(induction step)}\text{ Given any integer } k\geq1, \text{Prove } S_k\implies S_{k+1}\\
&\vdots\\
&\text{By induction hypothesis...}\\
&\vdots\\
&\text{Therefore }S_n\text{ is true}
\end{align}
$$

#### Strong Mathematical Induction

Strong induction works the same as regular induction, except:

- instead of assuming $$S_k$$ is true, we assume $$S_1, S_2,\dots, S_k$$ all to be true.

#### Proof By Smallest Counterexample

This is a hybrid of proving by induction and proving by contradiction. To prove $$S_1, S_2, \dots$$ are all true, the structure is:

$$
\begin{align}
\textbf{(basis)}&\text{ Prove } S_1 \text{ is true}\\
\textbf{(contradict)}& \text{ For the sake of contradiction, assume not every }S_n\text{ is true}\\
&\text{Let smallest integer }k>1 \text{ such that } S_k \text{ is false}\\
&\text{Then }S_{k-1} \text{ is true and } S_k \text{ is false; get contradiction}
\end{align}
$$


## Chapter 11

### Relation

Definition: a **relation** $$R$$, on a set $$A$$ is a subset $$R\subset A\times A$$. 

#### Relation Properties

- Relation $$R$$ is **reflexive** iff $$\forall x \in A, xRx$$
- Relation $$R$$ is **symmetric** iff $$\forall x, y\in A, xRy\implies yRx$$
- Relation $$R$$ is **transitive** iff $$\forall x, y, z\in A, ((xRy)\wedge(yRz))\implies xRz$$

### Equivalence Relation

A relation $$R$$ is an **equivalence relation** iff $$R$$ is reflexive, symmetric, and transitive. 

### Equivalence Class

Equivalence relations on $$A$$ divides $$A$$ into subsets called **equivalence class**. The **equivalence class containing** $$a$$ is the subset $$\{x\in A:xRa\}$$ of $$A$$ consists of all elements of $$A$$ that relates to $$a$$. 

- Denoted as $$[a]$$
- Where $$[a]=\{x\in A: xRa\}$$
- If there exists $$[a]=[b]$$, there is still only one equivalence class. 

> **Theorem 11.1**: Suppose $$R$$ is an equivalence relation on set $$A$$ and $$a,b\in A$$. Then $$[a]=[b]$$ iff $$aRb$$ 

#### Partition

A **partition** of set $$A$$ is a set of non-empty subsets of $$A$$ such that the union of all subsets equals $$A$$ and intersection of any two subsets equals $$\emptyset$$. 

> **Theorem 11.2**: Suppose $$R$$ is an equivalence relation on set $$A$$. Then the set $$\{[a]:a\in A\}$$ forms a *partition* of $$A$$.

### Integer Modulo n

The equivalence classes of the equivalence relation $$\equiv (\text{mod } n)$$ are $$[0], [1], \dots, [n-1]$$, for some $$n\in \mathbb N$$. Then the **integer modulo n** is the set $$\mathbb Z_n=\{[0], [1], \dots, [n-1]\}$$.

- Property 1: $$[a]+[b]=[a+b]$$
- Property 2: $$[a]\cdot[b]=[a\cdot b]$$ 

## Chapter 12

### Function

- A **function** is denoted as $$f:A\rightarrow B$$, where $$A$$ is the domain and $$B$$ is the codomain
- The **range** of function $$f$$ is the set $$\{f(a):a\in A\}=b:(a,b)\in f$$
- Two functions $$f$$ and $$g$$ are the same iff $$\forall x\in A, f(x)=g(x)$$ 

### Injective

A function is **injective** iff $$\forall x,y\in A, x\neq y\implies f(x)\neq f(y)$$.

To prove a function is injective, the proof structure is (contrapositive):

$$
\begin{align}
&\text{Suppose }x,y\in A \text{ and } f(x)=f(y)\\
&\vdots\\
&\text{Therefore x=y}
\end{align}
$$

### Surjective

A function is **surjective** iff $$\forall b\in B, \exists a\in A$$ such that $$f(a)=b$$ 

To prove a function is surjective, the proof structure is (direct):

$$
\begin{align}
&\text{Suppose } b\in B\\
&\vdots\\
&\text{*Existential proof for } \exists a\in A \text{ for which } f(a)=b*
\end{align}
$$

### Bijective

A function **bijective** iff the function is both *injective* and *surjective*

### Pigeonhole Principle

Suppose $$A$$ and $$B$$ are finite sets and $$f:A\rightarrow B$$ is any function, then:

- If $$\lvert A \rvert >\lvert B\rvert$$ then $$f$$ is not injective
- If $$\lvert A \rvert <\lvert B\rvert$$ then $$f$$ is not surjective

Suppose $$A$$ and $$B$$ are finite sets and $$A\neq \emptyset, B\neq \emptyset$$, then:

- If $$\lvert A \rvert \geq \lvert B \rvert $$ then $$\exists$$ a surjective $$f:A\rightarrow B$$
- If $$\lvert A \rvert \leq\lvert B \rvert $$ then $$\exists$$ an injective $$g:A\rightarrow B$$ 
- If $$\lvert A \rvert =\lvert B \rvert $$ then $$\exists$$ a bijective $$h: A\rightarrow B$$

### Composition

Suppose $$f:A\rightarrow B, g:B\rightarrow C$$, then the **composition** is $$g\circ f:A\rightarrow C$$ 

> **Theorem 12.1**: If $$f:A\rightarrow B$$, $$g:B\rightarrow C$$, $$h:C\rightarrow D$$, then $$(h\circ g)\circ f=h\circ (g\circ f)$$
>
> **Theorem 12.2**: If $$f:A\rightarrow B$$ and $$g: B\rightarrow C$$, if both $$f$$ and $$g$$ are injective, then $$g\circ f$$ is injective

### Inverse Function

For a bijective $$f:A\rightarrow B$$, its **inverse** is the function $$f^{-1}:B\rightarrow A$$. 

Composition with inverse yields *identity function*:

- $$f^{-1}\circ f = i_A$$
- $$f\circ f^{-1}=i_B$$

#### Identity Function

$$\forall x\in A, i_A(x)=x$$ 

> **Theorem 12.3**: Function $$f$$ is bijective iff the reverse relation $$f^{-1}$$ is a function $$B\rightarrow A$$ 

### Image & Preimage

Suppose $$f:A\rightarrow B$$:

- If $$X\subset A$$, the **image** of $$X$$ is the set $$f(X)=\{f(x):x\in X\}\subset B$$
- If $$Y\subset B$$, the **preimage** of $$Y$$ is the set $$f^{-1}(Y)=\{f^{-1}(y):y\in Y\}\subset A$$ 

## Chapter 13

...

## Useful Definitions and Facts

### Parity & Multiplicity

- An integer $$n$$ is **even** iff if $$n=2a$$ for some $$a\in\mathbb Z$$
- An integer $$n$$ is **odd** iff $$n=2a+1$$ for some $$a\in\mathbb Z$$
- Integers $$k$$ and $$n$$ have the **same parity** if $$k$$ and $$n$$ are both even or odd.
- An integer $$n$$ is a **multiple of**  an integer $$q$$ iff $$n=qk$$ for some $$k\in \mathbb Z$$
- A positive integer $$n$$ is a **prime number** iff $$n$$ has exactly two positive divisors, namely $$1$$ and $$n$$.

### Well-Ordering Principle

- Given a subset $$A\subset \mathbb N$$, and $$A\neq \emptyset$$, then there is an element $$x_0\in A$$ such that $$x_0$$ is the smallest element in $$A$$
- Given an integer $$b$$, any non-empty subset $$A\subset\{b, b+1, b+2,\dots\}$$ is **well-ordered**

### Division Algorithm

- Given integers $$a$$ and $$b > 0$$, there exists integer $$q$$ and $$r$$ for which $$a=gb+r$$ and $$0\leq r \lt b$$ 

### Fundamental Theorem of Arithmetic

- Every integer greater than 1 is either a prime number itself or is the product of prime numbers

### Greatest Common Divisor & Least Common Multiple

Given $$k,n\in (\mathbb Z-\{0\})$$,

- The **GCD** of $$k$$ and $$n$$ is the largest integer that divides both $$k$$ and $$n$$
- The **LCM** of $$k$$ and $$n$$ is the smallest integer that is a multiple of both $$k$$ and $$n$$

#### Proposition 7.1

If $$a,b\in \mathbb N$$, then there exists integers $$k$$ and $$l$$ for which $$\gcd(a,b)=ak+bl$$ 

#### Proposition 10.1

Suppose there are $$n\geq2$$ integers $$a_1, a_2, \dots, a_n$$. If a prime number $$p$$ divides $$a_1\cdot a_2\cdots a_n$$, then $$p$$ divides at least one of the integers $$a_i$$. 

### Congruence

- Given $$n\in \mathbb N, a,b\in \mathbb Z$$, $$a$$ is congruent to $$b\mod n$$, denoted by $$a\equiv b\mod n$$, iff $$n\mid a-b$$

Assuming $$a\equiv b\mod n$$ and $$c\equiv d\mod n$$ for $$a,b,c,d\in \mathbb Z$$, then:

- $$a-c\equiv b-d\mod n$$
- $$a^2\equiv b^2\mod n$$
- $$ac\equiv bd \mod n$$ 
- If $$a\equiv b \mod n$$ and $$b \equiv c \mod n$$ then 

### Pigeonhole Principle

*see [above](#pigeonhole-principle)* 

### Image & Preimage

> **Theorem 12.4**: Suppose $$f: A\rightarrow B$$ and $$W,X\subset A, Y,Z\subset B$$

- $$f(W\cap X)\subset f(W)\cap f(X)$$
- $$f(W\cup X)=f(W)\cup f(X)$$
- $$f^{-1}(Y\cap Z)=f^{-1}(Y)\cap f^{-1}(Z)$$
- $$f^{-1}(Y\cup Z)=f^{-1}(Y)\cup f^{-1}(Z)$$
- $$X\subset f^{-1}(f(X))$$
- $$f(f^{-1}(Y))\subset Y$$

