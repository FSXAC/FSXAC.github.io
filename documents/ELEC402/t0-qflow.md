---
title: "Tutorial 0 - QFlow Installation on Ubuntu"
date: 2020-09-12
categories: [ELEC 402]
---

This document walks through the procedure required to setup [*Qflow* — An end-to-end digital synthesis flow for ASIC designs](http://opencircuitdesign.com/qflow/index.html).

- toc
{:toc}
## Overview

*Qflow* is a flow consists of a suite of programs. All these programs need to be installed individually and manually for the overall *Qflow* to work. These are:

- **yosys** for Verilog parsing/synthesis/optimization/verification
- **graywolf** for placement
- **qrouter** for detailed routing
- **magic** for viewing, extraction, design-rule-checking (DRC)
- **netgen** for Layout-Versus-Schematic (LVS) verification
- (optional) **Icarus Verilog** is an alterntive to ModelSim to simulate Verilog testbenches
- (optional) **Dinotrace** is an alternative to ModelSim to view waveforms
- (optional) **IRSim** is an alternative to to ModelSim to simulate RTL more realistically (note: *magic* and *Dinotrace* must be installed for this)

While simplfied steps to install these tools are located on their perspective website, I personally found a lot of other dependencies that are required but not listed. So the purpose of this tutorial is to also cover those. The intended audience is anyone (such as students) who wants to install these tools on their own computer.

**Requirement**

- Ubuntu LTS 18.04 (recommended) with elevated privledge.
- An internet connection

## Installing Tools Necessary to Install the Rest

![I Used the Stones to  Destroy the Stones, Know Your Meme](https://i.kym-cdn.com/photos/images/facebook/001/534/991/18e.jpg)

Before we dive into installing the actual programs used in *Qflow*, we must install a few things that we need to download, configure, and build the programs.

**Note**: Please go through the following subsections *in sequence*.

### Update Ubuntu Package Manager

```shell
sudo apt update
```

### Shells

Parts of *Qflow* software runs scripts that use `csh` and `tcsh` — these don’t come with Ubuntu by default so we need to install them:

```shell
sudo apt install csh tcsh -y
```

### Download Tools

Make sure your system has either `wget` or `curl`. If not, install using package manager:

```shell
sudo apt install wget -y
sudo apt install curl -y
```

### Archive Tool

Make sure your system has `tar` archive tool, we need this to extract files we download.

### Software Build Tools & Git

```shell
sudo apt install build-essential git -v
```

### Misc. Libraries and Tools

```shell
sudo apt install checkinstall zlib1g-dev libssl-dev -y
sudo apt install libgsl-dev -y
sudo apt install libx11-dev -y
```

### CMake

For CMake we need to download the tarball (like zip files except `.tar`) from CMake website here: <https://cmake.org/download/>. 

We can use `wget` for example to download the tarball to your local directory:

```shell
# starting from your home directory (~)

wget https://github.com/Kitware/CMake/releases/download/v3.18.2/cmake-3.18.2.tar.gz
```

Then extract the tarball. Once the extraction is done, you may delete the compressed tarball:

```shell
tar -xvf cmake-3.18.2.tar.gz
rm cmake-3.18.2.tar.gz
```

Descend into the `cmake-3.18.2/` director, and follow the build and installation instructions in the `README.rst` file. It tells you to:

```shell
./bootstrap
make
sudo make install
```

This will take a while. Go an get a cup of coffe or snacks ☕️.

### Python

Make sure you have **Python 3.6+** installed (not Python 2) — this is required as the GUI for the software is written in Python. 

By default, Ubuntu 18.04 comes with Python 3.6.9 and it can be launched using the command `python3` (whereas normal `python` command will invoke Python 2).

If you do not have Python 3.6+ installed for some reason, you can follow the steps below to Install newest version of Python 3:

```shell
sudo add-apt-repository ppa:deadsnakes/ppa

# Press [Enter]

sudo apt install python3.8
```



### GUI Libraries

The *Qflow* software uses some GUI libraries that we need to install so we can run the programs properly:

```shell
sudo apt install tcl-dev tk-dev -y
```

Also install Python GUI library:

```shell
sudo apt install python3-tk -y
```



## Installing *yosys*

As of Ubuntu LTS 15.04. *yosys* is now a standard package in respository in Ubuntu. Simply run the following:

```shell
sudo apt install yosys -y
```

Check that *yosys* is installed by invoking it via the following command. It should say the version installed.

```shell
yosys -V
```



## Installing *Graywolf*

*Graywolf* is hosted on GitHub, so go ahead and clone the git repository to your local drive and then checkout the latest release version (0.1.6):

```shell
# starting from your home directory (~)

git clone https://github.com/rubund/graywolf.git

cd graywolf
git checkout 0.1.6
```

Follow the instructions outlined in `README.md` to build and install *Graywolf*:

```shell
mkdir build
cd build
cmake ..
make
sudo make install
```



## Installing *Qrouter*

*Qrouter* is also hosted on [GitHub](https://github.com/RTimothyEdwards/qrouter/), so we can clone the git repository and checkout the stable release version:

```shell
# starting from your home directory (~)

git clone https://github.com/RTimothyEdwards/qrouter.git

cd qrouter
git checkout qrouter-1.4
```

Build and install:

```shell
./configure
make
sudo make install
```



## Installing *Magic*

Same procedures as previous section — very straightfoward (the website for [Magic](http://opencircuitdesign.com/magic/) is here, the GitHub link is [here](https://github.com/RTimothyEdwards/magic).):

```shell
# starting from your home directory (~)

git clone https://github.com/RTimothyEdwards/magic.git

cd magic
git checkout magic-8.3
```

```shell
./configure
make
sudo make install
```

Here, the output logs are saved to *make.log* and *install.log* for the commands `make` and `make install` respectively, make sure to glance over the logs to ensure no errors occured:

```shell
cat make.log
cat install.log
```

## Installing *netgen*

Again, same procedure. Website link for *netgen* is [here](http://opencircuitdesign.com/netgen/), GitHub link is [here](https://github.com/RTimothyEdwards/netgen).

```shell
# starting from your home directory (~)

git clone https://github.com/RTimothyEdwards/netgen.git

cd netgen
git checkout netgen-1.5
```

```shell
./configure
make
sudo make install
```



## Installing *Qflow*

Finally, once all of the depenencies mentioned above are installed, we can install *Qflow*. Again, it is also hosted on GitHub [here](https://github.com/RTimothyEdwards/qflow) and the procedure is very similar.

```shell
# starting from your home directory (~)


git clone https://github.com/RTimothyEdwards/qflow.git

cd qflow
git checkout qflow-1.4
```

```shell
./configure
make
sudo make install
```

## (Extra) Installing *iVerilog*

**Note**: *This part is optional.* If you want to use ModelSim, you can skip this section

The official *Qflow* tutorial uses Icarius Verilog (iVerilog) to simulate synthesized and layout Verilog. This section goes over how to install this.

First go and clone the iVerilog repository:

```shell
# starting from your home directory (~)


git clone https://github.com/steveicarus/iverilog.git

cd iverilog
```

Checkout the latest stable version:

```shell
git checkout v10_3
```

Install required libraries in Linux system (you may skip this step, or you may need to install more things — see what error messages comes up and follow it).

```shell
sudo apt install autoconf gperf -y
sudo apt install flex -y
sudo apt install bison -y
```

Configure, build, and install on your Linux machine:

```shell
sh autoconf.sh
./configure
make
sudo make install
```

Also note that I personally don’t have any experience using *iVerilog*, so use at your own discretion.

## (Extra) Installing *Dinotrace*

*Dinotrace* is a program used to view waveforms from simulations (such as *iVerilog*).

To install, follow the `README.md` from their [GitHub page](https://github.com/veripool/dinotrace):

```shell
# starting from your home directory (~)

# Install prerequisits
sudo apt install perl

# Clone git repo
git clone https://github.com/veripool/dinotrace.git
cd dinotrace

# Checkout stable version
git checkout stable
git pull

# Configure and build
autoconf
./configure
make

# Test
./dinotrace traces/ascii.tra

# Install
sudo make install
```

## (Extra) Installing *IRSIM*

While *ModelSim* and *iVerilog* simulator can be used to simulate the RTL functionalities of a design, the *IRSIM* “switch-level” simulator can simulate a bit more realistic than the ideal.

Installation is very similar to that of [*magic*](#installing-magic).

```shell
# starting from your home directory (~)

# Clone git repo
git clone https://github.com/RTimothyEdwards/irsim.git
cd irsim

# Checkout stable version
git checkout irsim-9.7

# Configure, build, and install
./configure
make
sudo make install
```



## Conclusion

👏 All done! Hopefully at this point all installing were successful, and you may move on to running a tutorial workflow. Take a look at both the following tutorials:

- ~~[Official *qflow* GUI workflow tutorial](http://opencircuitdesign.com/qflow/index.html). (2019)~~
- [ELEC 402 *qflow* workflow tutorial](t2-qflow). (2020) (TODO)

