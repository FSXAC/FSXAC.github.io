---
title: "Project 1 - FSM"
date: 2019-09-23
categories: ELEC 402
---

Muchen He - **44638154**

This report specifies the finite state machine (FSM) I built for ELEC 402 project 1. 

## Description

The FSM I built is a very simple model of a single-pixel digital camera. The digital camera has three modes of operation: Aperture Priority (A), Shutter Priority (S), and Manual (M). In A mode, the user can change the aperture size, denoted in photography terms as the f-stop number. A wider aperture, which lets in more light, has lower f-stop number. In A mode, The shutter speed setting will be automatically adjusted. In S mode, the user can control the shutter speed, or how long to expose the sensor for. In S mode, the f-stop will be adjusted automatically. In manual (M) mode, the user can control/override both settings at the same time. The user presses the shutter button to capture an image. Then, the sensor data is “amplified” and outputted from the FSM into memory.

### Assumptions

For the scope of this project, we will make some assumptions.

First, we are not actually implementing a memory device. Since the goal for this project is just to construct a 10+ state FSM, the output would be the “amplified” sensor data.

Second, we assume this camera is not realistic, as in, the simulation of operation is simplified and is not a true reflection of how a digital camera works. In a real digital cameras, the sensor data is not “amplified” by shutter or aperture, they simply just gather more light. They are sensor sensitivity settings (ISO) but we are not considering them here.

Lastly, the shutter speed is in multiples of clock cycles. In real life, shutter speed is typically 1/200 or slower. But that would be too much clock cycles and simulating “waiting for shutter” for thousands of clock cycles is unproductive. So in this project, the fastest shutter speed is 2 cycles, and the slowest shutter speed is 512 cycles.

## State Transition Diagram

## Modules

This section outlines the modules that make up this FSM.

### DFF

For the sake of simplification and abstraction, I created separate D-Flip-Flop modules that I could use. The intention is to not have too many `always_ff` in a single file, which could be confusing.

The implementation is straightforward. D equals Q on rising clock edge. The input to the module is D, Q, clock, and reset. We can also use the *parameter* to specify the bus width (1 bit wide by default).

The DFF modules are for storing aperture and shutter settings.

### Aperture and Shutter Decoder

The settings for aperture and shutter is enumerated as a number between 0-7 (3 bits). But we need to decode this into usable values for calculation and number of cycles to wait for the shutter. 

The aperture decoder takes in the aperture settings and output the “aperture multiplier”.

The shutter decoder takes in the shutter settings and output number of cycles we need for exposure.

### Shutter Countdown Module

SCD (Shutter Countdown) module is a simple implementation of a countdown module. The input is clock, reset, number of cycles, write enable, and countdown enable. To set the number of cycles, we need to ensure write enable is on. To run the countdown, turn “countdown enable” (`cd_en`) to HIGH. It outputs a high “done” signal when the countdown finished.

## Block Diagram of FSM

## Test-Bench

## Block Diagram of Test-Bench

## Simulation Results