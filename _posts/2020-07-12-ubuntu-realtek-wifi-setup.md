---
title: Installing Realtek Wireless Driver for Ubuntu on a Desktop PC
date: 2020-07-12
categories: [Linux]
header:
   teaser: "https://lh3.googleusercontent.com/pw/ACtC-3dOr4LNoXx_H6c1SBvV1FNnqpw_ppZdpaTHAfaNYavGQPmDq2DPaJUSZ5sFGqM_3XWG_H_aYKfvgqSTh_48gcjr93ccvGespDDaEiwTXTsV1DX3XbvTqxk35SxJZrIRAKR6OpOLykASRHg7_ddJYFM=w880-h476-no?authuser=1"
   overlay_image: "https://lh3.googleusercontent.com/pw/ACtC-3dOr4LNoXx_H6c1SBvV1FNnqpw_ppZdpaTHAfaNYavGQPmDq2DPaJUSZ5sFGqM_3XWG_H_aYKfvgqSTh_48gcjr93ccvGespDDaEiwTXTsV1DX3XbvTqxk35SxJZrIRAKR6OpOLykASRHg7_ddJYFM=w880-h476-no?authuser=1"

---

Recently I did a fresh install of Ubuntu (actually Kubuntu) 20.04 on my desktop PC. Unfortunately, my PC motherboard (Gigabyte Z370) does not have any built in wireless or bluetooth chipset, and somehow I need to get internet working. Also I live in a place where there is no ethernet ports, which makes the process more difficult. So, I use one of the cheap USB WiFi adapter I bought from Amazon. It uses Realtec RTL8811CU chipset. 

<!-- excerpt -->

I will talk about the troubles I went through in the next section. Then in the [solution](#solution) section, I go over the exact steps I took to get internet working.

## Failed Attempts

Of the many articles on stack exchange and Ubuntu forums, the “proper” way to install these essential drivers is to already have an internet connection and use `apt install` to install more packages. 🙄 this is counter-productive for me at the moment as I need to somehow get an internet connection in the first place.

### Attempt 1: Download driver from Realtek and use USB flash drive

The first thing I tried was to download the RTL8811CU chipset from Realtek’s website from my MacBook, copy it to an USB flash drive, eject it, plug it into my Linux desktop, and try to install it from there. While the installation procedure for Windows and Mac is as simple as running some executable, the Linux version comes in source code, so I need to build it myself. Unfortunately, my newly installed Ubuntu doesn’t have *gcc* nor *make* — which the install script included in the download required.

Mission failed.

### Attempt 2: Use my iPhone’s Personal Hotspot

Nowadays all mobile devices comes with personal hotspot where it turns itself into a “router” while connected to internet via cellular network. As mentioned before, my Ubuntu PC doens’t have WiFi nor Bluetooth, so the only option left is to connect my iPhone to the PC using USB. However while this allows Ubuntu to detect the device as a wired connection, there is no internet access. After some digging around, it turns out I need to install another package called `ipheth-utils`[^1] — no good.

### Attempt 3: Using Window Laptop’s Network Sharing

In Windows *Settings* app, there is an option to turn on “Network Sharing” but it straight up did not work. Once I connected the ethernet, Windows automatically thinks the other end of the ethernet is the router/modem -_-. There wasn’t any feedback/error message in the *Settings* app, so there was not much to do.

## Solution

To get it fully working, the procedures can be split into two parts:

1. Getting internet on Ubuntu in the first place so we can download packages.
2. Get the driver setup.

### 1. Create a Bridged Connection Using Another Laptop

Since I don’t have access to the router directory to get internet, I went back to failed attempt #3 and modified my method. I followed [this](https://www.windowscentral.com/how-set-and-manage-network-bridge-connection-windows-10a) procedure from WindowsCentral [^2]. The steps are summarized as follows:

1. Open `cmd` and enter the command `ipconfig /all`.
2. Note the **IPv4 Address**, **Subnet Mask**, **Default Gateway**, and **DNS Servers**.
3. Open *Control Panel* (yes, the old one — because the new *Settings* app doesn’t have these settings).
4. Go to *Network Connections*, and select both the Ethernet adapter and the Wireless adapter.
5. Right click and select *Bridge Connections*. Upon click, it will automatically create a new “bridged” adapter and it will show up in the *Network Connections* window.
6. Right click the newly created bridge adapter and go into *Properties*.
7. Go into the *Properties* dialog of *Internet Protocol Version 4 (TCP/IPv4)* menu item.
8. Select “Use the following IP addresses” radio button and enter the **IPv4 Address**, **Subnet Mask**, **Default Gateway**, and **DNS Servers** we have noted earlier.
9. “OK” every dialog window. After, Windows may offer to “troubleshoot and fix” the internet, say yes.
10. Reconnect to WiFi if needed.

At this point we should have successfully bridged the network and the Ubuntu finally has internet access! 🥳

### 2. Installing the Driver[^3]

1. Get the basic stuff.

   ```shell
   sudo ubuntu-drivers autoinstall
   sudo apt update
   sudo apt install build-essential dkms gcc git make
   ```

2. Find the USB device ID so we can find the right driver.

   ```shell
   lsusb | grep -i Realtek
   ```

   Output:

   ```
   Bus 001 Device 010: ID 0bda:c811 Realtek Semiconductor Corp.
   ```

3. So the ID is `0bda:c811`, a quick search reveals this is for RTL8811CU chip. Luckily, there is a working version for this chip for Linux 4.4.x up to 5.x: <https://github.com/brektrou/rtl8821CU.git>[^4]. So I cloned it.

   ```shell
   git clone https://github.com/brektrou/rtl8821CU.git
   ```

4. Run the install script.

   ```shell
   cd rtl8821CU/
   chmod +x dkms-install.sh
   sudo ./dkms-install.sh
   ```

5. Add module to Linux kernel.

   ```shell
   sudo modprobe 8821cu
   ```

Finally, upon clicking on the little network symbol on the menu bar I was so happy to see a list of nearby WiFi networks. Yay! 🎉 Of course, after this is done, I disconnect ethernet from the Ubuntu machine, I removed the bridged ethernet adapter on Windows as well.

[^1]: <https://support.speedify.com/article/565-tethered-iphone-linux>
[^2]: <https://www.windowscentral.com/how-set-and-manage-network-bridge-connection-windows-10a>
[^3]: <https://askubuntu.com/questions/1162974/wireless-usb-adapter-0bdac811-realtek-semiconductor-corp>
[^4]: <https://github.com/brektrou/rtl8821CU.git>


