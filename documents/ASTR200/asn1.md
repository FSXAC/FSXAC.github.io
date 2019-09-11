---
title: W19 Assignment 1
date: 2019-09-07
---

## 1. Angles Big and Small

*__(a)__ Imagine that you are at the centre of the Earth, which you can assume to be transparent. Consider two points on the Earth's surface that are separated by 10 arcseconds. What is the physical distance between the two points?*

The physical distance we’re looking for between the two points is the arclength we’re trying to find, where the angle is 10 arcseconds. First, we convert the angle from arcsec to radians:

$$
\theta=10{\small\text{arcsec}}\times\frac{1{\small\text{arcmin}}}{60{\small\text{arcsec}}}\times\frac{1{\small\deg}}{60{\small\text{arcmin}}}\times\frac{\pi}{180{\small\deg}}=4.85\times10^{-5}
$$

Then to find the arc length, we use the radius of Earth, which is $R_\oplus$=6371 km.
$$
\begin{aligned}
d&=\theta r\\
&=\theta R_\oplus\\
&=(4.85\times10^{-5})(6371\text{ km})\\
&=\boxed{0.309\text{ km}}
\end{aligned}
$$

Therefore the distance between the two points is **0.309 km** or **308.8 m**.

---

*__(b)__ How many square degrees are on the full celestial sphere?*

The full celestial sphere is a whole sphere with surface area $A=4\pi r^2$. The square angle of a full celestial sphere is simply the area divided by $r^2$ which gives us $\Omega=4\pi$ steradians.

To convert to square degrees, we use the conversion factor to convert from radians to degrees **except** we need to square the conversion factor because we’re working with two-dimensional units.

$$
\Omega_{\deg}=\Omega\times\left(\frac{180\deg}{\pi}\right)^2
$$

Plugging in the numbers:

$$
\Omega_{\deg}={4\pi\cdot180\over\pi}=\boxed{720\deg^2}
$$

The solid degrees that covers the full celestial sphere is **720 square degrees**.

---

*__(c)__ You have a telescope with a CCD detector that has a square field of view of 4 square arcminutes. How many pointings of the telescope will be needed to cover an area of 6 degrees by 10 degrees?*

Assume that we’re looking at the celestial sphere.

Assume that our CCD detector is a square sensor such that the field of view of 4 square arcminutes is 2 arcminutes for horizontal and vertical field of view.

Then we convert 2 arcminutes to degrees:

$$
2\small{\text{arcmin}}\times\frac{1\deg}{60\small{\text{arcmin}}}=0.0\bar 3 \deg
$$

That means we for each frame, we can cover 0.03 degrees by 0.03 degrees. Which means:

$$
\frac{6\deg}{0.0333\deg}=180\\
\frac{10\deg}{0.0333\deg}=300
$$

It takes 180 and 300 pointings respectively to cover 6 degrees by 10 degrees area. Therefore, the total number of pointings required is

$$
180\times300=\boxed{54,000}
$$

We need **54,000** pointings to cover an area of 6 degrees by 10 degrees.

## 2. Solar System Basics

*__(a)__ The observed orbital synodic periods of Venus and Mars and 583.9 days and 779.9 days, respectively. Calculate their sidereal periods.*

Assume 1 year is exactly 365.25 days. Then Venus has an orbital synodic period of 1.5986 years, and Mars has an orbital synodic period of 2.1338 years. Synodic means that this is the time interval for the planet to repeat a configuration with respect to Earth.

To calculate the sidereal period, we use the relationship
$$
\frac{1}{P_\text{syn}}=\frac{1}{P_\text{inner}}-\frac{1}{P_\text{outer}}
$$

Venus is an inferior planet. So we’re solving for the “inner” sideral period; the “outer” sideral period is Earth’s so it’s simply 1.
$$
\begin{aligned}
\frac{1}{1.5986\text{ yr}}&=\frac{1}{P_\text{inner}}-1\\
P_\text{inner}&=\left(\frac{1}{1.5986\text{ yr}}+1\right)^{-1}\\
&=\boxed{0.6255 \text{ yr}}
\end{aligned}
$$
Mars is a superior planet. So we are solving for the “outer” sideral period. Identical procedure:
$$
\begin{aligned}
\frac{1}{2.1338\text{ yr}}&=1-\frac{1}{P_\text{outer}}\\
P_\text{outer}&=\left(1-\frac{1}{2.1338\text{ yr}}\right)^{-1}\\
&=\boxed{1.882 \text{ yr}}
\end{aligned}
$$
The sidereal orbital period of Venus and Mars respectively is **0.6255 years or 228.5 days**, and **1.882 years or 687.4 days**.

---

*__(b)__ Which of the superior planets has the shortest synodic period, and why?*

Using the relationship between sideral and synodic period from above, and simplifying for superior planets, we get
$$
P_{\text{syn}_\text{superior}}=\frac{P_\text{outer}}{P_\text{outer}-1}
$$
To obtain the shortest synodic period, There must be a great difference in sideral period of Earth and the superior planet. In other words, in this case, we’re look for a planet with the longest sideral period, or the planet that orbits farthest away from center.

