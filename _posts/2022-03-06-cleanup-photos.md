---
draft: true
date: 2022-03-06
title: Cleaning up Apple Photos Library with Python
---



Inspired by this reddit post: `insert reddit post`

Using osxphotos library for Python, we can quickly access all photos in an Apple Photos library. 

Turns out each photo in the Apple Photos library has been assigned a set of scores:

```
behavioral
curation
failure
harmonious_color
highlight_visibility
immersiveness
interaction
interesting_subject
intrusive_object_presence
lively_color
low_light
noise
overall
pleasant_camera_tilt
pleasant_composition
pleasant_lighting
pleasant_pattern
pleasant_perspective
pleasant_post_processing
pleasant_reflection
pleasant_symmetry
promotion
sharply_focused_subject
tastefully_blurred
well_chosen_subject
well_framed_subject
well_timed_shot
```

Some of these scores are ranged between 0-1 such as `curation`, `overall`, `promotion`, etc. These scores are used to determine if a photo should be featured more in the App UI.

However, we can also make use of scores like `failure`, `intrusive_object_presence` and `noise` which ranges from -1-0. While it seems like nothing is in the Apple's Photos app that does anything with these scores, we can use these scores to pick out potential photos for cleanup/deletion.

Additionally, there are scores like: `pleasant_camera_tilt`, `pleasant_composition`, `pleasant_perspective`, `pleasant_post_processing` which ranges from both ends like -1 to 1. For these scores, we can also just pick out the minimum.

Note that all of these scores are calculated automatically using Apple's blackbox ML, so it might have lots of biases.



**Goal**: (1) write a script that looks through all of the photos in my library, determine if a photo should be deleted ((2) using a criteria function), and adds them to Apple Photos album for 

### Environment

First we need to install osxphotos:

```shell
pip install osxphotos
```

Once we have it installed, we actually need to modify a single line in the library. Go to where the python library is installed, and modify the `.../osxphotos/__init__.py` file:

Add this line:

```python
from .photosalbum import PhotosAlbum
```

This exposes the `PhotosAlbum` class to `osxphotos` interface so we can use the AppleScripts builtin to the osxphotos library to add photos to libraries easily (task 3)



### Sweeping Through All Photos

Once we have the osxphotos library, it's pretty straight forward:

```python
import osxphotos

# Get the Apple Photos library
pd = osxphotos.PhotosDB('insert path to .photoslibrary')

# Gets a list of photos
ps = pd.photos()
```

The `ps` here is a list of `osxphotos.PhotoInfo` object. We can reference the `score` field. This gives us a `osxphotos.ScoreInfo` object, and we can then reference any of the score (using the list of scores above).

For example, this line takes `ps` and sorts it based on the *failure* score from lowest to highest

```python
sorted(ps, key=lambda photo: photo.score.failure)
```



### Criteria Function

As part of the goal (task 2) we need to create a function that outputs a list of photos where we think we can delete.

Based on preliminary inspection of scores of all photos/videos in my personal photo library, I can think of a few observations:

- Should not include videos in the score analysis, as scores such as `failure` score heavily penalizes video (possibly due to motion in each frames)
- Photos are pretty bad when:
  - `failure` score < -0.1
  - `harmonious_color` score < -0.1
  - `interesting_subject` score is < -0.7; these are likly pictures of documents and random things. If this score is < -0.9, they're likely memes ore screenshots
  - `intrusive_object_presenee` < -0.999; although becareful with this score since it mis-identifies a lot of "artistic" expressions where objects are placed in front of  the subjects on purpose.
  - `noise` score below -0.75
  - `pleasant_composition` < -0.8
  - `pleasant_lighting` < -0.7
  - `pleasant_perspective < -0.6`
  - `tastefully_blurred` < -0.9
  - `well_framed_subject` < -0.7
  - `well_timed_shot` < -0.7

Let's put all this togther into a function/filter:

```python
def exportBadPhotos(ps: list[osxphotos.PhotoInfo]):

    # Returns true if it fits the failure criteria
    def criteria(p: osxphotos.PhotoInfo) -> bool:
        return any([
            p.score.failure < -0.1,
            p.score.harmonious_color < -0.1,
            p.score.interesting_subject < -0.7,
            p.score.intrusive_object_presence < -0.999,
            p.score.noise < -0.75,
            p.score.pleasant_composition < -0.8,
            p.score.pleasant_lighting < -0.7,
            p.score.pleasant_perspective < -0.6,
            p.score.tastefully_blurred < -0.9,
            p.score.well_framed_subject < -0.7,
            p.score.well_timed_shot < -0.7
        ])

    bad_ps = list(filter(criteria, ps))
```



### Add to Photos Library

As previously mentioned, because of the modification we made to the library we can now use `osxphotos.PhotoAlbum` class to interface with Apple Photos app and create an album -- powered by AppleScripts.

Let's create an album object with album name of "Bad Photos"

```python
album = osxphotos.PhotosAlbum('Bad Photos')
```

From here on now, we just need to add the list of `osxphotos.PhotoInfo` objects to the album:

```python
album.add_list(bad_ps)
```

It will take a few seconds or minutes but AppleScript will do the rest.



### Manually picking

When we return to Apple Photos, we have a new album with all the photos that fit our failure criteria we wrote earlier.

![CleanShot 2022-03-06 at 13.15.34@2x](/assets/blog/applephotos/2022-03-06-1.jpg)

Of course this now the time to manually sift through each one of them and mark them for deletion.

Of course, since this whole idea hinges off of the scores produced by Apple Photos -- which is ML, it's far from perfect. There's likely a lot of photos that are bad and that are not caught. Perhaps one can fine-tune the criteria function, perhaps one cannot as the scoring MLs are just not good enough. Perhaps a few number is far too simplistic to define whether a photo is good enough.

But at least this operation saves time and pretty much does the same thing what an $26/year app does. Cough cough Gemini 2.

