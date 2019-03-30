---
author: Muchen He
title: Fixing LaTeX Tags in Markdown
date: 2019-03-30
categories: other
---


In a lot of my older documents and markdowns, I used a lot of inline math such as: `$x^2+y^2$`. 
But this is only applicable to niche applications like Typora that I use to take notes.

If I wanted to transfer my notes to, for example, this website. The default markdown compiler, *kramdown* won't recognize
the syntax. There are also no common standard for LaTeX math, so we'll have to somehow convert the two easily.

<!-- excerpt -->

## Find

We will use the following *regex* to identify all matches where we are using the single `$` for writing inline-math:


```
(^|[^\\^\$])\$([^\$]+)\$([^\$]|$)
```

The first group `(^|[^$])` matches the beginning of the line or a non `$` character or `\$` character. The last group matches the end of the line or a non `$` character. This is necessary because we don't want to touch anything between two sets of LaTeX tags. i.e: "combine `$x_1$` and `$x_2$`". Notice that the word "and" is also between the `$` character. We also don't want to match `\$` because we use that denote other meanings like actual dollars.

The main part is in the middle, group 2: `\$([^\$]+)\$`. This matches anything inside the LaTeX tags.

## Replace

To replacement/subtitution, I used VS Code find & replace function, but you can use any that supports regex. In regex, we can use the notation `$1`, $2`, etc in our replacement field to denote where we want the matched groups to be place. In this case it's the first group, second group, etc, respectively.

Also note that in VS Code, when doing replacement with the character `$`, to make it literal, we need to double it (or VS Code will get confused).

The replacement is:

```
$1$$$$$2$$$$$3
```

That's a lot of dollar signs! Let's break it down:

- The first two character `$1` specifies the first group, which is whatever comes before we used the LaTeX tags. We need to preserve this as if we didn't touch it
- The next four characters `$$$$` gets interpreted as two dollar sign literals.
- Here at `$2`, we put in content from the original single dollar sign tags.
- The next four characters are `$$$$`, same thing.
- Lastly, the `$3` preserves whatever is after the tags.