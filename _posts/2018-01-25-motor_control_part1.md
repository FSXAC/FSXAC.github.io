---
title: "How to Train Your Motors: Week 1-3"
date: 2018-01-25
categories: ELEC

author: Muchen He
tags:
  - elec
  - motor
  - 3d_printing
  - cad
  - control
header:
  teaser: /assets/blog/teaser/motor1.jpg
  overlay_image: https://lh3.googleusercontent.com/P-9ReVAwoVg9t-_LgWj-NjVJzEXnl0fHvYb1Ks4vlZ9PyYugyrJd-X0xSqG8JdXLez-Agp3wbO-fYJJgcWfCZZ2nup8b2L27Ieo3ebCKdGfrPmM39z_9usPKbzNPSZKAj_7gdt3zEvfIhpqR5m4BSxu3LoSJRVis-51sB4DLgB-eEIgoTAI493jtv-idBoCzhB7W3UaIQl4ZV33lkBIxdEeFancc-QyTER3LYKeKYbaUcmFknt3E4x4N-CozQvYBocO2d-9pLLRXW0ZD79lmE87tsEiaYMtdaql3AIQ-WI-LIdMELZknkKgFThWxjgdF1P7FWuDvcY_nngdk88JkkIWS19qGYmyYEfZlC4ahpPdiOCAIZCTjrEAXdJxUwzZrVUb357h4TyhHhPcMuTfz0xzMdKmt7g2N8AI6nQJOS7CVsDqSwm0phNocZ6hBX8r9ifGN2yzT1Pac-N9EtY11Pm0ef2cvEloiM9nBlnaEHrnNB8HbYYcbO6hhjmUb8sfT0FBIX38q2h1FzcJKzWs05Up1Kx2Cav8x2h_7EV7ZihuUJHFBTU1c9JUKUuQrxovppxPyyQ0EidMMjsOUkjk2mNc2WuERMc1_t2lJhG6Ej9C_D6xkM8h9ncWBMOn_v5RO73T8uhg_pirB1DNoGd72IEbzycAuq_fAXA=w1268-h783-no
  overlay_filter: 0.5
---

First, let me introduce our project course, *ELEC 391*. This year we are building 2-DOF motor controlled laser pointer that is fast enough to draw images. The entire project is split into two teams: *motor* and *control*. The motor team is responsible for constructing good motors from scratch, using nothing but materials found in the lab or off the shelf. The controls team is responsible for running simulations, designing motor mounts, joints, and programming the controllers. I am on the controls team.

<!-- excerpt -->

