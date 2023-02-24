---
author: Muchen He
title: UBC Macleod Building in Minecraft
date: 2019-07-27
categories: [projects, gaming]
tag: [minecraft, survival, architecture, UBC]
image: /assets/blog/teaser/macleodmc.jpg
header:
  overlay_image: /assets/blog/2019-07-14_13.56.00.png
  overlay_filter: 0.5
use_lightbox: true
---

Over the last few weeks I've been trying to build the Macleod Building in survival Minecraft. After I heard the rumors about the demolishing of the Macleod building in the future, I thought it would be nice to keep a personal copy of it in my Minecraft world. To prolong the longevity of the build, I've limited myself to having no third-party mods except for server-side plugins, vanilla Minecraft data-packs, or client-only mods such as shader mods.

<!-- excerpt -->

This is my first time trying to build something real 1:1 in Minecraft. Constraints include: limited block types in survival mode and every block is 1x1x1 in meters. This creates problems because I would need to round real life measurements into nearest meter; e.g. A hallway that is 1.3 meters wide would be too narrow if it was 1 block wide in Minecraft, but too wide if it's two blocks wide. For ceiling heights and wall thicknesses, I followed xRILLIANx's *Minecraft Architectural Standards* [^mas].

## Planning and Surveying

Starting a large project is hard but luckily the ECE website generously provided the floorplan for each floor [^floorplan].

{% include figure_centered.html src="/assets/blog/macleod/floor4.jpg" caption="The floorplan for 4th floor Macleod" %}

Notice that there is a column that separated each set of window panes (marked by bubbles A-O and 1-9). The distance between the columns are consistent and thus became the reference point / grid system for the rest of the build. All the measurements are verified relatively to this distance. 

### Measurements

One big problem is that none of the floor plans provided from the website included a scale nor dimensioning. So I went to Macleod building in real life and took a few measurements. I used built-in AR *Measure* app and it works pretty well.

{% include figure_centered.html src="/assets/blog/macleod/measure1.jpg" caption="The length between one exterior column to another: ~6 blocks + 1 block for the column" %}

{% include figure_centered.html src="/assets/blog/macleod/measure2.jpg" caption="The entrance width is 4 blocks in total with 2 blocks for the door" %}

{% include figure_centered.html src="/assets/blog/macleod/measure3.jpg" caption="Hallways are only 2.36 meters wide: this creates complications" %}

{% include figure_centered.html src="/assets/blog/macleod/measure4.jpg" caption="Interior ceiling height is 2&half; to 3 blocks high" %}

### Images as Reference

Furthermore, for landscaping features, I used my camera to make visual references relative to the "window columns/pillars grid system". Lastly, I took a couple hundred more photos all around and inside the building for visual reference, so that I can use the right material in Minecraft to make it looking as close to the real thing as possible.

{% include figure_centered.html src="/assets/blog/macleod/measure5.jpg" caption="Aligning one of the lines on at the courtyard to the center between two columns" %}

## Building

I started by experimenting with different materials for the walls, as that is what we see 90% of the time. The Macleod exterior is a mix of glass, white bricks, and concrete. In Minecraft, I substituted concrete with stone, white bricks with polished diorite. Unfortunately, there isn't any white bricks material (Mojang, please add). I chose white concrete for the interior walls for the clean look.

For the floors and stairs, I chose stone and sandstone so that it matches the real colors better. In the real Macleod, the ceiling is made of tiles, so I chose smooth stone slabs.

{% include figure_centered.html src="/assets/blog/macleod/mc1.png" caption="Building the walls to match the reference" %}

{% include figure_centered.html src="/assets/blog/macleod/mc2.png" caption="Experimenting with materials for the floors and interior walls" %}

{% include figure_centered.html src="/assets/blog/macleod/mc3.png" caption="Most of the walls completed" %}

{% include figure_centered.html src="/assets/blog/macleod/mc4.png" caption="Stairwell construction" %}

{% include figure_centered.html src="/assets/blog/macleod/mc5.png" caption="From the 4th  rooms" %}

{% include figure_centered.html src="/assets/blog/macleod/mc6.png" caption="Interior under construction" %}

{% include figure_centered.html src="/assets/blog/macleod/mc7.png" caption="Exerior mostly completed" %}

{% include figure_centered.html src="/assets/blog/macleod/mc8.png" caption="A view of the south entrace (connecting with ICICS)" %}

### Limitations