At the time of writing, the superior *planet* that has the shortest synodic period is **Neptune**.

---

*__(c)__ A certain asteroid is 1 au from the Sun at perihelion and 5 au from the Sun at aphelion. Find the semi-major axis, eccentricity, and semi-minor axis of its orbit. Include a sketch of the geometry.*






## 3. Calculus Refresher

*A simple model of a planetary atmosphere has the number density $n$ decreasing roughly exponentially with height $z$ above the planet's surface: $n(z)=n_0e^{-z/H_p}$, where $n_0$ is the number density at the surface of the planet, and $H_p$ is is the pressure scale height. At the surface of the Earth, the number density for nitrogen is $n_0=2\times 10^{25} \text{m}^{-3}$ and the scale height for is about $H_p=8.7$ km. The model is valid up to about 90 km. Compute the number of nitrogen molecules in the Earth's atmosphere. You will have to make at least one important approximation in order to do this; explain clearly what you have done.*

First, let’s graph the density function of Nitrogen from sea level (z=0) to z=90 km:

![1567915363630](assets/asn1/1567915363630.png)

### Approximation #1

Notice that even though the exponential decay of number of particles is significant at the altitude of 90 km, there is still a significant number of nitrogen particles in magnitude of 6.43&times;10<sup>20</sup> per meter cubed. We can make an approximation that the function $n(z)$ is piecewise such that for $z>90$ km, $n(z)=0$.

### Approximation #2

We approximate that the planet is a completely smooth sphere such that the density is uniform everywhere.

### Integration Function

The function for total number of particles is an integration of a multiplication of density function and volume.

$$
\int_0^{90,000}n(z)A(z)\mathrm dz
$$

Where $n(z)$ is the density function of Nitrogen as previously defined. Function $A(z)$ is surface area of the atmosphere for a specific $z$ height. Both $A(z)\mathrm dz$ will give us the volume of infinitesimal slice of the atmosphere. The area function is given by the formula of the surface area of a sphere *plus* the altitude $z$:

$$
A(z)=4\pi (R_\oplus+z)^2
$$


### Computing the Integral

$$
\begin{aligned}
N&=\int n(z)A(z)\mathrm dz\\
&=4\pi n_0 \int e^\frac{-z}{H_p}(R_\oplus+z)^2 \mathrm dz
\end{aligned}
$$

This is a very complicated function to integrate. So let’s do some digging into whether if this is necessary (See next section).

### Approximation #3

The lower bound of the surface area is at sea-level, where z=0, then $A(0)$=5.10&times;10<sup>8</sup> km<sup>2</sup>. The upper bound is at z=90km, and $A(90\text{km})$=5.24&times;10<sup>8</sup> km<sup>2</sup>, which is less than 3% difference.

Knowing that because Earth’s radius is so large compared to the thickness of the atmosphere we’re considering, we can approximate Earth’s atmosphere as a flat sheet, by “unwrapping” the spherical shell into a flat disk with top area of $4\pi R_\oplus^2$ and 90km thick.

Now the modified function to integrate is as follows. The two equations are for lower and upper bound of number of nitrogen particles, respectively.

$$
N_\text{lower bound}=4\pi R_\oplus^2 n_0 \int e^{-\frac{z}{H_p}} \mathrm dz\\
N_\text{upper bound}=4\pi (R_\oplus+90,000)^2 n_0 \int e^{-\frac{z}{H_p}} \mathrm dz
$$

### Computing the Definite Integral

Let’s do the integration first.

$$
\begin{aligned}
\int_0^{90,000} e^{-\frac{z}{H_p}}\mathrm dz &=\left[-H_p e^{-\frac{z}{H_p}}\right]^{z=90,000}_{z=0}\\
&=H_p \left( 1-e^{-\frac{90,000}{H_p}} \right)\\
&=8,700 \left( 1-e^{-\frac{90,000}{8,700}} \right)\\
&=8,699.72\text{m}
\end{aligned}
$$

Now we multiply the rest:

$$
\begin{aligned}
4\pi R_\oplus^2 n_0 \int e^{-\frac{z}{H_p}} \mathrm dz &=4\pi R_\oplus^2 n_0(8699.72)\\
&=\boxed{8.875\times10^{43}}\\
4\pi (R_\oplus+90,000)^2 n_0 \int e^{-\frac{z}{H_p}} \mathrm dz &=4\pi (R_\oplus + 90,000)^2 n_0(8699.72)\\
&=\boxed{9.127\times10^{43}}
\end{aligned}
$$

Using *meter* as standard unit for all calculations, we get the final answer of **8.875&times;10<sup>43</sup> particles**. Using the same calculation but using the upper bound formula (with the added 90km to the radius), we get **9.127&times;10<sup>43</sup> particles**.