![Intro](https://lh3.googleusercontent.com/RlLyTWZ0_-1OpbEFO-E5IPBwCUqhuAlP8WocUWleVwl4K9Y0PANRO2S3bwybirgQKIqzNuuIMAgJXfA76P-ZRX4wjtJB4RNYfZJqENnZL3w9Db-1e7gPmFCudv15IL8Q9AqsMMDSXmitxkjk70ap6qu7nCFAAkiTPOaZo8aX2zIMNWudDeZSuBKuyqLjMvz3NbM3pA0wvDNfVXCH7uzbWH7KdtVV048gyyDV42FEfR8eUPR4XeQdBu0aG4oY7dy9BwWrBUAzhGaViNaYceL4JQPDf3opXl_ksuk37PGiLs5lp8D76Smib1e9w_y2fsDAqNgZEQSkDqdIboleHdNiC4EGgTM7wsN99O1myGmDWgd4ScO0zxmVwPZG9NvU9ly32YQ1uoCl8FGbDjaqkBkLgFfuORE2Q7HP5KTYkoYOD8k_QiaF7b5Zg7hKDYoWgLyhg4t7p3kKalJMYPdUytZGn5P2n8uFBaCkBjHIevp1pM4UdfhS1C1EGXbduhdUuMBicCAe2Y3dZyVvdV968OVSD2ymvsCeGQnsbTS7bm15udwkiwlDtWySMuF4ftsdbo1x4eMaMskLb3Nq2YFU-ouHYzbI7LGh_-xoUGS5xEwB07sS7ABnOxtXAVpiKG6TeDvoLh8UTen1imNvxGHKL_vQ9rLKvCcKUBJ-Fw=w600-h435-no)

The project is also split into three milestones. Milestone 1: demonstrate some work-in-progress components and control systems. Milestone 2: the individual components should be more or less finalized. Finally, milestone 3: the entire integrated system should be working as designed. We're still a week and a half from milestone 1.

Here are some of the progress we have made so far.

## Motor

### Version 1

The initial proof-of-concept was made of scrap wires and a single piece of magnet taken from a hard drive. It is more to confirm our understanding of theories such the right hand rule, Ampere's law, etc.

Of course, since it only has one core, it doesn't have a commutator and relies on the momentum to keep it spinning.

### Version 2

The second *working* version uses 3D printed stator shell and rotor core. This time, five poles and coils are used. Thus 5 commutator connections.

<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FFSXAC%2Fvideos%2F1647081868702304%2F&width=500&show_text=true&height=371&appId" width="500" height="371" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>

We used stranded wires as brushes to provide current to the rotor; however, because the each strand of wires are so thin and are supplying so much voltage, we observed sparking and welding. Therefore dramatically increased friction. At top speed, the motor draws 2.0V and 4.0A, the top limit of the power supply!

**Problems**: Even with the bearings attached to the rotor shaft, the rotor core and windings are too heavy, thus an relatively large amount of torque is required to start rotation. The magnets were not providing a strong enough magnetic field. The commutator was rough and caused friction. The brushes were welding to the commutator. Finally, The current draw was too high (possibly due to small number of turns and small magnetic field).

### Version 3

The version 3 was much bigger than version 2. This is mostly to resolve the frustration of working with magnets by allowing us to have more space to work with inside the stator shell. This time, we used eight 10mm x 5mm x 60mm neodymium magnets for the field. This made the motor to spin much faster.

**Problems:** The magnets were too strong and was difficult to install inside the stator shell. The magnets were too fragile and shatters too easily.

#### Version 4

![Version-4-Motor](https://lh3.googleusercontent.com/xZr1XeUW4t_MkylHepxdzoxUwZd4sk-iI1QQ4WLaoKWZ9k101JwHsE0YOyPpvPrDEJFP4K3fZS3MABPLtiRMJ16Fod44WQpMVpDXwQkojzrWUuWgUDrU05UMemScjadbBtSs57O0ADHZZHilAUDcVcTZ09ZJ-9DozmTXUWh7BtAfvL1lgpsFoOjv_S_VXuD0eQ9DuPhe8naxZuF4QfK_o-pfvL15_-UxEa00Ek8J4kxJcnIV8gF5OfwQqQw9manp70HnpgTA0AHAAavw-6DQ27UdfUkFGd7GdzrXGDSFaE7AKE6gZqd_kJuovEtsE049OdwYU3nQL-7kEn1cd0IWKpajmhziVj_EDf9Cho4FI1M61umG4dh8H0CaBV17Kh4tfgoam-0DoYkcSl5vrqW_-yOv24Y2s_FWTB2FPOXRQFkHZeGkSkM1o1dXawl3sCz-GQPlr-nLBntt2BwbYkR8UT-_eFeZzm5caLferCD9rsv6jpdGnXbTTSn4PBpeRpWo269BB6E6K8TtxTykLLwM_XL8xkcD1b7uFh-ZOAX7L3-jQ53E-sX6ghh8x1mgYBp_McLqvozAkV6vZXVFf8IGBgRG7IWQsuc5Dj6o4CL3tGrL96HgwDxpVsw26_01ZH0JHOF5PvvHuAgLdusN0pVovFWyLMHYSdPq4g=w405-h453-no)

In this version, the stator shell is redesigned to have slots for magnets. This way, the magnets slides in and won't affect the position of other magnets while still providing a strong magnetic field. The diameter of the shell is shrunk to be closer to the rotor core.

The stator is designed to hold more windings while being lighter. And the commutator is extended to reduce roughness.

## Controls

### Microcontroller

The first thing that we need to do is pick a microcontroller. Of course, the no-brainer choice is an Arduino. We chose Arduino Nano to prototype for now since it uses the same microcontroller as Arduino Uno (ATMega328P) but is much smaller and easier to work with on a breadboard. It also takes up less footprint in a 3D printed case (for future milestones).

### Simulation

Meanwhile, a *SimuLink* model is created to model the mechanical and electrical systems of the motors as accurately as possible. This is useful for tuning the control systems in the future.

### Sensor

To obtain the current angle of the motor shaft, we need a rotary encoder. First we tried the **mechanical rotary encoder** which is essentially a pair of brushes action as commutators on some spinning disk.

To test, the sensor is hooked up to a debounce circuit, which is essentially a low pass filter. Then it is connected to the Arduino pins `2` and `3` because they support hardware interrupts. Every rising and falling edge of encoder output A and B triggers an interrupt. There are 24 slits on each revolution of the encoder wheel, that means 96 interrupts are triggered per revolution of the rotary encoder.

In the firmware, `attachInterrupt()` function is used to connect the interrupt to the right interrupt service routine:

```c++
attachInterrupt(digitalPinToInterrupt(encoder_A_int_pin), encoder_ISR, CHANGE);
```

As it turns out, the mechanical encoder SUCKS! It did okay at low speed, but at high speeds, it's practically unusable. The encoder also produced unwanted signals under vibration, which is not that uncommon.

We are currently investigating into integrating an optical rotary encoder which is much better. The optical encoder eliminates friction and allows faster speeds.

### Motor Driver

The `L298` motor driver chip is used as power electronics. The digital input signal essentially breaks down to three for each motor: `Direc1`, `Direc2`, and `Enable`.

The `Direc1` and `Direc2` input signal determines the direction of rotation of the motor. If both are off or on, the motor won't spin. The `Enable` input signal is an "analog" (PWM) signal. This controls the speed of the motor.

### Mount & Test Bench

To hook up the motors and the encoder together, some kind of test bench is needed. First, all existing components are modelled in CAD programs, then new parts are designed and assembled in CAD programs.

![CAD](https://lh3.googleusercontent.com/CFKmPnafjcDNUIBIjXqCHiTr5Hu-fGSVF5f1ezCUX8ie9E1b9qszTsyRR4RVUZro1M3H_euNW4FqBaqBsw4qEpLOBUytowhDVVG-zyvYKUJw-EDZ9DiC4WvcEqPCqUt_Uhawbd8yNHJZ8wAUuu7Ga4X1UbzyQ2hwZP8_me5uSpZbTjZqJaFul9h_9_mxzoOu6Tl2488RyJwJN3QDJ8-ETbF4Lrdsx3aX-ggrpayQpd4BFNnE2yZWyHIwT4MNk-ZSAdK_ESWkJDO4UkHdt0mOSFPx3iC3DBS7OkqjbP9HFwOI8eo5dqE3MAI3fMTX1eWCxQWUvR7fKwQRGFnqAVbPRGrDf5DDFmegdNKDaA05A4UFze9e3xZj-UlpDpYZ6fNtEatsdmErGe-tDq0qGi_NKXyl7YXJDpbjyJsKMwXB_9JZceVwc7iJ7F3vGq3s0e1cx8bqiz421-6ijE9jJV4kh1uBC3Fheid17Tty7c3jwFMh_r2fLi82wrARgK64cTr0nzKVU7nlOklB-tu1juQ0xPmExpK2dCIEEOmdhnYCmJvEfLYHsQtJiPdbC8HlGEVjmgwWW-kIEdk1Jy2q0qs9Qa7t3xO77s9zrwgtHafgZpD0Y4RSe3jUJiHjV7ywQ9yMMxnCSdzwIccZblk0vcV932qIvaenOGVXYA=w479-h901-no)

The parts are 3D printed, assembled, and tested. In each iteration, the mechanical parts are improved.

The first prototyped (actually Mk2) test bench had a direct coupling between the motor shaft and the rotary encoder, which is mounted to a plate. This version did not work very well and immediately failed because the misalignment of the shaft and the encoder axis caused stress on the 3D printed part and produced a lot of friction. The part worn out very quickly.

The second version uses a gears with gear ratio of 1:1 instead of direct connection. This allowed the shaft to turn smoother, but still has a lot of friction. The meshing of the gears was also quite difficult to accomplish using 3D printed parts.

Since from now on, we are using optical encoders, the third version is completely redesigned. Since the encoder disk is too large to be fitted on the back of the motor, we flipped the motor around and instead plan to have laser mounted on the "back" side of the motor.

![MechV3](https://lh3.googleusercontent.com/PSJ0l0xx2o3H19qpVxPkBFFM2L1QzaAZbzUJ32ihVRg35prsvq9T1RrlXH4dpmHuqTNqtaHvWwRes5M5foMWElXHosaXrjhg7nDhopd1ozpjIShCf8UgOw9H0DPoDiEkC7E3mYN8Ht20YL0d60IntWX1kcInFPxAHrq8H09qf9QdQA4A3BIdYetbxvt_5N10Lh8Lkr3LimN-1qvUJ-oW2AxR5RiuPsbdbpqBpGHfteNtQXwfuWE52fOsGWO7sV7i2GPU6zQXVpVJgShNnUHeyXuy_BRiL4tUO9FV9tTkpkQC9rICrxriYPcIyA0TwTeRmiUVfZ2Oo411iVu-CFhUg9l5IGAJ-9XwwNsZnCO_DagC0yHIWqkgJCSLZiDEr21wmsFFlA-iUEuixhyNXm4R6LDuoVBiKLBbLFx2R8aUTY7GnWnKesrTudw_WUgpC-J9bByGCCvP3MHasos8Sj9J9MgYbapLixethxQzZhFvLx3ZUs_XxYGRc0Qz9uvUnnG6KsO_i5qw6FrupKsTC8-a6syylbDloYAsm-b4zfBWlUM6-Ooy1w1hyJk3Y2R1_Wug7epaiposBDlJhAvQjeL2Kw_vkgh_Xa03Hhp82TdM8LePYaUUVn8-s831d4aLx-Z5ceHmo2WmXBACb6U9q2d2xIU6PPqSu4TddA=w1191-h757-no)

This version hasn't been made yet because my 3D printer broke down :( so I hope this works okay.

A lot of progress has been made, but we still have a long way to go for a minimum-viable-product for milestone one.