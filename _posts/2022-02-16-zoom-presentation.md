---
title: Embedding Self-Video Into Zoom Presentations using Slides as Virtual Background
date: 2022-02-16
image: /assets/blog/teaser/zoom.jpg
---

I've gotten a lot of questions on how to make yourself part of the video during zoom presentations like:

![](/assets/blog/zoom-presentation.gif)

This is nice because:

- Audience don't have to fumble with Zoom interface to get into speaker view
- Speaker view wastes a lot of empty space
- Better immersion and experiences for the audiences
- Automatically replaces background of webcam in Zoom

There are ways to do this with OBS Studio + Virtual Camera, where presentation is rendered like a virtual camera, and Zoom picks that up as a webcam instead. But this approach requires one to manage multiple cameras in Zoom interface, and output video for the audience is not clear -- since heavy compression is applied on webcam feeds.

Luckily, recent versions of Zoom has a beta feature that allows you to load a slide set file to the app to be shared with other participants as a virtual background. This post shows you how to do it (and honestly it's so straight forward it could've been an email).



### 1. Preparing Your Presentation Files

So far the only files that are supported by this feature is `.ppt`, `pptx` for Microsoft PowerPoint and `.key` for Apple Keynote. `.pdf` and Google Sheets are **not supported** so make sure to download and convert to one of the supported file types first.



### 2. Share

On Zoom, start sharing screen <img src="https://assets.zoom.us/generic-images/common-buttons-and-icons/filled/share-screen-button-green.png" alt="img" class="emoji" />, but before you select which part of the screens you want to share, notice the **Advanced** tab on the top of the window. Then click on the option: <img src="https://assets.zoom.us/generic-images/desktop-client/in-meeting/slides-as-virtual-background-button.png" alt="img" class="emoji"/> **Slides as Virtual Background**.

This will prompt with a file selector where you select your `.key` or `.pptx` files. The Zoom app will then load the files and present it on the screen. If your camera is turned on, Zoom will also put you in the lower right corner with background replacement turned on.



### Limitations and Notes

There are some downsides to using this feature. Mainly due to you being forced to use Zoom's own interface to control the presentation. This means:

- You can only go forward/background in a slideshow; you **cannot** go to a specifc slide instantly
- No animations and transitions are supported (bummer); so if you want to reveal bullet points one at a time, you need to separate each animation build step to separate slides.
- No multimedia or gif support, so use static images only
- No presenter notes / speaker view. This is a huge draw back as Zoom's presentation controls doesn't have a separate window to show presenter notes or speaker views.
- No annotations or laser pointers -- even Zoom's built in annotation tools is turned off when you're sharing.
- There is no way to change where you are located on the screen. So make sure to modify and rearrange things on your presentation so you don't block your own slides.

Overall, I think it's a clever and useful tool for presentations that are mostly casual or for storytelling --- where slides don't have a lot of detail or deep in technical concepts, but audience immersion is more important.

One shouldn't use this feature if anytime one need to use animation, video, drawing/annotation, need to go to specific slides back and forth, or rely on lots of presenter notes.

