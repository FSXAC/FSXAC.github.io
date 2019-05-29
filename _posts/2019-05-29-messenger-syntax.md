---
author: Muchen He
title: Facebook Messenger Formatting Syntax
date: 2019-05-29
categories: other
---

Here is a collection of useful formatting *tricks* (that's a clickbait word -- it's more just syntax) that you can use in Facebook's Messenger app.

<!-- excerpt -->

Note that for the moment, these syntax seems to be only parsed and rendered in the web-application. This means that this is not going to work on native iOS or Android apps. However it will work in web-app through the mobile browser.

### Bold and Brash

Enclose the text in a pair of asterisks ( `*` ) to make the text **bold** which helps getting your point to everyone by simulating yelling at them. This works anywhere in your message.

![bold](/assets/blog/messenger/bold.jpg)

### Emphasize Italicize

Enclose the text in a pair of underscores ( `_` ) to make the text _italic_. This works anywhere in your message.

![italic](/assets/blog/messenger/italic.jpg)

### Scratch That

Enclose the text in a pair of tilde symbols ( `~` ) to make the text ~strikethrough~. This works anywhere in your message.

![strikethrough](/assets/blog/messenger/strike.jpg)


### Let's Speak Code

You can send inline code in Messenger by enclosing text using a pair of backticks ( `` ` `` ). This works anywhere in your message.

![inline code block](/assets/blog/messenger/inlinecode.jpg)

### Let's Speak More Code

To send code snippets, we can use a pair of triple backticks ( `` ` ```` ` ```` ` `` ) which enables multi-line code. Optionally, you can specify the programming language of the code to enable syntax highlighting. (Note: at the time of writing, syntax highlighting was not working.)

![code block](/assets/blog/messenger/codeblock.jpg)

Unlike the fore-mentioned formatting syntax, this code block syntax is not as flexible. You shouldn't mix normal text and code block text in a single message.

### Mathematical

We can write blocks of maths blocks by using a pair of double dollar signs ( `$$` ). Messenger parses LaTeX syntax using [KaTeX](https://katex.org/), so we have a lot of flexibility. This is especially useful if someone is explaining homework or something to their classmates. Unfortunately, inline maths is not supported. So make sure to keep everything inside the double dollar signs. Like code blocks, don't mix normal text with maths text, or LaTeX will not render.

![math blocks](/assets/blog/messenger/math.jpg)

Thanks to KaTeX, we can make some crazy LaTeX blocks in Messenger. For example, using `\begin{aligned}` for aligned multi-line equations. Or using `\begin{cases}` for cases. And using `\begin{bmatrix}` for matrices. And much more.

```markdown
$$
F(x) = \begin{cases}
f(x), & \text{for } 0 \leq x \leq 1 \\
f(x - 1), & \text{for } x > 1 \\
f(x^2 + 1), & \text{for } x < 0
\end{cases}
$$
```
Turns into

![large math block](/assets/blog/messenger/bigmath.jpg)

### More More LaTeX

LaTeX offers vastly more text formats and styles that what Messenger natively offers. See [this Overleaf article](https://www.overleaf.com/learn/latex/Font_sizes,_families,_and_styles) on the full extent of LaTeX font customizations. Some notable examples include:

- Set font sizes using `\tiny`, `\small`, `\huge`, `\Huge`, etc.

![font sizes](/assets/blog/messenger/fontsizes.jpg)

- Set font family using `\textsf` for sans serif and `\texttt` for monospace.
- Set mathematical font family using `\mathcal`, `\mathfrak`, `\mathbb`, etc.

![math fonts](/assets/blog/messenger/mathfonts.jpg)

### World of Color

While messing around with LaTeX, I also discoved that you can use `\color` to specify the text color for the LaTeX text.

So something like

```markdown
$$\text{
\color{#f00}{H}\color{#f94}{e}\color{#ff0}{l}\color{#9f4}{l}\color{#2f2}{o} 
\color{#4f9}{W}\color{#0ff}{o}\color{#04f}{r}\color{#40f}{l}\color{#f0f}{d}
}$$
```
renders into

![colored text](/assets/blog/messenger/colortext.jpg)

Combine everything above and we can get some pretty amazing results.

![fabulous text](/assets/blog/messenger/fancytext.jpg)