Due to the limited build resolution in Minecraft, a lot of places feels cramped and small. It's difficult to feel the scale of things. As mentioned before, some compromises had to be made and certain details cannot be reproduced without scaling up the build.

For example, the study rooms on third and forth floors are usually 3 meters wide, but because we cannot place half block vertically or have any wall thickness less than 1 block in Minecraft. The result is that study rooms are 1 block or 2 blocks wide.

Another example is the hallway, as shown from the measurements above, the hallways are max. 2.5 meters wide. If we round down to 2 blocks, then the hallways would look to narrow, if we round up to 3 blocks, then the double doors at the end of the hallway would be asymmetrical. So I ended up using 4 blocks, almost doubling the width of the hallway but I think it looks nicer.

{% include figure_centered.html src="/assets/blog/macleod/mc10.png" caption="Hallways are made to 4 blocks wide" %}

### Landscaping

For the exterior and landscaping, I opted for some large oak trees and they seem to work pretty well. I had to create some custom trees due to their non-standard size and shape. The large tree in the front entrance was custom built because it was tall but skinny. The saplings at the north side of the building were small, but not small enough to use Minecraft saplings; plus Minecraft saplings would grow into large trees.

{% include figure_centered.html src="/assets/blog/macleod/mc9.png" caption="Decorating the exterior with vegetation" %}

Overall the build took about 12 hours accumulated over the span of 3 weeks, and not including the survival aspects such as resource gathering. All the walls and doors have been laid out corresponding to the floor plans but interior decoration and furnishing is still work-in-progress. Below is a progression of the build as seen from the server [dynmap](http://144.217.73.130:11565/).

{% include figure_triple.html src1="/assets/blog/macleod/dm1.png" src2="/assets/blog/macleod/dm2.png" src3="/assets/blog/macleod/dm3.jpg"%}

## Gallery

Here are a few HD screenshots using Sonic Ether's Unbelievable Shaders[^seus] during rain to perfectly capture the realistic atmosphere of being around the Macleod building:

{% include figure_centered.html src="/assets/blog/macleod/rain1.png" caption="As seen from Main Mall" %}

{% include figure_centered.html src="/assets/blog/macleod/rain2.png" caption="Main entrance" %}

{% include figure_centered.html src="/assets/blog/macleod/rain3.png" caption="As seen from Engineering Student Center yard" %}

{% include figure_centered.html src="/assets/blog/macleod/show1.png" caption="From the forest" %}

Here are some comparison pictures between the real life Macleod building and the Minecraft build:

{% include figure_double.html src1="/assets/blog/macleod/d1a.jpg" src2="/assets/blog/macleod/d1b.png" %}

{% include figure_double.html src1="/assets/blog/macleod/d2a.jpg" src2="/assets/blog/macleod/d2b.png" %}

{% include figure_double.html src1="/assets/blog/macleod/d3a.jpg" src2="/assets/blog/macleod/d3b.png" %}

{% include figure_double.html src1="/assets/blog/macleod/d4a.jpg" src2="/assets/blog/macleod/d4b.png" %}

{% include figure_double.html src1="/assets/blog/macleod/d5a.jpg" src2="/assets/blog/macleod/d5b.png" %}

{% include figure_double.html src1="/assets/blog/macleod/d6a.jpg" src2="/assets/blog/macleod/d6b.png" %}

{% include figure_double.html src1="/assets/blog/macleod/d7a.jpg" src2="/assets/blog/macleod/d7b.png" %}

Thanks for reading!

<!--Playing Minecraft on a flat screen monitor is easy to lose sense of the scale that 1 block = 1 meter. I tried walking around the build in VR and it's a lot more immersive in terms of scaling.-->

<!--<iframe style="width: 100%; height: 400px; overflow: hidden; border:1px solid #000;" src="http://144.217.73.130:11565/?worldname=usagi13&mapname=surface&zoom=5&x=286&y=64&z=247" width="100" height="100" scrolling="no">Iframes not supported</iframe>-->

[^mas]: Minecraft Architectural Standards - Block System: <https://www.minecraftforum.net/forums/minecraft-java-edition/creative-mode/365473-minecraft-architectural-standards-block-system>

[^floorplan]: Location Directory (Macleod): <https://eng-services.ece.ubc.ca/facilities/location-directory-macleod-building/>

[^seus]: Sonic Ether's Unbelievable Shaders (SEUS): <https://sonicether.com/seus/>