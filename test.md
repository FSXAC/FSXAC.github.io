---
layout: post
title: Testing page
use_math: true
---

{% include flashcard2_css.html %}
{% include reveal_css.html %}

{% capture pre1 %}
Assets are grouped into classes with single accounts, the classes get depreciated together. Different classes have different depreciation rate.
{% endcapture %}

{% capture body1 %}
Assets may be added to or subtracted from accounts each year.

CCA for any year $$n$$ is given as:

$$
\text{CCA}_n=\text{UCC}_n\times d
$$

Where $$d$$ is the CCA rate (depends on the asset class), $$\text{UCC}_n$$ is the **undepreciated capital cost** or book value (BV) of the asset class eligible for depreciation for year $$n$$.
{% endcapture %}

{% include reveal.html pre=pre1 body=body1 id="creepah" %}

---

{% include flashcard2.html front="Turn around" back="Look at what you see" %}

{% include flashcard2.html front="Creeper" back="Awww man" %}

{% include flashcard2.html front="What is Lorem Ipsum?" back="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
" height="500px" %}