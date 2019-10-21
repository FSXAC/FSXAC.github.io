---
title: "Project 3 - Assignment"
date: 2019-10-21
categories: ELEC 402
ubc_handin: true
---

- toc
{:toc}

## 1. Transistor Size

*In the circuit of Figure below, design the widths of the pull-down transistors so that V<sub>OL</sub>=0.1 V. (All transistors are minimum size, L = 0.1 &mu;m. Explain the results.*

![1571682132908](assets/1571682132908.png)

Since the diagrams don’t show how the transistor bulk are connected/biased, we can assume that there is no body-bias; and V<sub>T</sub> = V<sub>T0</sub> = 0.4 V.

### Resistive-Load Inverter

We first take a look at the extreme ends of operation. When Vin is high, VOH is VDD because the MOS is in cut-off. Thus no current flows through the resistor and the voltage drop across the resistor is 0.

Since our parameter of interest is V<sub>OL</sub> and these are inverters, we are interested when the input voltage is HIGH. 

The resistive load transistor operates in the **linear** region. So we equate the current in the resistor to the current through the NMOS (I<sub>DS</sub>):

$$
\frac{V_{DD}-V_{OL}}{R_L}=\frac{W}{L}\left(\frac{\mu_n C_{ox}}{1+\frac{V_{DS}}{E_c L}}\right)\left(V_{GS}-V_T-\frac{V_{DS}}{2}\right)V_{DS}
$$

We substitute:

- V<sub>GS</sub> is V<sub>in</sub> which is also V<sub>DD</sub>.
- V<sub>DS</sub> is V<sub>out</sub> which is also V<sub>OL</sub> if the input voltage V<sub>in</sub> is V<sub>DD</sub>.
- V<sub>DD</sub> is 1.2 V.
- V<sub>OL</sub> is 0.1 V.
- R<sub>L</sub> is 10 k&Omega;.
- L is 0.1 &mu;m.
- &mu;<sub>n</sub> is the mobility: 270 cm<sup>2</sup>V<sup>-1</sup>s<sup>-1</sup>.
- C<sub>ox</sub> is the oxide capacitance: 1.6&times;10<sup>-6</sup> F/cm<sup>2</sup>.
- E<sub>C</sub> is the critical field: 6 V/&mu;m.
- V<sub>T</sub> is 0.4 V.

Isolate and solving for W:
$$
W=\frac{L\times\frac{V_{DD}-V_{OL}}{R_L}}{\left(\frac{\mu_n C_{ox}}{1+\frac{V_{DS}}{E_c L}}\right)\left(V_{GS}-V_T-\frac{V_{DS}}{2}\right)V_{DS}}
$$

Note that the centimeter (cm) cancels out when we multiply &mu;<sub>n</sub> and C<sub>ox</sub>. So we do the rest of the calculations with &mu;m as the unit for length.
$$
\begin{aligned}
W&=\frac{0.1\times\frac{1.2-0.1}{10\times 10^3}}{\left(\frac{270\times 1.6\times 10^{-6}}{1+\frac{0.1}{(0.6)(0.1)}}\right)\left(1.2-0.4-\frac{0.1}{2}\right)0.1}
\\
&=\frac{(0.1)(1.1\times10^{-4})}{(270\times1.6\times 10^{-6})(6/7)(0.075)}
\\
&=0.396~\mathrm{\mu m}
\end{aligned}
$$
The width of the NMOS transistor for the resistive-load inverter is **0.4 &mu;m**.

### Saturated-Enhancement-Load Inverter

Let’s denote the top transistor as *L* for *load*, and the bottom transistor as *I* for *inverting*. The top NMOS gate voltage is tied with V<sub>DD</sub>, so it is always operating in saturation. The bottom transistor is still operating in linear mode.

Again, we start by equating the current of the top transistor with the bottom transistor: I<sub>DS<sub>L</sub></sub> = I <sub>DS<sub>I</sub></sub>.
$$
\frac{W_I}{L_I}\cdot \frac{\mu_n C_{ox}}{1+\frac{V_{DS_I}}{E_C L_I}}\cdot\left(V_{GS_I}-V_T-\frac{V_{DS_I}}{2}\right)V_{DS_I}
=
W_L v_{sat}C_{ox}\cdot\frac{(V_{GS_L}-V_T)^2}{(V_{GS_L}-V_T)E_CL_L}
$$
Where we substitute:

- V<sub>GS<sub>I</sub></sub> is just V<sub>in</sub>.
- V<sub>DS<sub>I</sub></sub> is V<sub>out</sub>.
- V<sub>T</sub> is 0.4 V since we’re not assuming any body-bias effects.
- V<sub>GS<sub>L</sub></sub> is V<sub>DD</sub> - V<sub>out</sub>.

Isolate for W<sub>I</sub>:
$$
W_I=\frac{L_IW_L v_{sat}C_{ox}\cdot\frac{(V_{GS_L}-V_T)^2}{(V_{GS_L}-V_T)E_CL_L}}{\frac{\mu_n C_{ox}}{1+\frac{V_{DS_I}}{E_C L_I}}\cdot\left(V_{GS_I}-V_T-\frac{V_{DS_I}}{2}\right)V_{DS_I}}\times 10^{-4}
$$


Also note that in order to use v<sub>sat</sub> = 8&times;10<sup>6</sup> cm/s, we need to convert this to &mu;m/s, so we multiply the RHS of the equation by 1&times;10<sup>-4</sup>.
$$
W_I=\frac{(0.1)(0.1) (8\times 10^6)\cdot\frac{(1.2-0.1-0.4)^2}{(1.2-0.1-0.4)(6)(0.1)}}{\frac{(270) }{1+\frac{0.1}{(6)(0.1)}}\cdot\left(1.2-0.4-\frac{0.1}{2}\right)0.1}\times 10^{-4}\\
W_I=0.17~\mathrm{\mu m}
$$

### Less-Saturated-Enhancement-Load Inverter

In this case the gate voltage for the load transistor is 0.4 V higher than V<sub>DD</sub> so the maximum output can be V<sub>DD</sub>. But because the gate voltage is also higher, the top transistor is less-saturated.

Using the exact same equation as above, we use 1.6 - V<sub>out</sub> instead for V<sub>GS<sub>L</sub></sub>. But V<sub>in</sub> (for the bottom NMOS) remains at V<sub>DD</sub> of 1.2 V.
$$
W_I=\frac{(0.1)(0.1) (8\times 10 ^6)\cdot\frac{(1.6 - 0.1-0.4)^2}{(1.6 - 0.1-0.4)(6)(0.1)}}{\frac{270}{1+\frac{0.1}{(6)(0.1)}}\cdot\left(1.2-0.4-\frac{0.1}{2}\right)0.1}\times 10^{-4}\\
W_I=0.328~\mathrm{\mu m}
$$

### Comments

The resistive-load inverter is able to have a output voltage all the way up to V<sub>DD</sub> which is good. But the resistor is cumbersome in digital design, and often means slower and bigger circuit. The size of the transistor thus is also relatively large at **0.4 &mu;m**.

Usin	g the saturated-enhancement-load inverter, we no longer need the resistor. However, the maximum output voltage (high) is limited to V<sub>DD</sub> - V<sub>T</sub>. The trade-off is compensated with the small transistor size: at only **0.2 &mu;m**.

Lastly, we bias the gate voltage of the load NMOS exactly V<sub>T</sub> higher to obtain a maximum high output voltage of V<sub>DD</sub>. But the result is we use a substantially larger transistor: at **0.3 &mu;m**.



## 2. Buffer

<img src="assets/1571695910245.png" alt="1571695910245" style="zoom:80%;" />

The design presented in the diagram is a **buffer** or voltage follower or something like the *redstone repeater* from *Minecraft*. Because the PMOS is the pull-down device, V<sub>OL</sub> is at least V<sub>T<sub>P</sub></sub>, the threshold voltage from the PMOS. Similarly, because the NMOS is used as a pull-up device, V<sub>OH</sub> is at most V<sub>DD</sub> - V<sub>T<sub>N</sub></sub>.

### DC Voltage Transfer Characteristics

- Starting from V<sub>in</sub> of 0.0 V and slowly increasing it to V<sub>T</sub>. The output won’t budget because the PMOS remains on while the NMOS remains off. 
- After V<sub>in</sub> = V<sub>T<sub>n</sub></sub> + V<sub>T<sub>P</sub></sub>, the driving NMOS turns on and start to pull output up. The output voltage will keep increasing as we increase the input voltage, all the way to V<sub>DD</sub>. By then, the output voltage is capped at V<sub>DD</sub> - V<sub>T<sub>N</sub></sub>. V<sub>DD</sub> - V<sub>T<sub>P</sub></sub> is where the PMOS fully turns off, which is close to where V<sub>OH</sub> is.
- Now let’s go from input high to input low. The output won’t budge until V<sub>in</sub> drops to V<sub>DD</sub> - V<sub>T<sub>P</sub></sub>. because the pull-down PMOS is off.
- At V<sub>in</sub> = V<sub>DD</sub> - V<sub>T<sub>P</sub></sub> - V<sub>T<sub>N</sub></sub> and below, the PMOS gets stronger and pulls the output voltage back down to V<sub>T<sub>P</sub></sub>.

Notice that positive edge characteristics is different from negative edge, therefore we have hysteresis. It looks like this:

<img src="assets/1571697473988.png" alt="1571697473988" style="zoom:67%;" />

### Gain

### CAD

## 3. Body Effect Factor



## 4. MOS Capacitances

*Consider the layout in the figure below implemented in a 180nm technology. Assume that the transistor has W=900nm, L=180m, and a source/drain dimension Y=800nm and a lateral diffusion of 22nm. Let tox = 40 Å.*

<img src="assets/1571697975914.png" alt="1571697975914" style="zoom:67%;" />

### Gate and Overlap Capacitances

*Compute the worst case gate capacitance per unit width, C<sub>g</sub> in units of fF/&mu;m. Estimate C<sub>GS</sub>, C<sub>GD</sub> and C<sub>GB</sub> in linear, saturation, and cutoff, including overlap effects.*

Let’s first find the oxide capacitance, which is a function of the thickness of the oxide layer.
$$
C_{ox}=\frac{\epsilon_{ox}}{t_{ox}}
$$
Where $\epsilon_{ox}$ is the silicon dioxide relative permissibility multiplied by the permissibility of free-space: $3.9\epsilon_0$. And the thickness $t_{ox}$ is  40 angstroms, or 40&times;10<sup>-10</sup> m.

Plugging in the values, we get values $C_{ox}=8.63$ F/&mu;m<sup>2</sup>.

Then the gate capacitance is simply multiplication by the length L:
$$
C_g=C_{ox}L=(8.63)(0.18)=1.55~\mathrm{fF/\mu m}
$$
Since the thickness of the gate, T<sub>poly</sub> is not given, we assume that the fringe capacitance is negligible (C<sub>f</sub> = 0).

The overlap capacitance for each overlap is given by the oxide capacitance multiplied by how much is overlapped (lateral diffusion L<sub>D</sub>=22 nm). 
$$
C_{ol}=C_{ox}L_D=(8.63)(0.022)=0.19~\mathrm{fF/\mu m}
$$

---

The total gate capacitance (which need us to multiply the numbers we got earlier with the width W) is
$$
C_G=C_g W=(1.55)(0.9)=1.4~\mathrm{fF}
$$
The total overlap capacitance for each overlap is
$$
C_{OL}=C_{ol}W=(0.19)(0.9)=0.17~\mathrm{fF}
$$

---

The capacitances broken down into the three parts: gate-source, gate-drain, and gate-bulk is as follows:

|                    |         Cutoff | [fF] |                           Saturation | [fF] |                               Linear | [fF] |
| ------------------ | -------------: | ---- | -----------------------------------: | ---- | -----------------------------------: | ---- |
| **V<sub>GS</sub>** | C<sub>OL</sub> | 0.17 | &frac23;C<sub>G</sub>+C<sub>OL</sub> | 1.10 | &frac12;C<sub>G</sub>+C<sub>OL</sub> | 0.87 |
| **V<sub>GD</sub>** | C<sub>OL</sub> | 0.17 |                       C<sub>OL</sub> | 0.17 | &frac12;C<sub>G</sub>+C<sub>OL</sub> | 0.87 |
| **V<sub>GB</sub>** |  C<sub>G</sub> | 1.40 |                                    - | 0.00 |                                    - | 0.00 |

### Junction Capacitance

First, we calculate the voltage asymptote: &phi;<sub>B</sub>.
$$
\begin{aligned}
\phi_B&=\frac{kT}{q}\ln\left\vert\frac{N_AN_D}{n_i^2}\right\vert\\
&=2.565\times 10^{-2}\ln\left\vert\frac{(3\times 10^{16})(3\times 10^{19})}{(1.45\times 10^{10})^2}\right\vert\\
&=0.93~\text V
\end{aligned}
$$
Next, the zero-bias junction capacitance, where &epsilon;<sub>si</sub> is the pure silicon permissibility at 11.7&epsilon;<sub>0</sub>:
$$
\begin{aligned}
C_{j_0}&=\sqrt{\frac{\epsilon_{si} q}{2\phi_B}\cdot\frac{N_AN_B}{N_A+N_B}}\\
&=5.17\times10^{-8}~\text{F/cm}^2\\
&=0.517~\mathrm{fF/\mu m^2}
\end{aligned}
$$
Lastly, to get C<sub>j</sub>, we multiply the per-area capacitance with the area: which is the bottom plate and the side walls.
$$
\begin{aligned}
C_j&=C_{j_0}(Y+2x_j)\\
&=C_{j_0}(0.8+2(0.3))\\
&=0.72~\mathrm{fF/\mu m}
\end{aligned}
$$

### Drain Junction Capacitance

To calculate the junction capacitance, the formula is
$$
C_J=\frac{C_{j}W}{\left(1-\frac{V_J}{\phi_B}\right)^m}
$$
Where A is the area, V<sub>J</sub> is the voltage across the junction, and m is &frac12;. 

When V<sub>D</sub> is 1.8V the voltage across the junction is the voltage of the bulk subtract the drain voltage:
$$
V_J = V_B-V_D=-1.8~\mathrm V
$$
Plugging in, we get
$$
C_J=\frac{(0.72)(0.9)}{\left(1-\frac{-1.8}{0.93}\right)}=0.222~\mathrm{fF}
$$
When V<sub>D</sub> is 0, the junction voltage is 0. So junction capacitance is simply
$$
C_J=C_jW=(0.72)(0.9)=0.651~\mathrm{fF}
$$




## 5. NOR Gate



## 6. Inverter Noise Margin